import { NavLink, Outlet } from 'react-router';
import './Layout.css';
import { Home } from 'lucide-react';

export default function Layout() {
    return (
        <>
            <nav className='bg-neutral-700 flex text-white h-10'>
                <NavLink to="/" className="p-2 hover:bg-blue-500"><Home /></NavLink>
                <NavLink to="/Product" className="p-2 hover:bg-blue-500">Product</NavLink>
                <NavLink to="/Cart" className="p-2 hover:bg-blue-500">Cart</NavLink>
            </nav>
                <Outlet />
        </>
    )
}