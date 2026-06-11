import AnimeCard from "./AnimeCard";
import "../../assets/css/animeRow.css";

import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";
const rowVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function AnimeRow({ rowNameDetails, animeRowToRender, isRecomendation }) {
  return (
    <div className="rowWrapper">
      {rowNameDetails.status && (
        <div className="rowTitle">
          <h4> {rowNameDetails.name}</h4>
        </div>
      )}
      <motion.div
        className={`trendingBox animeCardRow ${isRecomendation && "recomendationRow"}`}
        variants={rowVariants}
        initial={"hidden"}
        animate={"visible"}
      >
        <AnimatePresence>
          {animeRowToRender.map((item, index) => {
            return (
              <AnimeCard
                key={item.id}
                animeToRender={item}
                cardVariants={cardVariants}
                isRecomendation={isRecomendation}
              />
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
export default AnimeRow;
