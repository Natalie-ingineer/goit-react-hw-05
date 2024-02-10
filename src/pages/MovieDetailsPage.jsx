import { Link, Outlet, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getMovieById } from "../api";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  const defaultImg =
    "https://ireland.apollo.olxcdn.com/v1/files/0iq0gb9ppip8-UA/image;s=1000x700";

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedMovie = await getMovieById(movieId);
        setMovie(fetchedMovie);
      } catch (error) {}
    }
    fetchData();
  }, [movieId]);

  return (
    <div>
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
}
