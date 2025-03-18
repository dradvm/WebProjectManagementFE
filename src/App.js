import GlobalStyles from "./GlobalStyles/globalStyle";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./App.module.scss";
import { createContext, useState } from "react";
import { publicRoutes, adminRoutes } from "./routes"; // Import adminRoutes
import { Fragment } from "react";
import DefaultLayout from "./Components/layouts/DefaultLayout";

import Login from "./Components/Login/login";
import SignUp from "./Components/Login/signUp";
import Content from "./Components/layouts/ContentComponent/Content/content";

export const itemsContext = createContext();
const cx = classNames.bind(styles);

function App() {
  const FORMS_API = "http://localhost:5000/items";
  const PROJECTS_API = "http://localhost:5000/projects";
  const [forms, setForms] = useState([]);
  const [trash, setTrash] = useState([]);
  const [deletedForms, setDeletedForms] = useState([]);
  const [sidebarIndexClicked, setSidebarIndexClicked] = useState(null);
  const [userRole, setUserRole] = useState("admin"); // Giả lập role, sau này có thể lấy từ API hoặc localStorage
  // import AdminLayout from "./Components/layouts/AdminLayout"; // Layout riêng cho Admin
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );
  return (
    <itemsContext.Provider
      value={{
        sidebarIndexClicked,
        setSidebarIndexClicked,
        userRole,
        FORMS_API,
        forms,
        setForms,
        trash,
        setTrash,
        setIsAuthenticated,
        deletedForms,
        setDeletedForms,
        PROJECTS_API,
      }}
    >
      <GlobalStyles>
        <Routes>
          {!isAuthenticated ? (
            <>
              <Route
                path="/login"
                element={
                  <Login
                    setIsAuthenticated={setIsAuthenticated}
                    onClose={() => {}}
                  />
                }
              />
              <Route path="/signup" element={<SignUp onClose={() => {}} />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </>
          ) : (
            <>
              {/* Routes Public */}
              {publicRoutes.map((route, index) => {
                const Page = route.component;
                const Layout = route.layout === null ? Fragment : route.layout;

                return (
                  <>
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
                  </>
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
                        <Content>
                          <Page />
                        </Content>
                      </Layout>
                    }
                  />
                );
              })}
            </>
          )}
        </Routes>
      </GlobalStyles>
    </itemsContext.Provider>
  );
}

export default App;
