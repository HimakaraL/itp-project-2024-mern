import FooterSection from "./FooterSection";
import NavBar from "./NavBar";

const AboutUs = () => {
  return (
    <div>
      <NavBar />
      <div className="items-center max-w-screen-xl sm:flex">
        <div className="p-10 sm:w-1/2">
          <div className="object-center text-center image">
            <img src="https://i.imgur.com/WbQnbas.png" />
          </div>
        </div>
        <div className="p-5 sm:w-1/2">
          <div className="text">
            <span className="text-gray-500 uppercase border-b-2 border-indigo-600">
              About us
            </span>
            <h2 className="my-4 text-3xl font-bold sm:text-4xl ">
              About <span className="text-indigo-600">Chandika Light</span>
            </h2>
            <p className="text-lg">
            At Chandika Light, we are dedicated to illuminating your events with brilliance and precision. With a wealth of experience in lighting, sound systems, stage services, and lighting systems, we are your trusted partner for creating unforgettable experiences.
            </p>
            <p className="mt-8 text-xl font-bold">
            Lighting Services
            </p>
            <p className="mt-4">
            Chandika Light specializes in creating mesmerizing lighting designs tailored to your event's atmosphere and theme. From subtle ambiance to dramatic effects, our expert technicians will craft lighting solutions that leave a lasting impression.
            </p>
            <p className="mt-8 text-xl font-bold">
            Sound System
            </p>
            <p className="mt-4">
            Experience crystal-clear audio with Chandika Light's top-of-the-line sound systems. Whether it's a corporate function, wedding celebration, or concert, our advanced equipment ensures every word and note is heard with clarity and richness.
            </p>
          </div>
        </div>
      </div>
      <FooterSection/>
    </div>
  );
};

export default AboutUs;
