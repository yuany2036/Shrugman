import ReactDOM from "react-dom";
import { useContext } from "react";
import AppContext from "../../Context/AppContext";
import styles from "./ScoreModal.module.scss";

const ScoreModal = ({ setScoreModalOn, scoreModalOn }) => {
  const { gameState } = useContext(AppContext);

  const closeModal = () => {
    document.removeEventListener("keydown", keyCloseModal);
    setScoreModalOn(false);
  };

  const keyCloseModal = (e) => {
    // console.log(e);
    if (e.key === "Escape") {
      document.removeEventListener("keydown", keyCloseModal);
      setScoreModalOn(false);
    }
  };

  if (scoreModalOn) document.addEventListener("keydown", keyCloseModal);

  console.log(gameState.score);

  return (
    <>
      {ReactDOM.createPortal(
        <div className={styles.overlay} onClick={closeModal}></div>,
        document.getElementById("overlayRoot")
      )}
      {ReactDOM.createPortal(
        <div className={styles.modal}>
          <h3 className={styles.heading}>Results:</h3>
          <ul>
            {gameState.score.map(({ title, result }, index) => (
              <li key={index} className={styles.list}>
                {`${index + 1}. ${title}:`}
                <span className={result === "won" ? styles.won : styles.lost}>
                  {result.toUpperCase()}
                </span>
              </li>
            ))}
          </ul>
        </div>,
        document.getElementById("modalRoot")
      )}
    </>
  );
};

export default ScoreModal;
