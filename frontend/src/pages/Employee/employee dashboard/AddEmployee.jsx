import React, { useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '../../../hooks/useAuthContext';
import validator from "validator";

const AddEmployee = () => {
  const { user } = useAuthContext();

  const [formData, setFormData] = useState({
    FirstName: '',
    LastName: '',
    Nic: '',
    gender: '',
    dob: '',
    contactNo: '',
    email: '',
    qualifications: '',
    position: '',
    dateOfJoining: '',
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post(
          'http://localhost:3000/employee/createEmployee',
          formData,
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
        console.log('Form submitted:', formData);
        console.log('Response:', response.data);
        alert('Employee added Successfully');
        resetForm();
      } catch (error) {
        if (error.response && error.response.status === 400) {
          alert('Employee with this NIC number already exists');
        } else {
          console.error('Error:', error);
          alert('Failed to add employee, Check Email (already exists)');
        }
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Reset errors when the user interacts with the form
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: '' // Reset the error for this field
    }));
  };

  const validateForm = () => {
    const errors = {};

    if (!validator.isAlpha(formData.FirstName)) {
      errors.FirstName = 'First Name must contain only letters';
    }
    if (!validator.isAlpha(formData.LastName)) {
      errors.LastName = 'Name must contain only letters';
    }

    if (!/^\d*$/.test(formData.contactNo) || (formData.contactNo.length !== 10 && formData.contactNo.length !== 0)) {
      errors.contactNo = 'Contact Number must be 10 digits';
    }

    return errors;
  };

  const resetForm = () => {
    setFormData({
      FirstName: '',
      LastName: '',
      Nic: '',
      gender: '',
      dob: '',
      contactNo: '',
      email: '',
      qualifications: '',
      position: '',
      dateOfJoining: '',
    });
    setErrors({});
  };

  const formContainerStyle = {
    margin:'auto',
    marginTop:'20px',
    marginBottom:'20px' 
  };

  return (
    <div className="" style={formContainerStyle}>
      <div className="w-full max-w-3xl">
        <form onSubmit={handleSubmit} className="p-8 mx-auto bg-white rounded-lg shadow-lg">
          <h2 className="mb-4 text-2xl font-semibold text-center">Add Employee</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 mb-2">
              <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700">First Name:</label>
              <input
                type="text"
                id="FirstName"
                name="FirstName"
                value={formData.FirstName}
                onChange={handleChange}
                required
                className="block w-full p-3 mt-1 border border-gray-300 rounded"
              />
              {errors.FirstName && <p className="text-red-500">{errors.FirstName}</p>}
            </div>
            <div className="col-span-2 mb-2">
              <label htmlFor="LastName" className="block text-sm font-medium text-gray-700">Last Name:</label>
              <input
                type="text"
                id="LastName"
                name="LastName"
                value={formData.LastName}
                onChange={handleChange}
                required
                className="block w-full p-3 mt-1 border border-gray-300 rounded"
              />
              {errors.LastName && <p className="text-red-500">{errors.LastName}</p>}
            </div>
            <div className="col-span-1 mb-2">
              <label htmlFor="Nic" className="block text-sm font-medium text-gray-700">NIC:</label>
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
            <div className="col-span-1 mb-2">
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender:</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="block w-full p-3 mt-1 border border-gray-300 rounded"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="col-span-1 mb-2">
              <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth:</label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
                className="block w-full p-3 mt-1 border border-gray-300 rounded"
              />
            </div>
            <div className="col-span-1 mb-2">
              <label htmlFor="contactNo" className="block text-sm font-medium text-gray-700">Contact Number:</label>
              <input
                type="text"
                id="contactNo"
                name="contactNo"
                value={formData.contactNo}
                onChange={handleChange}
                required
                className="block w-full p-3 mt-1 border border-gray-300 rounded"
                />
                {errors.contactNo && <p className="text-red-500">{errors.contactNo}</p>}
                </div>
            <div className="col-span-2 mb-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="block w-full p-3 mt-1 border border-gray-300 rounded"
              />
            </div>
            <div className="col-span-2 mb-8">
              <label htmlFor="qualifications" className="block text-sm font-medium text-gray-700">Qualifications:</label>
              <textarea
                id="qualifications"
                name="qualifications"
                value={formData.qualifications}
                onChange={handleChange}
                required
                rows="4"
                className="block w-full p-3 mt-1 border border-gray-300 rounded resize-none"
              ></textarea>
            </div>
            <div className="mb-6">
              <label htmlFor="position" className="block text-sm font-medium text-gray-700">Position:</label>
              <select
                id="position"
                name="position"
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
              <label htmlFor="dateOfJoining" className="block text-sm font-medium text-gray-700">Date of Joining:</label>
              <input
                type="date"
                id="dateOfJoining"
                name="dateOfJoining"
                value={formData.dateOfJoining}
                onChange={handleChange}
                required
                className="block w-full p-3 mt-1 border border-gray-300 rounded"
              />
            </div>
          </div>
          <button type="submit" className="w-full px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600">Add Employee</button>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
