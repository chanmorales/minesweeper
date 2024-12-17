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

  const router = createBrowserRouter(routes, {
    basename: import.meta.env.BASE_URL,
  });

  return <RouterProvider router={router} />;
};
