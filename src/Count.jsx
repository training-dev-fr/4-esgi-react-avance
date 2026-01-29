import { useState } from 'react';
import './Count.css';
import { useEffect } from 'react';

export default function Count(){
    const [count, setCount] = useState(0);
    useEffect(() => {
        console.log(count);
    },[count]);
    return (
        <>
            <button onClick={() => {
                setCount(count +1)
            }}>{count}</button>
        </>
    )
}