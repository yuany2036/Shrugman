import ReactDOM from "react-dom";
import { useContext } from "react";
import AppContext from "../../../Context/AppContext";
import styles from "./TitleInfoModal.module.scss";

const TitleInfoModal = ({ titleInfoModalOn, setTitleInfoModalOn }) => {
  const { title: titleObj, category } = useContext(AppContext).gameState;

  const { title, year, director, mainActors, summary, wikipediaLink } =
    titleObj;

  const detail =
    category === "movies"
      ? "Director"
      : category === "books"
      ? "Author"
      : "Studio";

  const closeModal = () => {
    document.removeEventListener("keydown", keyCloseModal);
    setTitleInfoModalOn(false);
  };

  const keyCloseModal = (e) => {
    if (e.key === "Escape") {
      document.removeEventListener("keydown", keyCloseModal);
      setTitleInfoModalOn(false);
    }
  };

  if (titleInfoModalOn) document.addEventListener("keydown", keyCloseModal);

  return (
    <>
      {ReactDOM.createPortal(
        <div className={styles.overlay} onClick={closeModal}></div>,
        document.getElementById("overlayRoot")
      )}
      {ReactDOM.createPortal(
        <div className={styles.modal}>
          <h3 className={styles.heading}>{title}</h3>
          <p className={styles.list}>Released in: {year}</p>
          <p className={styles.list}>
            {detail}: {director}
          </p>
          {category === "movies" && (
            <p className={styles.list}>Lead Actors: {mainActors.join(", ")}</p>
          )}
          <p className={styles.summary}>{summary}</p>
          <p className={styles.linkContainer}>
            <a
              className={styles.link}
              href={wikipediaLink}
              target="_blank"
              rel="noreferrer"
            >
              (Visit Wikipedia Page)
            </a>
          </p>
        </div>,
        document.getElementById("modalRoot")
      )}
    </>
  );
};

export default TitleInfoModal;
