import { DNA } from "react-loader-spinner";

export const Loader = ({ load }) => {
  return (
    <div>
      <DNA
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    </div>
  );
};
