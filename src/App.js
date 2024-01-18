import React from "react";
import { BrowserRouter } from "react-router-dom";

import { PagesRouter } from "./routes/PagesRouter";
import Footer from "./components/Footer";
import SpaceStars from "./components/SpaceStars";

import { Provider } from "react-redux";
import { store } from "./redux/store.js";

export const App = () => (
  <BrowserRouter>
    <Provider store={store}>
      <main className="app">
        <PagesRouter />
      </main>
      <Footer />
      <SpaceStars />
    </Provider>
  </BrowserRouter>
);
