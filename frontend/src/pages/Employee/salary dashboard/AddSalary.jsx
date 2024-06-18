import React, { useState } from "react";
import axios from "axios";
import { useAuthContext } from "../../../hooks/useAuthContext";
import validator from "validator"; // Import validator library

const AddSalary = () => {
  const { user } = useAuthContext();

  const [formData, setFormData] = useState({
    Eid: "",
    Name: "",
    Nic: "",
    JobPosition: "",
    Month: "",
    OtRate: "",
    OtHours: "",
    BasicSalary: "",
    NetSalary: "",
  });

  const [calculated, setCalculated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setCalculated(false);
  };

  const handleCalculate = () => {
    const NetSalary =
      parseFloat(formData.BasicSalary) +
      parseFloat(formData.OtRate) * parseFloat(formData.OtHours);
    setFormData((prevData) => ({
      ...prevData,
      NetSalary: NetSalary.toFixed(2),
    }));
    setCalculated(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      // Call the validation function before submitting
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/salary/createSalary",
        formData,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      console.log("Form submitted:", formData);
      console.log("Response:", response.data);

      // Show success message
      alert("Salary added successfully!");

      // Reset form data
      setFormData({
        Eid: "",
        Name: "",
        Nic: "",
        JobPosition: "",
        Month: "",
        OtRate: "",
        OtHours: "",
        BasicSalary: "",
        NetSalary: "",
      });

      setCalculated(false);
      setErrorMessage("");
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.message);
        // Show error message in a pop-up
        alert(error.response.data.message);
      } else {
        setErrorMessage("Failed to add salary. Please try again later.");
        // Show generic error message in a pop-up
        alert("Failed to add salary. Please try again later.");
      }
    }
  };

  // Validation function for form fields
  const validateForm = () => {
    // Validation for Name field
    if (!validator.isAlpha(formData.Name)) {
      alert("Name must contain only letters");
      return false;
    }
    // Validation for BasicSalary, OtHours, and OtRate fields
    if (
      parseFloat(formData.BasicSalary) < 0 ||
      parseFloat(formData.OtHours) < 0 ||
      parseFloat(formData.OtRate) < 0
    ) {
      alert(
        "Basic Salary, OT Hours, and OT Rate must be zero or positive numbers"
      );
      return false;
    }
    return true;
  };

  const formContainerStyle = {
    margin:'auto',
    marginTop:'20px',
    marginBottom:'20px' 
  };

  return (
    <div className="h-[120vh]" style={formContainerStyle}>
      <div className="flex justify-center flex-grow">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg p-10 bg-white rounded-lg shadow-lg"
        >
          <div></div>
          <h2 className="mb-8 text-3xl font-bold text-center text-blue-600">
            Add Salary
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-6">
              <label
                htmlFor="Eid"
                className="block text-sm font-medium text-gray-700"
              >
                Eid:
              </label>
              <input
                type="text"
                id="Eid"
                name="Eid"
                value={formData.Eid}
                onChange={handleChange}
                required
                className="block w-full p-3 mt-1 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="Name"
                className="block text-sm font-medium text-gray-700"
              >
                Name:
              </label>
              <input
                type="text"
                id="Name"
                name="Name"
                value={formData.Name}
                onChange={handleChange}
                required
                className="block w-full p-3 mt-1 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="Nic"
                className="block text-sm font-medium text-gray-700"
              >
                Nic:
              </label>
              <input
                type="text"
                id="Nic"
                name="Nic"
                value={formData.Nic}
                onChange={handleChange}
                required
                className="block w-full p-3 mt-1 border border-gray-300 rounded"
              />
            </div>
            {/* Position */}
            <div className="mb-6">
              <label
                htmlFor="JobPosition"
                className="block text-sm font-medium text-gray-700"
              >
                Job Position:
              </label>
              <select
                id="JobPosition"
                name="JobPosition"
                value={formData.position}
                onChange={handleChange}
                required
                className="block w-full p-3 mt-1 border border-gray-300 rounded"
              >
                <option value="">Select Position</option>
                <option value="Cleaner">Cleaner</option>
                <option value="Helper">Helper</option>
                <option value="Technician">Technician</option>
                <option value="Supervisor">Supervisor</option>
                <option value="Manager">Manager</option>
                <option value="Driver">Driver</option>
              </select>
            </div>
            <div className="mb-6">
              <label
                htmlFor="Month"
                className="block text-sm font-medium text-gray-700"
              >
                Month:
              </label>
              <select
                type="String"
                id="Month"
                name="Month"
                value={formData.Month}
                onChange={handleChange}
                required
                className="block w-full p-3 mt-1 border border-gray-300 rounded"
              >
                <option value="">Select Month</option>
                <option value="0">January</option>
                <option value="1">February</option>
                <option value="2">March</option>
                <option value="3">April</option>
                <option value="4">May</option>
                <option value="5">June</option>
                <option value="6">July</option>
                <option value="7">August</option>
                <option value="8">September</option>
                <option value="9">October</option>
                <option value="10">November</option>
                <option value="11">December</option>
              </select>
            </div>

            <div className="mb-6">
              <label
                htmlFor="OtRate"
                className="block text-sm font-medium text-gray-700"
              >
                OT Rate:
              </label>{" "}
              {/* Changed from NumberofDates to OtRate */}
              <input
                type="Number"
                id="OtRate"
                name="OtRate"
                value={formData.OtRate}
                onChange={handleChange}
                required
                className="block w-full p-3 mt-1 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="OtHours"
                className="block text-sm font-medium text-gray-700"
              >
                Ot Hours:
              </label>
              <input
                type="Number"
                id="OtHours"
                name="OtHours"
                value={formData.OtHours}
                onChange={handleChange}
                required
                className="block w-full p-3 mt-1 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="BasicSalary"
                className="block text-sm font-medium text-gray-700"
              >
                Basic Salary:
              </label>
              <input
                type="Number"
                id="BasicSalary"
                name="BasicSalary"
                value={formData.BasicSalary}
                onChange={handleChange}
                required
                className="block w-full p-3 mt-1 border border-gray-300 rounded"
              />
            </div>
            <div className="col-span-2 mb-6 ">
              <label
                htmlFor="NetSalary"
                className="block text-sm font-medium text-gray-700"
              >
                Net Salary:
              </label>
              <input
                type="Number"
                id="NetSalary"
                name="NetSalary"
                value={formData.NetSalary}
                readOnly
                className="block w-full p-3 mt-1 border border-gray-300 rounded"
              />
            </div>
          </div>
          {/* Render the Calculate button if it's not already calculated */}
          {!calculated && (
            <button
              type="button"
              onClick={handleCalculate}
              className="w-full px-4 py-2 mb-4 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Calculate
            </button>
          )}
          {/* Render the Add Salary button if it's already calculated */}
          {calculated && (
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
            >
              Add Salary
            </button>
          )}
          {errorMessage && <div className="text-red-500">{errorMessage}</div>}
        </form>
      </div>
    </div>
  );
};

export default AddSalary;
