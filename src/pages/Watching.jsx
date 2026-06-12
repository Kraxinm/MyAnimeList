import { useContext, useState } from "react";
import AnimeRow from "../components/anime/AnimeRow";
import { watchListContext } from "../components/WatchlistContext";
import WatchListSearch from "../components/WatchListSearch";
import watchListFilterSearch from "../components/WatchListSearchFilter";

function Watching() {
  let { lists } = useContext(watchListContext);
  const [watchlistQuerry, setWatchlistQuerry] = useState("");
  const watching = lists.watching.data;
  return (
    <div className="listPadding">
      <WatchListSearch
        watchlistQuerry={watchlistQuerry}
        setWatchListQuerry={setWatchlistQuerry}
        currentWatchList={"Watching"}
      />
      {watching && watching.length > 0 && (
        <AnimeRow
          rowNameDetails={{ status: false }}
          animeRowToRender={
            watchlistQuerry
              ? watchListFilterSearch(watching, watchlistQuerry)
              : watching
          }
        />
      )}
    </div>
  );
}
export default Watching;
