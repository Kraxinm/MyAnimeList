import { motion } from "motion/react";
import { object } from "motion/react-client";
function useMapFilterOptions({
  currentItem,
  filterQuerry,
  setFilterQuerry,
  showFilterItems,
  setShowFilterItems,
  setFilterSelected,
  filterSelected,
}) {
  function handleOptionClick(item) {
    let tempSelected = { ...filterSelected };
    let tempQuerry = { ...filterQuerry };
    let tempShow = { ...showFilterItems };

    tempQuerry[currentItem.label] = item.label;

    tempSelected[currentItem.label] = item.value;
    tempShow[currentItem.label] = false;
    console.log(tempQuerry);
    setFilterQuerry(tempQuerry);
    setFilterSelected(tempSelected);
    setShowFilterItems(tempShow);
  }
  if (filterQuerry[currentItem.label]) {
    return currentItem.options
      .filter((item) =>
        item.label
          .toLowerCase()
          .includes(filterQuerry[currentItem.label].toLowerCase()),
      )
      .map((item, index) => {
        return (
          <motion.li
            key={index}
            className="selectOption"
            layout
            whileHover={{ background: "#62478f", color: "#ffffff" }}
            onClick={() => handleOptionClick(item)}
          >
            {item.label}
          </motion.li>
        );
      });
  } else {
    return currentItem.options.map((item, index) => {
      return (
        <motion.li
          key={index}
          className="selectOption"
          whileHover={{ background: "#62478f", color: "#ffffff" }}
          onClick={() => {
            handleOptionClick(item);
          }}
        >
          {item.label}
        </motion.li>
      );
    });
  }
}
export default useMapFilterOptions;
