import { useContext, useEffect } from "react";
import AppContext from "../Context/AppContext";
import Keyboard from "./Keyboard/Keyboard";

const Guessing = () => {
  const { gameState, dispatchGameState } = useContext(AppContext);

  useEffect(() => {
    dispatchGameState({ type: "SET_MASKED_TITLE" });
  }, []);

  const keyboardFN = (e) => {
    if (!e.target.classList.contains("key")) return;
    dispatchGameState({ type: "GUESS_INPUT", payload: e.target });
    // console.log(e.target);
  };

  console.log(gameState.wrongGuesses);

  return (
    <>
      <div>{gameState.title}</div>
      <div>{gameState.maskedTitle}</div>
      <Keyboard keyPressHandler={keyboardFN} />
    </>
  );
};

export default Guessing;
