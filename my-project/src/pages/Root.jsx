import { Outlet } from "react-router-dom";
import { Contextprovider } from "./context";
const Root = () => {
  return (
    <Contextprovider>
      <Outlet />
    </Contextprovider>
  );
};
export default Root;
