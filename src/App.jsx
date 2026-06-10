import Home from "./pages/Home.jsx";
import NavBar from "./components/navBar/NavBar.jsx";
import "./assets/css/app.css";
import { createContext, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Watching from "./pages/Watching.jsx";
import Completed from "./pages/Completed.jsx";
import Favourites from "./pages/Favourites.jsx";
import WatchList from "./pages/PlanToWatch.jsx";

import WatchListConext from "./components/WatchlistContext.jsx";
import AnimeDetails from "./pages/animeDetails/AnimeDetails.jsx";
import SearchAnime from "./pages/Search.jsx";

export const IsMobileContext = createContext(null);

function App() {
  const navigate = useNavigate();
  let [isMobile, setIsMobile] = useState(() => {
    if (window.innerWidth < 860) {
      return "mobile";
    } else if (window.innerWidth > 860 && window.innerWidth <= 1024) {
      return "tablet";
    } else if (window.innerWidth > 1024) {
      return "desktop";
    }
  });
  const [addNotification, setAddNotification] = useState({
    show: false,
    message: "",
    type: "",
  });
  function handleSearch(event) {
    event.preventDefault();
    navigate(`/search/${userQuerry}`);
  }
  const [userQuerry, setUserQuerry] = useState("");
  const [isNavBarTransparent, setIsNavBarTransparent] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 900) {
        setIsMobile("mobile");
      } else if (window.innerWidth > 900 && window.innerWidth <= 1024) {
        setIsMobile("tablet");
      } else if (window.innerWidth > 1024) {
        setIsMobile("desktop");
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div id="appWrapper">
      <IsMobileContext.Provider
        value={{
          isMobile,
          setIsMobile,
          addNotification,
          setAddNotification,
          isNavBarTransparent,
          setIsNavBarTransparent,
          setUserQuerry,
          userQuerry,
          handleSearch,
        }}
      >
        <NavBar />
        <WatchListConext>
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<AnimeDetails />} path="/anime/:id" />
            <Route element={<Watching />} path="/watching" />
            <Route element={<Completed />} path="/completed" />
            <Route element={<Favourites />} path="/favourites" />
            <Route element={<SearchAnime />} path="/search/:querry" />
            <Route element={<WatchList />} path="/planToWatch" />
          </Routes>
        </WatchListConext>
      </IsMobileContext.Provider>
    </div>
  );
}
export default App;
