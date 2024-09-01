import { Link } from "react-router-dom";

const Dashboardheader = () => {
  return (
    <nav className="flex flex-wrap mt-[40px]   flex-row w-[screen] justify-between md:justify-start h-[42px] items-center font-heading list-none md:gap-4  font-bold border-2 border-stone-400">
      <li className="hover:text-green-600  pl-[1%] ">
        <Link to="/dashboard">Dashboard</Link>
      </li>
      <li className="hover:text-green-600">
        <Link to="/yourblog">Your Blogs</Link>
      </li>
      <li className="hover:text-green-600">
        <Link to="/newblog">New Blog</Link>
      </li>
    </nav>
  );
};
export default Dashboardheader;
