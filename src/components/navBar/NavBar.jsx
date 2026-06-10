import "../../assets/css/navBarDesk.css";
import "../../assets/css/navBarMbl.css";
import "../../assets/css/navBar.css";

import { useContext, useEffect, useRef, useState } from "react";
import DeskTopNav from "./DesktopNavBar";
import MobileNavBar from "./MobileNavBar";
import { IsMobileContext } from "../../App";

function NavBar() {
  let [showNavBar, setShowNavBar] = useState(true);
  let prevY = useRef(0);

  const { isMobile, isNavBarTransparent } = useContext(IsMobileContext);

  useEffect(() => {
    const handleScroll = (event) => {
      if (window.scrollY - 15 > prevY.current) {
        setShowNavBar(false);

        prevY.current = window.scrollY;
      } else if (window.scrollY + 15 < prevY.current) {
        setShowNavBar(true);
        prevY.current = window.scrollY;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`navBarWrapper ${isNavBarTransparent && "transparentNavBar"}`}
    >
      {isMobile == "mobile" ? (
        <MobileNavBar currentY={showNavBar} />
      ) : (
        <DeskTopNav currentY={showNavBar} />
      )}
    </div>
  );
}
export default NavBar;
