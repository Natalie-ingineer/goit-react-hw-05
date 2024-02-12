import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getMovieById } from "../api";
import { DetailsPage } from "../components/DetailsPage";
import { ErrorMessage } from "../components/ErrorMessage/ErrorMessage";
import { Loader } from "../components/Loader/Loader";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

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
      {error && <ErrorMessage />}
      {loading && <Loader load={loading} />}
      <DetailsPage movie={movie} />
    </div>
  );
}
