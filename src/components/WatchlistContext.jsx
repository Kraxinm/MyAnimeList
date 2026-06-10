import { createContext, useRef, useState } from "react";

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
      if (currentItems.length > 0) {
        localStorage.setItem(
          `${item.item}`,
          JSON.stringify([...currentItems, animeToRender]),
        );
        dupedList[item.item] = JSON.parse(localStorage.getItem(item.item));
        setLists(dupedList);
      } else {
        localStorage.setItem(item.item, JSON.stringify([animeToRender]));

        dupedList[item.item] = JSON.parse(localStorage.getItem(item.item));
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

      dupedList[item.item] = JSON.parse(localStorage.getItem(item.item));
      setLists(dupedList);
    }

    setShowAddDetails(false);
  }
  let [lists, setLists] = useState({
    watching: JSON.parse(localStorage.getItem("watching")) || [],
    completed: JSON.parse(localStorage.getItem("completed")) || [],
    favourites: JSON.parse(localStorage.getItem("favourites")) || [],
    planToWatch: JSON.parse(localStorage.getItem("planToWatch")) || [],
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
