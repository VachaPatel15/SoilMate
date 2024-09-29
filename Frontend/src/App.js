import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./screens/Home";
import Crop from "./screens/Predictor Model/Crop";
import CropDisease from "./screens/Predictor Model/CropDisease";
import Fertilizer from "./screens/Predictor Model/Fertilizer";
import Contact from "./screens/Contact";
import Blog from "./screens/Predictor Model/Blog"

const App = () => {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Home />} />
      <Route path="/query" element={<Contact />} />
      <Route path="/crop-recommend" element={<Crop />} />
      <Route path="/fertilizer" element={<Fertilizer />} />
      <Route path="/crop-disease" element={<CropDisease />} />
      <Route path="/blog" element={<Blog />} />
    </Routes>
  );
};

export default App;
