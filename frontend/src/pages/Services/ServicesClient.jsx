import React, { useEffect, useState } from "react";
import ViewServices from "../../components/home/ViewServices";
import { useAuthContext } from "../../hooks/useAuthContext";
import NavBar from "../../components/landingPage/NavBar";
import management from "../../images/management.jpg";
import FooterSection from "../../components/landingPage/FooterSection";

const ServicesClient = () => {
  const { user } = useAuthContext();
  const [services, setServices] = useState([]);

  useEffect(() => {
    user &&
      fetch("http://localhost:3000/service/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setServices(data));
  }, [user]);

  return (
    <div
      style={{
        backgroundImage: `url(${management})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="min-h-screen pb-4 mb-8">
        <NavBar />
        <div className="flex items-center justify-center p-4 mx-8 my-6 bg-black shadow-lg rounded-xl">
          <h2 className="text-3xl font-bold text-white ">
            Services and Packages
          </h2>
        </div>
        <br />
        <br />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 gap-y-20">
          {services.map((service) => (
            <ViewServices key={service.id} service={service} />
          ))}
        </div>
      </div>
      <FooterSection />
    </div>
  );
};

export default ServicesClient;
