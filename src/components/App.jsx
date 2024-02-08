import { NavLink, Route, Routes } from "react-router-dom";
import css from "./App.module.css";
import { clsx } from "clsx";

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export const App = () => {
  return (
    <div>
      <nav className={css.nav}>
        <NavLink className={buildLinkClass} to="/">
          Home
        </NavLink>
        <NavLink className={buildLinkClass} to="/movies">
          Movies
        </NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/movies" element={<div>Movies</div>} />
        <Route path="*" element={<div>Not found page</div>} />
      </Routes>
    </div>
  );
};

// import { useState, useEffect, useRef } from "react";
// import { SearchBar } from "./SearchBar/SearchBar";
// import { ImageGallery } from "./ImageGallery/ImageGallery";

// import { ErrorMessage } from "./ErrorMessage/ErrorMessage";
// import { LoadMoreBtn } from "./LoadMoreBtn/LoadMoreBtn";
// import { Loader } from "./Loader/Loader";
// import { Toaster } from "react-hot-toast";
// import { fetchMovie } from "../api";

// export const App = () => {
// const [query, setQuery] = useState("");
// const [page, setPage] = useState(1);
// const [articles, setArticles] = useState([]);
// const [loading, setLoading] = useState(false);
// const [error, setError] = useState(false);

// const totalPages = useRef(0);

// const searchArticles = async (newQuery) => {
//   setQuery(`${Date.now()}/${newQuery}`);
//   setPage(1);
//   setArticles([]);
//   totalPages.current = 1;
// };

// const handleLoadMore = () => {
//   setPage(page + 1);
// };

// useEffect(() => {
//   if (!query) {
//     return;
//   }

//   async function fetchData() {
//     try {
//       setError(false);
//       setLoading(true);

//       const fetchedData = await fetchMovie(query.split("/")[1], page);
//       setArticles((prevArticles) => [...prevArticles, ...fetchedData]);
//       console.log(fetchedData);
//       // totalPages.current = total_pages;
//     } catch (error) {
//       setError(true);
//     } finally {
//       setLoading(false);
//     }
//   }

//   fetchData();
// }, [query, page]);

//   return (
//     <>
//       <SearchBar onSearch={searchArticles} />
//       {error && <ErrorMessage />}
//       {articles.length > 0 && <ImageGallery items={articles} />}
//       {loading && <Loader load={loading} />}
//       {articles.length > 0 && !loading && totalPages.current > page && (
//         <LoadMoreBtn onClick={handleLoadMore} />
//       )}
//       <Toaster position="bottom-center" />
//     </>
//   );
// };
