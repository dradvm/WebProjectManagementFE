import GlobalStyles from "./GlobalStyles/globalStyle";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./App.module.scss";
import { createContext, useState } from "react";
import { publicRoutes, adminRoutes } from "./routes"; // Import adminRoutes
import { Fragment } from "react";
import DefaultLayout from "./Components/layouts/DefaultLayout";
// import AdminLayout from "./Components/layouts/AdminLayout"; // Layout riêng cho Admin
import Login from "./Components/Login/login";
import SignUp from "./Components/Login/signUp";
import Content from "./Components/layouts/ContentComponent/Content/content";

export const sidebarContext = createContext();
const cx = classNames.bind(styles);

function App() {
  const [sidebarIndexClicked, setSidebarIndexClicked] = useState(null);
  const [userRole, setUserRole] = useState("admin"); // Giả lập role, sau này có thể lấy từ API hoặc localStorage

  return (
    <BrowserRouter>
      <sidebarContext.Provider
        value={{ sidebarIndexClicked, setSidebarIndexClicked, userRole }}
      >
        <GlobalStyles>
          <Routes>
            {/* Routes Public */}
            {publicRoutes.map((route, index) => {
              const Page = route.component;
              const Layout = route.layout === null ? Fragment : route.layout;

              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Content>
                        <Page />
                      </Content>
                    </Layout>
                  }
                />
              );
            })}

            {/* Routes Admin */}
            {adminRoutes.map((route, index) => {
              const Page = route.component;
              const Layout = route.layout;

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
