import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getMovieByIdReviews } from "../api";
import { ErrorMessage } from "../components/ErrorMessage/ErrorMessage";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  const [error, setError] = useState(false);

  useEffect(() => {
    if (!movieId) return;

    async function fetchData() {
      try {
        setError(false);

        const fetchedMovie = await getMovieByIdReviews(movieId);
        setReviews(fetchedMovie);
      } catch (error) {
        setError(true);
      }
    }

    fetchData();
  }, [movieId]);

  return (
    <div>
      {error && <ErrorMessage />}

      {!reviews.length && <p>We do not have any reviews for this movie</p>}
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
}
