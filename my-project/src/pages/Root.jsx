import { Outlet } from "react-router-dom";
import { Contextprovider } from "./context";
import Header from "./Header";
const Root = () => {
  return (
    <Contextprovider>
      <Header/>
      <Outlet />
    </Contextprovider>
  );
};
export default Root;
