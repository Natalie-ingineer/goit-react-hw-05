import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { getMovieById } from "../api";
import { DetailsPage } from "../components/DetailsPage";
import { ErrorMessage } from "../components/ErrorMessage/ErrorMessage";
import { Loader } from "../components/Loader/Loader";
import { BackLink } from "../components/BackLink";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();
  console.log(location);
  const backLinkRef = useRef(location.state?.from || "/");
  // console.log(backLinkRef.current);

  useEffect(() => {
    backLinkRef.current = location.state || "/";

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
  }, [movieId, location.state]);

  return (
    <div>
      <BackLink href={backLinkRef.current}>Go Back!</BackLink>
      {error && <ErrorMessage />}
      {loading && <Loader load={loading} />}
      <DetailsPage movie={movie} />
    </div>
  );
}
