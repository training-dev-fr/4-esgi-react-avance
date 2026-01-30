import { useState } from 'react';
import './CustomSelect.css';
import { ChevronDown, ChevronUp } from 'lucide-react';
import * as LucideIcons from "lucide-react";

function DynamicIcon({ name }) {
    const Icon = LucideIcons[name];
    if (!Icon) return null;
    return <Icon size={16} />;
}

export default function CustomSelect({ selectOptions, onChange }) {
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(null);

    const onSelectValue = (option) => {
        setOpen(false);
        setSelectedValue(option);
        onChange(option);
    }
    return (
        <div className="custom-select p-2 flex flex-col w-70">
            <button onClick={() => setOpen(!open)} className='p-2 border rounded flex  justify-between'>
                {!selectedValue &&
                    "Sélectionnez une valeur"
                }
                {selectedValue &&
                    <div className="option flex items-center gap-2">
                    <DynamicIcon name={selectedValue.icon} />
                    {selectedValue.label}
                </div>
                }
                {!open &&
                    <ChevronDown />
                }
                {open &&
                    <ChevronUp />
                }
            </button>
            {open &&
                <div className="list flex border flex-col">
                    {selectOptions.map(option => {
                        return (
                            <div className="option p-2 cursor-pointer hover:bg-blue-500 hover:text-white flex items-center gap-2" onClick={() => onSelectValue(option)}>
                                <DynamicIcon name={option.icon} />
                                {option.label}
                            </div>
                        )
                    })}
                </div>
            }
        </div>
    )
}