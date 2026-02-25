import { useState } from "react";

export default function AutoComplete({ data }) {
    const [open, setOpen] = useState(false);
    const [filterData,setFilterData] = useState(data);

    const complete = (value) => {
        setOpen(value.length > 0);
        setFilterData(data.filter(item => item.includes(value)));
    }
    return (
        <div className="autocomplete flex flex-col m-2">
            <input type="text" className={`flex p-2 outline-none border-2 border-gray-400 ${open?"rounded-t-md":"rounded-md"}`} onKeyUp={(e) => complete(e.target.value)} />
            {open &&
                <div className={`data-list flex border-2 border-gray-400 border-t-0 rounded-b-md max-h-80 overflow-y-auto ${filterData.length >=10?"flex-row flex-wrap gap-2 p-4 content-stretch":"flex-col"}`}>
                    {filterData.map(item => {
                        return (
                            <div className={`item hover:bg-indigo-500 hover:text-white ${filterData.length >=10?"p-4 bg-indigo-600 justify-center items-center rounded-md text-white":"p-2"}`}>{item}</div>
                        )
                    })}
                </div>
            }
        </div>
    )
}