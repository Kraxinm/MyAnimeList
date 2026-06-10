import { Link } from "react-router-dom";
import webLogo from "../../assets/Logos/myAnimeDesk1.svg";
import { motion } from "motion/react";
import { IsMobileContext } from "../../App.jsx";
import { useContext, useState } from "react";
function DeskTopNav({ currentY }) {
  const { userQuerry, setUserQuerry, handleSearch } =
    useContext(IsMobileContext);

  const navItems = [
    {
      item: "Watching",
      bgColor: "darkBlueBG",

      navigateTo: "/watching",
    },
    {
      item: "PlanToWatch",
      bgColor: "darkBG",
      Selected: false,

      navigateTo: "/planToWatch",
    },
    {
      item: "Completed",
      bgColor: "darkBlueBG",

      navigateTo: "/completed",
    },
    {
      item: "Favourite`s",
      bgColor: "darkBG",
      navigateTo: "/favourites",
    },
  ];
  return (
    <>
      <motion.nav
        initial={{ y: 0 }}
        animate={currentY ? { y: 0, opacity: 1 } : { y: "-100%", opacity: 0 }}
        transition={{ type: "spring", duration: 0.4 }}
        className={`mainNav ${!currentY && "hideNavBar"}`}
      >
        <div className="rightNav">
          <Link to={"/"}>
            <img src={webLogo} id="webLogo" alt="My Anime DeskTop logo" />
          </Link>
        </div>
        <div className="centerNav">
          <form action="" onSubmit={(e) => handleSearch(e)}>
            <input
              type="text"
              autoComplete="off"
              value={userQuerry}
              name=""
              id="navBarInp"
              placeholder="Search"
              onChange={(e) => {
                setUserQuerry(e.target.value);
              }}
            />
          </form>
        </div>

        <div className="leftNav">
          {navItems.map((item, index) => {
            return (
              <Link to={item.navigateTo} key={index}>
                <button className={`navBtn ${item.bgColor}`}>
                  {item.item}
                </button>
              </Link>
            );
          })}
        </div>
      </motion.nav>
    </>
  );
}
export default DeskTopNav;
