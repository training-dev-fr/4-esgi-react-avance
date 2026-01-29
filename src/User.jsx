import { Link } from 'react-router';
import './User.css';

export default function User({user}){
    return (
        <Link to={`/user/${user.id}`}>
          {user.firstname}  
          {user.lastname} 
        </Link>
    )
}