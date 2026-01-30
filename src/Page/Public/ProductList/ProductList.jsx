import { useEffect, useState } from 'react';
import './ProductList.css';
import ProductCard from '../../../Component/Public/ProductCard/ProductCard';

export default function ProductList() {
    const [productList, setProductList] = useState([]);
    const [skip, setSkip] = useState(0);
    const [loading, setLoading] = useState(false);

    const onScroll = (e) => {
        if (loading) {
            return;
        }
        console.log("scrollTop :" + e.target.scrollTop)
        console.log("scrollAvailable :" + (e.target.scrollHeight - e.target.clientHeight))
        if (e.target.scrollTop + 1 >= e.target.scrollHeight - e.target.clientHeight) {
            setSkip(skip + 10)
        }
    }

    useEffect(() => {
        setLoading(true);
            fetch(`https://dummyjson.com/products/?limit=10&skip=${skip}`)
                .then(result => result.json())
                .then(data => {
                    setLoading(false);
                    setProductList([...productList, ...data.products])
                })
    }, [skip]);

    return (
        <div className="product-list flex flex-wrap p-4 bg-neutral-100 gap-2 h-[calc(100vh-40px)] overflow-y-auto" onScroll={onScroll}>
            {productList.map(product => <ProductCard product={product} key={product.id}/>)}
            {loading &&
                <>
                    <div className="loading w-[calc(20%-0.5rem)] h-50 bg-neutral-200"></div>
                    <div className="loading w-[calc(20%-0.5rem)] h-50 bg-neutral-200"></div>
                    <div className="loading w-[calc(20%-0.5rem)] h-50 bg-neutral-200"></div>
                    <div className="loading w-[calc(20%-0.5rem)] h-50 bg-neutral-200"></div>
                    <div className="loading w-[calc(20%-0.5rem)] h-50 bg-neutral-200"></div>
                </>
            }
        </div>
    )
}