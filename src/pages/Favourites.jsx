import { useContext, useState } from "react";
import AnimeRow from "../components/anime/AnimeRow";
import WatchListConext, {
  watchListContext,
} from "../components/WatchlistContext";
import WatchListSearch from "../components/WatchListSearch";
import watchListFilterSearch from "../components/WatchListSearchFilter";

function Favourites() {
  const { lists } = useContext(watchListContext);
  const [watchlistQuerry, setWatchlistQuerry] = useState("");

  return (
    <div className="listPadding">
      <WatchListSearch
        currentWatchList="Favourites"
        watchlistQuerry={watchlistQuerry}
        setWatchListQuerry={setWatchlistQuerry}
      />
      {lists.favourites && lists.favourites.length > 0 && (
        <AnimeRow
          rowNameDetails={{ status: false }}
          animeRowToRender={
            watchlistQuerry
              ? watchListFilterSearch(lists.favourites, watchlistQuerry)
              : lists.favourites
          }
        />
      )}
    </div>
  );
}
export default Favourites;
