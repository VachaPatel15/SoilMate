import React, { useEffect, useState } from "react";
import TitleCont from "../../components/TitleCont";
import Navbar from "../../components/Navbar";
import toast, { Toaster } from "react-hot-toast";
import { BsChevronDown } from "react-icons/bs";
import ActionBtn from "../../components/ActionBtn";
import Footer from "../../components/Footer";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { MdKeyboardVoice, MdRecordVoiceOver } from "react-icons/md";
const Fertilizer = () => {
  const [focus, setFocus] = useState({
    first: false,
    second: false,
    third: false,
  });
  const [data, setData] = useState({
    nitrogen: "",
    phosphorous: "",
    potassium: "",
    crop: "",
  });
  const [result, setResult] = useState(null);
  const [reportDate, setReportDate] = useState();
  useEffect(() => {
    document.title = "Fertilizer Predictor";
  }, []);

  let crop = [
    "Rice",
    "Jowar(Sorghum)",
    "Barley(JAV)",
    "Maize",
    "Ragi( naachnnii)",
    "Chickpeas(Channa)",
    "French Beans(Farasbi)",
    "Fava beans (Papdi - Val)",
    "Lima beans(Pavta)",
    "Cluster Beans(Gavar)",
    "Soyabean",
    "Black eyed beans( chawli)",
    "Kidney beans",
    "pigeon peas(Toor Dal)",
    "Moth bean(Matki)",
    "Mung beans",
    "Green Peas",
    "Horse Gram(kulthi)",
    "Black Gram",
    "Rapeseed (Mohri)",
    "Coriander seeds",
    "Mustard seeds",
    "sesame seed",
    "Cumin seeds",
    "Lentils(Masoor Dal)",
    "Brinjal",
    "Beetroot",
    "Bitter Gourd",
    "Bottle Gourd",
    "Capsicum",
    "Cabbage",
    "Carrot",
    "Cauliflower",
    "Cucumber",
    "Coriander leaves",
    "Curry leaves",
    "Drumstick - moringa",
    "Chili",
    "Lady Finger",
    "Mushroom",
    "Onion",
    "Potato",
    "Pumpkin",
    "Radish",
    "Olive",
    "Sweet Potato",
    "Fenugreek Leaf(methi)",
    "Spinach",
    "Ridgegourd",
    "Gooseberry(Amla)",
    "Jambun(Syzygium cumini)",
    "Ziziphus mauritiana(Bor)",
    "Garcinia indica(kokam)",
    "Tamarind",
    "Tapioca(Suran)",
    "Garlic",
    "Lemon",
    "Tomato",
    "Ash Gourd",
    "Pineapple",
    "Pomegranate",
    "Banana",
    "Mango",
    "Grapes",
    "Jackfruit",
    "Guava",
    "Water Melon",
    "Musk Melon",
    "Apricot",
    "Apple",
    "Chickoo",
    "Custard apple",
    "Dates",
    "Figs",
    "Orange",
    "Papaya",
    "Aniseed",
    "Asafoetida",
    "Bay Leaf",
    "Black Pepper",
    "Cardamom",
    "Cinnamon",
    "Cloves",
    "Jaiphal(Nutmeg)",
    "Ginger",
    "Turmeric",
    "Cashewnuts",
    "Raisins",
    "Coconut",
    "Almond Nut",
    "Arecanut",
    "Pistachio Nut",
    "Lemon Grass",
    "Cotton",
    "Jute",
    "Coffee",
    "Sunflower",
  ];
  const onSubmit = () => {
    setResult(null);
    toast.loading("Data Processing");
    fetch("/fertilizer-predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        setResult(result);
        toast.dismiss();
        toast.success("Result Generated");
        console.log(result);
        let date = new Date();
        setReportDate(date.toDateString() + " " + date.toLocaleTimeString());
      })
      .catch((error) => {
        toast.dismiss();
        console.error("Error:", error);
      });
  };

  const commands = [
    {
      command: [
        "nitrogen *",
        "phosphorous *",
        "potassium *",
        "ph *",
        "rainfall *",
      ],
      callback: (data) => console.log(data),
    },
  ];
  const { transcript } = useSpeechRecognition({
    commands,
  });

  console.log(transcript);

  useEffect(() => {
    if (focus.first === true) {
      SpeechRecognition.startListening();
      transcript !== "" &&
        setData({
          ...data,
          nitrogen: transcript,
        });
    } else if (focus.second === true) {
      SpeechRecognition.startListening();
      transcript !== "" &&
        setData({
          ...data,
          phosphorous: transcript,
        });
    } else if (focus.third === true) {
      SpeechRecognition.startListening();
      transcript !== "" &&
        setData({
          ...data,
          potassium: transcript,
        });
    } else {
      SpeechRecognition.stopListening();
    }
  }, [data, focus, transcript]);

  const resetPage = () => {
    setData({
      nitrogen: "",
      phosphorous: "",
      potassium: "",
      crop: "",
    });
    setResult(null);
  };

  return (
    <>
      <div className="flex justify-center flex-col items-center min-h-[100vh] w-full">
        <Navbar menu={"/fertilizer"} />
        <section className="text-gray-600 body-font relative w-full">
          {!result && (
            <>
              <TitleCont title="Fertilizer Predictor" />
              <div className="container px-5 mx-auto">
                <div className="lg:w-1/2 md:w-2/3 mx-auto">
                  <div className="flex flex-wrap -m-2">
                    <div className="p-2 w-1/2">
                      <div className="relative">
                        <div
                          className="absolute bottom-2 text-dark-green text-3xl cursor-pointer -left-9"
                          onClick={() =>
                            setFocus({ ...focus, first: !focus.first })
                          }
                        >
                          {/* {focus.first === true ? (
                            <MdRecordVoiceOver />
                          ) : (
                            <MdKeyboardVoice />
                          )} */}
                        </div>
                        <label
                          htmlFor="nitrogen"
                          className="leading-7 text-sm text-gray-600"
                        >
                          Enter Nitrogen Content
                        </label>
                        <input
                          value={data.nitrogen}
                          onChange={(e) =>
                            setData({ ...data, nitrogen: e.target.value })
                          }
                          type="number"
                          placeholder="40"
                          id="nitrogen"
                          name="nitrogen"
                          className="w-full bg-gray-100 bg-opacity-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                      </div>
                    </div>
                    <div className="p-2 w-1/2">
                      <div className="relative">
                        <div
                          className="absolute bottom-2 text-dark-green text-3xl cursor-pointer -right-9"
                          onClick={() =>
                            setFocus({ ...focus, second: !focus.second })
                          }
                        >
                          {/* {focus.second === true ? (
                            <MdRecordVoiceOver />
                          ) : (
                            <MdKeyboardVoice />
                          )} */}
                        </div>
                        <label
                          htmlFor="phosphorous"
                          className="leading-7 text-sm text-gray-600"
                        >
                          Enter Phosphorous Content
                        </label>
                        <input
                          value={data.phosphorous}
                          onChange={(e) =>
                            setData({ ...data, phosphorous: e.target.value })
                          }
                          type="number"
                          placeholder="40"
                          id="phosphorous"
                          name="phosphorous"
                          className="w-full bg-gray-100 bg-opacity-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                      </div>
                    </div>
                    <div className="p-2 w-1/2">
                      <div className="relative">
                        <div
                          className="absolute bottom-2 text-dark-green text-3xl cursor-pointer -left-9"
                          onClick={() =>
                            setFocus({ ...focus, third: !focus.third })
                          }
                        >
                          {/* {focus.third === true ? (
                            <MdRecordVoiceOver />
                          ) : (
                            <MdKeyboardVoice />
                          )} */}
                        </div>
                        <label
                          htmlFor="potassium"
                          className="leading-7 text-sm text-gray-600"
                        >
                          Enter Potassium Content
                        </label>
                        <input
                          value={data.potassium}
                          onChange={(e) =>
                            setData({ ...data, potassium: e.target.value })
                          }
                          type="number"
                          placeholder="40"
                          id="potassium"
                          name="potassium"
                          className="w-full bg-gray-100 bg-opacity-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                      </div>
                    </div>
                    <div className="p-2 w-1/2">
                      <div className="relative">
                        <label
                          htmlFor="crop"
                          className="leading-7 text-sm text-gray-600"
                        >
                          Select Crop You Want To Grow
                        </label>
                        <BsChevronDown className="absolute right-3 bottom-3" />
                        <select
                          value={data.crop}
                          onChange={(e) =>
                            setData({ ...data, crop: e.target.value })
                          }
                          name="crop"
                          id="crop"
                          className="w-full bg-gray-100 bg-opacity-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out appearance-none"
                        >
                          <option defaultValue>-- Select --</option>
                          {crop.map((item) => {
                            return <option value={item}>{item}</option>;
                          })}
                        </select>
                      </div>
                    </div>
                    <div className="p-2 w-full mt-10" onClick={onSubmit}>
                      <button className="flex mx-auto text-primary-light bg-dark-green border-2 border-dark-green py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg transition-all ease-linear duration-300 hover:transition-all hover:duration-300 hover:ease-linear hover:bg-primary-light hover:text-dark-green">
                        Submit Form
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </section>
        {result && (
          <>
            <div id="actionBtn">
              <ActionBtn resetPage={resetPage} />
            </div>
            <div
              className="w-[60%] mx-auto pt-6 bg-secondary-light px-10 border-[1.4px] rounded-md border-[#181818] mt-28 mb-16"
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
                <p className="font-semibold text-2xl text-center z-20">
                  Results of Fertilizer Predictor
                </p>
                <div className="mt-4 z-20 w-full">
                  <p className="text-xl font-semibold my-4 border-b-2 border-light-green">
                    User Input
                  </p>
                  <div className="flex justify-evenly items-center flex-wrap mx-auto">
                    <p className="text-base font-normal w-1/2">
                      Nitrogen (N): {data.nitrogen}
                    </p>
                    <p className="text-base font-normal w-1/2 mt-2">
                      Phosphorous (P): {data.phosphorous}
                    </p>
                    <p className="text-base font-normal w-1/2 mt-2">
                      Potassium (K): {data.potassium}
                    </p>
                    <p className="text-base font-normal w-1/2 mt-2">
                      Crop: {data.crop}
                    </p>
                  </div>
                </div>
                <div className="mt-4 z-20 w-full">
                  <p className="text-xl font-semibold my-4 border-b-2 border-light-green">
                    Recommended Fertilizer And Tips
                  </p>
                  <p className="text-lg mt-2 font-semibold flex items-center">
                    <svg
                      className="mr-2"
                      fill="#29AB87"
                      width="26px"
                      height="26px"
                      viewBox="0 0 14 14"
                      role="img"
                      focusable="false"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="m 9.2375,10.433335 c -0.9041667,0.45 -1.9145833,0.71666 -2.9333333,0.71666 -1.7125,0 -3.1479167,-0.83541 -3.1479167,-0.83541 -0.3354167,0 -0.7375,1.35208 -1.31875,1.35208 -0.5625,0 -0.8375,-0.5 -0.8375,-0.80208 0,-0.68959 1.325,-1.22709 1.325,-1.61042 0,0 -0.2604167,-0.44167 -0.2604167,-1.23333 0,-2.10834 1.69375,-3.6125 3.5958334,-4.23542 1.3729166,-0.45 4.2916666,0.0729 5.2229163,-0.80208 0.36875,-0.3375 0.55,-0.65 1.1125,-0.65 0.75625,0 1.004167,1.94166 1.004167,2.50625 0,2.31041 -1.135417,4.30208 -3.7625,5.59375 z m -5.2979167,-1.575 c 1.3229167,-1.87292 3.0104167,-2.68334 5.36875,-2.5 0.1833334,0.0146 0.34375,-0.12292 0.3583334,-0.30625 0.014583,-0.18334 -0.1229167,-0.34375 -0.30625,-0.35834 -2.5833334,-0.2 -4.4979167,0.70625 -5.9645834,2.78125 -0.10625,0.15 -0.070833,0.35834 0.079167,0.46459 0.15,0.10625 0.3583333,0.0708 0.4645833,-0.0813 z" />
                    </svg>{" "}
                    {result &&
                      result.split("<br/>")[0].includes("P") &&
                      result
                        .split("<br/>")[0]
                        .replace("P", "Phosphorous")
                        .replace("</b>", "")}
                    {result &&
                      result.split("<br/>")[0].includes("N") &&
                      result
                        .split("<br/>")[0]
                        .replace("N", "Nitrogen")
                        .replace("</b>", "")}
                    {result &&
                      result.split("<br/>")[0].includes("K") &&
                      result
                        .split("<br/>")[0]
                        .replace("K", "Potassium")
                        .replace("</b>", "")}
                  </p>
                  <div className="py-2">
                    <p className="text-lg mt-2 font-medium flex items-center">
                      Please consider the following suggestions:
                    </p>
                    {result.split("<br/>").map((item, index) => {
                      if (index >= 3) {
                        return (
                          <p
                            key={index}
                            className="text-base mt-2 font-normal flex items-center"
                          >
                            {item.replace("<i>", "").replace("</i>", "")}
                          </p>
                        );
                      }
                      return <p></p>;
                    })}
                  </div>
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

export default Fertilizer;
