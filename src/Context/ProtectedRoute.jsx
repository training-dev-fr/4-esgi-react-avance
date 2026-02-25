import { Outlet, useNavigate } from "react-router";
import { useAuth } from "./auth.context"

export default ProtectedRoute = ({roles}) => {
    const {user} = useAuth();
    const navigate = useNavigate();

    if(!user){
        navigate("/Login");
    }

    const hasRole = roles.some(r => user.roles?.some(role => role.code === r));
    if(!hasRole){
        navigate("/Page403");
    }

    return <Outlet/>
}