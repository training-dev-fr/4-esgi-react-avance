import { useAuth } from '../../../Context/auth.context';
import './Home.css';

export default function Home() {
    const { setAuth, logout, user } = useAuth();
    return (
        <>
            {!user &&
                <button onClick={() => setAuth({ id: 1, mail: "avaast@myges.fr" })}>Log in</button>
            }
            {user &&
                <button onClick={() => logout()}>Log out</button>
            }
        </>
    )
}