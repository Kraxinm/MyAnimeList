import { useContext, useState } from "react";
import AnimeRow from "../components/anime/AnimeRow";
import { watchListContext } from "../components/WatchlistContext";
import WatchListSearch from "../components/WatchListSearch";
import watchListFilterSearch from "../components/WatchListSearchFilter";

function Watching() {
  let { lists } = useContext(watchListContext);
  const [watchlistQuerry, setWatchlistQuerry] = useState("");

  return (
    <div className="listPadding">
      <WatchListSearch
        watchlistQuerry={watchlistQuerry}
        setWatchListQuerry={setWatchlistQuerry}
        currentWatchList={"Watching"}
      />
      {lists.watching && lists.watching.length > 0 && (
        <AnimeRow
          rowNameDetails={{ status: false }}
          animeRowToRender={
            watchlistQuerry
              ? watchListFilterSearch(lists.watching, watchlistQuerry)
              : lists.watching
          }
        />
      )}
    </div>
  );
}
export default Watching;
