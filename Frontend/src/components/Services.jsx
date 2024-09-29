import React from "react";
import { Link } from "react-router-dom";
const Services = () => {
  return (
    <div className="flex items-center flex-col mb-20">
      <p className="my-10 font-semibold text-3xl">Services We Provide</p>
      <div className="flex justify-evenly items-center w-[70%] flex-col">
        <Link to="/crop-recommend">
          <div className="flex justify-center items-center shadow-md px-6 py-8 bg-primary-light border-2 border-light-green rounded-md ease transition-all duration-500 hover:scale-105 hover:transition-all hover:duration-500 hover:ease mb-10">
            <div className="bg-light-green h-24 w-32 overflow-hidden rounded-lg shadow-lg flex justify-center items-center">
              <img
                src={require("../assets/crop.png")}
                className="p-2 object-contain"
                alt=""
              />
            </div>

            <div>
              <p className="text-dark-green font-semibold text-2xl ml-6">
                Crop Predictor 
              </p>
              <p className="text-dark-green font-medium text-base mt-1 ml-6 leading-6">
                Soil-based crop recommendation system - Get personalized crop
                growing advice based on your soil composition.
              </p>
            </div>
          </div>
        </Link>
        <Link to="/crop-disease">
          <div className="flex justify-center items-center flex-row-reverse shadow-md px-6 py-8 bg-primary-light border-2 border-light-green rounded-md ease transition-all duration-500 hover:scale-105 hover:transition-all hover:duration-500 hover:ease mb-10">
            <div className="bg-light-green h-24 w-32 overflow-hidden rounded-lg shadow-lg flex justify-center items-center">
              <img
                src={require("../assets/crop_disease.png")}
                className="p-2 object-contain"
                alt=""
              />
            </div>
            <div>
              <p className="text-dark-green font-semibold text-2xl mr-6">
                Crop Disease Predictor
              </p>
              <p className="text-dark-green font-medium text-base mt-1 mr-6 leading-6">
                Image-based crop disease identification system - Quickly
                identify crop diseases with just a picture of the affected
                plant.
              </p>
            </div>
          </div>
        </Link>
        <Link to="/fertilizer">
          <div className="flex justify-center items-center shadow-md px-6 py-8 bg-primary-light border-2 border-light-green rounded-md ease transition-all duration-500 hover:scale-105 hover:transition-all hover:duration-500 hover:ease mb-10">
            <div className="bg-light-green h-24 w-32 overflow-hidden rounded-lg shadow-lg flex justify-center items-center">
              <img
                src={require("../assets/fertilizer.png")}
                className="p-2 object-contain"
                alt=""
              />
            </div>
            <div>
              <p className="text-dark-green font-semibold text-2xl ml-6">
                Fertilizer Predictor
              </p>
              <p className="text-dark-green font-medium text-base mt-1 ml-6 leading-6">
                Personalized fertilizer recommendation system - Get expert
                advice on the best fertilizer to enhance your crop yield.
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Services;
