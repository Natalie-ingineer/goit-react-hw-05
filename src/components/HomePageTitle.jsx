import css from "./HomePageTitle.module.css";

export const HomePageTitle = ({ children }) => {
  return <div className={css.pageTitle}>{children}</div>;
};
