import React, { useState} from "react";
import axios from "axios";
import { Button } from "flowbite-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import "./feedback.css";

import backgroundImage from '../../images/background1.jpeg';

const DeleteFeedback = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeleteFeedback = () => {
    axios
      .delete(`http://localhost:3000/feedback/deleteFeedback/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      })
      .then(() => {
        alert('Feedback deleted successfully!!!');
        navigate('/client/feedback/homeFeedback');
      })
      .catch((err) => {
        console.error(err);
        alert('Error deleting feedback');
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
      }}
    >
      <div className="p-4 table-container" style={{ height: "67.5vh" }}>
        <h1 className="my-4 text-3xl text-white">Delete Feedback</h1>
        <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
          <h3 className="text-2xl text-white">
            Are you sure you want to delete this feedback?
          </h3>

          <button
            className="w-full p-4 m-8 text-white bg-red-600 font-semibold hover:bg-red-300"
            onClick={handleDeleteFeedback}
          >
            Yes, Delete It
          </button>

          <Button className="p-1 m-8 bg-sky-300 text-base font-semibold">
            <Link to={`/client/feedback/homeFeedback`}>
              <p className="text-base font-semibold">Cancel</p>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteFeedback;
