import { Game, Home } from "@/pages";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

export const Routes = () => {
  const routes = [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/game",
      element: <Game />,
    },
    {
      path: "*",
      element: <Navigate to="/" replace />,
    },
  ];

  const router = createBrowserRouter(routes, { basename: "/minesweeper" });

  return <RouterProvider router={router} />;
};
