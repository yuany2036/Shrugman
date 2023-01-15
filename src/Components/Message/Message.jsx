import { useContext } from "react";
import Container from "../Container.jsx";
import AppContext from "../../Context/AppContext";
import styles from "./Message.module.scss";

const Message = () => {
  const { gameState, dispatchGameState, messages } = useContext(AppContext);

  const body = document.querySelector("body");
  body.classList.remove("won");

  const buttonHandler = (e) => {
    if (!e.target.classList.contains("btn")) return;
    dispatchGameState({
      type: "SET_STATUS",
      payload: { page: "guessing", state: "guessing" },
    });
    dispatchGameState({
      type: "SET_TITLE",
      payload: e.target.innerText.toLowerCase(),
    });
  };

  // const body = document.querySelector("body");

  // body.style.backgroundColor = "#60b347";

  const welcomeMessage = (
    <p>
      Hey there! Welcome to Shrugman, I am Shruggy, the last person you want to
      see when playing this game! The goal of the game is to guess the correct
      title of either a movie or a book, one letter at a time. Any wrong guesses
      will cause me to reveal a tiny bit more of myself! And once you see all of
      me, then you'll know that{" "}
      <span className={styles.fury}>THE END IS NEIGH</span>. Anyways, best of
      luck, enjoy, or something like that,"I don't really care."
    </p>
  );

  const messageAfterFirstGame = (
    <p>
      I'm sorry, did my snarky comment hurt your feelings? Here, let me do
      something to help with that. (Shrugs)
    </p>
  );

  return (
    <Container className={styles.messageContainer}>
      <Container className={styles.message}>
        {Object.keys(gameState.score).length === 0 && welcomeMessage}
        {Object.keys(gameState.score).length === 1 && messageAfterFirstGame}
        {Object.keys(gameState.score).length > 1 &&
          messages.snarkyComments[
            Math.floor(Math.random() * messages.snarkyComments.length)
          ]}
      </Container>
      <Container className={styles.optionsContainers}>
        <p className={styles.options}>
          Choose a category below to get started:
        </p>
        <div className={styles.buttonsContainer} onClick={buttonHandler}>
          <button className="btn">Books</button>
          <button className="btn">Movies</button>
          <button className="btn">Games</button>
        </div>
      </Container>
    </Container>
  );
};

export default Message;
