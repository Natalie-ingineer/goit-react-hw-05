import { getTrending } from "../api";
import { useState, useEffect } from "react";
import { MovieList } from "../components/MovieList";
import { HomePageTitle } from "../components/HomePageTitle";
import { ErrorMessage } from "../components/ErrorMessage/ErrorMessage";
import { Loader } from "../components/Loader/Loader";

export default function HomePage() {
  const [trendings, setTrending] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      try {
        setError(false);
        setLoading(true);
        const fetchedTrending = await getTrending({
          abortController: controller,
        });
        setTrending(fetchedTrending);
      } catch (error) {
        if (error.code !== "ERR_CANCELED") {
          setError(true);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div>
      <HomePageTitle>Trending today</HomePageTitle>
      {error && <ErrorMessage />}
      {loading && <Loader />}
      {trendings.length > 0 && <MovieList items={trendings} />}
    </div>
  );
}
