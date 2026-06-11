import "../assets/css/filterAnime.css";
import { RiArrowDropDownLine } from "react-icons/ri";
import { CiSquareRemove } from "react-icons/ci";

import { AnimatePresence, motion, scale } from "motion/react";
import { use, useEffect, useState } from "react";
import MapFilterOptions from "./hooks/useMapFilterOptions.jsx";
function FilterAnime({
  filterSelected,
  setFilterSelected,
  filterQuerry,
  setFilterQuerry,
}) {
  // const year = new Date().getFullYear();
  const [showFilterItems, setShowFilterItems] = useState({
    Genre: false,
    Sort: false,
    Season: false,
    Format: false,
  });

  const filterOptions = [
    {
      label: "Genre",
      options: [
        { id: "genre-action", label: "Action", value: "Action" },
        { id: "genre-adventure", label: "Adventure", value: "Adventure" },
        { id: "genre-comedy", label: "Comedy", value: "Comedy" },
        { id: "genre-drama", label: "Drama", value: "Drama" },
        { id: "genre-ecchi", label: "Ecchi", value: "Ecchi" },
        { id: "genre-fantasy", label: "Fantasy", value: "Fantasy" },
        { id: "genre-horror", label: "Horror", value: "Horror" },
        {
          id: "genre-mahou-shoujo",
          label: "Mahou Shoujo",
          value: "Mahou Shoujo",
        },
        { id: "genre-mecha", label: "Mecha", value: "Mecha" },
        { id: "genre-music", label: "Music", value: "Music" },
        { id: "genre-mystery", label: "Mystery", value: "Mystery" },
        {
          id: "genre-psychological",
          label: "Psychological",
          value: "Psychological",
        },
        { id: "genre-romance", label: "Romance", value: "Romance" },
        { id: "genre-sci-fi", label: "Sci-Fi", value: "Sci-Fi" },
        {
          id: "genre-slice-of-life",
          label: "Slice of Life",
          value: "Slice of Life",
        },
        { id: "genre-sports", label: "Sports", value: "Sports" },
        {
          id: "genre-supernatural",
          label: "Supernatural",
          value: "Supernatural",
        },
        { id: "genre-thriller", label: "Thriller", value: "Thriller" },
      ],
    },
    {
      label: "Sort",
      options: [
        {
          id: "sort-popularity",
          label: "Popularity",
          value: "POPULARITY_DESC",
        },
        { id: "sort-trending", label: "Trending", value: "TRENDING_DESC" },
        { id: "sort-score", label: "Score", value: "SCORE_DESC" },
        {
          id: "sort-favourites",
          label: "Favourites",
          value: "FAVOURITES_DESC",
        },
        {
          id: "sort-start-date",
          label: "Start Date",
          value: "START_DATE_DESC",
        },
        {
          id: "sort-update-date",
          label: "Update Date",
          value: "UPDATED_AT_DESC",
        },
      ],
    },
    {
      label: "Season",
      options: [
        { id: "season-winter", label: "Winter", value: "WINTER" },
        { id: "season-spring", label: "Spring", value: "SPRING" },
        { id: "season-summer", label: "Summer", value: "SUMMER" },
        { id: "season-fall", label: "Fall", value: "FALL" },
      ],
    },
    {
      label: "Format",
      options: [
        { id: "format-tv", label: "TV", value: "TV" },
        { id: "format-tv-short", label: "TV Short", value: "TV_SHORT" },
        { id: "format-movie", label: "Movie", value: "MOVIE" },
        { id: "format-special", label: "Special", value: "SPECIAL" },
        { id: "format-ova", label: "OVA", value: "OVA" },
        { id: "format-ona", label: "ONA", value: "ONA" },
        { id: "format-music", label: "Music", value: "MUSIC" },
      ],
    },
  ];
  useEffect(() => {
    const handleClickOutside = (event) => {
      const selectDivs = document.querySelectorAll(".selectDiv");
      let clickedInside = false;

      selectDivs.forEach((div) => {
        if (div.contains(event.target)) {
          clickedInside = true;
        }
      });

      if (!clickedInside) {
        setShowFilterItems({
          Genre: false,
          Sort: false,
          Season: false,
          Format: false,
        });
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="filterAnimeWrapper">
      {filterOptions.map((item, index) => {
        return (
          <div className="selectDiv" key={index}>
            <motion.div
              className={`filter${item.label}`}
              onClick={(e) => {
                let tempVar = { ...showFilterItems };

                if (!e.target.classList.contains("selectInp")) {
                  tempVar[item.label] = !tempVar[item.label];
                } else {
                  tempVar[item.label] = true;
                }
                setShowFilterItems(tempVar);
              }}
            >
              <h5>{item.label}</h5>
              <div className="selectBox darkBlueBG">
                <input
                  value={filterQuerry[item.label]}
                  type="text"
                  className="selectInp darkBlueBG"
                  placeholder="Any"
                  onFocus={() => {
                    let tempVar = { ...showFilterItems };
                    tempVar[item.label] = true;
                    setShowFilterItems(tempVar);
                  }}
                  onChange={(e) => {
                    let tempVar = { ...filterQuerry };
                    tempVar[item.label] = e.target.value;
                    setFilterQuerry(tempVar);
                  }}
                />
                {filterSelected[item.label] === null ? (
                  <RiArrowDropDownLine size={40} />
                ) : (
                  <CiSquareRemove
                    size={40}
                    onClick={() => {
                      let tempVarQuerry = { ...filterQuerry };
                      let tempVarFilter = { ...filterSelected };
                      tempVarFilter[item.label] = null;
                      tempVarQuerry[item.label] = "";
                      setFilterSelected(tempVarFilter);
                      setFilterQuerry(tempVarQuerry);
                    }}
                  />
                )}
              </div>
            </motion.div>

            <motion.div
              className="selectOptions"
              initial={{ scale: 0, zIndex: 10 }}
              animate={
                showFilterItems[item.label]
                  ? { scale: 1, zIndex: 10 }
                  : { scale: 0, zIndex: 10 }
              }
              transition={{ duration: 0.3, type: "spring" }}
            >
              <motion.ul className="selectList darkBlueBG">
                <AnimatePresence>
                  {MapFilterOptions({
                    currentItem: item,
                    filterQuerry: filterQuerry,
                    setFilterQuerry: setFilterQuerry,
                    setShowFilterItems: setShowFilterItems,
                    setFilterSelected: setFilterSelected,
                    filterSelected: filterSelected,
                    showFilterItems: showFilterItems,
                  })}
                </AnimatePresence>
              </motion.ul>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
export default FilterAnime;
