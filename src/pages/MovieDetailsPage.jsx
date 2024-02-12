import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { getMovieById } from "../api";
import { DetailsPage } from "../components/DetailsPage";
import { ErrorMessage } from "../components/ErrorMessage/ErrorMessage";
import { Suspense } from "react";
import { Loader } from "../components/Loader/Loader";
import { BackLink } from "../components/BackLink";
import { NavLink, Outlet } from "react-router-dom";
import css from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();
  const backLinkRef = useRef(location.state);

  useEffect(() => {
    if (!movieId) return;

    async function fetchData() {
      try {
        setError(false);
        setLoading(true);
        const fetchedMovie = await getMovieById(movieId);
        setMovie(fetchedMovie);
      } catch (error) {
        if (error.code !== "ERR_CANCELED") {
          setError(true);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [movieId]);

  return (
    <div>
      <BackLink href={backLinkRef.current ?? "/"}>Go Back!</BackLink>
      {error && <ErrorMessage />}
      {loading && <Loader />}
      <DetailsPage movie={movie} />
      <ul className={css.navlink}>
        Additional information
        <li>
          <NavLink to="cast" className={css.cast}>
            Movie cast
          </NavLink>
        </li>
        <li>
          <NavLink to="reviews" className={css.reviews}>
            Movie reviews
          </NavLink>
        </li>
      </ul>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
}
