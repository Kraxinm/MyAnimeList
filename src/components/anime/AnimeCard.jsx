import { useContext, useState } from "react";
import "../../assets/css/animeCard.css";
import { BsFillBadgeCcFill, BsFillStarFill } from "react-icons/bs";
import { motion } from "motion/react";

import { IsMobileContext } from "../../App";

import { watchListContext } from "../WatchlistContext";
import { useNavigate } from "react-router-dom";
import AnimeCardNotification from "./AnimeCardNotification";

import AnimeAdd from "./AnimeAdd";

function AnimeCard({ animeToRender, cardVariants, isRecomendation }) {
  let [showAdd, setShowAdd] = useState(false);

  const { lists, updateList, notificationKey } = useContext(watchListContext);
  const navigate = useNavigate();

  const { isMobile } = useContext(IsMobileContext);

  return (
    <>
      <AnimeCardNotification key={notificationKey.current} />
      <motion.div
        tabIndex={0}
        layout
        variants={cardVariants}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ type: "spring", duration: 0.5 }}
        whileFocus={{
          scale: 1.05,
          boxShadow: "0 0 25px rgba(99, 102, 241, 0.6)",
          y: -10,
        }}
        className={`aniCard`}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            navigate(`/anime/${animeToRender.id}`);
          }
        }}
        onMouseEnter={() => setShowAdd(true)}
        onMouseLeave={() => setShowAdd(false)}
        whileHover={{
          scale: 1.05,
          boxShadow: "0 0 25px rgba(99, 102, 241, 0.6)",
          y: -10,
        }}
      >
        <img
          src={animeToRender?.coverImage?.large}
          className="aniCardImg"
          alt={animeToRender.title.english || animeToRender.title.romaji}
          onClick={() => {
            navigate(`/anime/${animeToRender.id}`);
          }}
        />
        <AnimeAdd showAdd={showAdd} animeToRender={animeToRender} />

        {
          <h3 className="aniCardTitle">
            {animeToRender.title.english
              ? animeToRender.title.english
              : animeToRender.title.romaji}
          </h3>
        }
        {!isRecomendation && (
          <div className="aniCardOvr">
            <span>{animeToRender.format ? animeToRender.format : "N/A"}</span>
            <span>
              {animeToRender.seasonYear ? animeToRender.seasonYear : "N/A"}
            </span>
            <span>
              {" "}
              <BsFillBadgeCcFill />{" "}
              {animeToRender.episodes ? animeToRender.episodes : "N/A"}
            </span>
            <span>
              {" "}
              <BsFillStarFill />{" "}
              {animeToRender.averageScore ? animeToRender.averageScore : "N/A"}
            </span>
          </div>
        )}
      </motion.div>
    </>
  );
}
export default AnimeCard;
