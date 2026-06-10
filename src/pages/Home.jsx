import axios from "../assets/services/axios2.js";
import { useEffect, useRef, useState } from "react";

import ErrorComponent from "../components/ErrorComponent.jsx";
import LoadingScreen from "../components/LoadingScreen.jsx";

import "../assets/css/home.css";
import AnimeRow from "../components/anime/AnimeRow.jsx";
import { createPortal } from "react-dom";
import FilterAnime from "../components/FilterAnime.jsx";
import useInfiniteScroll from "../components/hooks/useInfiniteScroll.js";
import useRefetch from "../components/hooks/useRefetch.js";

function Home() {
  const [hasMore, setHasMore] = useState();
  const [errorMsg, setErrMsg] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const homeSenitalRef = useRef(null);
  const [filterSelected, setFilterSelected] = useState({
    Genre: null,
    Sort: null,
    Season: null,
    Format: null,
  });
  const isFilterSelected = Object.values(filterSelected).some(
    (value) => value !== null,
  );
  const [filteredAnime, setFilteredAnime] = useState([]);
  const [loading, setLoading] = useState(true);
  const [upcomingAnime, setUpcomingAnime] = useState();
  const [topAnime, setTopAnime] = useState();
  const [trendingItems, setTrendingItems] = useState();
  async function handleFilteredFetch(page) {
    if (!isFilterSelected) return;
    try {
      const query = `
      query ($genre: String, $sort: [MediaSort], $season: MediaSeason, 
      $format: MediaFormat , 
      $page: Int, $perPage: Int ) {
        filtered: Page(page: $page, perPage: $perPage) {
  pageInfo {
    hasNextPage
  }
          media(type: ANIME, genre: $genre, sort: $sort, season: $season, format: $format ,status_not: NOT_YET_RELEASED) {
            id
            title { romaji english }
            coverImage { large medium extraLarge color }
            averageScore
            seasonYear
            status
            genres
            format
            episodes
          }
        }
      }
    `;

      const variables = {
        page,
        perPage: 18,
      };

      if (filterSelected.Genre) variables.genre = filterSelected.Genre;
      if (filterSelected.Sort) variables.sort = [filterSelected.Sort];
      if (filterSelected.Season) variables.season = filterSelected.Season;
      if (filterSelected.Format) variables.format = filterSelected.Format;
      const res = await axios.post("", { query, variables });

      const pageData = res.data.data.filtered;

      setHasMore(pageData.pageInfo.hasNextPage);

      if (page === 1) {
        setFilteredAnime(pageData.media);
      } else {
        setFilteredAnime((prev) => [...prev, ...pageData.media]);
      }
    } catch (error) {
      setErrMsg(error);
    } finally {
      setLoading(false);
    }
  }
  async function handleStaticFetch() {
    if (isFilterSelected) return;
    try {
      const query = `
  query {
    trending: Page(perPage: 6) {
      media(type: ANIME, sort: TRENDING_DESC  , status: RELEASING) {
        id
        title { romaji english }
        coverImage { large
        medium
  extraLarge
  color
         }
          averageScore
  seasonYear
  status
  genres
  format
  episodes
      }
    }
    top: Page(perPage: 6) {
      media(type: ANIME, sort: SCORE_DESC) {
       id
        title { romaji english }
        coverImage { large
        medium
  extraLarge
  color
         }
          averageScore
  seasonYear
  status
  genres
  format
  episodes
      }
    }
      upcoming: Page(perPage: 6) {
  media(type: ANIME, status: NOT_YET_RELEASED, sort: FAVOURITES_DESC) {
    id
        title { romaji english }
        coverImage { large
        medium
  extraLarge
  color
         }
          averageScore
  seasonYear
  status
  genres
  format
  episodes
  }
    
}
  }
`;

      const res = await axios.post("", { query });

      setTrendingItems(res.data.data.trending.media);
      setTopAnime(res.data.data.top.media);
      setUpcomingAnime(res.data.data.upcoming.media);
      setLoading(false);
    } catch (error) {
      setErrMsg(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    setLoading(true);
    handleFilteredFetch(currentPage);
  }, [filterSelected]);
  useEffect(() => {
    handleStaticFetch();
  }, []);
  useInfiniteScroll({
    senitalRef: homeSenitalRef,
    setCurrentPage: setCurrentPage,
    isLoading: loading,
    hasMore: hasMore,
  });
  useRefetch({
    setErrMsg: setErrMsg,
    setIsLoading: setLoading,
    currentPage: currentPage,
    handleFetch: handleFilteredFetch,
  });
  if (loading && filteredAnime.length <= 1) return <LoadingScreen />;
  if (errorMsg) return <ErrorComponent />;
  return (
    <div className="listPadding">
      <FilterAnime
        setFilterSelected={setFilterSelected}
        filterSelected={filterSelected}
      />
      {!isFilterSelected ? (
        <div>
          <AnimeRow
            animeRowToRender={trendingItems}
            rowNameDetails={{ name: "TRENDING NOW", status: true }}
          />
          <AnimeRow
            animeRowToRender={topAnime}
            rowNameDetails={{ name: "TOP ANIME", status: true }}
          />
          <AnimeRow
            animeRowToRender={upcomingAnime}
            rowNameDetails={{ name: "UPCOMING", status: true }}
          />
        </div>
      ) : (
        <div>
          <AnimeRow
            animeRowToRender={filteredAnime}
            rowNameDetails={{ status: false }}
          />
          {loading && filteredAnime.length > 0 && <LoadingScreen />}
          <div ref={homeSenitalRef} style={{ height: "10px" }}></div>
        </div>
      )}
    </div>
  );
}
export default Home;
