import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import './CustomSelect.css';
import { ChevronDown, ChevronUp } from 'lucide-react';
import * as LucideIcons from "lucide-react";

function DynamicIcon({ name }) {
    const Icon = LucideIcons[name];
    if (!Icon) return null;
    return <Icon size={16} />;
}

const CustomSelect = forwardRef(function ({ selectOptions, onChange, title="Sélectionnez une valeur" }, ref) {
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(null);
    const selectRef = useRef();
    const [error, setError] = useState(null);

    useImperativeHandle(ref, () => ({
        toto: (error) => setError(error)
    }), []);

    useEffect(() => {
        const onMouseDown = (e) => {
            if (!selectRef) return;

            if (!selectRef.current.contains(e.target)) {
                setOpen(false);
            }
        }
        document.addEventListener('click', onMouseDown);
    }, [])

    const onSelectValue = (option, e) => {
        setOpen(false);
        setSelectedValue(option);
        onChange(option);
        console.log("target :" + e.target)
        console.log("current target :" + e.currentTarget)
    }
    return (
        <div className="custom-select flex flex-col w-70 relative" ref={selectRef}>
            <button onClick={() => setOpen(!open)} className='p-2 border flex  justify-between h-10'>
                {!selectedValue &&
                    title
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
                <div className="list flex border flex-col absolute top-10 w-70">
                    {selectOptions.map(option => {
                        return (
                            <div className="option p-2 cursor-pointer hover:bg-blue-500 hover:text-white flex items-center gap-2 bg-white z-9999" onClick={(e) => onSelectValue(option, e)}>
                                <DynamicIcon name={option.icon} />
                                {option.label}
                            </div>
                        )
                    })}
                </div>
            }
            {error &&
                <div className="error text-red-500">{error.message}</div>
            }
        </div>
    )
})

export default CustomSelect;