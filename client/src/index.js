import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./views/Home/Home";
import NewNote from "./views/NewNote/NewNote";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import UpdateNote from "./views/UpdateNote/UpdateNote";

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/new",
    element: <NewNote />,
  },
  {
    path: "/update/:id",
    element: <UpdateNote/>
  }
]);
root.render(
  <>
    <Toaster />
    <RouterProvider router={router} />
  </>
);
