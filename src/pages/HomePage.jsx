import { getTrending } from "../api";
import { useState, useEffect } from "react";
import { MovieList } from "../components/MovieList";
import { HomePageTitle } from "../components/HomePageTitle";
import { ErrorMessage } from "../components/ErrorMessage/ErrorMessage";

export default function HomePage() {
  const [trendings, setTrending] = useState([]);

  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      try {
        setError(false);

        const fetchedTrending = await getTrending({
          abortController: controller,
        });
        setTrending(fetchedTrending);
      } catch (error) {
        if (error.code !== "ERR_CANCELED") {
          setError(true);
        }
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

      {trendings.length > 0 && <MovieList items={trendings} />}
    </div>
  );
}
