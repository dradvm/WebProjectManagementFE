import Home from "../Pages/Home/home";
import Trash from "../Pages/Trash/trash";
import Notification from "../Pages/Notification/notification";
import Project from "../Pages/Project/project";
import Form from "../Pages/Form/form";
import DefaultLayout from "../Components/layouts/DefaultLayout";

export const publicRoutes = [
  { path: "/", component: Home, layout: DefaultLayout }, // Không có layout
  { path: "/trash", component: Trash, layout: DefaultLayout },
  { path: "/notification", component: Notification, layout: DefaultLayout },
  { path: "/project", component: Project, layout: DefaultLayout },
  { path: "/form", component: Form, layout: DefaultLayout },
];
