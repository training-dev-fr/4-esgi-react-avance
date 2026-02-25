export default function ({ open, setOpen,children }) {

    return (
        <div className="modal w-screen h-screen flex justify-center items-center">
            <div className="modal-content">
                {children}
            </div>
        </div>
    )
}