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
import Dashboard from "./pages/NewDashboard";
import Allblog from "./pages/Allblog";
import CommentBar from "./pages/comment";

import Root from "./pages/Root";
import { Await, defer } from "react-router-dom";
import Card from "./pages/Card";
import Slider from "./pages/Slider";
import Editblog from "./pages/Editblog";
import { getCachedData } from "./utils/cache";
import { cacheset } from "./utils/cache";
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
          const data=await getCachedData();
          console.log(data)
          if(data)
          {
            console.log("from cache");
            return data;
          }
          try {
            const res = await axios.get(`http://localhost:8000/dashboard`, {
              withCredentials: true,
            });
            const data = await res.data;
            
              cacheset(data.latestcomment,data.username,data.userdata);
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
        loader: async ({ params }) => {
        
          try {
            const res = await axios.get(`http://localhost:8000/isauthenticated`, {
              withCredentials: true,
            });
         return redirect("/");
      

            
          } catch (err) {
            
      return {user:"unauthorized"};
          }
        },
      },
      
      
      {
        element: <Register />,
        path: "/Register",
        loader: async ({ params }) => {
        
          try {
            const res = await axios.get(`http://localhost:8000/isauthenticated`, {
              withCredentials: true,
            });
         return redirect("/");
      

            
          } catch (err) {
            
      return {user:"unauthorized"};
          }
        },
      },
      {
        element: <BlogForm />,
        path: "/newblog",
        loader: async ({ params }) => {
        
          try {
            const res = await axios.get(`http://localhost:8000/isauthenticated`, {
              withCredentials: true,
            });
         return null;
      

            
          } catch (err) {
            
      return redirect("/");
          }
        },
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
            const [blog, engagements] = await Promise.all([
              blogPromise,
              viewPromise,
            ]);
          console.log(engagements);
            return { blog: blog.data.blog, engagement:engagements.data };
          } catch (err) {
            return redirect("/");
          }
        },
      },
      {
        element: <Allblog />,
        path: "/Yourblog",
        loader: async ({ params }) => {
        
          try {
            const res = await axios.get(`http://localhost:8000/isauthenticated`, {
              withCredentials: true,
            });
         return null;
      

            
          } catch (err) {
            
      return redirect("/")
          }
        },
      },
      {
        element: <Editblog/>,
        path: `/Editblog/:id`,
       loader: async ({ params }) => {
        
          try {
            const res = await axios.get(`http://localhost:8000/blog/${params.id}`, {
              withCredentials: true,
            });
            const data =  res.data.blog;

            return data;
          } catch (err) {
            return redirect("/dashboard");
          }
        },
      },
      
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
