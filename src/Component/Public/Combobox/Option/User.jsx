export default function User({ item }) {
    return (
        <div className="product flex gap-2">
            <div className="picture rounded-full w-16">
                <img src={item.image} alt="" />
            </div>
            <div className="content">
                <div className="title font-bold text-xl">{item.firstName} {item.lastName}</div>
                <div className="category italic">{item.email}</div>
            </div>
        </div>
    )
}