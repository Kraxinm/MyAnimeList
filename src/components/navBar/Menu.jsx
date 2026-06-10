import { createPortal } from "react-dom";
import webLogo from "../../assets/Logos/myAnimeMbl.svg";
import { MdClose } from "react-icons/md";
import { motion } from "motion/react";

import "../../assets/css/menu.css";
import { Link } from "react-router-dom";
function Menu({ setShowMenu, showMenu, menuItems, setMenuItems }) {
  return createPortal(
    <>
      <motion.div
        className={`menuWrapper`}
        initial={{ x: "-100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: "-100%", opacity: 0 }}
        transition={{ type: "keyframes", duration: 0.4 }}
      >
        <div className="menuHead">
          <img src={webLogo} alt="My Anime Mobile logo" />
          <MdClose className="closeMenu" onClick={() => setShowMenu(false)} />
        </div>
        <div className="menuList">
          <ul>
            {menuItems.map((item, index) => {
              return (
                <Link
                  to={item.navigateTo}
                  onClick={(e) => {
                    let tempVar = menuItems.map((items, indexs) => {
                      let tempVar1 = { ...items };

                      if (index === indexs) {
                        tempVar1.Selected = true;

                        return tempVar1;
                      } else {
                        tempVar1.Selected = false;
                        return tempVar1;
                      }
                    });

                    setMenuItems(tempVar);
                    setShowMenu(false);
                  }}
                  className="menuLinks"
                  key={index}
                >
                  <li
                    className={`${item.item} ${item.Selected ? "selectedItem" : item.bgColor} `}
                  >
                    <div className="menuIconBox">
                      <item.icon className="menuIcon" />{" "}
                    </div>
                    {item.item}
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
      </motion.div>{" "}
    </>,
    document.body,
  );
}
export default Menu;
