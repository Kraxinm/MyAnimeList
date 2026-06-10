import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../assets/services/axios2.js";
import AnimeRow from "../components/anime/AnimeRow.jsx";
import LoadingScreen from "../components/LoadingScreen.jsx";
import ErrorComponent from "../components/ErrorComponent.jsx";
import useInfiniteScroll from "../components/hooks/useInfiniteScroll.js";
import useRefetch from "../components/hooks/useRefetch.js";

function SearchAnime() {
  const [currentPage, setCurrentPage] = useState(1);
  const { querry: currentQuerry } = useParams();
  const [errorMsg, setErrMsg] = useState();
  const [searchedAnime, setSearchedAnime] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const senitalRef = useRef(null);
  const querry = `
  query ($search: String, $page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        hasNextPage
      }
      media(search: $search, type: ANIME, sort: [POPULARITY_DESC]) {
        id
        title { english romaji }
        coverImage { large }
        format
        seasonYear
        episodes
        averageScore
      }
    }
  }
`;
  async function handleFetch(page) {
    try {
      const response = await axios.post("", {
        query: querry,
        variables: {
          search: currentQuerry,
          page: page,
          perPage: 18,
        },
      });
      const pageData = response.data.data.Page;
      if (pageData.media.length === 0) {
        setErrMsg(true);
      }
      if (page === 1) {
        setSearchedAnime(pageData.media);
      } else {
        setSearchedAnime((prev) => [...prev, ...pageData.media]);
      }
      setHasMore(pageData.pageInfo.hasNextPage);
    } catch (error) {
      setErrMsg(error);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    setErrMsg(undefined);

    setSearchedAnime([]);
    setIsLoading(true);
    setCurrentPage(1);
    setHasMore(true);
    handleFetch(1);
  }, [currentQuerry]);
  useRefetch({
    currentPage: setCurrentPage,
    setIsLoading: setIsLoading,
    setErrMsg: setErrMsg,
    handleFetch: handleFetch,
  });
  useInfiniteScroll({
    senitalRef: senitalRef,
    setCurrentPage: setCurrentPage,
    isLoading: isLoading,
    hasMore: hasMore,
  });
  if (isLoading && searchedAnime.length === 0) {
    return <LoadingScreen />;
  }
  if (errorMsg) {
    return (
      <ErrorComponent
        retryFetch={() => handleFetch(currentPage)}
        isSearchOrNo={true}
        querry={currentQuerry}
        Error={errorMsg}
      />
    );
  }
  return (
    <div className="listPadding">
      {searchedAnime.length > 0 && (
        <AnimeRow
          animeRowToRender={searchedAnime}
          rowNameDetails={{ status: false }}
        />
      )}
      {isLoading && searchedAnime.length > 0 && <LoadingScreen />}

      {hasMore && (
        <div ref={senitalRef} style={{ height: "10px", width: "100%" }}></div>
      )}
    </div>
  );
}
export default SearchAnime;
