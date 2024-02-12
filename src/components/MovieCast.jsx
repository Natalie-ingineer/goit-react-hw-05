import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieByIdCast } from "../api";
import { ErrorMessage } from "../components/ErrorMessage/ErrorMessage";

export const MovieCast = () => {
  const { movieId } = useParams();
  const [casts, setCasts] = useState([]);

  const [error, setError] = useState(false);

  const defaultImg =
    "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

  useEffect(() => {
    if (!movieId) return;

    async function fetchData() {
      try {
        setError(false);

        const fetchedMovie = await getMovieByIdCast(movieId);
        setCasts(fetchedMovie);
      } catch (error) {
        setError(true);
      }
    }

    fetchData();
  }, [movieId]);

  return (
    <div>
      {error && <ErrorMessage />}

      {!casts.length && <p>We don't have any casts for this movie</p>}
      {casts.length > 0 && (
        <ul>
          {casts.map((cast) => (
            <li key={cast.id}>
              <div>
                <img
                  src={
                    cast.profile_path
                      ? `https://image.tmdb.org/t/p/w500${cast.profile_path}`
                      : defaultImg
                  }
                  width={250}
                  alt="poster"
                />
              </div>
              <p>{cast.known_for_department}</p>
              <p>{cast.name}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
