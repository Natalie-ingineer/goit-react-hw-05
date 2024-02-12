import { useState, useEffect } from "react";
import { SearchBar } from "../components/SearchBar/SearchBar";
import { useSearchParams } from "react-router-dom";
import { MovieList } from "../components/MovieList";
import { getMovieBySearch } from "../api";
import { ErrorMessage } from "../components/ErrorMessage/ErrorMessage";
import { Loader } from "../components/Loader/Loader";

export default function MoviesPage() {
  const [movieDatas, setMovieDatas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [params, setParams] = useSearchParams();
  const searchMovies = params.get("query") ?? "";

  useEffect(() => {
    const controller = new AbortController();

    if (!searchMovies) {
      return;
    }

    async function fetchData() {
      try {
        setError(false);
        setLoading(true);
        const fetchedTrending = await getMovieBySearch({
          searchMovies,
          abortController: controller,
        });
        setMovieDatas(fetchedTrending);
      } catch (error) {
        if (error.code !== "ERR_CANCELED") {
          setError(true);
        }
      } finally {
        setLoading(false);
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
      {loading && <Loader />}
      <SearchBar onSearch={handleSubmit} />
      {searchMovies.length > 0 && <MovieList items={movieDatas} />}
    </div>
  );
}
