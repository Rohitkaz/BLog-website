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
import axios from "axios";
import BlogForm from "./pages/BlogForm";
import ShowBlogPage from "./pages/ShowBlogpage";
import Header from "./pages/Header";
import Dashboard from "./pages/Dashboard";
import Allblog from "./pages/Allblog";
import CommentBar from "./pages/comment";
import Header1 from "./pages/headercheck";

const router = createBrowserRouter([
  {
    element: <Home />,
    path: "/",
    loader: async ({ params }) => {
      console.log("hi");
      try {
        const res = await axios.get(`http://localhost:8000/blog`, {
          withCredentials: true,
        });
        const data = await res.data;
        console.log(data);
        return data;
      } catch (err) {
        return redirect("/");
      }
    },
  },
  {
    element: <Dashboard />,
    path: "/dashboard",
    loader: async ({ params }) => {
      console.log("hi");
      try {
        const res = await axios.get(`http://localhost:8000/dashboard`, {
          withCredentials: true,
        });
        const data = await res.data;

        return data;
      } catch (err) {
        return redirect("/login");
      }
    },
  },

  /* children: [
      {
        element: <Blog />,
        path: "blog",
      },
    ],*/
  // children: [
  {
    element: <Login />,
    path: "/Login",
  },
  {
    element: <Header1 />,
    path: "/image",
  },
  {
    element: <CommentBar />,
    path: "/contact",
  },
  {
    element: <Register />,
    path: "/Register",
  },
  {
    element: <BlogForm />,
    path: "/newblog",
  },
  {
    element: <ShowBlogPage />,
    path: "/blog/:id",
    loader: async ({ params }) => {
      console.log("hi");
      try {
        const res = await axios.get(`http://localhost:8000/blog/${params.id}`, {
          withCredentials: true,
        });
        const data = await res.data;
        console.log(data);
        return data;
      } catch (err) {
        return redirect("/");
      }
    },
  },
  {
    element: <Allblog />,
    path: "/Yourblog",
    loader: async ({ params }) => {
      console.log("hi");
      try {
        const res = await axios.get(`http://localhost:8000/Yourblog`, {
          withCredentials: true,
        });
        const data = await res.data;

        return data;
      } catch (err) {
        return redirect("/dashboard");
      }
    },
  },
  //  ],
  //  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
