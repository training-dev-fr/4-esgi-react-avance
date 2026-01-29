import { useEffect, useState } from 'react';
import './ProductList.css';
import ProductCard from '../../../Component/Public/ProductCard/ProductCard';

export default function ProductList() {
    const [productList, setProductList] = useState([]);

    const onScroll = (e) => {
        console.log("scrollTop :" + e.target.scrollTop)
        console.log("scrollAvailable :" + (e.target.scrollHeight - e.target.clientHeight))
        if(e.target.scrollTop +1 > e.target.scrollHeight- e.target.clientHeight){

            console.log("en bas")
        }
    }
    useEffect(() => {
        fetch("https://dummyjson.com/products/?limit=10&skip=10")
            .then(result => result.json())
            .then(data => setProductList(data.products))
    }, []);
    return (
        <div className="product-list flex flex-wrap p-4 bg-neutral-100 gap-2 h-[calc(100vh-40px)] overflow-y-auto" onScroll={onScroll}>
            {productList.map(product => <ProductCard product={product} />)}
        </div>
    )
}