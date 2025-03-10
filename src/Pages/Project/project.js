import ProjectList from "../../Components/layouts/ProjectComponents/ProjectList";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import styles from "./project.module.scss"
import ProjectDetail from "../../Components/layouts/ProjectComponents/ProjectDetail";
function Project() {
  

  return (
    <Routes>
      <Route path="/" element={<ProjectList />} />
      <Route path="/:id" element={<ProjectDetail />} />
    </Routes>

  );
}


export default Project;
