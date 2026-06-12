import { createContext, useRef, useState } from "react";
import removeAnimeFromPrevList from "./removeAnimeFromPrevLIst";

export let watchListContext = createContext();

function WatchListConext({ children }) {
  const notificationKey = useRef(0);
  function updateList(
    item,
    animeToRender,
    currentItems,
    addOrRemove,
    isMobile,
    setShowAddDetails,
  ) {
    let dupedList = { ...lists };
    if (addOrRemove === "add") {
      removeAnimeFromPrevList({
        animeToRender: animeToRender,
        item: item,
        dupedLists: dupedList,
      });
      if (currentItems.length > 0) {
        localStorage.setItem(
          `${item.item}`,
          JSON.stringify([...currentItems, animeToRender]),
        );
        dupedList[item.item] = {
          key: item.item,
          data: JSON.parse(localStorage.getItem(item.item)),
        };
        setLists(dupedList);
      } else {
        localStorage.setItem(item.item, JSON.stringify([animeToRender]));

        dupedList[item.item] = {
          key: item.item,
          data: JSON.parse(localStorage.getItem(item.item)),
        };
        setLists(dupedList);
      }
    } else if (addOrRemove === "remove") {
      localStorage.setItem(
        item.item,
        JSON.stringify(
          currentItems.filter(
            (filterItem) => filterItem.id !== animeToRender.id,
          ),
        ),
      );

      dupedList[item.item] = {
        key: item.item,
        data: JSON.parse(localStorage.getItem(item.item)),
      };
      setLists(dupedList);
    }

    setShowAddDetails(false);
  }
  let [lists, setLists] = useState({
    watching: {
      key: "watching",
      data: JSON.parse(localStorage.getItem("watching")) || [],
    },
    completed: {
      key: "completed",
      data: JSON.parse(localStorage.getItem("completed")) || [],
    },
    favourites: {
      key: "favourites",
      data: JSON.parse(localStorage.getItem("favourites")) || [],
    },
    planToWatch: {
      key: "planToWatch",
      data: JSON.parse(localStorage.getItem("planToWatch")) || [],
    },
  });
  return (
    <watchListContext.Provider
      value={{ lists, setLists, updateList, notificationKey }}
    >
      {children}
    </watchListContext.Provider>
  );
}
export default WatchListConext;
