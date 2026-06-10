import { motion } from "motion/react";
import { useContext, useRef, useState } from "react";
import { watchListContext } from "../WatchlistContext";
import {
  IoPlayCircle,
  IoCheckmarkCircleSharp,
  IoHeartCircle,
  IoAddCircle,
  IoListCircleSharp,
} from "react-icons/io5";
import { IsMobileContext } from "../../App";
function AnimeAdd({ animeOvrOrno, showAdd, animeToRender }) {
  const [showAddDetails, setShowAddDetails] = useState(false);
  const { isMobile, addNotification, setAddNotification } =
    useContext(IsMobileContext);
  const notificationRef = useRef(null);

  const { lists, updateList, notificationKey } = useContext(watchListContext);
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
    clearTimeout(notificationRef.current);
    notificationKey.current += 1;

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
      notificationRef.current = setTimeout(() => {
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

      notificationRef.current = setTimeout(() => {
        let tempVar1 = { ...tempVar };

        tempVar1.show = false;
        setAddNotification(tempVar1);
      }, 1000);
    }
  }
  return (
    <div
      className={animeOvrOrno ? "aniOvrAddDiv" : `aniCardAddDiv`}
      onMouseEnter={() => isMobile === "desktop" && setShowAddDetails(true)}
      onMouseLeave={() => isMobile === "desktop" && setShowAddDetails(false)}
    >
      <motion.div
        className={animeOvrOrno ? "ovrAddToWhat" : `addToWhat`}
        initial={{ scale: 0, opacity: 0 }}
        animate={
          showAddDetails ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }
        }
        transition={{ type: "spring", duration: "0.4" }}
      >
        {addItems.map((item, index) => {
          return (
            <button
              className="iconButtons"
              key={index}
              tabIndex={!showAddDetails ? -1 : undefined}
            >
              <item.icon
                className={animeOvrOrno ? "ovrAddToIcon" : `addToIcon`}
                size={"100%"}
                onClick={() => handleAdd(item, index)}
              />
            </button>
          );
        })}
      </motion.div>

      <motion.div
        onClick={() => {
          navigator.maxTouchPoints > 0 &&
            !window.matchMedia("(pointer: fine)").matches &&
            setShowAddDetails((prev) => !prev);
        }}
        className={animeOvrOrno ? "aniOvrAdd" : `aniCardAdd`}
        animate={
          (navigator.maxTouchPoints > 0 &&
            !window.matchMedia("(pointer: fine)").matches) ||
          animeOvrOrno
            ? { opacity: 1, scale: 1 }
            : showAdd
              ? { opacity: 1, scale: 1 }
              : { opacity: 0, scale: 0 }
        }
        transition={{ type: "spring", duration: 0.8 }}
      >
        <button className="iconButtons" tabIndex={!showAdd ? -1 : undefined}>
          <IoAddCircle size={"100%"} className="addIcon" />
        </button>
      </motion.div>
    </div>
  );
}
export default AnimeAdd;
