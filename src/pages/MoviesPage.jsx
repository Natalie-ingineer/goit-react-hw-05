import { useState, useEffect } from "react";
import { SearchBar } from "../components/SearchBar/SearchBar";
import { useSearchParams } from "react-router-dom";
import { MovieList } from "../components/MovieList";
import { getMovieBySearch } from "../api";
import { ErrorMessage } from "../components/ErrorMessage/ErrorMessage";

export default function MoviesPage() {
  const [movieDatas, setMovieDatas] = useState([]);

  const [error, setError] = useState(false);

  const [params, setParams] = useSearchParams();
  const searchMovies = params.get("query") ?? "";

  useEffect(() => {
    const controller = new AbortController();

    if (!searchMovies) {
      return;
    }
    console.log(searchMovies);
    async function fetchData() {
      try {
        setError(false);

        const fetchedTrending = await getMovieBySearch({
          searchMovies,
          abortController: controller,
        });
        setMovieDatas(fetchedTrending);
      } catch (error) {
        if (error.code !== "ERR_CANCELED") {
          setError(true);
        }
      }
    }
    fetchData();

    return () => {
      controller.abort();
    };
  }, [searchMovies]);

  const handleSubmit = (value) => {
    setParams({ query: value });
  };

  return (
    <div>
      {error && <ErrorMessage />}

      <SearchBar onSearch={handleSubmit} />
      {searchMovies.length > 0 && <MovieList items={movieDatas} />}
    </div>
  );
}
