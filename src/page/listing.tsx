import { Config } from "../Config";
import { useState, useEffect, useCallback, ChangeEvent } from "react";
import "../assets/scss/lists.scss";
import {ItemList,LoadingScreen} from "../components";

// Define the Character type
export interface Character {
  id: number;
  name: string;
  image: string;
  status: string;
  // Add more character properties as needed
}

// Define a debounce function type
type DebounceFunction = (...args: unknown[]) => void;

// Define the debounce function
const debounce = (func: DebounceFunction, wait: number) => {
  let timeout: NodeJS.Timeout | null;

  return function executedFunction(...args: unknown[]) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    clearTimeout(timeout as NodeJS.Timeout);
    timeout = setTimeout(later, wait);
  };
};

const Listing = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("name");
  const [loading, setLoading] = useState<boolean>(false);

  // Define fetchData as an async function
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${Config?.URL_API}character?name=${searchTerm}&order=${sortBy}`
      );
      const data = await response.json();
      setLoading(false);
      setCharacters(data.results);
    } catch (error) {
      console.error(error);
    }
  }, [searchTerm, sortBy]);

 



  useEffect(() => {
 debounce(fetchData, 500)();
  },
     [fetchData]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchTerm(value);
  };

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setSortBy(value);
  };

  return (
    <div className="listing-container">
      <h1 className="listing-header">Technical Challenge</h1>
      <div className="listing-input-container">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="listing-input"
        />
        <select
          value={sortBy}
          onChange={handleSortChange}
          className="listing-select"
        >
          <option value="name">Sort by Name</option>
          <option value="status">Sort by Status</option>
        </select>
      </div>

      {loading ? (
        <LoadingScreen isPage={false} />
      ) : (
        <ul className="listing-list">
          {characters?.map((character) => (
            <ItemList key={character.id} {...character} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Listing;
