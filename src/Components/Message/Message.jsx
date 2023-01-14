import { useContext } from "react";
import AppContext from "../../Context/AppContext";

const Message = () => {
  const { gameState, dispatchGameState, messages } = useContext(AppContext);

  const buttonHandler = (e) => {
    dispatchGameState({
      type: "SET_STATUS",
      payload: { page: "guessing", state: "guessing" },
    });
    e.target.innerText === "Books"
      ? dispatchGameState({ type: "SET_TITLE", payload: "books" })
      : dispatchGameState({ type: "SET_TITLE", payload: "movies" });
  };

  const welcomeMessage = (
    <p>
      Hey there! Welcome to Shrugman, I am Shruggy, the last person you want to
      see when playing this game! The goal of the game is to guess the correct
      title of either a movie or a book, one letter at a time. Any wrong guesses
      will cause me to reveal a tiny bit more of myself! And once you see all of
      me, then you'll know that <span>THE END IS NEIGH</span>. Anyways, best of
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
    <>
      {Object.keys(gameState.score).length === 0 && welcomeMessage}
      {Object.keys(gameState.score).length === 1 && messageAfterFirstGame}
      {Object.keys(gameState.score).length > 1 &&
        messages.snarkyComments[
          Math.floor(Math.random() * messages.snarkyComments.length)
        ]}
      <p>{gameState.shrug}</p>
      <p>Would you like to guess books or movies?</p>
      <button className="btn" onClick={buttonHandler}>
        Books
      </button>
      <button className="btn" onClick={buttonHandler}>
        Movies
      </button>
    </>
  );
};

export default Message;
