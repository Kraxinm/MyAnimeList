function removeAnimeFromPrevList({ animeToRender, item, dupedLists }) {
  let keys = "";

  for (const currentList of Object.values(dupedLists)) {
    const found = currentList?.data?.some(
      (currentAnime) => currentAnime?.id === animeToRender.id,
    );
    if (found && currentList.key !== "favourites") {
      keys = currentList.key;
      break;
    }
  }

  if (item !== "favourites" && keys) {
    const updatedData = dupedLists[keys]?.data.filter(
      (filterItem) => filterItem.id !== animeToRender.id,
    );

    localStorage.setItem(keys, JSON.stringify(updatedData));

    dupedLists[keys] = { key: keys, data: updatedData };
  }
}

export default removeAnimeFromPrevList;
