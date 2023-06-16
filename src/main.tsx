import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from './App.tsx';
import Archive from './pages/Archive.tsx';
import Recoding from './pages/Recoding.tsx';
import Visualisation from './pages/Visualisation.tsx';
import './index.css';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/archive",
    element: <Archive />,
  },
  {
    path: "/recoding",
    element: <Recoding />,
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