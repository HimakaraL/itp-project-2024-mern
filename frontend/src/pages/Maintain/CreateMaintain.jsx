import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

const CreateMaintain = () => {
  const { user } = useAuthContext();
  const [Equipment_name, setEquipment_name] = useState("");
  const [Description, setDescription] = useState("");
  const [Technician, setTechnician] = useState("");

  const Maintenance_type = ["urgent", "non-urgent"]; //maintain type options
  const [optionMaintenance_type, setoptionMaintenance_type] = useState(
    Maintenance_type[0]
  );

  const Status = ["started", "on-going", "finished"]; //status type options
  const [optionStatus, setoptionStatus] = useState(Status[0]);

  const navigate = useNavigate();

  const handleSaveMaintain = (event) => {
    event.preventDefault();
    const form = event.target;
    const Sheduled_date = form.scheduledDate.value;

    //date valiadation
    const selectedDate = new Date(Sheduled_date);
    const currentDate = new Date();
    selectedDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);

    if (selectedDate < currentDate) {
      // Check if the selected date is in the past
      alert("Scheduled date cannot be set to past dates.");
      return;
    }

    // Validation for Equipment Name, Technician, and Description cannot be empty
    if (
      Equipment_name.trim() === "" ||
      Technician.trim() === "" ||
      Description.trim() === ""
    ) {
      alert("Equipment Name, Technician, and Description cannot be empty.");
      return;
    }

    const data = {
      Equipment_name,
      Description,
      Maintenance_type: optionMaintenance_type,
      Sheduled_date,
      Status: optionStatus,
      Technician,
    };
    axios
      .post(`http://localhost:3000/maintain/add`, data, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then(() => {
        alert("Maintain schedule added successfully");
        navigate("/admin/maintain/dashboard/view");
      })
      .catch((err) => {
        alert("Error occurred while adding maintain schedule");
        console.error(err);
      });
  };

  return (
    <div className="h-[135vh] px-4 ">
      <div className="flex justify-between p-6 mt-4 mb-6 rounded-xl bg-sidebar-blue">
        <h2 className="mb-8 text-3xl font-bold text-white">
          Add New Maintenance Schedule
        </h2>
        
      </div>
      <form
        onSubmit={handleSaveMaintain}
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
                value={Equipment_name}
                onChange={(e) => setEquipment_name(e.target.value)}
                maxLength={20}
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
              value={Description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              maxLength={255}
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
            <Datepicker id="scheduledDate" name="scheduledDate" />
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
              value={Technician}
              pattern="[A-Za-z\s]+"
              title="Please enter only letters(no numbers or special characters)"
              onChange={(e) => setTechnician(e.target.value)}
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

export default CreateMaintain;
