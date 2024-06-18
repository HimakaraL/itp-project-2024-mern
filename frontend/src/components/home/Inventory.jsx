import React from "react";
import NavBar from "../landingPage/NavBar";
import management from "../../images/management.jpg";
import FooterSection from "../../components/landingPage/FooterSection";

const Inventory = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${management})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
        <NavBar />
      <div className="min-h-screen px-4 pb-4 my-4">
        <div className="flex items-center justify-center p-4 mb-6 bg-black shadow-lg rounded-xl">
          <h2 className="text-3xl font-bold text-white">Inventory</h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img
              className="object-cover w-full h-48 rounded-t-lg"
              src="https://images.pexels.com/photos/2291367/pexels-photo-2291367.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="buffetphoto"
            />

            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Buffet Sets
              </h5>

              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Serve your guests with ease!
              </p>
            </div>
          </div>

          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img
              className="object-cover w-full h-48 rounded-t-lg"
              src="https://images.pexels.com/photos/7881483/pexels-photo-7881483.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="chairphoto"
            />

            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Tifin chairs
              </h5>

              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Experience the Comfort!
              </p>
            </div>
          </div>

          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img
              className="object-cover w-full h-48 rounded-t-lg"
              src="https://images.pexels.com/photos/291767/pexels-photo-291767.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="glassphoto"
            />

            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Tableware
              </h5>

              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Top quality equipment for the next occasion!
              </p>
            </div>
          </div>

          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img
              className="object-cover w-full h-48 rounded-t-lg"
              src="https://images.pexels.com/photos/1400136/pexels-photo-1400136.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="lightphoto"
            />

            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Lights / Bulbs
              </h5>

              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                For a Colorful Night!
              </p>
            </div>
          </div>
        </div>
      </div>
      <FooterSection />
    </div>
  );
};

export default Inventory;
