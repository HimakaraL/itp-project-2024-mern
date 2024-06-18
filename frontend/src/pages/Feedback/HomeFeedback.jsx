import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { PiBookOpenLight } from "react-icons/pi";
import viewBG from "../../images/viewBG.jpg"
import NavBar from "../../components/landingPage/NavBar"

import { useAuthContext } from "../../hooks/useAuthContext";
import "./feedback.css";

const HomeFeedback = () => {
  const {user} = useAuthContext()
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    user&&
    axios
      .get(`http://localhost:3000/feedback/allFeedback`,{headers: {Authorization: `Bearer ${user.token}`  }
    })
      .then((res) => {
        setFeedbacks(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [user]);

  

  const formatDate = (isoDate) => {
    const dateObject = new Date(isoDate);
    return dateObject.toISOString().split('T')[0]; // Extracts YYYY-MM-DD
  };

  return (
    <div className="home-feedback-container" style={{
      backgroundImage: `url(${viewBG})`,
      backgroundSize: "cover",
      backgroundPosition: "50% 10%",
      backgroundRepeat: "no-repeat",
    }}>
      <NavBar/>
      <div className="h-screen px-4 pt-8 pb-4">
        <div className="flex justify-between p-4 mb-6 shadow-lg rounded-xl" style={{ backgroundColor: '#342056' }}>
          <h2 className="text-3xl font-bold text-white ">
            Feedback & Reviews
          </h2>
         
        </div>


        <div className='p-4 table-container'>
          <div className='flex items-center justify-between'>
            <h1 className='my-8 text-3xl'>Feedback List</h1>
            <Link to='/client/feedback/addFeedback' className="flex items-center">
              <button className="px-4 py-2 ml-2 font-semibold text-white bg-orange-500 rounded-sm hover:bg-blue-600">
                Write a Review
              </button>
            </Link>
          </div>
            <div className='grid sm:grid-cols-2 lf:grid-cols-3 xl:grid-cols-4'>
              {feedbacks.map((feedback) => (
                <div
                  key={feedback._id}
                  className='relative px-4 py-2 m-4 border-2 border-gray-500 rounded-lg hover:shadow-xl'>
                  <h2 className='absolute px-4 py-1 bg-orange-700 rounded-lg top-1 right-2 ' style={{ color: 'black' }}>
                    {formatDate(feedback.date)}
                  </h2>
                  
                  <div className='flex items-center justify-start gap-x-2'>
                    <PiBookOpenLight className='text-2xl text-red-300' />
                    <h2 className='my-2'>{feedback.name}</h2>
                  </div>

                  <div className='flex items-center justify-start gap-x-2'>
                    <PiBookOpenLight className='text-2xl text-red-300' />
                    <h2 className='my-2'>{feedback.rating}</h2>
                  </div>
                  <div className='flex items-center justify-start gap-x-2'>
                    <PiBookOpenLight className='text-2xl text-red-300' />
                    <h2 className='my-2'>{feedback.service}</h2>
                  </div>
                  <div className='flex items-center justify-start gap-x-2'>
                    <PiBookOpenLight className='text-2xl text-red-300' />
                    <h2 className='my-2'>{feedback.feedback}</h2>
                  </div>


                  <div className="flex justify-center gap-x-4">
            
                    <Link to={`/client/feedback/updateFeedback/${feedback._id}`}>
                      <AiOutlineEdit className="text-2xl text-yellow-600" />
                    </Link>
                    <Link to={`/client/feedback/deleteFeedback/${feedback._id}`}>
                      <MdOutlineDelete className="text-2xl text-red-600" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default HomeFeedback;
