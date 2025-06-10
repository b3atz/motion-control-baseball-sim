import { Outlet } from "react-router-dom";
import MCBSNav from "./navbar";

function Layout() {
  return (
    <>
      <MCBSNav></MCBSNav> 

      <div className="content">
        <Outlet /> 
      </div>
    </>
  );
}

export default Layout;