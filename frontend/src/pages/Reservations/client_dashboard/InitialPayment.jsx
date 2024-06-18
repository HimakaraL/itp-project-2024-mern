import { Button, Label, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import payment from "../../../images/payment.jpg";
import upload from "../../../images/upload.jpg";
import "../../../App.css";
import { useAuthContext } from "../../../hooks/useAuthContext";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const InitialPayment = () => {
  const { user } = useAuthContext();
  const [error, setError] = useState(null);
  const [fileUploaded, setFileUploaded] = useState(false);
  const location = useLocation();
  const clientName = location.state.clientName;
  const clientEmail = location.state.clientEmail;
  const contactNumber = location.state.contactNumber;
  const eventDescription = location.state.eventDescription;
  const eventType = location.state.eventType;
  const eventDate = location.state.eventDate;
  const venueLocation = location.state.venueLocation;
  const paymentAmount = location.state.paymentAmount;

  const reservationObj = {
    clientName,
    clientEmail,
    contactNumber,
    eventType,
    eventDescription,
    eventDate,
    venueLocation,
    paymentAmount,
  };

  const [postImage, setPostImage] = useState({ ...reservationObj });

  const navigate = useNavigate();

  const showSuccess = () => {
    toast.success("Reservation is submitted successfully!", {
      position: "bottom-right",
      theme: "colored",
    });
  };

  const handleCreateReservation = (event) => {
    event.preventDefault();

    if (!user) {
      setError("You must be logged in");
    }

    fetch("http://localhost:3000/reservation/create-reservation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(postImage),
    })
      .then((res) => res.json())
      .then((data) => {
        showSuccess();
        navigate("/client/dashboard/manage");
      });
  };

  const handleFileUpload = async (e) => {
    setFileUploaded(true);

    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setPostImage({ ...postImage, receipt: base64 });
  };

  return (
    <div className="h-screen overflow-hidden" >
      <div className="my-4 px-44 ">
        <div className="flex justify-between p-6 mb-6 rounded-xl bg-client-brown">
          <h2 className="text-3xl font-bold text-white ">Initial Payment</h2>
        </div>
        <Button type="" className="bg-red-600 ">
          <Link to={`/client/dashboard/manage`}>
            <p className="font-bold">Cancel</p>
          </Link>
        </Button>
        <div className="flex">
          <div className="size-[600px]">
            <img src={payment} alt="payment img" />
            <p className="font-bold text-center">Upload here</p>
            <div className="pl-[275px]">
              <label
                htmlFor="file-upload"
                className="m-auto custom-file-upload "
              >
                <img src={upload} alt="" />
              </label>
              <input
                className="bg-black"
                type="file"
                label="Image"
                name="receipt"
                id="file-upload"
                accept=".jpeg,.png,.jpg"
                onChange={(e) => handleFileUpload(e)}
              />
            </div>
          </div>
          <form onSubmit={handleCreateReservation}>
            <div className="ml-24 bg-client-yellow size-[350px] rounded-xl shadow-2xl">
              <div className="w-full h-12 shadow-2xl rounded-xl bg-client-brown">
                <h1 className="pt-2 ml-4 font-bold text-white ">
                  Bank Details
                </h1>
              </div>
              <div className="p-4">
                <p className="text-2xl font-bold text-client-brown">
                  Bank Name
                </p>
                <p className="mb-2 text-xl italic font-bold text-black">
                  Commercial Bank
                </p>
                <p className="text-2xl font-bold text-client-brown">
                  Account Number
                </p>
                <p className="mb-2 text-xl italic font-bold text-black">
                  801 666 1230
                </p>
                <p className="text-2xl font-bold text-client-brown">
                  Branch Location
                </p>
                <p className="mb-2 text-xl italic font-bold text-black">
                  Kalutara
                </p>
                <p className="text-2xl font-bold text-client-brown">
                  Branch Code
                </p>
                <p className="mb-2 text-xl italic font-bold text-black">024</p>
              </div>
            </div>
            <p className="mt-8 ml-24 font-bold text-center text-red-600">
              Minimum payment amount is Rs.1000/=
            </p>
            <p className="ml-24 font-bold text-center text-red-600 ">
              (Please upload jpg , png , jpeg types only.)
            </p>
            <Button
              className="mt-4 shadow-xl ml-52 bg-client-brown"
              type="submit"
              disabled={!fileUploaded}
            >
              Upload Slip
            </Button>

            {error && <div className="error">{error}</div>}
          </form>
        </div>
        
      </div>
    </div>
  );
};

export default InitialPayment;

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}
