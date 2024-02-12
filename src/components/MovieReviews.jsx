import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { getMovieByIdReviews } from "../api";

export const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (!movieId) return;

    async function fetchData() {
      try {
        const fetchedMovie = await getMovieByIdReviews(movieId);
        setReviews(fetchedMovie);
      } catch (error) {}
    }
    fetchData();
  }, [movieId]);

  return (
    <div>
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
