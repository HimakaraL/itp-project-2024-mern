import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLoaderData, useParams } from "react-router-dom";
import {
  Button,
  Label,
  Select,
  TextInput,
  Textarea,
  Datepicker,
} from "flowbite-react";
import { useAuthContext } from "../../../hooks/useAuthContext";

const ViewReservation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthContext();
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
  const reservationStatus = reservation.reservationStatus;

  const reservationNavigate = () => {
    navigate("/admin/reservation/dashboard/manage");
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toDateString(); 
  };

  return (
    <div className="h-[100vh] px-4 pt-4">
      <div className="flex justify-between p-6 mb-6 rounded-xl bg-sidebar-blue">
        <h2 className="text-3xl font-bold text-white ">
          View Reservation Details
        </h2>
      </div>
      <form
        onSubmit={reservationNavigate}
        className="flex lg:w-[1180px] flex-col flex-wrap gap-4"
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
              type="email"
              readOnly
              value={eventType}
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
            <img src={receipt} className="h-20 text-white text-md" alt="receipt" />
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
          <div className="lg:w-1/2">
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

          <div className="lg:w-1/2">
            <div className="block mb-2">
              <Label htmlFor="reservationStatus" value="Reservation Status" className="text-white text-md"/>
            </div>
            <input
              className={`text-white rounded-xl ${
                reservationStatus === "approved"
                  ? "bg-green-600"
                  : reservationStatus === "cancelled"
                  ? "bg-red-600"
                  : reservationStatus === "deleted"
                  ? "bg-red-600"
                  : reservationStatus === "pending"
                  ? "bg-blue-600"
                  : ""
              }`}
              id="reservationStatus"
              name="reservationStatus"
              type="text"
              readOnly
              value={reservationStatus}
            />
          </div>
        </div>
        <Button
          type="submit"
          className="mb-4 shadow-lg bg-header-orange rounded-2xl"
        >
          Go to Reservations
        </Button>
      </form>
    </div>
  );
};

export default ViewReservation;
