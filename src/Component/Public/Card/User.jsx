export default function User({item}){
    return (
        <div className="user flex flex-col gap-2 w-full ">
            <div className="picture rounded-full w-full flex justify-center">
                <img src={item.image} alt="" />
            </div>
            <div className="content flex flex-col items-center">
                <div className="title font-bold text-xl">{item.firstName} {item.lastName}</div>
                <div className="category italic text-sm">{item.email}</div>
            </div>
        </div>
    )
}