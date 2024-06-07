import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  redirect,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import BlogForm from "./pages/BlogForm";
const router = createBrowserRouter([
  {
    element: <Home />,
    path: "/",

    /* children: [
      {
        element: <Blog />,
        path: "blog",
      },
    ],*/
  },
  {
    element: <Register />,
    path: "/Register",
  },
  {
    element: <BlogForm />,
    path: "/image",
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
