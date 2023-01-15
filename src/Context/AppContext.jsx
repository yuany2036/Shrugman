import { createContext, useReducer } from "react";
import { messages } from "./data/messages";
import { options } from "./data/options";

const AppContext = createContext();

const intitalState = {
  status: { page: "start", state: null }, // For checking what state the game is at
  category: "",
  categoryLengths: { books: 0, movies: 0, games: 0 },
  title: "",
  maskedTitle: "", // Letters from title converted to underscores
  wrongGuesses: "", // The string that will slowly become shruggy
  guessedLetters: {}, // Stores all guesses
  shrug: "¯\\_(:/)_/¯", // Stores the shruggy template
  score: [], // Stores all games played
  // options: {},
};

const reset = (state) => {
  state.category = "";
  state.title = "";
  state.maskedTitle = "";
  state.wrongGuesses = "";
  state.guessedLetters = {};
};

const reducerFN = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    // ! Changing the game status
    case "SET_STATUS":
      return { ...state, status: payload };
    // ! Selecting title
    case "SET_TITLE":
      let title;
      let condition;
      do {
        title =
          options[payload][Math.floor(Math.random() * options[payload].length)];
        const array = state.score.filter(({ title: titleName }) => {
          console.log("titles", titleName, title);
          return titleName === title;
        });
        condition = array.length > 0;
      } while (condition);

      return { ...state, title: title, category: payload };

    // ! Creating masked title
    case "SET_MASKED_TITLE":
      let startMaskedTitle = "";
      for (let i = 0; i < state.title.length; i++) {
        if (
          state.title[i] === " " ||
          state.title[i] === "," ||
          state.title[i] === "'" ||
          state.title[i] === ":"
        )
          startMaskedTitle += state.title[i];
        else startMaskedTitle += "_";
      }
      return { ...state, maskedTitle: startMaskedTitle };

    // ! Handling inputs
    case "GUESS_INPUT":
      const { target, listenerFN } = payload;
      // Checking if input has already been gussed
      if (state.guessedLetters.hasOwnProperty(target.textContent)) {
        return { ...state };
      }

      // Checking if letter is in title
      const correct = state.title
        .toLowerCase()
        .includes(target.textContent.toLowerCase());

      // Adding Keyboard styling, indicating right or wrong guess
      correct
        ? target.classList.add("guessed", "correctGuess")
        : target.classList.add("guessed", "wrongGuess");
      target.classList.remove("active");

      // Changing the masked title
      let newMaskedTitle = state.maskedTitle;
      let newWrongGuesses = state.wrongGuesses;
      if (correct) {
        for (let i = 0; i < state.maskedTitle.length; i++) {
          if (
            state.title[i].toLowerCase() === target.textContent.toLowerCase()
          ) {
            newMaskedTitle =
              newMaskedTitle.slice(0, i) +
              state.title[i] +
              newMaskedTitle.slice(i + 1);
          }
        }
        // If wrong guess, slowly revealing the shrugman
      } else {
        newWrongGuesses += state.shrug.slice(
          state.wrongGuesses.length,
          state.wrongGuesses.length + 1
        );
      }

      // Condition for winning and loosing
      if (newWrongGuesses.length === 10 || !newMaskedTitle.includes("_")) {
        document.removeEventListener("keypress", listenerFN);
        let allActiveKeys = document.querySelectorAll(".active");
        [...allActiveKeys].map((el) => el.classList.remove("active"));
        if (newWrongGuesses.length === 10) {
          return {
            ...state,
            categoryLengths: {
              ...state.categoryLengths,
              [state.category]: state.categoryLengths[state.category] + 1,
            },
            maskedTitle: state.title,
            wrongGuesses: newWrongGuesses,
            status: { page: "guessing", state: "lost" },
            score: [...state.score, { title: state.title, result: "lost" }],
          };
        } else if (!newMaskedTitle.includes("_")) {
          return {
            ...state,
            categoryLengths: {
              ...state.categoryLengths,
              [state.category]: state.categoryLengths[state.category] + 1,
            },
            maskedTitle: newMaskedTitle,
            status: { page: "guessing", state: "won" },
            score: [...state.score, { title: state.title, result: "won" }],
          };
        }
      }

      return {
        ...state,
        guessedLetters: {
          ...state.guessedLetters,
          [target.textContent]: correct,
        },
        maskedTitle: newMaskedTitle,
        wrongGuesses: newWrongGuesses,
      };
    default:
      throw new Error();
  }
};

export const AppContextProvider = ({ children }) => {
  const [gameState, dispatchGameState] = useReducer(reducerFN, intitalState);

  return (
    <AppContext.Provider
      value={{
        reset,
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
