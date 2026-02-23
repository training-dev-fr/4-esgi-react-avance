import { use, useState } from 'react';
import './Combobox.css';
import { ChevronDown, ChevronUp, X } from 'lucide-react';

export default function Combobox({ list, onChange, multiple = false }) {
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(multiple ? [] : null);
    const [filterList, setFilterList] = useState(list);

    const handleSelect = (option) => {
        if (multiple) {
            const newSelected =  [...selectedValue, option];
            setSelectedValue(newSelected);
            onChange(newSelected);
            setFilterList(list.filter(option => !newSelected.some(tag => tag.key === option.key)))
        } else {
            setSelectedValue(option);
            setOpen(false);
            onChange(option);
        }

    }

    const onDeleteTag = (tag) => {
        if(selectedValue.some(t => t.key === tag.key)){
            const newSelected =  selectedValue.filter(t => t.key !== tag.key)
            setSelectedValue(newSelected);
            setFilterList(list.filter(option => !newSelected.some(tag => tag.key === option.key)))
        }
    }

    return (
        <div className="combobox flex flex-col border-neutral-200 rounded-md border-2 m-2 ">
            <div className="select border-b-neutral-200 border-b-2 p-4 flex justify-between cursor-pointer" onClick={() => setOpen(prevValue => !prevValue)}>
                {!multiple && selectedValue &&
                    <>{selectedValue.value}</>
                }
                {multiple && selectedValue.length > 0 &&
                    <div className="tag-list flex gap-2">
                        {selectedValue.map(tag => {
                            return (
                                <div key={"tag-"+tag.key} className="tag flex gap-2 border-2 bg-blue-500 text-white rounded-2xl p-2" >
                                    {tag.value}
                                    <X onClickCapture={() => onDeleteTag(tag)}/>
                                </div>
                            )
                        })}
                    </div>
                }
                {!multiple && !selectedValue &&
                    <>Veuillez choisir une valeur</>
                }
                {multiple && selectedValue.length === 0 &&
                    <>Veuillez choisir une valeur</>
                }

                {open &&
                    <ChevronUp />
                }
                {!open &&
                    <ChevronDown />
                }
            </div>
            {open &&
                <div className="list ">
                    {filterList.map(option => {
                        return (
                            <div className="option p-4 hover:bg-blue-500 cursor-pointer hover:text-white" key={"option-" + option.key} data-key={option.key} onClick={() => handleSelect(option)}>{option.value}</div>
                        )
                    })}
                </div>
            }
        </div>
    )
}