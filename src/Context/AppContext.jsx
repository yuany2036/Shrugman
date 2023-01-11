import { createContext, useReducer, useState } from "react";
import { messages } from "./data/messages";
import { options } from "./data/options";

const AppContext = createContext();

const intitalState = {
  title: "",
  maskedTitle: "",
  wrongGuesses: "", // The string that will slowly become shruggy
  guessedLetters: {}, // Stores all guesses
  shrug: "¯\\_(:/)_/¯", // Stores the shruggy template
  score: {}, // Stores all games played
  // options: {},
};

const reducerFN = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_TITLE":
      const title =
        payload === "books"
          ? options["books"][
              Math.floor(Math.random() * options["books"].length)
            ]
          : options["movies"][
              Math.floor(Math.random() * options["movies"].length)
            ];
      return { ...state, title: title };
    case "SET_MASKED_TITLE":
      let startMaskedTitle = "";
      for (let i = 0; i < state.title.length; i++) {
        if (state.title[i] === " ") startMaskedTitle += state.title[i];
        else startMaskedTitle += "_";
      }
      return { ...state, maskedTitle: startMaskedTitle };
    case "GUESS_INPUT":
      // Checking if letter is in title
      const correct = state.title
        .toLowerCase()
        .includes(payload.textContent.toLowerCase());
      // Adding Keyboard styling
      correct
        ? payload.classList.add("guessed", "correctGuess")
        : payload.classList.add("guessed", "wrongGuess");
      // Changing the masked title
      let newMaskedTitle = state.maskedTitle;
      let newWrongGuesses = state.wrongGuesses;
      if (correct) {
        console.log(payload.textContent);
        for (let i = 0; i < state.maskedTitle.length; i++) {
          if (
            state.title[i].toLowerCase() === payload.textContent.toLowerCase()
          ) {
            newMaskedTitle =
              newMaskedTitle.slice(0, i) +
              state.title[i] +
              newMaskedTitle.slice(i + 1);
          }
        }
        // Slowly revealing the shrugman
      } else {
        newWrongGuesses += state.shrug.slice(
          state.wrongGuesses.length,
          state.wrongGuesses.length + 1
        );
      }
      return {
        ...state,
        guessedLetters: {
          ...state.guessedLetters,
          [payload.textContent]: correct,
        },
        maskedTitle: newMaskedTitle,
        wrongGuesses: newWrongGuesses,
      };
    default:
      throw new Error();
  }
};

export const AppContextProvider = ({ children }) => {
  const [isGuessing, setIsGuessing] = useState(false);
  const [gameState, dispatchGameState] = useReducer(reducerFN, intitalState);

  return (
    <AppContext.Provider
      value={{
        isGuessing,
        setIsGuessing,
        gameState,
        dispatchGameState,
        messages,
        options,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
