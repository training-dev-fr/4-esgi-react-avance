import { useParams } from 'react-router';
import './UserDetail.css';

export default function UserDetail(){
    const {id} = useParams();
    return (
        <>
            {id}
        </>
    )
}