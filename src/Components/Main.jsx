import { useContext } from "react";
import AppContext from "../Context/AppContext";
import StartPage from "./StartPage/StartPage";
import Guessing from "./Guessing/Guessing";
import Message from "./Message/Message";
import Header from "./Header/Header";

const Main = () => {
  const { gameState } = useContext(AppContext);
  const { status } = gameState;
  // console.log(gameState);

  return (
    <>
      {status.page === "start" && <StartPage />}
      {
        <>
          {status.page !== "start" && <Header />}
          {status.page === "message" && <Message />}
          {status.page === "guessing" && <Guessing />}
        </>
      }
    </>
  );
};

export default Main;
