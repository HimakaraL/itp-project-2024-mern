import { Footer } from "flowbite-react";
import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
} from "react-icons/bs";
import logo from "../../images/logo.png";

const FooterSection = () => {
  return (
    <div>
      <Footer
        style={{ borderRadius: "0" }}
        container
        className="bg-gradient-to-r from-dark-brown to-white via-client-yellow"
      >
        <div className="w-full">
          <div className="grid justify-between w-full rounded-none sm:flex sm:justify-between md:flex md:grid-cols-1">
            <div>
              <Footer.Brand className="rounded-lg h-28" src={logo} alt="Logo" />
            </div>
            <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
              <div>
                <Footer.Title title="about" className="text-client-brown" />
                <Footer.LinkGroup col>
                  <Footer.Link
                    href="/client/dashboard/aboutus"
                    className="text-client-brown"
                  >
                    About Us
                  </Footer.Link>
                  <Footer.Link href="#" className="text-client-brown">
                    Contact Us
                  </Footer.Link>
                </Footer.LinkGroup>
              </div>

              <div>
                <Footer.Title title="Legal" className="text-client-brown" />
                <Footer.LinkGroup col>
                  <Footer.Link href="#" className="text-client-brown">
                    Privacy Policy
                  </Footer.Link>
                  <Footer.Link href="#" className="text-client-brown">
                    Terms &amp; Conditions
                  </Footer.Link>
                </Footer.LinkGroup>
              </div>
            </div>
          </div>
          <Footer.Divider />
          <div className="w-full sm:flex sm:items-center sm:justify-between">
            <Footer.Copyright
              className="text-white"
              href="#"
              by="Chandika Light™"
              year={2024}
            />
            <div className="flex mt-4 space-x-6 sm:mt-0 sm:justify-center">
              <Footer.Icon
                href="https://www.facebook.com/profile.php?id=100084894068630"
                icon={BsFacebook}
                className="text-client-brown"
              />
            </div>
          </div>
        </div>
      </Footer>
    </div>
  );
};
export default FooterSection;
