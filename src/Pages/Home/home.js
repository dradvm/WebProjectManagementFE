import { useContext, useEffect, useState } from "react";
import { itemsContext } from "../../App";
import axios from "axios";
import ProjectCard from "../../Components/layouts/ProjectComponents/ProjectCard";

function Home() {
  const { PROJECTS_API, FORMS_API } = useContext(itemsContext);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(FORMS_API);
        setProjects(response.data);
        console.log(response.data); // In ra dữ liệu thật sự
      } catch (error) {
        console.error("Lỗi khi lấy danh sách dự án:", error);
      }
    };

    fetchProjects();
  }, [PROJECTS_API]); // Chỉ chạy lại nếu PROJECTS_API thay đổi

  return (
    <div>
      <ProjectCard />
    </div>
  );
}

export default Home;
