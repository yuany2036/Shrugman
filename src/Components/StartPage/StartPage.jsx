import { useContext } from "react";
import AppContext from "../../Context/AppContext";

const StartPage = () => {
  const { dispatchGameState } = useContext(AppContext);

  const buttonClickHandler = () => {
    dispatchGameState({ type: "SET_STATUS", payload: { page: "message" } });
  };
  return (
    <>
      <h1>Shrugman</h1>
      <h2 className="shruggy">¯\_(:/)_/¯</h2>
      <button className="btn start" onClick={buttonClickHandler}>
        Start Game
      </button>
    </>
  );
};

export default StartPage;
