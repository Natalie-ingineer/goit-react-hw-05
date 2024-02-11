import { NavLink } from "react-router-dom";
import css from "./BackLink.module.css";

export const BackLink = ({ href, children }) => {
  return (
    <NavLink className={css.backLink} to={href} type="button">
      {children}
    </NavLink>
  );
};
