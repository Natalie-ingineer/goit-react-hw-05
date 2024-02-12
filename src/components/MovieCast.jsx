import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieByIdCast } from "../api";

export const MovieCast = () => {
  const { movieId } = useParams();
  const [casts, setCasts] = useState([]);

  const defaultImg =
    "https://ireland.apollo.olxcdn.com/v1/files/0iq0gb9ppip8-UA/image;s=1000x700";

  useEffect(() => {
    if (!movieId) return;

    async function fetchData() {
      try {
        const fetchedMovie = await getMovieByIdCast(movieId);
        setCasts(fetchedMovie);
      } catch (error) {}
    }
    fetchData();
  }, [movieId]);

  return (
    <div>
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
