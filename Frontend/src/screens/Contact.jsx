import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

const Contact = () => {
  const router = useLocation();
  useEffect(() => {
    document.title = "Query";
  }, []);
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    if (data.email !== "" || data.name !== "" || data.message !== "") {
      toast.loading("Form Submitting");

      // Assuming Flask server is running on http://127.0.0.1:5000
      fetch("http://127.0.0.1:5000/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((result) => {
          toast.dismiss();
          toast.success("Form Submitted Successfully");
          console.log(result);
        })
        .catch((error) => {
          toast.dismiss();
          toast.error("Something Went Wrong");
          console.error("Error:", error);
        });
    } else {
      toast.dismiss();
      toast.error("Fill All Details");
    }
  };

  return (
    <div>
      <Navbar menu={router.pathname} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <section className="body-font relative mt-4">
          <div className="container px-5 pt-24 mx-auto">
            <div className="flex flex-col text-center w-full mb-12">
              <p className="text-3xl font-semibold mb-4 text-dark-green">
                Send Your Queries
              </p>
              <p className="mx-auto text-lg">
                Send us your queries our expert will contact you and help you
              </p>
            </div>
            <div className="w-1/2 mx-auto">
              <div className="flex flex-wrap -m-2">
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label
                      htmlFor="name"
                      className="leading-7 text-[15px] font-medium text-dark-green"
                    >
                      Name
                    </label>
                    <input
                      {...register("name")}
                      type="text"
                      id="name"
                      name="name"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label
                      htmlFor="email"
                      className="leading-7 text-[15px] font-medium text-dark-green"
                    >
                      Email
                    </label>
                    <input
                      {...register("email")}
                      type="email"
                      id="email"
                      name="email"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
                <div className="p-2 w-full">
                  <div className="relative">
                    <label
                      htmlFor="message"
                      className="leading-7 text-[15px] font-medium text-dark-green"
                    >
                      Enter Your Query Here
                    </label>
                    <textarea
                      {...register("message")}
                      id="message"
                      name="message"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                    ></textarea>
                  </div>
                </div>
                <div className="p-2 w-full">
                  <button className="flex mx-auto text-primary-light bg-dark-green border-2 border-dark-green py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg transition-all ease-linear duration-300 hover:transition-all hover:duration-300 hover:ease-linear hover:bg-primary-light hover:text-dark-green">
                    Submit Query
                  </button>
                </div>
              </div>
            </div>
          </div>
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
      </form>
    </div>
  );
};

export default Contact;