import '../assets/scss/deatilspage.scss'
import { LoadingScreen } from '../components';
import { Config } from '../Config';
import { useEffect, useState } from 'react';

import { Link, useParams } from 'react-router-dom';


interface CharacterDetail {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}
const Detail = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState<CharacterDetail>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    // Fetch data for the selected character
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${Config?.URL_API}character/${id}`
        );
              const data = await response.json();
      setLoading(false);

        setCharacter(data);
      } catch (error: unknown) {
        setError((error as any)?.message);
        // Handle errors here
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <LoadingScreen />;
  }
  if (error) {
    return <p>{error}</p>;
  }

  if (!character?.id && !loading) {
    return <p>No character found</p>;
  }

  return (
    <div className="character-detail">
      Detail Page
    <img className="character-image" src={character?.image} alt={character?.name} />
    <h2 className="character-name">
      name:<b>{character?.name}</b>
        </h2>
    <p className="character-status">Status: {character?.status}</p>
    <p className="character-species">Species: {character?.species}</p>
    {character?.type && (
      <p className="character-type">Type: {character?.type}</p>
    )}
    <p className="character-gender">Gender: {character?.gender}</p>
    <p className="character-origin">Origin: {character?.origin?.name}</p>
    <p className="character-location">Location: {character?.location?.name}</p>
    {/*  link for  usr */}

    <Link to={`/detail/${character?.id}`} className="character-link">
   {character?.url}
    </Link>
    <p className="character-created">Created: {
      new Date(character?.created).toLocaleDateString()
    }</p>
    <ul className="episode-list">
      {character?.episode?.map((ep, index) => (
        <li key={index} className="episode-item">
          <a href={ep} target="_blank" rel="noopener noreferrer" className="episode-link">
            Episode {index + 1}
          </a>
        </li>
      ))}
    </ul>
  </div>
  );
};

export default Detail;
