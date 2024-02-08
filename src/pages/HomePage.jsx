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
        setTrending((prevTrendind) => [...prevTrendind], ...fetchedTrending);
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

  console.log(trendings);
  console.log(setTrending);
  return (
    <div>
      <h1>Trending movies today</h1>
      {error && <p>Oops! ERROR!</p>}
      {trendings.length > 0 && (
        <ul>
          {trendings.map((trending) => (
            <li key={trending.id}>
              <a href="" target="_blank" rel="noreferrer noopener">
                {trending[0].title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
