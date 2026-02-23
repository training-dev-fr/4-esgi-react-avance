import './Paint.css';
import CustomSelect from "./../../../Component/Public/CustomSelect/CustomSelect.jsx";
import { Eraser, Pen } from 'lucide-react';
import Canvas from '../../../Component/Public/Canvas/Canvas';
import { useRef } from 'react';

export default function Paint() {
    const canvasRef = useRef(null);
    return (
        <div className="paint flex flex-col ">
            <div className="menu flex border">
                <CustomSelect title="Fichier" selectOptions={[{icon: "Save", label: "Enregistrer"},{icon: "SaveAll", label: "Enregistrer sous"},{icon: "Import", label: "Importer"},{icon: "Export", label: "Exporter"}]} />
                <CustomSelect title="Edition" selectOptions={[{icon: "ZoomIn", label: "Zoomer"},{icon: "ZoomOut", label: "Dézoomer"}]} />
            </div>
            <div className="tools border">
                <button className='p-2 border'>
                    <Pen size={16} />
                </button>
                <button className='p-2 border'>
                    <Eraser size={16} onClick={() => canvasRef.current.clear()} />
                </button>
            </div>
            <div className="draw h-[calc(100vh-118px)] w-full">
                <Canvas ref={canvasRef}/>
            </div>
        </div>
    )
}