import { Link } from "react-router-dom";
import { getTrending } from "../api";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [trendings, setTrending] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      try {
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
      <h1>Trending today</h1>
      {error && <p>Oops! ERROR!</p>}
      {trendings.length > 0 && (
        <ul>
          {trendings.map(({ id, title, backdrop_path }) => (
            <li key={id}>
              <Link href={`https://image.tmdb.org/t/p/w500${backdrop_path}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${backdrop_path}`}
                  alt={title}
                ></img>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

{
  /* <img src={`https://image.tmdb.org/t/p/w500${backdrop_path}`} alt={title}></img>; */
}
