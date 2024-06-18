import React from "react";
import { Button } from "flowbite-react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

import { Link } from "react-router-dom";

const DeleteService = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeleteService = () => {
    axios
      .delete(`http://localhost:3000/service/delete/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then(() => {
        navigate("/admin/service/dashboard/all");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="px-4 pb-4 my-4 h-[100vh]">
      <div className="flex flex-col items-center col-span-2 mt-8">

        <p className="mb-10 text-xl text-white">
          Are you sure you want to delete this Service/Package?
        </p>
        <div className="flex gap-14">
          <Link to="/admin/service/dashboard/all">
            <Button color="success">Cancel</Button>
          </Link>

          <Button color="warning" onClick={handleDeleteService}>
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteService;