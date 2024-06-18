import React, { useState, useEffect } from "react"
import axios from "axios";
import { Button } from "flowbite-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useAuthContext } from "../../hooks/useAuthContext";
import "./feedback.css";

import backgroundImage from '../../images/background1.jpeg';


const EditFeedback = () => {
  const {user} = useAuthContext()
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState('');
  const [service, setService] = useState('');
  const [feedback, setFeedback] = useState('');

  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();


  useEffect(() => {
    user&&
    axios
      .get(`http://localhost:3000/feedback/getFeedback/${id}`,{headers: {Authorization: `Bearer ${user.token}`  }
    })
      .then((res) => {
        setName(res.data.name);
        setEmail(res.data.email);
        setRating(res.data.rating);
        setService(res.data.service);
        setFeedback(res.data.feedback.text);
      })
      .catch((err) => {
        alert("An error happened. Please check console");
        console.log(err);
      });
  }, [user]);




  const handleEditFeedback = () => {
    const data = {
      name,
      email,
      rating,
      service,
      feedback,

    };
    axios
      .put(`http://localhost:3000/feedback/updateFeedback/${id}`, data,{headers: {Authorization: `Bearer ${user.token}`  }
    })
      .then(() => {
        alert("feedback edited successfully!!!");
        navigate('/client/feedback/homeFeedback');
      })
      .catch((err) => {
        alert("Error editing feedback");
        console.log(err);
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
      <h1 className="my-4 text-3xl text-white">Edit Feedback</h1>
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto form-input">
        

        
        <div className="my-4">
          <label className="mr-4 text-xl text-gray-500">Give Your New Rating</label>
          <input
            type="text"
            placeholder="(On a scale of 1 to 5)"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="w-full px-4 py-2 border-2 border-gray-500 custom-placeholder"
          />
        </div>

        

        <div className="my-4">
          <label className="mr-4 text-xl text-gray-500">New Review</label>
          <input
            type="text"
            
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full h-20 px-4 py-2 border-2 border-gray-500"
          />
        </div>

        <button className="p-2 m-8 bg-sky-300 font-semibold hover:bg-sky-300" onClick={handleEditFeedback}>
          Save
        </button>

        <Button className="p-1 m-8 bg-sky-300 text-base font-semibold ">
                 <Link to={`/client/feedback/homeFeedback`}>
                   <p className="text-base font-semibold">Cancel</p>
                  </Link>
            </Button>


      </div>
    </div>
    </div>
  );
};

export default EditFeedback;