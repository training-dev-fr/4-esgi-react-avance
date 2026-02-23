import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

function StarRating({ rating }) {
    return (
        <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <svg
                    key={star}
                    className={`w-5 h-5 ${star <= Math.round(rating) ? "text-yellow-400" : "text-gray-300"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
            <span className="ml-2 text-sm text-gray-600">({rating.toFixed(2)})</span>
        </div>
    )
}

function ReviewCard({ review }) {
    return (
        <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900">{review.reviewerName}</span>
                <StarRating rating={review.rating} />
            </div>
            <p className="text-gray-700">{review.comment}</p>
            <p className="text-xs text-gray-500 mt-2">
                {new Date(review.date).toLocaleDateString("fr-FR")}
            </p>
        </div>
    )
}

export default function ProductPage() {
    const [product, setProduct] = useState({ images: [], price: 0, discountPercentage: 0, tags: [], dimensions: 0, meta: {}, reviews: [] });
    const { id } = useParams();
    const discountedPrice = product.price - (product.price * product.discountPercentage / 100)
    useEffect(() => {
        fetch(`https://dummyjson.com/products/${id}`)
            .then(result => result.json())
            .then(data => setProduct(data));
    }, [])
    return (
        <main className="max-w-6xl mx-auto px-4 py-8">
            <div className="grid md:grid-cols-2 gap-8">
                {/* Image */}
                <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-center">
                    <img
                        src={product.images[0] || "/placeholder.svg"}
                        alt={product.title}
                        className="max-h-96 object-contain"
                    />
                </div>

                {/* Infos principales */}
                <div className="flex flex-col gap-4">
                    <div>
                        <p className="text-sm text-gray-500 uppercase tracking-wide">{product.brand}</p>
                        <h1 className="text-3xl font-bold text-gray-900 mt-1">{product.title}</h1>
                    </div>
                    {product.rating &&
                        <StarRating rating={product.rating} />
                    }

                    <div className="flex items-baseline gap-3">
                        <span className="text-3xl font-bold text-gray-900">
                            {discountedPrice.toFixed(2)} €
                        </span>
                        <span className="text-lg text-gray-500 line-through">
                            {product.price.toFixed(2)} €
                        </span>
                        <span className="bg-red-100 text-red-700 text-sm font-medium px-2 py-1 rounded">
                            -{product.discountPercentage.toFixed(0)}%
                        </span>
                    </div>

                    <p className="text-gray-700">{product.description}</p>

                    <div className="flex flex-wrap gap-2">
                        {product.tags.map((tag) => (
                            <span
                                key={tag}
                                className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="flex items-center gap-2">
                        <span className={`w-3 h-3 rounded-full ${product.availabilityStatus === "In Stock" ? "bg-green-500" : "bg-red-500"}`}></span>
                        <span className="text-sm font-medium text-gray-700">{product.availabilityStatus}</span>
                        <span className="text-sm text-gray-500">({product.stock} en stock)</span>
                    </div>

                    <button className="bg-gray-900 text-white font-medium py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors mt-2">
                        Ajouter au panier
                    </button>
                </div>
            </div>

            {/* Détails */}
            <div className="mt-12 grid md:grid-cols-3 gap-6">
                <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Informations produit</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                        <li><span className="font-medium">SKU:</span> {product.sku}</li>
                        <li><span className="font-medium">Catégorie:</span> {product.category}</li>
                        <li><span className="font-medium">Poids:</span> {product.weight} g</li>
                        <li><span className="font-medium">Dimensions:</span> {product.dimensions.width} x {product.dimensions.height} x {product.dimensions.depth} cm</li>
                        <li><span className="font-medium">Code-barres:</span> {product.meta.barcode}</li>
                    </ul>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Livraison & Retours</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                        <li><span className="font-medium">Livraison:</span> {product.shippingInformation}</li>
                        <li><span className="font-medium">Garantie:</span> {product.warrantyInformation}</li>
                        <li><span className="font-medium">Retours:</span> {product.returnPolicy}</li>
                        <li><span className="font-medium">Commande minimum:</span> {product.minimumOrderQuantity} unités</li>
                    </ul>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 flex flex-col items-center justify-center">
                    <p className="text-sm text-gray-500 mb-2">QR Code produit</p>
                    <img src={product.meta.qrCode || "/placeholder.svg"} alt="QR Code" className="w-24 h-24" />
                </div>
            </div>

            {/* Avis */}
            <div className="mt-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Avis clients ({product.reviews.length})</h2>
                <div className="grid md:grid-cols-3 gap-4">
                    {product.reviews.map((review, index) => (
                        <ReviewCard key={index} review={review} />
                    ))}
                </div>
            </div>
        </main>
    )
}
