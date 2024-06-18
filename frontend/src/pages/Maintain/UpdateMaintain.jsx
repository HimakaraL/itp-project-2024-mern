import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  Datepicker,
  TextInput,
  Select,
  Label,
  Button,
  Textarea,
} from "flowbite-react";
import { useAuthContext } from "../../hooks/useAuthContext";
import profile from "../../images/profile.jpg";

const UpdateMaintain = () => {
  const { user } = useAuthContext();
  const [equipmentName, setEquipmentName] = useState("");
  const [description, setDescription] = useState("");
  const [technician, setTechnician] = useState("");
  const [scheduledDate, setScheduledDate] = useState("");
  const datepickerRef = useRef(null);

  const Maintenance_type = ["urgent", "non-urgent"]; //maintain type options
  const [optionMaintenance_type, setoptionMaintenance_type] = useState(
    Maintenance_type[0]
  );

  const Status = ["started", "on-going", "finished"]; //status type options
  const [optionStatus, setoptionStatus] = useState(Status[0]);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    user &&
      axios
        .get(`http://localhost:3000/maintain/get/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        })
        .then((response) => {
          setEquipmentName(response.data.Equipment_name || "");
          setDescription(response.data.Description || "");
          setoptionMaintenance_type(response.data.Maintenance_type || "");
          setScheduledDate(response.data.Sheduled_date || "");
          setoptionStatus(response.data.Status || "");
          setTechnician(response.data.Technician || "");
        })
        .catch((error) => {
          console.error("Error fetching schedule:", error);
        });
  }, [id, user]);

  const handleUpdateMaintain = (event) => {
    event.preventDefault();

    // Validation for Equipment Name, Technician, and Description cannot be empty
    if (
      equipmentName.trim() === "" ||
      technician.trim() === "" ||
      description.trim() === ""
    ) {
      alert("Equipment Name, Technician, and Description cannot be empty.");
      return;
    }

    //date valiadation
    const selectedDate = new Date(scheduledDate);
    const currentDate = new Date();
    selectedDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);

    if (selectedDate < currentDate) {
      // Check if the selected date is in the past
      alert("Scheduled date cannot be set to past dates.");
      return;
    }

    const data = {
      Equipment_name: equipmentName,
      Description: description,
      Maintenance_type: optionMaintenance_type,
      Sheduled_date: scheduledDate,
      Status: optionStatus,
      Technician: technician,
    };
    axios
      .put(`http://localhost:3000/maintain/update/${id}`, data, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then(() => {
        alert("Maintenance schedule updated successfully");
        navigate("/admin/maintain/dashboard/view");
      })
      .catch((error) => {
        console.error("Error updating maintenance schedule:", error);
      });
  };

  return (
    <div className="h-[135vh] px-4 my-12">
      <div className="flex justify-between p-6 mb-6 rounded-xl bg-sidebar-blue">
        <h2 className="mb-8 text-3xl font-bold text-white">Update details</h2>
      </div>
      <form
        onSubmit={handleUpdateMaintain}
        className="flex lg:w-[1180px] flex-col flex-wrap gap-4"
      >
        <div className="flex gap-8">
          <div className="lg:w-1/2">
            <div className="block mb-2">
              <Label className="text-white text-md" htmlFor="equipmentName">
                Equipment Name
              </Label>
              <TextInput
                type="text"
                id="equipmentName"
                value={equipmentName}
                onChange={(e) => setEquipmentName(e.target.value)}
                maxLength={50}
              />
            </div>
          </div>
        </div>

        <div>
          <div className="block mb-2">
            <Label className="text-white text-md" htmlFor="description">
              Description
            </Label>
            <Textarea
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              maxLength={1000}
            />
          </div>
        </div>

        <div className="flex gap-8">
          <div className="lg:w-1/2">
            <div className="block mb-2">
              <Label className="text-white text-md" htmlFor="maintenanceType">
                Maintenance Type
              </Label>
            </div>
            <Select
              id="maintenanceType"
              value={optionMaintenance_type}
              onChange={(e) => setoptionMaintenance_type(e.target.value)}
            >
              {Maintenance_type.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </Select>
          </div>
          <div className="lg:w-1/2">
            <div className="block mb-2">
              <Label className="text-white text-md" htmlFor="scheduledDate">
                Scheduled Date
              </Label>
            </div>
            <Datepicker
              id="scheduledDate"
              name="scheduledDate"
              ref={datepickerRef}
            />
          </div>
        </div>
        <div className="flex gap-8">
          <div className="lg:w-1/2">
            <div className="block mb-2">
              <Label className="text-white text-md" htmlFor="status">
                Status
              </Label>
            </div>
            <Select
              id="status"
              value={optionStatus}
              onChange={(e) => setoptionStatus(e.target.value)}
            >
              {Status.map((status, index) => (
                <option key={index} value={status}>
                  {status}
                </option>
              ))}
            </Select>
          </div>
          <div className="lg:w-1/2">
            <div className="block mb-2">
              <Label className="text-white text-md" htmlFor="technician">
                Technician
              </Label>
            </div>
            <TextInput
              type="text"
              id="technician"
              value={technician}
              pattern="[A-Za-z\s]+"
              title="Please enter only letters(no numbers or special characters)"
              onChange={(e) => setTechnician(e.target.value)}
              maxLength={100}
            />
          </div>
        </div>

        <Button
          type="submit"
          className="mt-5 shadow-lg bg-header-orange rounded-2xl"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default UpdateMaintain;
