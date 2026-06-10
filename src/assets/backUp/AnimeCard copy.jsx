import { useContext, useEffect, useState } from "react";
import "../css/animeCard.css";
import { BsFillBadgeCcFill, BsFillStarFill } from "react-icons/bs";
import { AnimatePresence, motion, spring } from "motion/react";

import { IsMobileContext } from "./App";

import {
  IoPlayCircle,
  IoCheckmarkCircleSharp,
  IoHeartCircle,
  IoAddCircle,
  IoListCircleSharp,
} from "react-icons/io5";
import { createPortal } from "react-dom";
import { watchListContext } from "./WatchlistContext";
import { useNavigate } from "react-router-dom";

function AnimeCard({ animeToRender, cardVariants, detailedOrNo }) {
  let [showAdd, setShowAdd] = useState(false);
  let [showAddDetails, setShowAddDetails] = useState(false);
  let isSetTimeOut = false;
  let [addNotification, setAddNotification] = useState({
    show: false,
    message: "",
    type: "",
  });
  let { lists, updateList } = useContext(watchListContext);
  const navigate = useNavigate();

  const { isMobile, setIsMobile } = useContext(IsMobileContext);

  const [addItems, setAddItems] = useState([
    {
      item: "watching",

      icon: IoPlayCircle,
    },
    {
      item: "planToWatch",

      icon: IoListCircleSharp,
    },
    {
      item: "completed",

      icon: IoCheckmarkCircleSharp,
    },
    {
      item: "favourites",

      icon: IoHeartCircle,
    },
  ]);

  function handleAdd(item, index) {
    let currentItems;

    if (lists[item.item]) {
      currentItems = lists[item.item];
    }

    let doesCurrentItemExists = false;

    doesCurrentItemExists = currentItems?.some(
      (someItem) => someItem.id === animeToRender.id,
    );
    if (!doesCurrentItemExists) {
      updateList(
        item,
        animeToRender,
        currentItems,
        "add",
        isMobile,
        setShowAddDetails,
      );
      let tempVar = { ...addNotification };
      tempVar.type = "addedNotification";

      tempVar.message = `${animeToRender.title.romaji} has been added to ${item.item}`;

      tempVar.show = true;

      setAddNotification(tempVar);

      setTimeout(() => {
        let tempVar1 = { ...tempVar };

        tempVar1.show = false;
        setAddNotification(tempVar1);
      }, 1000);
    } else if (doesCurrentItemExists) {
      updateList(
        item,
        animeToRender,
        currentItems,
        "remove",
        isMobile,
        setShowAddDetails,
      );
      let tempVar = { ...addNotification };

      tempVar.message = `${animeToRender.title.romaji} has been removed from ${item.item}`;

      tempVar.show = true;
      tempVar.type = "removedNotification";
      setAddNotification(tempVar);

      setTimeout(() => {
        let tempVar1 = { ...tempVar };

        tempVar1.show = false;
        setAddNotification(tempVar1);
      }, 1000);
    }
  }
  return (
    <>
      {createPortal(
        <AnimatePresence>
          {addNotification.show && (
            <motion.div
              style={{
                left: "50%",
                x: "-50%", //
              }}
              className={`addNotification ${addNotification.type}`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", duration: 0.4 }}
            >
              <IoCheckmarkCircleSharp /> <h6> {addNotification.message}</h6>
            </motion.div>
          )}
        </AnimatePresence>,
        document.getElementById("root"),
      )}

      <motion.div
        layout
        variants={cardVariants}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ type: "spring", duration: 0.5 }}
        className={`aniCard ${detailedOrNo && "detailedAniCard"}`}
        onMouseEnter={() => setShowAdd(true)}
        onMouseLeave={() => setShowAdd(false)}
        whileHover={
          !detailedOrNo && {
            scale: 1.05,
            boxShadow: "0 0 25px rgba(99, 102, 241, 0.6)",
            y: -10,
          }
        }
      >
        <img
          src={animeToRender.coverImage.large}
          className="aniCardImg"
          alt=""
          onClick={() => {
            navigate(`/anime/${animeToRender.id}`);
          }}
        />

        <div
          className={`aniCardAddDiv ${detailedOrNo && "detailedCardAddDiv"}`}
          onMouseEnter={() => isMobile === "desktop" && setShowAddDetails(true)}
          onMouseLeave={() =>
            isMobile === "desktop" && setShowAddDetails(false)
          }
        >
          <motion.div
            className={`addToWhat ${detailedOrNo && "detailedCardAddToWhat"}`}
            initial={{ scale: 0, opacity: 0 }}
            animate={
              showAddDetails
                ? { scale: 1, opacity: 1 }
                : { scale: 0, opacity: 0 }
            }
            transition={{ type: "spring", duration: "0.4" }}
          >
            {addItems.map((item, index) => {
              return (
                <item.icon
                  key={index}
                  className="addToIcon"
                  size={"100%"}
                  onClick={() => handleAdd(item, index)}
                />
              );
            })}
          </motion.div>

          <motion.div
            onClick={() => {
              navigator.maxTouchPoints > 0 &&
                !window.matchMedia("(pointer: fine)").matches &&
                setShowAddDetails((prev) => !prev);
            }}
            className={`aniCardAdd ${detailedOrNo && "detailedAniCardAdd"}`}
            animate={
              navigator.maxTouchPoints > 0 &&
              !window.matchMedia("(pointer: fine)").matches
                ? { opacity: 1, scale: 1 }
                : showAdd
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0 }
            }
            transition={{ type: "spring", duration: 0.8 }}
          >
            <IoAddCircle size={"100%"} className="addIcon" />
          </motion.div>
        </div>
        {!detailedOrNo && (
          <h3 className="aniCardTitle">
            {animeToRender.title.english
              ? animeToRender.title.english
              : animeToRender.title.romaji}{" "}
          </h3>
        )}
        {!detailedOrNo && (
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
