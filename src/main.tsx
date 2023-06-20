import * as React from "react";
import * as ReactDOM from "react-dom/client";
import Archive from './pages/Archive.tsx';
import Recording from './pages/Recording.tsx';
import Visualisation from './pages/Visualisation.tsx';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Recording />,
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
    path: "/visualisation",
    element: <Visualisation />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);