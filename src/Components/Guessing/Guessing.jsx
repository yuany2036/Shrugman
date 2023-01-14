import { useContext, useEffect } from "react";
import Container from "../Container";
import AppContext from "../../Context/AppContext";
import Keyboard from "../Keyboard/Keyboard";

const Guessing = () => {
  const { reset, gameState, dispatchGameState, messages } =
    useContext(AppContext);

  const keyPressFN = (e) => {
    if (
      (e.key.toUpperCase().charCodeAt(0) > 64 &&
        e.key.toUpperCase().charCodeAt(0) < 90) ||
      (e.key.toUpperCase().charCodeAt(0) > 47 &&
        e.key.toUpperCase().charCodeAt(0) < 58)
    ) {
      let target;
      if (
        e.key.toUpperCase().charCodeAt(0) > 64 &&
        e.key.toUpperCase().charCodeAt(0) < 90
      ) {
        target = document.querySelector(`#${e.key.toUpperCase()}`);
      } else {
        const allNums = document.querySelectorAll(".num");
        const filteredNum = Array.from(allNums).filter(
          (num) => num.textContent === e.key
        );
        target = filteredNum[0];
      }
      dispatchGameState({
        type: "GUESS_INPUT",
        payload: { target: target, listenerFN: keyPressFN },
      });
    }
  };
  console.log(gameState.title);
  // console.log(gameState);

  useEffect(() => {
    dispatchGameState({ type: "SET_MASKED_TITLE" });
    document.addEventListener("keypress", keyPressFN);
  }, []);

  const anotherButtonHandler = () => {
    reset(gameState);
    dispatchGameState({
      type: "SET_STATUS",
      payload: { page: "message", state: null },
    });
  };
  const backButtonHandler = () => {
    // if (gameState.status.state === undefined) {
    //   return;
    // }
    reset(gameState);
    dispatchGameState({
      type: "SET_STATUS",
      payload: { page: "start", state: null },
    });
  };

  const keyboardFN = (e) => {
    if (
      !e.target.classList.contains("key") ||
      !e.target.classList.contains("active")
    )
      return;
    console.log(e.target);
    dispatchGameState({
      type: "GUESS_INPUT",
      payload: { target: e.target, listenerFN: keyPressFN },
    });
  };

  const chances = 10 - gameState.wrongGuesses.length;

  return (
    <Container className="gamePageContainer">
      <p className="maskedTitle">{gameState.wrongGuesses}</p>
      <p className="maskedTitle">{gameState.maskedTitle}</p>
      <Container className="bottom">
        <Keyboard
          keyPressHandler={
            gameState.status.page === "guessing" ? keyboardFN : undefined
          }
        />
        <Container className="messageSection">
          <p className="message">
            {gameState.status.state === "guessing"
              ? "Start guessing..."
              : gameState.status.state === "won"
              ? "You won!"
              : "You lost!"}
          </p>
          <p className="message">{`Chances left: ${chances}`}</p>
        </Container>
      </Container>
      <Container>
        {(gameState.status.state === "won" ||
          gameState.status.state === "lost") && (
          <>
            <p>
              {gameState.status.state === "won"
                ? messages.winningMessage[
                    Math.floor(Math.random() * messages.winningMessage.length)
                  ]
                : messages.losingMessage[
                    Math.floor(Math.random() * messages.losingMessage.length)
                  ]}
            </p>
            <button className="btn" onClick={backButtonHandler}>
              Back to menu
            </button>
            <button className="btn" onClick={anotherButtonHandler}>
              Another!
            </button>
          </>
        )}
      </Container>
    </Container>
  );
};

export default Guessing;
