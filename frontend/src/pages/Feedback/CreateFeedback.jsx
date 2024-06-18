import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import "./feedback.css";

import backgroundImage from '../../images/background1.jpeg';

const CreateFeedback = () => {
  const { user } = useAuthContext();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [rating, setRating] = useState("");
  const [service, setService] = useState("");
  const [feedback, setFeedback] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const navigate = useNavigate();
  const [notification, setNotification] = useState({ message: "", variant: "" });

  useEffect(() => {
    setCurrentDate(getFormattedDate(new Date()));
  }, []);

  const getFormattedDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  const handleSaveFeedback = () => {
    if (!name || !email || !rating || !service || !feedback) {
      setNotification({ message: "Please fill in all fields.", variant: "error" });
      return;
    }


    if (parseInt(rating) < 1 || parseInt(rating) > 5) {
      setNotification({ message: "Rating must be between 1 and 5", variant: "error" });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setNotification({ message: "Please enter a valid email address", variant: "error" });
      return;
    }

    const data = {
      name,
      email,
      rating,
      service,
      feedback,
      date: currentDate,
    };
    axios
      .post(`http://localhost:3000/feedback/addFeedback`, data, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then(() => {
        alert("Feedback added successfully!!!." );
        navigate('/client/feedback/homeFeedback');
      })
      .catch((err) => {
        alert( "Error adding feedback." );
        console.error(err);
      });
  };

  return (
    <div className="home-feedback-container"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        margin: 0,
        padding: 100,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        fontFamily: 'Roboto, sans-serif',
      }}>

      <div className="p-4 table-container">
        <h1 className="my-4 text-3xl text-white">Add Feedback</h1>
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto form-input">
          <div className="my-4">
            <label className="mr-4 text-xl text-gray-500">Name</label>
            <input
              type="text"
              placeholder="User Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-500 custom-placeholder"
            />
          </div>

          <div className="my-4">
            <label className="mr-4 text-xl text-gray-500">Email</label>
            <input
              type="email"
              placeholder="Enter a valid email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-500 custom-placeholder"
            />
            {emailError && <p>{emailError}</p>}
          </div>

          <div className="my-4">
            <label className="mr-4 text-xl text-gray-500">Rating</label>
            <input
              type="text"
              placeholder="(On a scale of 1 to 5)"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-500 custom-placeholder"
            />
          </div>

          <div className="my-4">
            <label className="mr-4 text-xl text-gray-500">Service</label>
            <input
              type="text"
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-500"
            />
          </div>

          <div className="my-4">
            <label className="mr-4 text-xl text-gray-500">Review</label>
            <input
              type="text"
              placeholder="Write your review..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full h-20 px-4 py-2 border-2 border-gray-500 custom-placeholder"
              style={{ resize: "none", textAlign: "top" }}
            />
          </div>

          <div className="my-4">
            <label className="mr-4 text-xl text-gray-500">Date</label>
            <span className="px-4 py-2 border-2 border-gray-500 text-white">
              {currentDate}
            </span>
          </div>

          <button className="p-2 m-8 bg-sky-300 text-base font-semibold hover:bg-sky-300" onClick={handleSaveFeedback}>
            Save
          </button>

          <Button className="p-1 m-8 bg-sky-300 text-base font-semibold">
            <Link to={`/client/feedback/homeFeedback`}>
              <p className="text-base font-semibold">Cancel</p>
            </Link>
          </Button>

          {notification.message && (
            <div className={`notification ${notification.variant}`}>
              {notification.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateFeedback;
