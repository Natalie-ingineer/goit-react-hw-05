import { NavLink } from "react-router-dom";
import { HiArrowUturnUp } from "react-icons/hi2";
import css from "./BackLink.module.css";

export const BackLink = ({ href, children }) => {
  return (
    <NavLink className={css.backLink} to={href} type="button">
      {<HiArrowUturnUp />}
      {children}
    </NavLink>
  );
};
