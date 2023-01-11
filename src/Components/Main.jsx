import { useContext } from "react";
import AppContext from "../Context/AppContext";
import Guessing from "./Guessing";
import Message from "./Message";

const Main = () => {
  const { isGuessing } = useContext(AppContext);

  return <>{isGuessing ? <Guessing /> : <Message />}</>;
};

export default Main;
