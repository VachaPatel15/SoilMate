import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../../components/Navbar";
import TitleCont from "../../components/TitleCont";
import { HiOutlineUpload } from "react-icons/hi";
import { IoCloseSharp } from "react-icons/io5";
import ActionBtn from "../../components/ActionBtn";
import Footer from "../../components/Footer";
const Lumpy = () => {
  useEffect(() => {
    document.title = "Lumpy Disease Predictor";
  }, []);
  const [result, setResult] = useState(null);
  const [reportDate, setReportDate] = useState();
  const [file, setFile] = useState();

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setFile(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.loading("Image Processing");
    const formData = new FormData(e.target);
    const Upload = async () => {
      setResult();
      await fetch("/cattle-disease-predict", {
        method: "POST",
        body: formData,
      }).then((resp) => {
        resp
          .json()
          .then((data) => {
            console.log(data.file.split("<br/>"));
            toast.dismiss();
            setResult(data);
            let date = new Date();
            setReportDate(
              date.toDateString() + " " + date.toLocaleTimeString()
            );
            toast.success("Result Generated");
          })
          .catch((error) => {
            toast.dismiss();
            toast.error("Something Went Wrong");
            console.error("Error:", error);
          });
      });
    };
    Upload();
  };

  const resetPage = () => {
    setFile();
    setResult(null);
  };

  return (
    <>
      <div className="flex justify-center flex-col items-center min-h-[100vh] w-full">
        <Navbar menu={"/lumpy-disease"} />
        <section
          className="text-gray-600 body-font relative pt-14 w-full"
          id="removePadding"
        >
          {!result && (
            <>
              <TitleCont title="Lumpy Disease Predictor" />
              <form
                onSubmit={handleSubmit}
                className="w-[60%] mx-auto mt-10 flex justify-center items-center flex-col"
                encType="multipart/form-data"
              >
                {!file && (
                  <label
                    htmlFor="image"
                    className="font-weight-bold mr-md-4 bg-light-green border-2 border-light-green bg-opacity-40 rounded-xl w-[40%] h-[180px] text-dark-green border-dashed cursor-pointer flex justify-center items-center flex-col"
                  >
                    <HiOutlineUpload className="text-5xl" />
                    <p className="mt-4 font-medium text-sm">
                      Upload Infected Animal Image
                    </p>
                  </label>
                )}
                <input
                  onChange={onImageChange}
                  type="file"
                  id="image"
                  name="file"
                  accept="image/*"
                  className="hidden"
                />
                {file && (
                  <div className="mx-auto relative">
                    <img
                      src={file}
                      alt="user added"
                      className="rounded-xl shadow-md h-[200px] object-contain"
                    />
                    <div
                      className="absolute -top-4 -right-4 bg-light-green p-3 rounded-full cursor-pointer hover:bg-dark-green hover:text-secondary-light ease-linear hover:ease-linear transition-all hover:transition-all hover:duration-300 duration-300"
                      onClick={resetPage}
                    >
                      <IoCloseSharp className="text-2xl" />
                    </div>
                  </div>
                )}
                <div className="p-2 w-full mt-10">
                  <button className="flex mx-auto text-primary-light bg-dark-green border-2 border-dark-green py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg transition-all ease-linear duration-300 hover:transition-all hover:duration-300 hover:ease-linear hover:bg-primary-light hover:text-dark-green">
                    Submit Image
                  </button>
                </div>
              </form>
            </>
          )}
          {result && (
            <>
              <div id="actionBtn">
                <ActionBtn resetPage={resetPage} />
              </div>
              <div
                className="w-[60%] mx-auto pt-6 bg-secondary-light px-10 border-[1.4px] rounded-md border-[#181818]"
                id="print"
              >
                <div className="relative flex flex-col justify-center items-center">
                  <svg
                    className="absolute z-10"
                    width="400"
                    height="400"
                    viewBox="0 0 46 41"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M34.3733 0.0732841C34.1334 0.111675 33.5287 0.274845 33.0296 0.438015C31.7242 0.850735 31.2155 0.975513 28.5952 1.51301C26.0805 2.02172 24.3912 2.47283 23.009 3.01993C21.0318 3.78778 18.901 5.05475 17.2885 6.39849C16.8374 6.77282 16.4535 7.07997 16.4247 7.07997C16.3479 7.07997 16.1655 6.75363 15.4361 5.40028C14.6202 3.85497 14.1595 3.25029 13.4396 2.77037C12.6238 2.22328 12.0575 2.06011 11.1169 2.0985C9.46598 2.17529 8.41978 3.02953 7.2584 5.25631C6.89367 5.95698 5.81867 7.70385 4.87804 9.13398C2.23854 13.146 1.06756 15.6992 0.453274 18.7898C-0.890474 25.5757 0.808407 32.3808 4.82045 36.2009C6.1834 37.5159 7.69991 38.3605 9.3892 38.7636C10.1091 38.9364 10.4354 38.9556 11.5776 38.9172C12.4318 38.8884 13.1037 38.8116 13.4204 38.7156L13.9195 38.5525L14.8122 39.0036C17.6245 40.4145 20.264 41 23.8633 41C28.1537 41 31.5514 40.069 35.3811 37.8614C35.7554 37.6502 37.0512 36.8152 38.2798 36.0089C39.4987 35.1931 41.0633 34.2333 41.7543 33.8685C43.2228 33.1007 43.8179 32.6688 44.2978 32.0353C44.8065 31.3634 45.0561 30.7395 45.1041 29.9621C45.1617 29.0982 44.9697 28.4168 44.4514 27.6393C43.9523 26.9002 43.3284 26.4203 41.7543 25.5949C41.0537 25.2206 39.4412 24.2319 38.1646 23.3969C36.888 22.5619 35.3715 21.6116 34.7956 21.2949C34.2197 20.9782 33.6918 20.6806 33.6246 20.6422C33.5287 20.5846 33.6342 20.3639 34.0374 19.7496C35.6787 17.2541 36.5617 14.8545 37.4831 10.3817C37.7807 8.95161 38.1262 7.4255 38.2606 6.97439C38.7693 5.2947 38.9804 4.35408 38.9804 3.77819C38.9708 1.22507 36.984 -0.368237 34.3733 0.0732841ZM34.5365 4.60363C34.5173 4.72841 34.3445 5.34269 34.1525 5.97617C33.9702 6.60965 33.5959 8.22215 33.3175 9.5659C32.588 13.146 32.2617 14.1922 31.2827 16.1119C29.9773 18.6746 27.6738 21.1317 25.303 22.5043C24.6503 22.8882 22.8747 23.6849 22.6923 23.6849C22.6347 23.6849 22.5771 23.0706 22.5387 22.1683C22.414 18.5018 21.3198 14.9121 19.3137 11.6007C19.045 11.1592 18.8242 10.7561 18.8242 10.7177C18.8242 10.6025 20.3215 9.32594 21.1566 8.74046C23.2682 7.24314 25.2742 6.50407 29.5262 5.64024C31.513 5.23711 32.8568 4.91077 33.8454 4.59403C34.5845 4.35408 34.5941 4.35408 34.5365 4.60363ZM12.0575 8.03979C12.4126 8.70206 13.3437 10.209 14.1211 11.3992C14.889 12.5893 15.6856 13.8179 15.868 14.1346C16.895 15.8527 17.6724 17.8491 18.0468 19.7016C19.0834 24.7694 17.8548 30.0964 14.9753 33.0047C13.3533 34.6364 11.6352 35.1451 9.82112 34.5212C7.42157 33.6958 5.35795 30.6915 4.52291 26.8043C4.22537 25.4317 4.14858 22.2547 4.36934 20.7286C4.83965 17.5516 5.61711 15.7663 8.36219 11.5911C9.79232 9.41233 10.2434 8.66367 10.9057 7.38711C11.1073 7.00318 11.2992 6.72483 11.3376 6.76323C11.376 6.80162 11.7024 7.37751 12.0575 8.03979ZM32.2137 24.875C32.8472 25.2014 34.4213 26.1324 35.6979 26.9386C36.984 27.7449 38.5773 28.6855 39.23 29.031C39.8827 29.367 40.4202 29.6837 40.4202 29.7317C40.4202 29.7701 40.065 29.9909 39.6331 30.2116C38.5005 30.7971 37.1568 31.6226 35.3715 32.8127C30.9467 35.7594 28.528 36.6616 24.5735 36.8056C22.4523 36.8824 20.5327 36.604 18.805 35.9609L18.2483 35.7594L18.6611 35.2987C19.784 34.0509 20.859 32.0929 21.5597 30.0101C21.7901 29.2998 21.9916 28.6471 21.9916 28.5511C21.9916 28.4552 22.0684 28.388 22.174 28.388C22.5099 28.388 24.3144 27.8025 25.2742 27.3802C25.8117 27.1498 26.6564 26.7083 27.1555 26.4107C28.1153 25.8348 29.7566 24.6351 30.1405 24.2223C30.3613 23.992 30.3805 23.9824 30.7164 24.1264C30.9084 24.2032 31.5802 24.5391 32.2137 24.875Z"
                      fill="#123C3D20"
                    />
                  </svg>
                  <p className="font-semibold text-2xl pb-2 text-center z-20 border-b-2 border-light-green w-full">
                    Results of Lumpy Disease Predictor
                  </p>
                  <div className="mt-6 z-20 w-full">
                    <div className="flex justify-evenly items-center flex-wrap mx-auto">
                      <img
                        src={file}
                        alt="user added"
                        className="h-[200px] object-contain rounded-xl"
                      />
                    </div>
                  </div>
                  <div className="mt-4 z-20 w-full">
                    <p className="text-lg mt-2 font-medium flex items-center">
                      {result &&
                        result.file
                          .split("<br/>")[0]
                          .replace("<b>", "")
                          .replace("</b>", "")}
                    </p>
                    <p className="text-lg mt-2 font-medium flex items-center">
                      {result &&
                        result.file
                          .split("<br/>")[1]
                          .replace("<b>", "")
                          .replace("</b>", "")}
                    </p>
                    <p className="text-lg mt-2 font-medium flex items-center">
                      {result &&
                        result.file
                          .split("<br/>")[3]
                          .replace("<b>", "")
                          .replace("</b>", "")}
                    </p>
                  </div>
                  <div className="mt-6 z-20">
                    <p className="text-sm text-center pb-3 tracking-wide">
                      Report Generated At {reportDate}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </section>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              backgroundColor: "#123C3D",
              color: "#f5f5f5",
            },
          }}
        />
      </div>
      <Footer />
    </>
  );
};

export default Lumpy;
