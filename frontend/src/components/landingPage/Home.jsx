import React from "react";
import { Button } from "flowbite-react";
import { Carousel } from "flowbite-react";
import slidePic1 from "../../images/1.png";
import slidePic3 from "../../images/3.png";
import slidePic4 from "../../images/4.png";
import slidePic5 from "../../images/5.png";
import servicePic from "../../images/servicePic.png";
import createResImg from "../../images/createRes.jpg";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./FooterSection";
import { useAuthContext } from "../../hooks/useAuthContext";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const Home = () => {
  const { user } = useAuthContext();

  const showError = () => {
    toast.warn("Please Login as a user!", {
      position: "bottom-right",
      theme: "colored",
    });
  };

  return (
    <div>
      <NavBar />

      <div>
        <div className="h-[84vh]">
          <Carousel>
            <img src={slidePic3} alt="..." />
            <img src={slidePic4} alt="..." />
            <img src={slidePic5} alt="..." />
            <img src={slidePic1} alt="..." />
          </Carousel>
        </div>
      </div>
      <div>
        <p className="mt-8 text-3xl font-bold text-center text-client-brown">
          Create Your Reservation
        </p>
        <div className="flex">
          <img
            src={createResImg}
            className="mt-8 ml-16 shadow-lg rounded-2xl h-96"
          />
          <div className="flex-rows">
            <p className="pt-16 pl-16 pr-16 text-lg font-semibold">
              Lighting is a crucial element in shaping the atmosphere and
              functionality of any event. Whether it's a corporate function,
              wedding celebration, or music concert, thoughtful lighting design
              can completely transform the experience for attendees. For
              corporate events, strategic lighting can highlight key areas like
              the stage or podium, ensuring that speakers are well-illuminated
              and easily seen by the audience. Soft, ambient lighting around
              seating areas can also create a relaxed environment, ideal for
              networking and discussions during breaks. In a wedding setting,
              lighting can help create a romantic and enchanting ambiance. Soft,
              warm lighting can enhance the decor, while subtle spotlights can
              draw attention to important features like the cake table or the
              dance floor. Our lighting services are tailored to enhance your
              event's atmosphere, making sure every moment is illuminated
              beautifully.
            </p>
            {user && user.userType === "user" ? (
              <Link
                to={`/client/dashboard/create/`}
                className="mr-5 font-medium text-cyan-600 hover:underline dark:text-cyan-500"
              >
                <Button className="h-12 m-auto shadow-lg bg-client-brown rounded-2xl">
                  Create Reservation
                </Button>
              </Link>
            ) : user && user.userType === "admin" ? (
              <Link
                onClick={() => showError()}
                to={`/`}
                className="mr-5 font-medium text-cyan-600 hover:underline dark:text-cyan-500"
              >
                <Button className="h-12 m-auto shadow-lg m bg-client-brown rounded-2xl">
                  Create Reservation
                </Button>
              </Link>
            ) : (
              <Link
                to={`/client/dashboard/login/`}
                className="mr-5 font-medium text-cyan-600 hover:underline dark:text-cyan-500"
              >
                <Button className="h-12 m-auto shadow-lg bg-client-brown rounded-2xl">
                  Create Reservation
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      <div>
        <p className="mt-12 text-3xl font-bold text-center text-client-brown">
          Our Services
        </p>
        <div className="flex">
          <div className="flex-rows">
            <p className="pt-16 pl-16 pr-16 text-lg font-semibold">
              Elevate your events with our all-inclusive lighting services. We
              offer a range of lighting options perfect for weddings, corporate
              events, and special occasions. Our unique huts provide a charming
              touch, adding to the ambiance of any event. Additionally, our
              state-of-the-art sound systems ensure your guests are entertained
              throughout the event. Trust us to illuminate your event and create
              a memorable experience for all.
            </p>
            <Link
              to={`/client/service`}
              className="mr-5 font-medium text-cyan-600 hover:underline dark:text-cyan-500"
            >
              <Button className="h-12 m-auto mt-8 shadow-lg bg-client-brown rounded-2xl">
                Services and Packages
              </Button>
            </Link>
          </div>
          <img
            src={servicePic}
            className="mt-8 ml-16 shadow-lg rounded-2xl h-80"
          />
        </div>
      </div>
      <br/><br/>
      <Footer />
    </div>
  );
};

export default Home;
