import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useRef, useEffect } from "react";
import { BackLink } from "./BackLink";
import css from "./DetailsPage.module.css";

export const DetailsPage = ({ movie }) => {
  const location = useLocation("/movies");
  console.log(location);
  const backLinkRef = useRef("");

  useEffect(() => {
    backLinkRef.current = location.state || "/";
  }, [location.state]);

  console.log(backLinkRef.current);

  const defaultImg =
    "https://ireland.apollo.olxcdn.com/v1/files/0iq0gb9ppip8-UA/image;s=1000x700";

  return (
    <div className={css.wraperPage}>
      <BackLink href={backLinkRef.current ?? "/"}>Go Back!</BackLink>
      {movie && (
        <>
          <div className={css.wraper}>
            <div className={css.wrapImg}>
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : defaultImg
                }
                width={250}
                alt="poster"
              />
            </div>

            <div className={css.wrapDescriptions}>
              <p className={css.titleMovie}>{movie.original_title}</p>
              <span>Overview</span>
              <p className={css.overview}>{movie.overview}</p>
              <span> Genres</span>
              <p className={css.genres}>
                {movie.genres.map((genre) => genre.name).join(", ")}
              </p>
            </div>
          </div>

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

          <Outlet />
        </>
      )}
    </div>
  );
};
