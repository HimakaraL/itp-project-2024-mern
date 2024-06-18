import React from "react";
import emailjs from "emailjs-com";
import { Button } from "flowbite-react";

const SendEmailButton = () => {
  const sendEmail = () => {
    const companyEmail = "chandikalights@gmail.com";
    emailjs
      .send(
        "service_ue5tkck",
        "service_ue5tkck",
        { to_email: companyEmail, message: "Check the updated of the finance management" },
        "service_ue5tkck"
      )
      .then((response) => {
        console.log("Email sent!", response.status, response.text);
      })
      .catch((error) => {
        console.error("Email error:", error);
      });
  };

  return (
    <Button onClick={sendEmail} className="mb-4 shadow-lg bg-header-orange rounded-2xl">
      Send Email to Admin
    </Button>
  );
};

export default SendEmailButton;
