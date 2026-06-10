import { TbServerOff } from "react-icons/tb";
import { motion } from "motion/react";
import "../assets/css/error.css";
function ErrorComponent({ Error, isSearchOrNo, querry, retryFetch }) {
  return (
    <div className="errorWrapper">
      <div className="errorBox">
        <TbServerOff className="errorIcon" size={"25%"} />

        <h4>Something Went Wrong </h4>
        <p>
          {!isSearchOrNo
            ? "We couldn't load this page. Please try refreshing or come back later."
            : `Couldn't find results for ${querry}`}
        </p>

        <motion.button
          onClick={() => {
            isSearchOrNo ? retryFetch() : window.location.reload();
          }}
          whileHover={{ scale: "1.1", y: "-3px" }}
          transition={{ type: "spring", duration: 0.2 }}
          className="refreshPageBtn"
        >
          {isSearchOrNo ? "Retry" : "Refresh Page"}
        </motion.button>
      </div>
    </div>
  );
}
export default ErrorComponent;
