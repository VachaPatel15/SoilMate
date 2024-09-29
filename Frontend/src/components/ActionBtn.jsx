import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { HiOutlineDownload } from "react-icons/hi";

const ActionBtn = (props) => {
  return (
    <>
      <div
        className="text-dark-green border-2 border-dark-green hover:bg-light-green hover:bg-opacity-20 py-2 px-4 fixed top-24 left-10 flex justify-center items-center rounded-full cursor-pointer transition-all ease-linear duration-200 hover:transition-all hover:duration-200 hover:ease-linear"
        onClick={props.resetPage}
      >
        <BiArrowBack className="text-base" />
        <p className="font-medium text-sm ml-2">Back</p>
      </div>
      <div
        className="bg-dark-green text-primary-light py-3 px-4 fixed top-24 right-10 flex justify-center items-center rounded-full cursor-pointer"
        onClick={() => window.print()}
      >
        <HiOutlineDownload className="text-base" />
        <p className="font-medium text-sm ml-2">Download Report</p>
      </div>
    </>
  );
};

export default ActionBtn;
