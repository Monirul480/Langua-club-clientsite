import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Pages/Home/Shared/Footer/Footer";
import Navbar from "../Pages/Home/Shared/Navbar/Navbar";

const Main = () => {
  const location = useLocation();
  const noHeaderFooter =
    location.pathname.includes("login") || location.pathname.includes("register");
  console.log(noHeaderFooter);

  return (
    <div>
      <>
        {noHeaderFooter || <Navbar></Navbar>}
        <Outlet></Outlet>
        {noHeaderFooter || <Footer></Footer>}
      </>
    </div>
  );
};

export default Main;
