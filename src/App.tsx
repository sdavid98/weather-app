import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Details, Home, Search } from "./containers";
import { AppRoute } from "./types/enums";

import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route Component={Home} path={AppRoute.HOME} />
          <Route Component={Search} path={AppRoute.SEARCH} />
          <Route Component={Details} path={AppRoute.DETAILS} />
          <Route Component={Home} path="*" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
