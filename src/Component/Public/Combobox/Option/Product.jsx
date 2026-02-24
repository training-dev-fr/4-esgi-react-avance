export default function Product({ item }) {
    return (
        <div className="product flex gap-2">
            <div className="picture rounded-full w-16">
                <img src={item.images[0]} alt="" />
            </div>
            <div className="content">
                <div className="title font-bold text-xl">{item.title}</div>
                <div className="category italic">{item.category}</div>
            </div>
        </div>
    )
}