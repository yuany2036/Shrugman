import "./App.css";
// import { useContext } from "react";
// import AppContext from "./Context/AppContext";
import Main from "./Components/Main";
import { AppContextProvider } from "./Context/AppContext";

function App() {
  // const { isGuessing, setIsGuessing } = useContext(AppContext);

  return (
    <AppContextProvider>
      <Main />
    </AppContextProvider>
  );
}

export default App;
