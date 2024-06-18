import React from "react";
import NavBar from "../landingPage/NavBar";
import management from "../../images/management.jpg";
import FooterSection from "../landingPage/FooterSection";

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
          <h2 className="text-3xl font-bold text-white">All Inventory Items</h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img
              className="object-cover w-full h-48 rounded-t-lg"
              src="https://images.pexels.com/photos/1400136/pexels-photo-1400136.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="buffetphoto"
            />

            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              5W LED Bulbs
              </h5>

              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Energy-efficient lighting.
              </p>
            </div>
          </div>

          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img
              className="object-cover w-full h-48 rounded-t-lg"
              src="https://images.pexels.com/photos/7715525/pexels-photo-7715525.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="chairphoto"
            />

            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              DJ Mixer
              </h5>

              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Seamless audio blending.
              </p>
            </div>
          </div>

          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img
              className="object-cover w-full h-48 rounded-t-lg"
              src="https://images.pexels.com/photos/6648202/pexels-photo-6648202.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="glassphoto"
            />

            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Equalizer
              </h5>

              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Precise sound control.
              </p>
            </div>
          </div>

          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img
              className="object-cover w-full h-48 rounded-t-lg"
              src="https://images.pexels.com/photos/3675621/pexels-photo-3675621.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="lightphoto"
            />

            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Wireless Microphones
              </h5>

              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Clear, cable-free audio.
              </p>
            </div>
          </div>





          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img
              className="object-cover w-full h-48 rounded-t-lg"
              src="https://images.pexels.com/photos/1677710/pexels-photo-1677710.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="glassphoto"
            />

            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Stage Lights
              </h5>

              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Vibrant event illumination.
              </p>
            </div>
          </div>


          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img
              className="object-cover w-full h-48 rounded-t-lg"
              src="https://images.pexels.com/photos/8198127/pexels-photo-8198127.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="glassphoto"
            />

            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Amplifiers
              </h5>

              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Powerful sound reinforcement.
              </p>
            </div>
          </div>



          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img
              className="object-cover w-full h-48 rounded-t-lg"
              src="https://images.pexels.com/photos/3358953/pexels-photo-3358953.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="glassphoto"
            />

            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Laser Lights
              </h5>

              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Dynamic visual effects.
              </p>
            </div>
          </div>




          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img
              className="object-cover w-full h-48 rounded-t-lg"
              src="https://images.pexels.com/photos/8133000/pexels-photo-8133000.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="glassphoto"
            />

            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Subwoofers
              </h5>

              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Deep bass resonance.
              </p>
            </div>
          </div>



          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img
              className="object-cover w-full h-48 rounded-t-lg"
              src="https://www.commercialintegrator.com/wp-content/uploads/2023/08/AdobeStock_279797029.jpg"
              alt="glassphoto"
            />

            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Array Speakers
              </h5>

              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Directional sound projection.
              </p>
            </div>
          </div>




          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img
              className="object-cover w-full h-48 rounded-t-lg"
              src="https://i0.wp.com/bookextraordinary.com/wp-content/uploads/2022/11/LED-Banner.png?resize=1024%2C576&ssl=1"
              alt="glassphoto"
            />

            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              LED Dance Floors
              </h5>

              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Interactive party surfaces.
              </p>
            </div>
          </div>




          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img
              className="object-cover w-full h-48 rounded-t-lg"
              src="https://m.media-amazon.com/images/I/61BD+BtFlOL._AC_SL1100_.jpg"
              alt="glassphoto"
            />

            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              DMX Controllers
              </h5>

              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Lighting control mastery.
              </p>
            </div>
          </div>




          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img
              className="object-cover w-full h-48 rounded-t-lg"
              src="https://belangersinc.com/wp-content/uploads/2017/11/drapery-stage.jpg"
              alt="glassphoto"
            />

            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Stage Curtains
              </h5>

              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Dramatic event backdrop.
              </p>
            </div>
          </div>



          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img
              className="object-cover w-full h-48 rounded-t-lg"
              src="https://www.impress.mu/wp-content/uploads/2021/12/Untitled-design-8.jpg"
              alt="glassphoto"
            />

            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Projection Screens
              </h5>

              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Visual presentation surfaces.
              </p>
            </div>
          </div>





          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img
              className="object-cover w-full h-48 rounded-t-lg"
              src="https://pennyelectric.com/wp-content/uploads/2017/05/pe_generator.jpg"
              alt="glassphoto"
            />

            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Power Generators
              </h5>

              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Portable event power.
              </p>
            </div>
          </div>






          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img
              className="object-cover w-full h-48 rounded-t-lg"
              src="https://i.ebayimg.com/images/g/Im4AAOSwBjVerPju/s-l500.jpg"
              alt="glassphoto"
            />

            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              DJ Booths
              </h5>

              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Professional performance setups.
              </p>
            </div>
          </div>







          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img
              className="object-cover w-full h-48 rounded-t-lg"
              src="https://m.media-amazon.com/images/I/61vQ2V1vMhL._AC_SL1500_.jpg"
              alt="glassphoto"
            />

            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Wireless In-Ear Monitors
              </h5>

              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Personalized stage monitoring.
              </p>
            </div>
          </div>






          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img
              className="object-cover w-full h-48 rounded-t-lg"
              src="https://moderndrummer.com/wp-content/uploads/Shure-prepack-1024x935.jpg"
              alt="glassphoto"
            />

            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Drum Microphone Kits
              </h5>

              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Percussion audio capture.
              </p>
            </div>
          </div>





          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img
              className="object-cover w-full h-48 rounded-t-lg"
              src="https://www.trafficsafetywarehouse.com/Images/Galvanized%20Bridge%20Feet%20_5595.JPG"
              alt="glassphoto"
            />

            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Crowd Control Barriers
              </h5>

              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Event crowd management.
              </p>
            </div>
          </div>






          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img
              className="object-cover w-full h-48 rounded-t-lg"
              src="https://performance.stageright.com/wp-content/uploads/sites/2/2015/09/folding-stage-stairs-main.jpg"
              alt="glassphoto"
            />

            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Stage Steps
              </h5>

              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Safe stage access solutions.
              </p>
            </div>
          </div>





          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img
              className="object-cover w-full h-48 rounded-t-lg"
              src="https://i0.wp.com/sound-craft.com/wp-content/uploads/2019/11/LC-ISO2-W-1.jpg?fit=1320%2C1320&ssl=1"
              alt="glassphoto"
            />

            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Podiums
              </h5>

              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Elevated speaking platforms.
              </p>
            </div>
          </div>







          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img
              className="object-cover w-full h-48 rounded-t-lg"
              src="https://m.media-amazon.com/images/I/9127VjdH7jL.__AC_SY445_SX342_QL70_FMwebp_.jpg"
              alt="glassphoto"
            />

            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Battery-Powered Uplights
              </h5>

              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Wireless ambient lighting solutions.
              </p>
            </div>
          </div>




          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img
              className="object-cover w-full h-48 rounded-t-lg"
              src="https://tenav.co.uk/wp-content/uploads/2023/12/led-video-wall-1.jpg"
              alt="glassphoto"
            />

            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              LED Wall
              </h5>

              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Dynamic displays.
              </p>
            </div>
          </div>




          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img
              className="object-cover w-full h-48 rounded-t-lg"
              src="https://m.media-amazon.com/images/I/71VeRQk50JL.SS700.jpg"
              alt="glassphoto"
            />

            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              200m Wires
              </h5>

              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Long-reaching connectivity.
              </p>
            </div>
          </div>




          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img
              className="object-cover w-full h-48 rounded-t-lg"
              src="https://m.media-amazon.com/images/I/51ip9ooQ+RL._AC_SL1000_.jpg"
              alt="glassphoto"
            />

            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Speaker Stands
              </h5>

              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Elevated audio projection.
              </p>
            </div>
          </div>





          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img
              className="object-cover w-full h-48 rounded-t-lg"
              src="https://thevinylfactory.com/wp-content/uploads/2022/05/speaker-cable-guide.jpg"
              alt="glassphoto"
            />

            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Speaker Cables
              </h5>

              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Reliable audio connections.
              </p>
            </div>
          </div>




          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img
              className="object-cover w-full h-48 rounded-t-lg"
              src="https://thumbs.static-thomann.de/thumb//thumb580x/pics/cms/image/guide/en/can_lights/0029_par64.jpg"
              alt="glassphoto"
            />

            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Par Can Lights
              </h5>

              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Focused event illumination.
              </p>
            </div>
          </div>




          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img
              className="object-cover w-full h-48 rounded-t-lg"
              src="https://rentitem.lk/wp-content/uploads/2022/01/1Web-Image3-10.jpg"
              alt="glassphoto"
            />

            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Power Extension Cords
              </h5>

              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Extended power reach.
              </p>
            </div>
          </div>






          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img
              className="object-cover w-full h-48 rounded-t-lg"
              src="https://skyray.lk/wp-content/uploads/2015/05/MIKE-STAND.jpg"
              alt="glassphoto"
            />

            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Microphone Stands
              </h5>

              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Stable vocal support.
              </p>
            </div>
          </div>





          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img
              className="object-cover w-full h-48 rounded-t-lg"
              src="https://5.imimg.com/data5/SELLER/Default/2023/6/315564643/ZN/CA/QW/47112064/80w-multi-gobo-projector-outdoor-projector-logo-projector-outdoor-waterproof-500x500.jpg"
              alt="glassphoto"
            />

            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Gobo Projectors
              </h5>

              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Customizable light patterns.
              </p>
            </div>
          </div>





          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img
              className="object-cover w-full h-48 rounded-t-lg"
              src="https://m.media-amazon.com/images/I/61mttavaATL.SS700.jpg"
              alt="glassphoto"
            />

            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              XLR Cables
              </h5>

              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Balanced audio connections.
              </p>
            </div>
          </div>





          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img
              className="object-cover w-full h-48 rounded-t-lg"
              src="https://www.xsftruss.com/wp-content/uploads/2021/08/10x20-modular-truss-system-assembled.jpeg"
              alt="glassphoto"
            />

            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Truss Systems
              </h5>

              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Structural event support.
              </p>
            </div>
          </div>





          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img
              className="object-cover w-full h-48 rounded-t-lg"
              src="https://respyro.com/wp-content/uploads/2018/01/12d_WinterSkate_20151121_001_WP-Large.jpg"
              alt="glassphoto"
            />

            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Pyrotechnics
              </h5>

              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Explosive special effects.
              </p>
            </div>
          </div>





          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img
              className="object-cover w-full h-48 rounded-t-lg"
              src="https://m.media-amazon.com/images/I/71wH0n3KrrL.__AC_SY300_SX300_QL70_FMwebp_.jpg"
              alt="glassphoto"
            />

            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Speaker Wall Mounts
              </h5>

              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Elevated audio placement.
              </p>
            </div>
          </div>





          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img
              className="object-cover w-full h-48 rounded-t-lg"
              src="https://jyxspeaker.com/cdn/shop/files/JYX-S55-karaoke-machine-black-3mics.png?v=1713335078&width=750"
              alt="glassphoto"
            />

            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Karaoke Machines
              </h5>

              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Interactive singing entertainment.
              </p>
            </div>
          </div>





          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img
              className="object-cover w-full h-48 rounded-t-lg"
              src="https://cinelight.com/img/cms/POZE%20BLOG/Light%20Stands/Light_Stands_Mix.jpg"
              alt="glassphoto"
            />

            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Light Stands
              </h5>

              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Adjustable lighting support.
              </p>
            </div>
          </div>





          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img
              className="object-cover w-full h-48 rounded-t-lg"
              src="https://www.mirror-balls.co.uk/wp-content/uploads/mirror-balls-1240-600.jpg"
              alt="glassphoto"
            />

            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Mirror Balls
              </h5>

              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Reflective disco ambiance.
              </p>
            </div>
          </div>





          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img
              className="object-cover w-full h-48 rounded-t-lg"
              src="https://cdn11.bigcommerce.com/s-6da6f/images/stencil/608x608/products/319/2050/uv-led-flood-light-365nm__04601.1684377617.jpg?c=2"
              alt="glassphoto"
            />

            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              UV Flood Lights
              </h5>

              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Fluorescent blacklight effects.
              </p>
            </div>
          </div>





          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img
              className="object-cover w-full h-48 rounded-t-lg"
              src="https://plsn.com/site/wp-content/uploads/ADJ-HYDRO-WASH-X19.jpg"
              alt="glassphoto"
            />

            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Moving Wash Lights
              </h5>

              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Versatile color wash effects.
              </p>
            </div>
          </div>





          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img
              className="object-cover w-full h-48 rounded-t-lg"
              src="https://dt7v1i9vyp3mf.cloudfront.net/styles/news_large/s3/imagelibrary/S/Spotlight_Soundcraft-jT2y6FzmKF1xoVCjE1BZSh7EYFVuFDzV.jpg"
              alt="glassphoto"
            />

            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Digital Mixing Consoles
              </h5>

              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Advanced audio control.
              </p>
            </div>
          </div>





          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img
              className="object-cover w-full h-48 rounded-t-lg"
              src="http://htdzpro.com/products/6-2-feedback-suppressor_05m.jpg"
              alt="glassphoto"
            />

            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Feedback Suppressors
              </h5>

              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Noise cancellation technology.
              </p>
            </div>
          </div>




          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img
              className="object-cover w-full h-48 rounded-t-lg"
              src="https://cdn11.bigcommerce.com/s-dks6ju/images/stencil/1280x1280/products/31248/538658/boss-ve-22-vocal-performer-multi-effects-processor__36932.1710602023.jpg?c=2"
              alt="glassphoto"
            />

            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Vocal Effects Processors
              </h5>

              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Enhanced vocal modulation.
              </p>
            </div>
          </div>




          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img
              className="object-cover w-full h-48 rounded-t-lg"
              src="https://www.prosoundweb.com/wp-content/uploads/2022/02/Sub-Arrays-Open.jpg"
              alt="glassphoto"
            />

            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Subwoofer Arrays
              </h5>

              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Deep bass reinforcement.
              </p>
            </div>
          </div>




          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img
              className="object-cover w-full h-48 rounded-t-lg"
              src="https://lunaweddingandeventsupplies.com.au/cdn/shop/products/STAGE_SKIRTING_03_56989bb9-93db-414f-98ab-372d4ddb3bfb_720x.jpg?v=1569810484"
              alt="glassphoto"
            />

            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Stage Skirting
              </h5>

              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Elegant stage boundary cover.
              </p>
            </div>
          </div>




          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img
              className="object-cover w-full h-48 rounded-t-lg"
              src="https://m.media-amazon.com/images/I/71jRbSJPRGL._AC_SL1500_.jpg"
              alt="glassphoto"
            />

            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Cable Ramps
              </h5>

              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Cable management solutions.
              </p>
            </div>
          </div>




          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img
              className="object-cover w-full h-48 rounded-t-lg"
              src="https://www.stagesystems.co.uk/wp-content/uploads/2023/10/Forest-Backdrop_TRANSPARENT-BACKGROUND-e1698421892286.png"
              alt="glassphoto"
            />

            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Modular Stage Decks
              </h5>

              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Customizable stage configurations.
              </p>
            </div>
          </div>




          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img
              className="object-cover w-full h-48 rounded-t-lg"
              src="https://qsdcurtains.com/wp-content/uploads/2018/03/pipe-drape-banner.jpg"
              alt="glassphoto"
            />

            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Pipe and Drape Systems
              </h5>

              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Versatile event space division.
              </p>
            </div>
          </div>




          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img
              className="object-cover w-full h-48 rounded-t-lg"
              src="https://ovationlights.com/wp-content/uploads/fresnel-light-on-a-stand-1024x683.webp"
              alt="glassphoto"
            />

            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Fresnel Lights
              </h5>

              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Soft, adjustable spotlighting.
              </p>
            </div>
          </div>




          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img
              className="object-cover w-full h-48 rounded-t-lg"
              src="https://vocopro.com/assets/products/product_large/digital-conference-16.jpg"
              alt="glassphoto"
            />

            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Wireless Conference Systems
              </h5>

              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Seamless communication for events.
              </p>
            </div>
          </div>




          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img
              className="object-cover w-full h-48 rounded-t-lg"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Alesis_Micro_Gate_9006.jpg/1024px-Alesis_Micro_Gate_9006.jpg"
              alt="glassphoto"
            />

            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Noise Gates
              </h5>

              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Precise control over audio signal levels.


              </p>
            </div>
          </div>



          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img
              className="object-cover w-full h-48 rounded-t-lg"
              src="https://www.retrosonicproaudio.com/retrosonic-future/images/products/deltalab-effectron-2-delay-unit-1.webp"
              alt="glassphoto"
            />

            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Delay Units
              </h5>

              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Time alignment for synchronized audio.
              </p>
            </div>
          </div>




          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img
              className="object-cover w-full h-48 rounded-t-lg"
              src="https://m.media-amazon.com/images/I/71o29JvHhgL._AC_SX569_.jpg"
              alt="glassphoto"
            />

            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Stage Skid Shoes
              </h5>

              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Mobility accessories for stage elements.
              </p>
            </div>
          </div>




          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img
              className="object-cover w-full h-48 rounded-t-lg"
              src="https://www.stagedrop.com/resize/images/intellistage/ISMDRUM6437.jpg?bw=1000&w=1000&bh=1000&h=1000"
              alt="glassphoto"
            />

            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Stage Risers with Wheel Kits
              </h5>

              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Portable platforms with easy transportation.
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