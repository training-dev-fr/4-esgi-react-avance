import { Link } from 'react-router';
import './ProductCard.css';

export default function ProductCard({ product }) {
    return (
        <Link to={`/Product/${product.id}`} className="product w-[calc(20%-0.5rem)] bg-white p-4 rounded-md shadow-md flex flex-col">
            <div className="picture">
                <img src={product.thumbnail} />
            </div>
            <div className="title text-center h-[60px]">{product.title}</div>
            <div className="price text-right">{product.price} €</div>
        </Link>
    )
}