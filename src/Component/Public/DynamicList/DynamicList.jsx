import { IdCard, Loader, Pencil, Search, Table } from "lucide-react";
import { lazy, Suspense, useMemo, useState } from "react";
import User from "../Card/User";
import { useNavigate, useNavigation } from "react-router";

export default function DynamicList({ dataList, template, path }) {
    const [viewMode, setViewMode] = useState("card");
    const navigate = useNavigate();
    const [filterData, setFilterData] = useState(dataList);


    const OptionComponent = useMemo(
        () => lazy(template),
        [template]
    )

    const handleFilterData = (term) => {
        let keys = Object.keys(dataList[0]);
        let result = dataList.filter(item => keys.some(key => item[key].toString().includes(term)));
        setFilterData(result);
    }

    return (
        <div className="dynamic-list flex flex-col my-4">
            <div className="tool-bar flex gap-4 px-4">
                <div className="search-bar flex w-full border-2 border-gray-400 p-2 rounded-md">
                    <input type="text" className="w-full outline-none" onKeyUp={(e) => handleFilterData(e.target.value)} />
                    <Search className="cursor-pointer" />
                </div>
                <div className="view-bar flex rounded-md overflow-hidden w-22 ">
                    <button className={`p-2 bg-gray-200 cursor-pointer ${viewMode === "card" ? "bg-gray-700 text-white" : ""}`} onClick={() => setViewMode("card")}>
                        <IdCard />
                    </button>
                    <button className={`p-2 bg-gray-200 cursor-pointer ${viewMode === "table" ? "bg-gray-700 text-white" : ""}`} onClick={() => setViewMode("table")}>
                        <Table />
                    </button>
                </div>
            </div>
            {viewMode === "card" &&
                <div className="data-list flex flex-wrap gap-8 content-start mt-4 p-4 bg-gray-200 ">

                    <Suspense fallback={<div className="flex flex-col w-full items-center text-xl">
                        <Loader className="animate-spin" size={48} />
                        Chargement</div>}>
                        {filterData.map(card => <div className="card w-[calc(25%-24px)] relative shadow-white bg-white shadow-[0_0_20px] rounded-md p-4 " onClickCapture={() => navigate(path + "/" + card.id)}>
                            <OptionComponent item={card} />
                            <Pencil className="absolute right-1 top-1 text-gray-600 cursor-pointer" onClickCapture={() => navigate(path + "/Edit/" + card.id)}/>
                        </div>)}
                    </Suspense>
                    
                </div>
            }
            {viewMode === "table" &&
                <table className="mt-4">
                    <thead>
                        <tr >
                            {Object.keys(dataList[0]).map(property => {
                                return (
                                    <th className="p-2 text-left bg-gray-600 text-white">{property}</th>
                                );
                            })}
                            <th className="p-2 text-left bg-gray-600 text-white">Editer</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            filterData.map(item => {
                                return (
                                    <tr className="border-2 border-gray-200 hover:bg-gray-200" onClickCapture={() => navigate(path + "/" + item.id)}>
                                        {Object.keys(item).map(property => {
                                            return (
                                                <td className="p-2 text-left">{item[property]}</td>
                                            );
                                        })}
                                        <td className="p-2 flex justify-center cursor-pointer" onClickCapture={() => navigate(path + "/Edit/" + item.id)}><Pencil /></td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            }
        </div >
    )
}