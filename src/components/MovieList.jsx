import { Link, useLocation } from "react-router-dom";

export const MovieList = ({ items }) => {
  const location = useLocation();
  console.log(location);
  return (
    <div>
      <ul>
        {items.map(({ id, title, backdrop_path }) => (
          <li key={id}>
            <Link
              to={`/movie/${id}`}
              state={location}
              src={`https://image.tmdb.org/t/p/w500${backdrop_path}`}
            >
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
