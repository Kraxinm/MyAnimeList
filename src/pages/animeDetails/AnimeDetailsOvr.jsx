import "../../assets/css/animeDetOvr.css";
import AnimeDetRecomendation from "./AnimeDetRecomendations";

import { IsMobileContext } from "../../App";
import { useContext, useEffect, useRef, useState } from "react";
import AnimeAdd from "../../components/anime/AnimeAdd";
import { motion } from "motion/react";
import AnimeCardNotification from "../../components/anime/AnimeCardNotification";

import AnimeDetailsChractersOvr from "./AnimeDetailsOvrChracters";

function AnimeDetailsOvr({ animeData }) {
  animeData.description =
    (animeData.description && animeData.description.replace(/<[^>]*>/g, "")) ||
    "No Description Found";
  const { setIsNavBarTransparent, notificationKey } =
    useContext(IsMobileContext);
  const descRef = useRef(null);
  const [descLine, setDescLine] = useState(false);
  const [descLineControl, setDescLineControl] = useState(true);
  const isManuallyExpended = useRef(false);

  const generalStats = [
    { label: "Format", value: animeData.format ?? "N/A" },
    { label: "Status", value: animeData.status ?? "N/A" },
    { label: "Episodes", value: animeData.episodes ?? "N/A" },
    {
      label: "Rating",
      value: animeData.averageScore ? `${animeData.averageScore} / 100` : "N/A",
    },
    {
      label: "Duration",
      value: animeData.duration ? `${animeData.duration} min` : "N/A",
    },

    { label: "Source", value: animeData.source ?? "N/A" },
  ];

  const dateStats = [
    { label: "Season", value: animeData.season ?? "N/A" },
    {
      label: "Start Date",
      value: animeData.startDate?.year
        ? `${animeData.startDate.year}-${animeData.startDate.month}-${animeData.startDate.day}`
        : "N/A",
    },
    {
      label: "End Date",
      value: animeData.endDate?.year
        ? `${animeData.endDate.year}-${animeData.endDate.month}-${animeData.endDate.day}`
        : "N/A",
    },
    { label: "Country", value: animeData.countryOfOrigin ?? "N/A" },
    { label: "Adult", value: animeData.isAdult ? "Yes" : "No" },
  ];
  useEffect(() => {
    setIsNavBarTransparent(true);

    const observer = new ResizeObserver(() => {
      if (isManuallyExpended.current) return;
      if (descRef.current) {
        setDescLine(
          descRef.current.scrollHeight !== descRef.current.clientHeight,
        );
      }
    });

    if (descRef.current) {
      observer.observe(descRef.current);
    }

    return () => {
      setIsNavBarTransparent(false);
      observer.disconnect();
    };
  }, []);
  return (
    <div className="animeDetOvr">
      <motion.div
        className="bannerImageBox"
        style={{ backgroundImage: `url(${animeData.bannerImage})` }}
      ></motion.div>

      <div className="overViewGrid listPadding">
        <motion.div className="leftSideOvr">
          <motion.img
            src={animeData.coverImage.large}
            alt={animeData.title.english || animeData.title.romaji}
            className="cardImage"
          />
          <AnimeAdd animeOvrOrno={true} animeToRender={animeData} />
          <AnimeCardNotification key={notificationKey} />
        </motion.div>
        <div className="titleAndDesc">
          <h4 className="animeTitle">{animeData.studios?.nodes[0]?.name}</h4>
          <h4 className="animeTitle">
            {animeData.title.english || animeData.title.romaji}
          </h4>
          <div className="descBox">
            <motion.p
              className={`animeDesc ${descLineControl && "descLineControl"}`}
              ref={descRef}
            >
              {animeData.description}
            </motion.p>
          </div>
          {descLine && (
            <motion.button
              className={`descBtn`}
              whileHover={{ scale: 1.1 }}
              onClick={() => {
                isManuallyExpended.current = true;
                setDescLineControl((prev) => !prev);
              }}
            >
              {descLineControl ? "showMore" : "ShowLess"}
            </motion.button>
          )}
        </div>
      </div>

      <div className="genres listPadding">
        {animeData.genres.map((item, index) => {
          return (
            <motion.button key={index} className="btnPills">
              {" "}
              {item}
            </motion.button>
          );
        })}
      </div>
      <div className="bottomGrid listPadding">
        <div className="ovrStats listPadding">
          {generalStats.map((item, index) => {
            return (
              <div className="statPillsBox" key={index}>
                <p className="statLabel">{item.label}</p>
                <p className="statPills">{item.value}</p>
              </div>
            );
          })}

          {dateStats.map((item, index) => {
            return (
              <div className="statPillsBox" key={index}>
                <p className="statLabel">{item.label}</p>
                <p className="statPills">{item.value}</p>
              </div>
            );
          })}
        </div>
        <div className="charactersAndRecomendation">
          <AnimeDetailsChractersOvr characters={animeData.characters} />

          <AnimeDetRecomendation
            animeRecomendations={animeData.recommendations}
          />
        </div>
      </div>
    </div>
  );
}
export default AnimeDetailsOvr;
