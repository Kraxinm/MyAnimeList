import axios from "../../assets/services/axios2";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ErrorComponent from "../../components/ErrorComponent";
import LoadingScreen from "../../components/LoadingScreen";
import AnimeDetailsOvr from "./AnimeDetailsOvr";

function AnimeDetails() {
  let { id } = useParams();
  const [errorMessage, setErrorMessage] = useState();
  const [loading, setLoading] = useState(true);
  const [animeData, setAnimeData] = useState(null);

  async function handleFetchAni() {
    try {
      const querry = `query {
  Media(id: ${id}, type: ANIME) {
    id
    title { romaji english native }
    description(asHtml: false)
    episodes
    genres
    duration
    status
    season
    seasonYear
    format
    averageScore
    meanScore
    popularity
    favourites
    coverImage { large extraLarge color }
    bannerImage
    isAdult
    source
    countryOfOrigin
    startDate { year month day }
    endDate { year month day }
    nextAiringEpisode { episode airingAt timeUntilAiring }
    trailer { id site thumbnail }
    tags { name rank isMediaSpoiler }
    synonyms
    studios {
      nodes { id name isAnimationStudio }
    }
    characters(perPage: 6, sort: [FAVOURITES_DESC]) {
      edges {
        role
        node {
          name { full }
          image { large medium }
        }
        voiceActors(language: JAPANESE) {
          name { full }
          image { large medium }
          languageV2
        }
      }
    }
    relations {
      edges {
        relationType
        node {
          id
          title { romaji english }
          coverImage { large }
          type
          format
          status
        }
      }
    }
    rankings {
      rank
      type
      context
      allTime
    }
    recommendations(perPage: 6) {
  nodes {
    mediaRecommendation {
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
  }
}`;
      let response = await axios.post("", { query: querry });

      setAnimeData(response.data.data.Media);
      setLoading(false);
    } catch (error) {
      setErrorMessage(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    handleFetchAni();
  }, [id]);
  return (
    <div>
      {loading ? (
        <LoadingScreen />
      ) : errorMessage ? (
        <ErrorComponent Error={errorMessage} />
      ) : (
        animeData && (
          <div>
            <AnimeDetailsOvr animeData={animeData} />
          </div>
        )
      )}
    </div>
  );
}
export default AnimeDetails;
