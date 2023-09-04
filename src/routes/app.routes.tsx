import { MainPages, DashboardPages, AuthPages, ComponentPages } from "../pages";
import Layout from "../layouts";

export const AppRoutes = [
  {
    Component: Layout.DashboardAuth,

    children: [
      { path: "/", Component: AuthPages.Signin },
      { path: "/signin", Component: AuthPages.Signin },
      { path: "/signup", Component: AuthPages.SignUp },
      { path: "/verify-email", Component: AuthPages.Verfication },
      { path: "/resend-verification", Component: AuthPages.ResendVerification }
    ],
  },
  {
    Component: Layout.Dashboard,
    children: [
      { path: "/dashboard", Component: DashboardPages.Main },
      { path: "/categories", Component: DashboardPages.Categories },
      { path: "/cars", Component: DashboardPages.Car }
    ],
  },
];
