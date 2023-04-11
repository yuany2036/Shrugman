import { useContext, useState } from "react";
import AppContext from "../../Context/AppContext";
import ScoreModal from "../Modals/ScoreModal/ScoreModal";
import styles from "./Header.module.scss";

const Header = () => {
  const { gameState } = useContext(AppContext);
  const [scoreModalOn, setScoreModalOn] = useState(false);

  const resultsButtonHandler = () => {
    setScoreModalOn(true);
  };

  const category =
    gameState.category.slice(0, 1).toUpperCase() + gameState.category.slice(1);

  return (
    <header className={styles.header}>
      <h2 className={styles.logo}>Shrugman</h2>
      <p className={styles.category}>
        {(gameState.status.state === "guessing" ||
          gameState.status.state === "won" ||
          gameState.status.state === "lost") &&
          `(${category})`}
      </p>
      {gameState.score.length > 0 && (
        <button className={styles.btn} onClick={resultsButtonHandler}>
          View results
        </button>
      )}
      {scoreModalOn && (
        <ScoreModal
          scoreModalOn={scoreModalOn}
          setScoreModalOn={setScoreModalOn}
        />
      )}
    </header>
  );
};

export default Header;
