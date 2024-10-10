import { FormEvent, useState } from "react";
import SearchIcon from "../assets/search.svg?react";

type Props = {
  onSearch: (keyword: string) => void;
};

const SearchBar = ({ onSearch }: Props) => {
  const [text, setText] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(text);
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        value={text}
        placeholder="The name of city, comma, 2-letter country code"
        onChange={(e) => setText(e.target.value)}
      />
      <button disabled={!text} className="search-icon" type="submit">
        <SearchIcon />
      </button>
    </form>
  );
};

export default SearchBar;
