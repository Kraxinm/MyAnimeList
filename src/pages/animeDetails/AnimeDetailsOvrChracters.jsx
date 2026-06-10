import "../../assets/css/animeCharacters.css";

function AnimeDetailsChractersOvr({ characters }) {
  let mappedChracters = characters.edges
    .filter((item) => item.voiceActors[0])
    .map((edge) => {
      return {
        role: edge.role,
        name: edge.node.name.full,
        image: edge.node.image.large,
        voiceActors: {
          name: edge.voiceActors[0].name.full,
          language: edge.voiceActors[0].languageV2,
          image: edge.voiceActors[0].image.large,
        },
      };
    });

  return (
    <>
      <div className="characterDetails">
        <h4 className="animeTitle">Characters</h4>
        <div className="characterWrapper">
          {mappedChracters.map((item, index) => {
            return (
              <div className="characterCard" key={index}>
                <div className="characterSide">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="characterImage"
                  />
                  <div className="characterSub">
                    <h5 className="characterTitle"> {item.name}</h5>{" "}
                    <h5 className="characterTitle">{item.role}</h5>{" "}
                  </div>
                </div>
                <div className="voiceActorSide">
                  <div className="voiceActorSub">
                    <h5 className="characterTitle">{item.voiceActors.name}</h5>
                    <h5 className="characterTitle">
                      {item.voiceActors.language}
                    </h5>
                  </div>
                  <img
                    src={item.voiceActors.image}
                    className="characterImage"
                    alt={item.voiceActors.name}
                  />
                </div>
              </div>
            );
          })}
          <div></div>
        </div>
      </div>
    </>
  );
}
export default AnimeDetailsChractersOvr;
