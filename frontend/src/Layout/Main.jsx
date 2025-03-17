import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { Toaster } from "react-hot-toast";

const Main = () => {
  return (
    <>
      <Navbar />
      <Toaster />
      <Outlet />
    </>
  );
};

export default Main;
