import css from "./Loader.module.css";
import { FidgetSpinner } from "react-loader-spinner";

export const Loader = ({ load }) => {
  return (
    <div>
      <FidgetSpinner
        visible={true}
        height="80"
        width="80"
        ariaLabel="fidget-spinner-loading"
        wrapperStyle={{}}
        wrapperClass="fidget-spinner-wrapper"
      />
    </div>
  );
};
