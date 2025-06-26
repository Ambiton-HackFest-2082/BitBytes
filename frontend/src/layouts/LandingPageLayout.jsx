import { Outlet } from "react-router-dom";
import Navbar from "../components/LandingPage/Navbar";
import Footer from "../components/Landingpage/Footer";


const LandinPageLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default LandinPageLayout;
