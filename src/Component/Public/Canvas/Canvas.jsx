import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import './Canvas.css';

const Canvas = forwardRef(function Canvas({ }, ref) {
    const drawingRef = useRef(false);
    const lastPosRef = useRef({ x: 0, y: 0 });
    const ctxRef = useRef(null);
    const canvasRef = useRef(null);



    useEffect(() => {
        ctxRef.current = canvasRef.current.getContext("2d");
        const rect = canvasRef.current.getBoundingClientRect();

        canvasRef.current.width = rect.width;
        canvasRef.current.height = rect.height;
    }, []);

    function getPos(e) {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        return {
            x: clientX - rect.left,
            y: clientY - rect.top,
        };
    }

    const startDraw = (e) => {
        drawingRef.current = true;
        lastPosRef.current = getPos(e);
    }

    const draw = (e) => {
        if (!drawingRef.current) return;
        const ctx = ctxRef.current;
        if (!ctx) return;

        const { x, y } = getPos(e);
        const { x: lx, y: ly } = lastPosRef.current;

        ctx.beginPath();
        ctx.moveTo(lx, ly);
        ctx.lineTo(x, y);
        ctx.stroke();

        lastPosRef.current = { x, y };
    }

    const endDraw = () => {
        drawingRef.current = false;
    }

    const clear = () => {
        const rect = canvasRef.current.getBoundingClientRect();
        ctxRef.current.clearRect(0, 0, rect.width, rect.height)
    }

    useImperativeHandle(ref,() => ({
        clear: () => clear()
    }), []);

    return (
        <>
            <canvas className='w-full h-full' ref={canvasRef}
                onMouseDown={startDraw}
                onMouseMove={draw}
                onMouseUp={endDraw}></canvas>
        </>
    )
})

export default Canvas;