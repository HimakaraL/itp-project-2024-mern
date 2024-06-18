import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

const DeleteOrder = () => {
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeleteRental = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:3000/rental/delete/${id}`,{headers: {Authorization: `Bearer ${user.token}`  }
    })
      .then(() => {
        setLoading(false);
        alert ("Order deleted successfully.");
        navigate("/admin/rental/dashboard/manage");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <div className="m-auto " style={{ height: "100vh" }}>

      <div className="flex justify-between p-6 mt-8 mb-6 rounded-xl bg-sidebar-blue">
        <h2 className="text-3xl font-bold text-white ">Delete Order</h2>
      </div>
      
      <div className="flex flex-col items-center border-2 border-sidebar-orange rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text-2xl text-white">
          Are you sure you want to delete this order?
        </h3>

        <button
          className="p-2 m-8 font-bold text-white bg-red-600 rounded-sm hover:bg-sidebar-orange"
          onClick={handleDeleteRental}
        >
          Yes, Delete It
        </button>
      </div>
    </div>
  );
};

export default DeleteOrder