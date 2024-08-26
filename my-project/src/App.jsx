import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  redirect,
} from "react-router-dom";
import { Contextprovider } from "./pages/context";
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
import Root from "./pages/Root";
import { Await, defer } from "react-router-dom";
import Card from "./pages/Card";
import Slider from "./pages/Slider";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        element: <Home />,
        path: "/",
        loader: async ({ params }) => {
          // console.log("hi");

          try {
            const res = axios.get(`http://localhost:8000/blog`, {
              withCredentials: true,
            });

            return defer({ res: res });
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

      {
        element: <Slider />,
        path: "/blog",
      },

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
          // console.log("hi");
          try {
            const blogPromise = axios.get(
              `http://localhost:8000/blog/${params.id}`,
              {
                withCredentials: true,
              }
            );
            const viewPromise = axios.get(
              `http://localhost:8000/blog/${params.id}/views`,
              {
                withCredentials: true,
              }
            );
            const [blog, viewed] = await Promise.all([
              blogPromise,
              viewPromise,
            ]);

            return { blog: blog.data.blog, userlike: viewed.data.userlike };
          } catch (err) {
            return redirect("/");
          }
        },
      },
      {
        element: <Allblog />,
        path: "/Yourblog",
      /*  loader: async ({ params }) => {
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
        },*/
      },
      //  ],
      //  },
    ],
  },
]);

function App() {
  return (
    //<Contextprovider>
    <RouterProvider router={router} />
    // </Contextprovider>
  );
}

export default App;
