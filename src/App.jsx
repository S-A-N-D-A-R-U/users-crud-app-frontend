import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import UserList from "./components/UsersList";
import AddUSer from "./components/AddUSer";
import UpdateUSer from "./components/UpdateUser";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      children: [
        { index: true, element: <UserList /> },
        { path: "add", element: <AddUSer /> },
        { path: "update/:id", element: <UpdateUSer /> },
      ],
    },
  ]);
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
