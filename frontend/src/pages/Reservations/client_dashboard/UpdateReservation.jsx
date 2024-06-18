import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Label, Select, TextInput, Textarea } from "flowbite-react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import DatePicker from "react-datepicker";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import viewBG from "../../../images/viewBG.jpg"

const UpdateReservation = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { id } = useParams();
  const [disableDates, setDisableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [reservation, setReservation] = useState({
    clientName: "",
    clientEmail: "",
    contactNumber: "",
    eventType: "",
    eventDescription: "",
    eventDate: "",
    venueLocation: "",
    paymentAmount: "",
  });

  const clientName = reservation.clientName;
  const clientEmail = reservation.clientEmail;
  const contactNumber = reservation.contactNumber;
  const eventType = reservation.eventType;
  const eventDescription = reservation.eventDescription;
  const eventDate = reservation.eventDate;
  const venueLocation = reservation.venueLocation;
  const paymentAmount = reservation.paymentAmount;

  const showSuccess = () => {
    toast.success("Reservation is updated successfully!", {
      position: "bottom-right",
      theme: "colored",
      autoClose: 5000,
    });
  };

  useEffect(() => {
    user &&
      fetch(`http://localhost:3000/reservation/reservation/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setReservation((prevState) => ({ ...prevState, ...data }));
          setSelectedDate(new Date(data.eventDate));
        });

    user &&
      fetch("http://localhost:3000/reservation/all-event-dates", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          const formattedDates = data.map((dateString) => new Date(dateString));
          setDisableDates(formattedDates);
        });
  }, [user]);

  const eventT = [
    "Graduation Ceremony",
    "Award Ceremony",
    "Product Launch Event",
    "Fashion Show",
    "Art Exhibition",
    "Community Fair",
    "Sports Tournament",
    "Cultural Festival",
    "Film Premiere",
    "Trade Show",
    "Music Concert",
    "Dance Performance",
    "Garden Party",
    "Other Event",
  ];

  const [selectedReservationType, setSelectedReservationType] = useState();

  const handleUpdateReservation = (event) => {
    event.preventDefault();
    const form = event.target;

    const eventDate = selectedDate;
    const contactNumber = form.contactNumber.value;
    const eventDescription = form.eventDescription.value;
    const eventType = form.eventT.value;
    const venueLocation = form.venueLocation.value;

    const updateReservationObj = {
      eventDate,
      contactNumber,
      eventType,
      eventDescription,
      venueLocation,
    };

    fetch(`http://localhost:3000/reservation/update-reservation/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(updateReservationObj),
    })
      .then((res) => res.json())
      .then((data) => {
        navigate("/client/dashboard/manage");
        showSuccess();
      });
  };

  //errors
  const [userNameError, setUserNameError] = useState("");
  const [locationError, setLocationError] = useState("");
  const [descriptionError,setDescriptionError]=useState("");
  const [amountError,setAmountError]=useState("")
  const [contactNum, setContactNum] = useState(contactNumber);
  const [contactNumberError, setContactNumberError] = useState("");

  const handleAmount = (event) => {
    const inputValue = event.target.value.trim();
    if (inputValue<0 || inputValue>999999999999999 ||inputValue==0) {
      setAmountError(
        "Cannot be minus value or enter below 15 numbers"
      );
    } else {
      setAmountError("");
    }
  };

  const handleDescription = (event) => {
    const inputValue = event.target.value.trim();
    if (!inputValue) {
      setDescriptionError(
        "Cannot be empty"
      );
    } else {
      setDescriptionError("");
    }
  };
  
  const handleLocation = (event) => {
    const inputValue = event.target.value.trim();
    if (!inputValue) {
      setLocationError(
        "Cannot be empty"
      );
    } else {
      setLocationError("");
    }
  };

  const handleUserName = (event) => {
    const inputValue = event.target.value.trim();
    const userNameRegex = /^[A-Za-z\s]+$/;
    if (!userNameRegex.test(inputValue)) {
      setUserNameError(
        "Please enter letters only (don't use numbers or special characters)"
      );
    } else {
      setUserNameError("");
    }
  };
  
  const handleContactNumberChange = (event) => {
    const inputValue = event.target.value;
    setContactNum(inputValue);

    const phoneNumberRegex = /^0\d{9}$/;

    if (!phoneNumberRegex.test(inputValue)) {
      setContactNumberError(
        "Please enter a valid 10-digit phone number starting with 0"
      );
    } else {
      setContactNumberError("");
    }
  };
  const isFormValid = !contactNumberError;

  const today = new Date();
  const minDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 1
  );

  const maxDate = new Date(
    today.getFullYear() + 10,
    today.getMonth(),
    today.getDate()
  );

  const isFormValidCN = !contactNumberError;
  const isFormValidUN = !userNameError;
  const isFormValidL = !locationError;
  const isFormValidD = !descriptionError;
  const isFormValidA = !amountError;

  return (
    <div
      className="h-[120vh] pt-4 px-44"
      style={{
        backgroundImage: `url(${viewBG})`,
        backgroundSize: "cover",
        backgroundPosition: "50% 10%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex justify-between p-6 mb-6 rounded-xl bg-client-brown">
        <h2 className="text-3xl font-bold text-white ">
          Update the Reservation
        </h2>
      </div>
      <form
        onSubmit={handleUpdateReservation}
        className="m-auto flex lg:w-[1180px] flex-col flex-wrap gap-4"
      >
        {/* first row */}
        <div className="flex gap-8">
          <div className="lg:w-1/2">
            <div className="block mb-2">
              <Label htmlFor="clientName" value="User Name" />
            </div>
            <TextInput
              id="clientName"
              name="clientName"
              type="text"
              readOnly
              defaultValue={clientName}
            />
          </div>

          <div className="lg:w-1/2">
            <div className="block mb-2">
              <Label htmlFor="clientEmail" value="User Email" />
            </div>
            <TextInput
              id="clientEmail"
              name="clientEmail"
              type="email"
              readOnly
              defaultValue={clientEmail}
            />
          </div>
        </div>

        {/* second row */}
        <div className="flex gap-8">
          <div className="lg:w-1/2">
            <div className="block mb-2">
              <Label htmlFor="eventDate" value="Event Date" />
            </div>
            <div>
              <DatePicker
                className="w-[575px] bg-gray-50 border-gray-300 rounded-lg"
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                id="eventDate"
                name="eventDate"
                minDate={minDate}
                maxDate={maxDate}
                defaultValue={eventDate}
                excludeDates={disableDates}
              />
            </div>
          </div>

          <div className="lg:w-1/2">
            <div className="block mb-2">
              <Label htmlFor="inputState" value="Event Type" />
            </div>

            <Select
              id="inputState"
              name="eventT"
              className="w-full rounded"
              value={selectedReservationType}
              onChange={(event) =>
                setSelectedReservationType(event.target.value)
              }
            >
              <option>{eventType}</option>
              {eventT.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </div>
        </div>

        {/* event description */}
        <div>
          <div className="block mb-2">
            <Label htmlFor="eventDescription" value="Event Description" />
          </div>
          <Textarea
            id="eventDescription"
            name="eventDescription"
            placeholder="Write your event description..."
            required
            className="w-full"
            rows={5}
            onChange={handleDescription}
            defaultValue={eventDescription}
            maxLength={1000}
          />
          {descriptionError && (
                <div className="pb-0 mt-1 mb-0 font-bold text-red-600">
                  {descriptionError}
                </div>
              )}
        </div>

        {/*last row*/}
        <div className="flex gap-8">
          <div className="lg:w-1/2">
            <div className="block mb-2">
              <Label htmlFor="venueLocation" value="Location" />
            </div>
            <TextInput
              id="venueLocation"
              name="venueLocation"
              type="text"
              placeholder="Location"
              required
              onChange={handleLocation}
              defaultValue={venueLocation}
              maxLength={100}
            />
            {locationError && (
                <div className="font-bold text-red-600 ">{locationError}</div>
              )}
          </div>

          <div className="lg:w-1/2">
            <div className="block mb-2">
              <Label htmlFor="contactNumber" value="Contact Number" />
            </div>
            <TextInput
              id="contactNumber"
              name="contactNumber"
              type="text"
              placeholder="Contact Number"
              defaultValue={contactNumber}
              onChange={handleContactNumberChange}
              required
              minLength={10}
              maxLength={10}
            />
            {contactNumberError && (
              <div className="pb-0 mt-1 mb-0 text-red-500">
                {contactNumberError}
              </div>
            )}
          </div>

          <div className="lg:w-1/3">
            <div className="block mb-2">
              <Label htmlFor="paymentAmount" value="Payment Amount" />
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

        <Button
          type="submit"
          className="mt-5 bg-green-600"
          disabled={!isFormValidCN||!isFormValidUN||!isFormValidL||!isFormValidD||!isFormValidA}
        >
          Update Reservation
        </Button>
        <Link to={`/client/dashboard/manage`}>
          <Button className="mt-0 w-[1180px] bg-blue-600">
            Go to Reservations
          </Button>
        </Link>
      </form>
    </div>
  );
};

export default UpdateReservation;
