import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getMovieByIdReviews } from "../api";
import { ErrorMessage } from "../components/ErrorMessage/ErrorMessage";
import { Loader } from "../components/Loader/Loader";

export const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!movieId) return;

    async function fetchData() {
      try {
        setError(false);
        setLoading(true);
        const fetchedMovie = await getMovieByIdReviews(movieId);
        setReviews(fetchedMovie);
      } catch (error) {
        setError(true);
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
      {!reviews.length && <p>We don't have any reviews for this movie</p>}
      {reviews.length > 0 && (
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <div>
                <p>{review.content}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
