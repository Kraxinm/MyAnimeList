import { useContext } from "react";
import { IsMobileContext } from "../../App";
import { createPortal } from "react-dom";
import { motion } from "motion/react";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { AnimatePresence } from "motion/react";
function AnimeCardNotification() {
  let { addNotification } = useContext(IsMobileContext);
  return createPortal(
    <AnimatePresence>
      {addNotification.show && (
        <motion.div
          style={{
            left: "50%",
            x: "-50%", //
          }}
          className={`addNotification ${addNotification.type}`}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", duration: 0.4 }}
        >
          <IoCheckmarkCircleSharp /> <h6> {addNotification.message}</h6>
        </motion.div>
      )}
    </AnimatePresence>,
    document.getElementById("root"),
  );
}
export default AnimeCardNotification;
