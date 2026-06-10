import AnimeRow from "../../components/anime/AnimeRow";

function AnimeDetRecomendations({ animeRecomendations }) {
  const mappedRecomendations = animeRecomendations?.nodes
    .filter((item) => item.mediaRecommendation)
    .map((item) => {
      return item.mediaRecommendation;
    });

  return (
    <div>
      {mappedRecomendations.length > 0 && (
        <>
          <h4 className="animeTitle">RECOMENDATIONS</h4>
          <AnimeRow
            animeRowToRender={mappedRecomendations}
            rowNameDetails={{ status: false }}
            isRecomendation={true}
          />
        </>
      )}
    </div>
  );
}
export default AnimeDetRecomendations;
