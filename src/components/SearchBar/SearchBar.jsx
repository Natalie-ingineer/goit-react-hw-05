import css from "./SearchBar.module.css";
import { useId } from "react";
import toast from "react-hot-toast";

export const SearchBar = ({ onSearch }) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (evt.target.elements.query.value.trim() === "") {
      toast.error("EMPTY STRING!");
      return;
    }

    onSearch(evt.target.elements.query.value);
    evt.target.reset();
  };
  // const usernameFieldIdsearch = useId();
  return (
    <header>
      <form onSubmit={handleSubmit}>
        <input
          name="query"
          type="text"
          // autocomplete="off"
          // autofocus
          placeholder="Search movie"
        />
        <button type="submit" className={css.button}>
          Search
        </button>
      </form>
    </header>
  );
};
