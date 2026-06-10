import "../assets/css/watchListSearch.css";
import { motion } from "motion/react";
function WatchListSearch({
  watchlistQuerry,
  setWatchListQuerry,
  currentWatchList,
}) {
  return (
    <div className="watchListSearchWrapper">
      <motion.input
        value={watchlistQuerry}
        className="darkBG watchListSearchInp"
        whileHover={{ border: "1px solid #bf6ef8" }}
        whileFocus={{ border: "1px solid #bf6ef8", scale: 1.1 }}
        transition={{ duration: 0.3, type: "spring" }}
        onChange={(e) => {
          setWatchListQuerry(e.target.value);
        }}
        placeholder={`Search ${currentWatchList}`}
      />
    </div>
  );
}
export default WatchListSearch;
