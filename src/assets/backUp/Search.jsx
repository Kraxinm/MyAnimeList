import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "../assets/services/axios2.js";
import AnimeRow from "../components/anime/AnimeRow.jsx";
import LoadingScreen from "../components/LoadingScreen.jsx";
import ErrorComponent from "../components/ErrorComponent.jsx";

function SearchAnime() {
  const { querry: currentQuerry } = useParams();

  const [errorMsg, setErrMsg] = useState();
  const [searchedAnime, setSearchedAnime] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loaderRef = useRef(null);

  const querry = `
    query ($search: String, $page: Int, $perPage: Int) {
      Page(page: $page, perPage: $perPage) {
        pageInfo {
          hasNextPage
        }

        media(search: $search, type: ANIME, sort: [POPULARITY_DESC]) {
          id
          title {
            english
            romaji
          }
          coverImage {
            large
          }
          format
          seasonYear
          episodes
          averageScore
        }
      }
    }
  `;

  async function handleFetch(pageToFetch = currentPage) {
    try {
      setIsLoading(true);

      const response = await axios.post("", {
        query: querry,
        variables: {
          search: currentQuerry,
          page: pageToFetch,
          perPage: 18,
        },
      });

      const pageData = response.data.data.Page;

      setHasMore(pageData.pageInfo.hasNextPage);

      if (pageToFetch === 1) {
        setSearchedAnime(pageData.media);
      } else {
        setSearchedAnime((prev) => [...prev, ...pageData.media]);
      }

      setErrMsg(undefined);
    } catch (error) {
      setErrMsg(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setCurrentPage(1);
    setHasMore(true);
    setSearchedAnime([]);

    handleFetch(1);
  }, [currentQuerry]);

  useEffect(() => {
    if (currentPage === 1) return;

    handleFetch(currentPage);
  }, [currentPage]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];

        if (target.isIntersecting && hasMore && !isLoading) {
          setCurrentPage((prev) => prev + 1);
        }
      },
      {
        threshold: 0.1,
      },
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, isLoading]);

  if (isLoading && searchedAnime.length === 0) {
    return <LoadingScreen />;
  }

  if (errorMsg) {
    return (
      <ErrorComponent
        isSearchOrNo={true}
        querry={currentQuerry}
        retryFetch={() => handleFetch(currentPage)}
      />
    );
  }

  return (
    <div className="listPadding">
      <AnimeRow
        animeRowToRender={searchedAnime}
        rowNameDetails={{ status: false }}
      />

      {isLoading && searchedAnime.length > 0 && <LoadingScreen />}

      {hasMore && (
        <div
          ref={loaderRef}
          style={{
            height: "20px",
            width: "100%",
          }}
        />
      )}
    </div>
  );
}

export default SearchAnime;
