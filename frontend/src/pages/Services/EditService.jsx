import React, { useState, useEffect } from "react";
import { Label, TextInput } from "flowbite-react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

import { Button } from "flowbite-react";

import { Select } from "flowbite-react";

const EditService = () => {
  const { user } = useAuthContext();

  const [sname, setService] = useState("");
  const [availability, setAvailability] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    user &&
      fetch(`http://localhost:3000/service/get/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setService(data.sname);
          setAvailability(data.availability);
          setType(data.type);
          setDescription(data.description);
          setStatus(data.status);
        });
  }, [user]);

  const handleEditService = () => {
    const data = {
      sname,
      availability,
      type,
      description,
      status,
    };

    axios
      .put(`http://localhost:3000/service/update/${id}`, data, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then(() => {
        navigate("/admin/service/dashboard/all");
      })
      .catch((error) => {
        alert("An error happened");
        console.log(error);
      });
  };

  function validateAvailability(x) {
    if (isNaN(x) || x < 1 || x > 30) {
      return false;
    } else {
      return true;
    }
  }

  function validateString(y) {
    if (/^[a-zA-Z]+$/.test(y)) {
      return true;
    } else {
      return false;
    }
  }
  return (
 
    <div className="h-[100vh] px-4 pb-4 my-4 ">
      <div className="flex items-center justify-center p-4 mb-6 shadow-lg rounded-xl bg-sidebar-blue">
        <h2 className="text-3xl font-bold text-white ">Update Service</h2>
      </div>

      <div className=" w-[400px]">
        <div>
          <div className="mb-2 ">
            <Label
              htmlFor="small"
              value="Service"
              className="text-white text-md"
            />
          </div>
          <TextInput
            className="w-full"
            id=""
            type="text"
            value={sname}
            onChange={(e) => setService(e.target.value)}
          />
        </div>
        <div>
          <p id="p1" className="text-xs text-red-500"></p>
        </div>
        <div>
          <div className="mb-2 ">
      
            <Label
              htmlFor="base"
              value="Validity Period (Days)"
              className="text-white text-md"
            />
          </div>
          <TextInput
            id="availability"
            type="text"
            sizing="md"
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
          />
        </div>
        <div>
          <p id="p2" className="text-xs text-red-500"></p>
        </div>
        <div>
          <div className="mb-2 ">
   
            <Label
              htmlFor="large"
              value="Type"
              className="text-white text-md"
            />
          </div>
          <TextInput
            id="large"
            type="text"
            sizing="lg"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </div>
        <div>
          <p id="p3" className="text-xs text-red-500"></p>
        </div>
        <div>
          <div className="mb-2 ">
       
            <Label
              htmlFor="large"
              value="Description"
              className="text-white text-md"
            />
          </div>
          <TextInput
            id="large"
            type="text"
            sizing="lg"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <div className="mb-2 ">
            <Label
              htmlFor="large"
              value="Status"
              className="text-white text-md"
            />
          </div>
          <Select
            id="large"
            type="text"
            sizing="lg"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="" disabled>
              Select Status
            </option>
            <option value="Active">Active</option>
            <option value="Deactive">Deactive</option>
          </Select>
        </div>
        <br />
        <div className="flex items-center justify-center">
          <Button
           className="bg-sidebar-orange"
            color="dark"
            onClick={() => {
              let isValid = true;
              if (!validateString(sname)) {
                document.getElementById("p1").innerHTML =
                  "Service name should be words consists of letters!";
                isValid = false;
              } else {
                document.getElementById("p1").innerHTML = "";
              }

              if (!validateAvailability(availability)) {
                document.getElementById("p2").innerHTML =
                  "Validity period must be a number between 1 and 30!";
                isValid = false;
              } else {
                document.getElementById("p2").innerHTML = "";
              }

              if (!validateString(type)) {
                document.getElementById("p3").innerHTML =
                  "Service type should be words consists of letters!";
                isValid = false;
              } else {
                document.getElementById("p3").innerHTML = "";
              }

              if (isValid) {
                handleEditService();
              }
            }}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditService;