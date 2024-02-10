// import { useState, useEffect } from "react";
// import { SearchMovies } from "../components/SearchMovies";
// import { useSearchParams } from "react-router-dom";
// import { MovieList } from "../components/MovieList";
// import { getMovieBySearch } from "../api";

// export default function MoviesPage() {
//   const [movieDatas, setMovieDatas] = useState([]);
//   const [error, setError] = useState(false);

//   const [params, setParams] = useSearchParams();
//   const searchMovies = params.get("query") ?? "";
//   // console.log(searchMovies);

//   // const changeSearch = (newSearchMovies) => {
//   //   params.set("query", newSearchMovies);
//   //   console.log(params);
//   //   setParams(params);
//   // };

//   useEffect(() => {
//     const controller = new AbortController();

//     if (!searchMovies) {
//       return;
//     }
//     async function fetchData() {
//       try {
//         const fetchedTrending = await getMovieBySearch({
//           searchMovies,
//           abortController: controller,
//         });
//         setMovieDatas(fetchedTrending);
//       } catch (error) {
//         if (error.code !== "ERR_CANCELED") {
//           setError(true);
//         }
//       }
//     }
//     fetchData();

//     return () => {
//       controller.abort();
//     };
//   }, [searchMovies]);

//   const handleSubmit = (value) => {
//     setParams({ query: value });
//   };

//   // const searchedMovies = movieDatas.filter((movieData) =>
//   //   movieData.description.toLowerCase().includes(searchMovies.toLowerCase())
//   // );
//   // console.log(searchedMovies);
//   // console.log(movieDatas);

//   return (
//     <div>
//       {error && <p>Oops!Error!🤷‍♀️</p>}
//       <SearchMovies
//         // value={searchMovies}
//         // onChange={changeSearch}
//         onSubmit={handleSubmit}
//       />
//       {searchMovies.length > 0 && <MovieList items={movieDatas} />}
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { SearchBar } from "../components/SearchBar/SearchBar";
import { useSearchParams } from "react-router-dom";
import { MovieList } from "../components/MovieList";
import { getMovieBySearch } from "../api";

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
      {error && <p>Oops!Error!🤷‍♀️</p>}
      <SearchBar onSearch={handleSubmit} />
      {searchMovies.length > 0 && <MovieList items={movieDatas} />}
    </div>
  );
}
