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
  const planToWatch = lists.planToWatch.data;
  return (
    <div className="listPadding">
      <WatchListSearch
        currentWatchList="PlanToWatch"
        watchlistQuerry={watchlistQuerry}
        setWatchListQuerry={setWatchlistQuerry}
      />
      {planToWatch && planToWatch.length > 0 && (
        <AnimeRow
          rowNameDetails={{ status: false }}
          animeRowToRender={
            watchlistQuerry
              ? watchListFilterSearch(planToWatch, watchlistQuerry)
              : planToWatch
          }
        />
      )}
    </div>
  );
}
export default PlanToWatch;
