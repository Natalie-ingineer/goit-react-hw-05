import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { getMovieById } from "../api";
import { DetailsPage } from "../components/DetailsPage";
import { ErrorMessage } from "../components/ErrorMessage/ErrorMessage";

import { BackLink } from "../components/BackLink";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  const [error, setError] = useState(false);
  const location = useLocation();
  const backLinkRef = useRef(location.state);

  useEffect(() => {
    if (!movieId) return;

    async function fetchData() {
      try {
        setError(false);

        const fetchedMovie = await getMovieById(movieId);
        setMovie(fetchedMovie);
      } catch (error) {
        if (error.code !== "ERR_CANCELED") {
          setError(true);
        }
      }
    }

    fetchData();
  }, [movieId]);

  return (
    <div>
      <BackLink href={backLinkRef.current ?? "/"}>Go Back!</BackLink>
      {error && <ErrorMessage />}

      <DetailsPage movie={movie} />
    </div>
  );
}
