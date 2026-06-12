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
  const favourites = lists.favourites.data;

  return (
    <div className="listPadding">
      <WatchListSearch
        currentWatchList="Favourites"
        watchlistQuerry={watchlistQuerry}
        setWatchListQuerry={setWatchlistQuerry}
      />
      {favourites && favourites.length > 0 && (
        <AnimeRow
          rowNameDetails={{ status: false }}
          animeRowToRender={
            watchlistQuerry
              ? watchListFilterSearch(favourites, watchlistQuerry)
              : favourites
          }
        />
      )}
    </div>
  );
}
export default Favourites;
