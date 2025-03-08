import Home from "../Pages/Home/home";
import Trash from "../Pages/Trash/trash";
import Notification from "../Pages/Notification/notification";
import Project from "../Pages/Project/project";
import Form from "../Pages/Form/form";
import DefaultLayout from "../Components/layouts/DefaultLayout";
import ManageUsers from "../../src/Pages/Admin/ManageUsers";
import AdminSettings from "../../src/Pages/Admin/AdminSettings";
import AdminDashboard from "../../src/Pages/Admin/AdminDashboard";
import AdminLayout from "../../src/Components/layouts/AdminLayout/AdminLayout"; // Import layout mới
import Login from "../Components/Login/login";
import Signup from "../Components/Login/signUp";

export const publicRoutes = [
  { path: "/", component: Home, layout: DefaultLayout },
  { path: "/project", component: Project, layout: DefaultLayout },
  { path: "/notification", component: Notification, layout: DefaultLayout },
  { path: "/form", component: Form, layout: DefaultLayout },
  { path: "/trash", component: Trash, layout: DefaultLayout },
  { path: "/login", component: Login, layout: null }, // Không dùng layout
  { path: "/signup", component: Signup, layout: null }, // Không dùng layout
];

// Admin Routes (Thêm mới)
export const adminRoutes = [
  { path: "/dashboard", component: AdminDashboard, layout: AdminLayout },
  { path: "/users", component: ManageUsers, layout: AdminLayout },
  { path: "/settings", component: AdminSettings, layout: AdminLayout },
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

// Bổ sung sidebar cho Admin
export const adminSidebarItems = [
  {
    id: 0,
    name: "Trang chủ Admin",
    icon: "faGauge",
    path: "/dashboard",
    component: AdminDashboard,
    layout: DefaultLayout,
  },
  {
    id: 1,
    name: "Quản lý người dùng",
    icon: "faUsers",
    path: "/users",
    component: ManageUsers,
    layout: DefaultLayout,
  },
  {
    id: 2,
    name: "Cài đặt",
    icon: "faGears",
    path: "/settings",
    component: AdminSettings,
    layout: DefaultLayout,
  },
];


//Chuyen doi Login va SignUp
