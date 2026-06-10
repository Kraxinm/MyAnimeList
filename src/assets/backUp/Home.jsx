import axios from "../services/axios2.js";
import { useEffect, useState } from "react";
import AnimeCard from "./AnimeCard";

import ErrorComponent from "./ErrorComponent.jsx";
import LoadingScreen from "./LoadingScreen.jsx";
import { BounceLoader } from "react-spinners";
import "../css/home.css";
import AnimeRow from "./AnimeRow.jsx";

function Home() {
  const [errorMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const [upcomingAnime, setUpcomingAnime] = useState();
  const [topAnime, setTopAnime] = useState();
  const [trendingItems, setTrendingItems] = useState();
  async function handleFetch() {
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

      // console.log("trending", res.data.data.trending.media);
      // console.log("top", res.data.data.top.media);
      // console.log("upcoming", res.data.data.upcoming.media);
      setTrendingItems(res.data.data.trending.media);
      setTopAnime(res.data.data.top.media);
      setUpcomingAnime(res.data.data.upcoming.media);
      setLoading(false);
      // console.log(tempVar)
    } catch (error) {
      setErrMsg(error);
      setLoading(false);
    }
  }
  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <div className="bodyPadding">
      {/* Trending  */}
      {!loading ? (
        errorMsg == "" ? (
          trendingItems !== undefined && (
            <>
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
            </>
          )
        ) : (
          <ErrorComponent Error={errorMsg} />
        )
      ) : (
        <LoadingScreen />
      )}
    </div>
  );
}
export default Home;
