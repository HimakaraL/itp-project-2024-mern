import React, { useState } from "react";
import { Label, TextInput } from "flowbite-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Select } from "flowbite-react";
import { Button } from "flowbite-react";
import { useAuthContext } from "../../hooks/useAuthContext";

const CreateService = () => {
  const { user } = useAuthContext();
  const [sname, setService] = useState("");
  const [availability, setAvailability] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [icon, setIcon] = useState("person.svg"); //default
  const navigate = useNavigate();

  const handleSaveService = () => {
    const data = {
      sname,
      availability,
      type,
      description,
      status,
      icon,
    };

    axios
      .post("http://localhost:3000/service/add", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then(() => {
        navigate("/admin/service/dashboard");
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

  function validateString(y) {
    if (/^[a-zA-Z]+$/.test(y)) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div className="px-4 pb-4 my-4 h-[100vh] ">
      <div className="flex items-center justify-center p-4 mb-6 shadow-lg rounded-xl bg-sidebar-blue">
        <h2 className="text-3xl font-bold text-white ">Create a Package</h2>
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
              value="Validity Period(Days)"
              className="text-white text-md"
            />
          </div>
          <TextInput
            id=""
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
        <div>
          <p id="p2" className="text-xs text-red-500"></p>
        </div>
        <div className="">
          <div className="mb-2 ">
            <Label
              htmlFor="icons"
              value="Select Icon"
              className="text-white text-md"
            />
          </div>
          <Select
            id="icons"
            required
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
          >
            <option value="bulb.svg">Lighting</option>
            <option value="hut.svg">Hut Services</option>
            <option value="money.svg">Financial</option>
            <option value="person.svg">Social</option>
            <option value="speaker.svg">Sound</option>
            <option value="vehicle.svg">Transport</option>
          </Select>
        </div>
        <div className="flex items-center justify-center">
          <Button
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
                handleSaveService();
              }
            }}
            className="items-center justify-center px-4 py-2 mt-4 text-white rounded-full bg-sidebar-orange "
          >
            Create
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateService;
