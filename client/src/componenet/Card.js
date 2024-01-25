import { Link } from 'react-router-dom';
import './Card.css';

export default function Card({heading, link}) {
  return (
    <Link to={link} className='Card flex link'>
        <h3>{heading}</h3>
    </Link>
  )
}
