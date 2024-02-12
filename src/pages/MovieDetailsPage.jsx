import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getMovieById } from "../api";
import { DetailsPage } from "../components/DetailsPage";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    if (!movieId) return;

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
      <DetailsPage movie={movie} />
    </div>
  );
}
