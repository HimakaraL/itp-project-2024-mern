import React, { useEffect, useState } from "react";
import { Button, Label, Select, TextInput, Textarea } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../hooks/useAuthContext";
import DatePicker from "react-datepicker";
import createImg from "../../../images/create-bg.jpg";
import "react-datepicker/dist/react-datepicker.css";
import NavBar from "../../../components/landingPage/NavBar";

const CreateReservation = () => {
  const { user } = useAuthContext();
  const [disableDates, setDisableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate();

  const eventType = [
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

  const [selectedReservationType, setSelectedReservationType] = useState(
    eventType[0]
  );


  const handleCreateReservation = (event) => {
    event.preventDefault();
    const form = event.target;

    const clientName = form.clientName.value;
    const clientEmail = user.email;
    const contactNumber = form.contactNumber.value;
    const eventDescription = form.eventDescription.value;
    const eventType = form.eventType.value;
    const eventDate = selectedDate;
    const venueLocation = form.venueLocation.value;
    const paymentAmount = form.paymentAmount.value;

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
    navigate("/client/dashboard/initial-payment", { state: reservationObj });
  };

  const today = new Date();
  const minDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 1
  );

  const maxDate = new Date(
    today.getFullYear() + 2,
    today.getMonth(),
    today.getDate()
  );

  //errors
  const [userNameError, setUserNameError] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [contactNumberError, setContactNumberError] = useState("");
  const [locationError, setLocationError] = useState("");
  const [descriptionError,setDescriptionError]=useState("");
  const [amountError,setAmountError]=useState("")

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
    setContactNumber(inputValue);

    const phoneNumberRegex = /^0\d{9}$/;

    if (!phoneNumberRegex.test(inputValue)) {
      setContactNumberError(
        "Please enter a valid 10-digit phone number starting with 0"
      );
    } else {
      setContactNumberError("");
    }
  };
  const isFormValidCN = !contactNumberError;
  const isFormValidUN = !userNameError;
  const isFormValidL = !locationError;
  const isFormValidD = !descriptionError;
  const isFormValidA = !amountError;

  useEffect(() => {
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

  return (
    <div
      style={{
        backgroundImage: `url(${createImg})`,
        backgroundSize: "cover",
        backgroundPosition: "50% 10%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <NavBar />
      <div className=" h-[120vh] px-44">
        <div className="flex mt-8 justify-between p-6 mb-6 mr-[820px] rounded-xl bg-client-brown">
          <h2 className="text-3xl font-bold text-white ">
            Create a Reservation
          </h2>
        </div>

        <form
          onSubmit={handleCreateReservation}
          className="flex flex-col flex-wrap gap-4 m-auto"
        >
          {/* first row */}
          <div className="flex gap-8">
            <div className="lg:w-1/2">
              <div className="block mb-2">
                <Label
                  htmlFor="clientName"
                  value="User Name"
                  className="text-lg text-white"
                />
              </div>
              <TextInput
                id="clientName"
                name="clientName"
                type="text"
                placeholder="User Name"
                required
                onChange={handleUserName}
                minLength={3}
                maxLength={30}
              />
              {userNameError && (
                <div className="font-bold text-red-600 ">{userNameError}</div>
              )}
            </div>

            <div className="lg:w-1/2">
              <div className="block mb-2">
                <Label
                  htmlFor="clientEmail"
                  value="User Email"
                  className="text-lg text-white"
                />
              </div>
              <TextInput
                id="clientEmail"
                name="clientEmail"
                type="email"
                value={user?.email}
              />
            </div>
          </div>

          {/* second row */}
          <div className="flex gap-8">
            <div className="lg:w-1/2">
              <div className="block mb-2">
                <Label
                  htmlFor="eventDate"
                  value="Event Date"
                  className="text-lg text-white"
                />
              </div>
              <div>
                <DatePicker
                  className="w-[568px] bg-gray-50 border-gray-300 rounded-lg"
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  id="eventDate"
                  name="eventDate"
                  type="date"
                  minDate={minDate}
                  maxDate={maxDate}
                  required
                  excludeDates={disableDates}
                />
              </div>
            </div>

            <div className="lg:w-1/2">
              <div className="block mb-2">
                <Label
                  htmlFor="inputState"
                  value="Event Type"
                  className="text-lg text-white"
                />
              </div>

              <Select
                id="inputState"
                name="eventType"
                className="w-full rounded"
                value={selectedReservationType}
                onChange={(event) =>
                  setSelectedReservationType(event.target.value)
                }
              >
                {eventType.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          {/*3rd row*/}
          <div className="flex gap-8">
            <div className="lg:w-1/2">
              <div className="block mb-2">
                <Label
                  htmlFor="venueLocation"
                  value="Location"
                  className="text-lg text-white"
                />
              </div>
              <TextInput
                id="venueLocation"
                name="venueLocation"
                type="text"
                placeholder="Location"
                required
                maxLength={100}
                onChange={handleLocation}
              />
              {locationError && (
                <div className="font-bold text-red-600 ">{locationError}</div>
              )}
            </div>

            <div className="lg:w-1/2">
              <div className="block mb-2">
                <Label
                  htmlFor="contactNumber"
                  value="Contact Number"
                  className="text-lg text-white"
                />
              </div>
              <TextInput
                id="contactNumber"
                name="contactNumber"
                type="tel"
                placeholder="Contact Number"
                value={contactNumber}
                onChange={handleContactNumberChange}
                required
                maxLength={10}
              />
              {contactNumberError && (
                <div className="pb-0 mt-1 mb-0 font-bold text-red-600">
                  {contactNumberError}
                </div>
              )}
            </div>
          </div>

          {/* last row */}
          <div className="flex gap-8">
            <div className="lg:w-1/2">
              <div className="block mb-2">
                <Label
                  htmlFor="eventDescription"
                  value="Event Description"
                  className="text-lg text-white"
                />
              </div>
              <Textarea
                id="eventDescription"
                name="eventDescription"
                placeholder="Write your event description..."
                required
                className="w-50%"
                onChange={handleDescription}
                rows={5}
                maxLength={1000}
              />
              {descriptionError && (
                <div className="pb-0 mt-1 mb-0 font-bold text-red-600">
                  {descriptionError}
                </div>
              )}
            </div>
            <div className="lg:w-1/2">
              <div className="block mb-2">
                <Label
                  htmlFor="paymentAmount"
                  value="Payment Amount"
                  className="text-lg text-white"
                />
              </div>
              <TextInput
                id="paymentAmount"
                name="paymentAmount"
                type="number"
                placeholder="Payment Amount (Rs.)"
                required
                onChange={handleAmount}
              />
              {amountError && (
                <div className="pb-0 mt-1 mb-0 font-bold text-red-600">
                  {amountError}
                </div>
              )}
            </div>
          </div>

          <Button
            type="submit"
            className="mt-5 bg-client-brown"
            disabled={!isFormValidCN||!isFormValidUN||!isFormValidL||!isFormValidD||!isFormValidA}
          >
            <p className="text-lg font-bold">Create Reservation</p>
          </Button>

          <Button className="bg-blue-600 ">
            <Link to={`/client/dashboard/manage`}>
              <p className="text-lg font-bold">Go Back</p>
            </Link>
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateReservation;
