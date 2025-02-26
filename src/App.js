import GlobalStyles from "./GlobalStyles/globalStyle";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./App.module.scss";
import { createContext, useState } from "react";
import { publicRoutes } from "./routes";
import { Fragment } from "react";
import DefaultLayout from "./Components/layouts/DefaultLayout";

export const sidebarContext = createContext();
const cx = classNames.bind(styles);

function App() {
  const [sidebarIndexClicked, setSidebarIndexClicked] = useState(null);

  return (
    <BrowserRouter>
      <sidebarContext.Provider
        value={{ sidebarIndexClicked, setSidebarIndexClicked }}
      >
        <GlobalStyles>
          <Routes>
            {publicRoutes.map((route, index) => {
              const Page = route.component;
              const Layout = route.layout === null ? Fragment : route.layout;

              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
          </Routes>
        </GlobalStyles>
      </sidebarContext.Provider>
    </BrowserRouter>
  );
}

export default App;
