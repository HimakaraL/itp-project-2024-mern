import React, { useState } from "react";
import axios from "axios";
import { Button } from "flowbite-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

const RejectFeedback = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { id } = useParams();

  const handleRejectFeedback = () => {
    axios
      .delete(`http://localhost:3000/feedback/RejectFeedback/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      })
      .then(() => {
        alert('Feedback rejected successfully!!!');
        navigate('/admin/feedback/dashboard/adminHome');
      })
      .catch((err) => {
        console.error(err);
        alert('Error rejecting feedback');
      });
  };

  return (
    <div className="p-4 m-auto rounded-xl table-container" style={{ height: "67.5vh" }}>
      <h1 className="my-4 text-3xl text-white">Delete Feedback</h1>
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text-2xl text-white">
          Are you sure you want to reject this feedback?
        </h3>

        <button
          className="w-full p-4 m-8 font-semibold text-white bg-red-600 hover:bg-red-300"
          onClick={handleRejectFeedback}
        >
          Yes, Reject It
        </button>

        <Button className="p-1 m-8 text-base font-semibold bg-sky-300">
          <Link to={`/admin/feedback/dashboard/adminHome`}>
            <p className="text-base font-semibold">Cancel</p>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default RejectFeedback;
