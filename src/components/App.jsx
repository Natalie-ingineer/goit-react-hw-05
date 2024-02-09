import { Route, Routes } from "react-router-dom";

import { NavBar } from "./NavBar";
import MoviePage from "../pages/MoviePage";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import MovieDetailsPage from "../pages/MovieDetailsPage";

export const App = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviePage />} />
        <Route path="/movie/:movieId" element={<MovieDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
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
