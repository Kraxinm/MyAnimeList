import { GiHamburgerMenu } from "react-icons/gi";
import webLogo from "../../assets/Logos/myAnimeMbl.svg";
import { LuSunMoon } from "react-icons/lu";
import { LuSun } from "react-icons/lu";
import { IsMobileContext } from "../../App";

import { useContext, useState } from "react";
import Menu from "./Menu";
import {
  IoTv,
  IoBookmarks,
  IoCheckmarkCircleSharp,
  IoHeart,
  IoHome,
} from "react-icons/io5";
import { AnimatePresence, motion } from "motion/react";
import { Link, useLocation } from "react-router-dom";

function MobileNavBar({ currentY }) {
  let [isNightMode, setIsNightMode] = useState(true);
  let [showMenu, setShowMenu] = useState(false);
  let currentRoute = useLocation();
  const { userQuerry, setUserQuerry, handleSearch } =
    useContext(IsMobileContext);

  const [menuItems, setMenuItems] = useState([
    {
      item: "Home",
      bgColor: "darkBG",
      Selected: currentRoute.pathname === "/" ? true : false,
      icon: IoHome,
      navigateTo: "/",
    },
    {
      item: "Watching",
      bgColor: "darkBlueBG",
      Selected: currentRoute.pathname === "/watching" ? true : false,
      icon: IoTv,
      navigateTo: "/watching",
    },
    {
      item: "PlanToWatch",
      bgColor: "darkBG",
      Selected: currentRoute.pathname === "/planToWatch" ? true : false,
      icon: IoBookmarks,
      navigateTo: "/planToWatch",
    },
    {
      item: "Completed",
      bgColor: "darkBlueBG",
      Selected: currentRoute.pathname === "/completed" ? true : false,
      icon: IoCheckmarkCircleSharp,
      navigateTo: "/completed",
    },
    {
      item: "Favourite`s",
      bgColor: "darkBG",
      Selected: currentRoute.pathname === "/favourites" ? true : false,
      icon: IoHeart,
      navigateTo: "/favourites",
    },
  ]);
  function handleTheme() {
    setIsNightMode((prev) => !prev);
  }

  return (
    <>
      <motion.nav
        initial={{ y: 0, opacity: 1 }}
        animate={currentY ? { y: 0, opacity: 1 } : { y: "-100%", opacity: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className={`mainNavMbl ${!currentY && "hideNavBar"} ${showMenu && "hiddenNavBar"}`}
      >
        <div className="rightNavMbl">
          <GiHamburgerMenu
            className="GiHamburgerMenu"
            onClick={() => setShowMenu((prev) => !prev)}
          />
          <Link to={"/"}>
            <img
              src={webLogo}
              className="webLogoMbl"
              alt="My Anime Mobile logo"
            />
          </Link>
        </div>
        <div className="centerNavMbl">
          <form action="" onSubmit={(e) => handleSearch(e)}>
            <input
              autoComplete="off"
              type="text"
              className="navSearchMbl"
              placeholder="Search"
              onChange={(e) => {
                setUserQuerry(e.target.value);
              }}
            />
          </form>
        </div>
        <div className="leftNavMbl">
          {isNightMode ? (
            <LuSunMoon className="luSunMoon" onClick={handleTheme} />
          ) : (
            <LuSun onClick={handleTheme} />
          )}
        </div>
      </motion.nav>
      <AnimatePresence>
        {showMenu && (
          <Menu
            setShowMenu={setShowMenu}
            showMenu={showMenu}
            menuItems={menuItems}
            setMenuItems={setMenuItems}
          />
        )}
      </AnimatePresence>
    </>
  );
}
export default MobileNavBar;
