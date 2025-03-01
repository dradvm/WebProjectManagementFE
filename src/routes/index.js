import Home from "../Pages/Home/home";
import Trash from "../Pages/Trash/trash";
import Notification from "../Pages/Notification/notification";
import Project from "../Pages/Project/project";
import Form from "../Pages/Form/form";
import DefaultLayout from "../Components/layouts/DefaultLayout";

export const publicRoutes = [
  { path: "/", component: Home, layout: DefaultLayout }, // Không có layout
  { path: "/project", component: Project, layout: DefaultLayout },
  { path: "/notification", component: Notification, layout: DefaultLayout },
  { path: "/form", component: Form, layout: DefaultLayout },
  { path: "/trash", component: Trash, layout: DefaultLayout },
];

export const sidebarItems = [
  {
    id: 0,
    name: "Trang chủ",
    icon: "faHouse",
    path: "/",
    component: Home,
    layout: DefaultLayout,
  },
  {
    id: 1,
    name: "Dự án",
    icon: "faFolder",
    children: [
      {
        id: 4,
        name: "Danh sách dự án",
        icon: "faFile",
        path: "/project",
        component: Project,
        layout: DefaultLayout,
      },
      {
        id: 5,
        name: "Danh sách forms",
        icon: "faList",
        path: "/form",
        component: Form,
        layout: DefaultLayout,
      },
    ],
  },
  {
    id: 2,
    name: "Thông báo",
    icon: "faComment",
    path: "/notification",
    component: Notification,
    layout: DefaultLayout,
  },
  {
    id: 3,
    name: "Thùng rác",
    icon: "faTrash",
    path: "/trash",
    component: Trash,
    layout: DefaultLayout,
  },
];
