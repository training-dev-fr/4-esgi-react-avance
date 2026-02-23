import { use, useState } from 'react';
import './Combobox.css';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function Combobox({ list, onChange }) {
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(null);

    return (
        <div className="combobox flex flex-col border-neutral-200 rounded-md border-2 m-2 ">
            <div className="select border-b-neutral-200 border-b-2 p-4 flex justify-between cursor-pointer" onClick={() => setOpen(prevValue => !prevValue)}>
                {selectedValue &&
                    <>{selectedValue.value}</>
                }
                {!selectedValue &&
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
                    {list.map(option => {
                        return (
                            <div className="option p-4 hover:bg-blue-500 cursor-pointer hover:text-white" key={"option-" + option.key} data-key={option.key} onClick={() => {
                                setSelectedValue(option);
                                setOpen(false);
                                onChange(option);
                            }}>{option.value}</div>
                        )
                    })}
                </div>
            }
        </div>
    )
}