import React from "react";
import { useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Services from "../components/Services";
import "../styles/Home.css";
const Home = () => {
  const router = useLocation();
  return (
    <div className="bg-primary-light min-h-[100vh] w-full scroll-smooth ">
      <div className="flex justify-center flex-col items-center min-h-[100vh] w-full bg-hero-bg bg-no-repeat bg-cover relative">
        <Navbar menu={router.pathname} />
        <div className="relative transition-all ease duration-500 hover:scale-110 hover:transition-all hover:duration-500 hover:ease cursor-pointer">
          <svg
            className="absolute right-72 top-1"
            fill="#29AB87"
            width="40px"
            height="40px"
            viewBox="0 0 14 14"
            role="img"
            focusable="false"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m 9.2375,10.433335 c -0.9041667,0.45 -1.9145833,0.71666 -2.9333333,0.71666 -1.7125,0 -3.1479167,-0.83541 -3.1479167,-0.83541 -0.3354167,0 -0.7375,1.35208 -1.31875,1.35208 -0.5625,0 -0.8375,-0.5 -0.8375,-0.80208 0,-0.68959 1.325,-1.22709 1.325,-1.61042 0,0 -0.2604167,-0.44167 -0.2604167,-1.23333 0,-2.10834 1.69375,-3.6125 3.5958334,-4.23542 1.3729166,-0.45 4.2916666,0.0729 5.2229163,-0.80208 0.36875,-0.3375 0.55,-0.65 1.1125,-0.65 0.75625,0 1.004167,1.94166 1.004167,2.50625 0,2.31041 -1.135417,4.30208 -3.7625,5.59375 z m -5.2979167,-1.575 c 1.3229167,-1.87292 3.0104167,-2.68334 5.36875,-2.5 0.1833334,0.0146 0.34375,-0.12292 0.3583334,-0.30625 0.014583,-0.18334 -0.1229167,-0.34375 -0.30625,-0.35834 -2.5833334,-0.2 -4.4979167,0.70625 -5.9645834,2.78125 -0.10625,0.15 -0.070833,0.35834 0.079167,0.46459 0.15,0.10625 0.3583333,0.0708 0.4645833,-0.0813 z" />
          </svg>
          <p className="text-primary-light font-bold text-8xl">SoilMate</p>
        </div>
        <p className="text-primary-light font-medium text-2xl mt-5 text-center">
          "Empowering Farmers with Precise Predictions and Insights."
        </p>
        <img
          className="absolute -bottom-10"
          decoding="async"
          src={require("../assets/divider.png")}
          alt=""
        />
      </div>
      <Services />
      <Footer />
    </div>
  );
};

export default Home;
