import { useState, useEffect } from "react";
import { SearchMovies } from "../components/SearchMovies";
import { useSearchParams } from "react-router-dom";
import { MovieList } from "../components/MovieList";
import { getMovieBySearch } from "../api";

export default function MoviesPage() {
  const [movieDatas, setMovieDatas] = useState([]);
  const [error, setError] = useState(false);

  const [params, setParams] = useSearchParams();
  const searchMovies = params.get("searchMovies") ?? "";
  // console.log(searchMovies);

  const changeSearch = (newSearchMovies) => {
    params.set("searchMovies", newSearchMovies);
    console.log(params);
    setParams(params);
  };

  const handleSubmit = (value) => {
    setParams({ query: value });
  };

  useEffect(() => {
    const controller = new AbortController();

    if (!movieDatas) {
      return;
    }
    async function fetchData() {
      try {
        const fetchedTrending = await getMovieBySearch({
          movieDatas,
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
  }, []);

  const searchedMovies = movieDatas.filter((movieData) =>
    movieData.description.toLowerCase().includes(searchMovies.toLowerCase())
  );
  console.log(searchedMovies);
  // console.log();

  return (
    <div>
      {error && <p>Oops!Error!🤷‍♀️</p>}
      <SearchMovies
        value={searchMovies}
        onChange={changeSearch}
        onSubmit={handleSubmit}
      />
      {searchMovies.length > 0 && <MovieList items={searchedMovies} />}
    </div>
  );
}
