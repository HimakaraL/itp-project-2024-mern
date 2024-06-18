import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./feedback.css";

import { useAuthContext } from "../../hooks/useAuthContext";

const ShowFeedback = () => {
  const { user } = useAuthContext();
  const [feedback, setFeedback] = useState({
    email: null,
    name: null,
    rating: null,
    service: null,
    feedback: null,
    date: null,
  });
  const { id } = useParams();

  const email = feedback.email;
  const name = feedback.name;
  const rating = feedback.rating;
  const service = feedback.service;
  const fb = feedback.feedback;
  const date = feedback.date ? new Date(feedback.date).toLocaleDateString() : '';

  useEffect(() => {
    user &&
      axios
        .get(`http://localhost:3000/feedback/getFeedback/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        })
        .then((res) => {
          console.log("Response from API:", res.data);
          setFeedback(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
  }, [user]);
  

  return (
    <div
      className="m-auto"
    >
      <div className="p-4 table-container">
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto form-input">
          <div className="my-4">
            <label className="mr-4 text-xl text-white">Name</label>
            <input
              type="text"
              placeholder="User Name"
              value={name}
              readOnly
              className="w-full px-4 py-2 border-2 border-gray-500 custom-placeholder"
            />
          </div>

          <div className="my-4">
            <label className="mr-4 text-xl text-white">Email</label>
            <input
              type="text"
              placeholder="Enter a valid email address"
              value={email}
              readOnly
              className="w-full px-4 py-2 border-2 border-gray-500 custom-placeholder"
            />
          </div>

          <div className="my-4">
            <label className="mr-4 text-xl text-white">Rating</label>
            <input
              type="text"
              placeholder="(On a scale of 1 to 5)"
              value={rating}
              readOnly
              className="w-full px-4 py-2 border-2 border-gray-500 custom-placeholder"
            />
          </div>

          <div className="my-4">
            <label className="mr-4 text-xl text-white">Service</label>
            <input
              type="text"
              value={service}
              readOnly
              className="w-full px-4 py-2 border-2 border-gray-500"
            />
          </div>

          <div className="my-4">
            <label className="mr-4 text-xl text-white">Review</label>
            <input
              type="text"
              placeholder="Write your review..."
              value={fb}
              readOnly
              className="w-full h-20 px-4 py-2 border-2 border-gray-500 custom-placeholder"
              style={{ resize: "none", textAlign: "top" }}
            />
          </div>

          <div className="my-4">
            <label className="mr-4 text-xl text-white">Date</label>
            <span className="px-4 py-2 text-white border-2 border-gray-500">{date}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowFeedback;
