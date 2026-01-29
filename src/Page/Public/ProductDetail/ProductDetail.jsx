import { useEffect, useState } from 'react';
import './ProductDetail.css';

export default function ProductDetail(){
    const [productList, setProductList] = useState([]);
    useEffect(() => {
        fetch("https://dummyjson.com/products/?limit=10/")
        .then(result => result.json())
        .then(data => setProductList(data))
    },[]);
    return (
        <>
            
        </>
    )
}