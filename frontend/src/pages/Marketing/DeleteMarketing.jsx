import React from "react";
import { Button } from "flowbite-react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

const DeleteMarketing = () => {
  const { user } = useAuthContext();

  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const handleDeleteMarketing = () => {
    axios
      .delete(`http://localhost:3000/marketing/delete/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then(() => {
        enqueueSnackbar("Deleted successfully!", {
          variant: "success",
        });
        navigate("/admin/service/dashboard");
      })
      .catch((error) => {
        enqueueSnackbar("Deletion unsuccessful!", { variant: "error" });
        alert("An error happened");
        console.log(error);
      });
  };

  return (
    <div className="px-4 pb-4 h-[100vh]">
      <div className="flex flex-col items-center col-span-2 mt-60">
        <p className="mb-10 text-xl text-white">
          Are you sure you want to delete this Promotion campaign?
        </p>
        <div className="flex gap-14">
          <Link to="/admin/service/dashboard">
            <Button color="success">Cancel</Button>
          </Link>

          <Button color="warning" onClick={handleDeleteMarketing}>
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteMarketing;
