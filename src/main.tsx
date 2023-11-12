import * as React from "react";
import * as ReactDOM from "react-dom/client";
import Archive from './pages/Archive.tsx';
import Recording from './pages/Recording.tsx';
import Research from './pages/Research.tsx';
import Landing from './pages/Landing.tsx';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import axios from "axios";

const baseUrl = import.meta.env.VITE_BE_URL;
axios.defaults.baseURL = `https://${baseUrl}`;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/archive",
    element: <Archive />,
  },
  {
    path: "/recording",
    element: <Recording />,
  },
  {
    path: "/research",
    element: <Research />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);