import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div>
      <h1>Oops, not found this page 🙃</h1>
      <Link to="/">Back to home page</Link>
    </div>
  );
}
