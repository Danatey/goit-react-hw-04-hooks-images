import Loader from "react-loader-spinner";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const LoaderComp = () => (
  <button className="Loader" variant="primary" disabled>
    <Loader
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000} //3 secs
      />
  </button>
);

export default LoaderComp;