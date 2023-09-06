import { Character } from 'page/listing';
import { Link } from 'react-router-dom';
import '../assets/scss/listItem.scss'
const ItemList = ({ id, image, name, status }: Character) => {
  const statusClassName = status === 'Alive' ? 'alive' : 'dead';

  return (
    <li key={id}>
      <Link to={`/detail/${id}`}>
        <img src={image} alt={name} loading='lazy' />
        <p>{name}</p>
        <p className={statusClassName}>{status}</p>
      </Link>
    </li>
  );
};

export  {ItemList};
