import React, { useEffect, useRef, useState } from 'react';
import './Combobox.css';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import Product from './Option/Product';

export default function Combobox({ list, onChange, multiple = false, filter = false, template }) {
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(multiple ? [] : null);
    const [unselectedList, setUnselectedList] = useState(list);
    const [filterList, setFilterList] = useState(list);
    const inputRef = useRef();
    const comboRef = useRef();

    const OptionComponent = React.useMemo(
        () => React.lazy(template),
        [template]
    )


    const handleSelect = (option) => {
        if (multiple) {
            const newSelected = [...selectedValue, option];
            setSelectedValue(newSelected);
            onChange(newSelected);
            setUnselectedList(list.filter(option => !newSelected.some(tag => tag.key === option.key)))
            setFilterList(list.filter(option => !newSelected.some(tag => tag.key === option.key)));
        } else {
            setSelectedValue(option);
            setOpen(false);
            onChange(option);
        }

    }

    const onDeleteTag = (tag) => {
        if (selectedValue.some(t => t.key === tag.key)) {
            const newSelected = selectedValue.filter(t => t.key !== tag.key)
            setSelectedValue(newSelected);
            setUnselectedList(list.filter(option => !newSelected.some(tag => tag.key === option.key)))
        }
    }

    const toggleOpen = (e) => {
        setOpen(true);
        inputRef.current.focus();
    }

    useEffect(() => {
        document.addEventListener("click", (e) => {
            if (!comboRef.current.closest(".combobox").contains(e.target)) {
                setOpen(false);
            }
        })
    }, [])

    useEffect(() => {
        if (multiple) {
            const selectedKeys = new Set(selectedValue.map((x) => x.key));
            const nextUnselected = list.filter((opt) => !selectedKeys.has(opt.key));
            setUnselectedList(nextUnselected);
            setFilterList(nextUnselected);
        } else {
            setUnselectedList(list);
            setFilterList(list);
        }
    }, [list]);


    const filterData = (e) => {
        let newFilter = unselectedList.filter(element => element.value.includes(e.target.value));
        setFilterList(newFilter);
    }

    return (
        <div className="combobox flex flex-col border-neutral-200 rounded-md border-2 m-2 ">
            <div className="select border-b-neutral-200 border-b-2 p-4 flex justify-between cursor-pointer" onClick={toggleOpen} ref={comboRef}>
                {!multiple && selectedValue &&
                    <>{selectedValue.value}</>
                }
                <div className="field flex">
                    {multiple && selectedValue.length > 0 &&
                        <div className="tag-list flex gap-2">
                            {selectedValue.map(tag => {
                                return (
                                    <div key={"tag-" + tag.key} className="tag flex gap-2 border-2 bg-blue-500 text-white rounded-2xl p-2" >
                                        {tag.value}
                                        <X onClickCapture={() => onDeleteTag(tag)} />
                                    </div>
                                )
                            })}
                        </div>
                    }
                    {!multiple && !selectedValue && !open &&
                        <>Veuillez choisir une valeur</>
                    }

                    <input type="text" ref={inputRef} className={`${(open && filter) ? "block" : "hidden"} p-2 -m-2 outline-0`} onKeyUp={filterData} />


                    {multiple && selectedValue.length === 0 && !open &&
                        <>Veuillez choisir une valeur</>
                    }
                </div>


                {open &&
                    <ChevronUp />
                }
                {!open &&
                    <ChevronDown />
                }
            </div>
            {open &&
                <div className="list max-h-120 overflow-y-auto">
                    {filterList.map(option => {
                        return (
                            <div className="option p-4 hover:bg-blue-500 cursor-pointer hover:text-white" key={"option-" + option.key} data-key={option.key} onClickCapture={() => handleSelect(option)}>

                                <OptionComponent item={option} />
                            </div>
                        )
                    })}
                </div>
            }
        </div>
    )
}