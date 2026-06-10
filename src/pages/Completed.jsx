import { useContext, useState } from "react";
import AnimeRow from "../components/anime/AnimeRow";
import { watchListContext } from "../components/WatchlistContext";
import WatchListSearch from "../components/WatchListSearch";
import watchListFilterSearch from "../components/WatchListSearchFilter";

function Completed() {
  const { lists } = useContext(watchListContext);
  const [watchlistQuerry, setWatchlistQuerry] = useState("");

  return (
    <div className="listPadding">
      <WatchListSearch
        watchlistQuerry={watchlistQuerry}
        setWatchListQuerry={setWatchlistQuerry}
        currentWatchList="Completed"
      />
      {lists.completed && lists.completed.length > 0 && (
        <AnimeRow
          rowNameDetails={{ status: false }}
          animeRowToRender={
            watchlistQuerry
              ? watchListFilterSearch(lists.completed, watchlistQuerry)
              : lists.completed
          }
        />
      )}
    </div>
  );
}
export default Completed;
