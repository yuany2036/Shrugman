import { useContext, useState } from "react";
import AppContext from "../../Context/AppContext";
import ScoreModal from "../Modals/ScoreModal";

const Header = () => {
  const { gameState } = useContext(AppContext);
  const [scoreModalOn, setScoreModalOn] = useState(false);

  const resultsButtonHandler = () => {
    setScoreModalOn(true);
  };

  const category =
    gameState.category.slice(0, 1).toUpperCase() + gameState.category.slice(1);

  return (
    <header>
      <h2>Shrugman</h2>
      <p className="category">
        {(gameState.status.state === "guessing" ||
          gameState.status.state === "won" ||
          gameState.status.state === "lost") &&
          `(${category})`}
      </p>
      {gameState.score.length > 0 && (
        <button className="btn again" onClick={resultsButtonHandler}>
          View results
        </button>
      )}
      {scoreModalOn && (
        <ScoreModal
          setScoreModalOn={setScoreModalOn}
          scoreModalOn={scoreModalOn}
        />
      )}
    </header>
  );
};

export default Header;
