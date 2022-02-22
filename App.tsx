import * as React from "react";
import RootNavigation from "./navigation";
import { store } from "./src/Store/store";
import { Provider as ReduxProvider } from "react-redux";

const App = () => {
  return (
    <>
      <ReduxProvider store={store}>
        <RootNavigation />
      </ReduxProvider>
    </>
  )
  
}

export default App
