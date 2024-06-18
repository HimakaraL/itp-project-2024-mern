import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { Link, useNavigate, useLoaderData, useParams } from "react-router-dom";
import {
  Button,
  Label,
  TextInput,
  Textarea
} from "flowbite-react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const CancelledPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuthContext();
  const reservationStatus = "cancelled"

  const [reservation, setReservation] = useState({
    clientName: "",
    clientEmail: "",
    contactNumber: "",
    eventType: "",
    eventDescription: "",
    eventDate: "",
    venueLocation: "",
    receipt: "",
    paymentAmount: "",
    reservationStatus: ""
  });

  const clientName = reservation.clientName;
  const clientEmail = reservation.clientEmail;
  const contactNumber = reservation.contactNumber;
  const eventType = reservation.eventType;
  const eventDescription = reservation.eventDescription;
  const eventDate = reservation.eventDate;
  const venueLocation = reservation.venueLocation;
  const receipt = reservation.receipt;
  const paymentAmount = reservation.paymentAmount;

  const reservationObj={
    clientName,
    clientEmail,
    contactNumber,
    eventType,
    eventDescription,
    eventDate,
    venueLocation,
    receipt,
    paymentAmount,
    reservationStatus
  }

  const reservationNavigate = () => {
    navigate("/admin/reservation/dashboard/manage");
  };

  const showSuccess = () => {
    toast.error('Reservation is cancelled successfully!',{
      position: "bottom-right",
      theme: "colored",
    });
  };

  useEffect(() => {
    user &&
      fetch(`http://localhost:3000/reservation/reservation/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setReservation(data));
  }, [user]);

  const handleCancelledReservation = (event)=>{
    event.preventDefault();
    
    fetch(`http://localhost:3000/reservation/update-reservation/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`,
      },
      body: JSON.stringify(reservationObj),
    })
      .then((res) => res.json())
      .then((data) => {
        showSuccess();
        navigate("/admin/reservation/dashboard/manage");
      });
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toDateString(); 
  };

  return (
    <div className="h-[100vh] px-4 pt-4">
      <div className="flex justify-between p-6 mb-6 rounded-xl bg-sidebar-blue">
        <h2 className="text-3xl font-bold text-white ">
          Cancel Reservation
        </h2>
      </div>
      <form
        onSubmit={reservationNavigate}
        className="flex lg:w-[1180px] flex-col flex-wrap gap-2"
      >
        {/* first row */}
        <div className="flex gap-8">
          <div className="lg:w-1/2">
            <div className="block mb-2">
              <Label htmlFor="clientName" value="User Name" className="text-white text-md"/>
            </div>
            <TextInput
              id="clientName"
              name="clientName"
              type="text"
              value={clientName}
              readOnly
            />
          </div>

          <div className="lg:w-1/2">
            <div className="block mb-2">
              <Label htmlFor="clientEmail" value="User Email" className="text-white text-md"/>
            </div>
            <TextInput
              id="clientEmail"
              name="clientEmail"
              type="email"
              readOnly
              value={clientEmail}
            />
          </div>
        </div>

        {/* second row */}
        <div className="flex gap-8">
          <div className="lg:w-1/2">
            <div className="block mb-2">
              <Label htmlFor="eventDate" value="Event Date" className="text-white text-md"/>
            </div>
            <div>
              <TextInput
                id="eventDate"
                name="eventDate"
                type="text"
                readOnly
                value={formatDate(reservation.eventDate)}
              />
            </div>
          </div>

          <div className="lg:w-1/2">
            <div className="block mb-2">
              <Label htmlFor="inputState" value="Event Type" className="text-white text-md"/>
            </div>
            <TextInput
              id="eventType"
              name="eventType"
              type="text"
              readOnly
              value={formatDate(reservation.eventDate)}
            />
          </div>
        </div>

        {/* last row */}
        <div className="flex gap-8">
          <div className="lg:w-1/2">
            <div className="block mb-2">
              <Label htmlFor="eventDescription" value="Event Description" className="text-white text-md"/>
            </div>
            <Textarea
              id="eventDescription"
              name="eventDescription"
              placeholder="Write your event description..."
              readOnly
              rows={3}
              value={eventDescription}
            />
          </div>
          <div className="lg:w-1/2">
            <div className="block mb-2">
              <Label htmlFor="receipt" value="Receipt" className="text-white text-md"/>
            </div>
            <img src={receipt} className="h-20" alt="receipt" />
          </div>
        </div>

        {/*4th row*/}
        <div className="flex gap-8">
          <div className="lg:w-1/2">
            <div className="block mb-2">
              <Label htmlFor="venueLocation" value="Venue Location" className="text-white text-md"/>
            </div>
            <TextInput
              id="venueLocation"
              name="venueLocation"
              type="text"
              readOnly
              value={venueLocation}
            />
          </div>

          <div className="lg:w-1/2">
            <div className="block mb-2">
              <Label htmlFor="contactNumber" value="Contact Number" className="text-white text-md"/>
            </div>
            <TextInput
              id="contactNumber"
              name="contactNumber"
              type="text"
              value={contactNumber}
              readOnly
            />
          </div>
        </div>

        {/*last row*/}
        <div className="flex gap-8">
          <div className="lg:w-1/5">
            <div className="block mb-2">
              <Label htmlFor="paymentAmount" value="Payment Amount" className="text-white text-md"/>
            </div>
            <TextInput
              id="paymentAmount"
              name="paymentAmount"
              type="text"
              readOnly
              value={paymentAmount}
            />
          </div>

        </div>
        <div className="flex justify-between">
          <Button
            type="submit"
            className="w-full h-10 mr-8 shadow-lg bg-header-orange rounded-2xl"
          >
            Go to Reservations
          </Button>
          <Button
            onClick={handleCancelledReservation}
            type=""
            className="w-full h-10 bg-red-600 shadow-lg rounded-2xl"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CancelledPage;
