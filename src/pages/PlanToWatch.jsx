import { useContext, useState } from "react";
import AnimeRow from "../components/anime/AnimeRow";
import WatchListConext, {
  watchListContext,
} from "../components/WatchlistContext";
import watchListFilterSearch from "../components/WatchListSearchFilter";

import WatchListSearch from "../components/WatchListSearch";

function PlanToWatch() {
  let { lists } = useContext(watchListContext);
  const [watchlistQuerry, setWatchlistQuerry] = useState("");

  return (
    <div className="listPadding">
      <WatchListSearch
        currentWatchList="PlanToWatch"
        watchlistQuerry={watchlistQuerry}
        setWatchListQuerry={setWatchlistQuerry}
      />
      {lists.planToWatch && lists.planToWatch.length > 0 && (
        <AnimeRow
          rowNameDetails={{ status: false }}
          animeRowToRender={
            watchlistQuerry
              ? watchListFilterSearch(lists.planToWatch, watchlistQuerry)
              : lists.planToWatch
          }
        />
      )}
    </div>
  );
}
export default PlanToWatch;
