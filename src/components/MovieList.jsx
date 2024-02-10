import { Link } from "react-router-dom";

export const MovieList = ({ items }) => {
  return (
    <div>
      <ul>
        {items.map(({ id, title, backdrop_path }) => (
          <li key={id}>
            <Link to={`/movie/${id}`}>
              {title}
              {/* <img
                  // src={`https://image.tmdb.org/t/p/w500${backdrop_path}`}
                  alt={title}
                ></img> */}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
