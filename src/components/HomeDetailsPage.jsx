import { Link, Outlet, useLocation } from "react-router-dom";
import { useRef, useEffect } from "react";
import { BackLink } from "./BackLink";

export const HomeDetailsPage = ({ movie }) => {
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
    <div>
      <BackLink href={backLinkRef.current ?? "/"}>Go Back!</BackLink>
      {movie && (
        <>
          <div>
            <div>
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

            <div>
              <p>{movie.original_title}</p>
              <p>Overview: {movie.overview}</p>
              <p>
                Genres: {movie.genres.map((genre) => genre.name).join(", ")}
              </p>
              <p>Vote_average: {movie.vote_average}</p>
            </div>
          </div>
          <>
            <Link to="cast">Movie cast</Link>
            <Link to="reviews">Movie reviews</Link>
          </>
          <Outlet />
        </>
      )}
    </div>
  );
};
