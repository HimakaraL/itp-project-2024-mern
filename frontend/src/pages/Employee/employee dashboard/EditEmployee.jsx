import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthContext } from '../../../hooks/useAuthContext'; // Adjust the path as per your file structure
import validator from "validator";

const EditEmployee = () => {
  const { id } = useParams(); // Get the ID from the URL params
  const { user } = useAuthContext(); // Assuming you have a similar auth context as in AddInventory.js

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

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Fetch the employee by ID
    axios.get(`http://localhost:3000/employee/getEmployee/${id}`, { headers: { Authorization: `Bearer ${user.token}` } }) // Include authorization token in headers
      .then(response => {
        const { FirstName, LastName, Nic, gender, dob, contactNo, email, qualifications, position, dateOfJoining } = response.data;
        setFormData({ FirstName, LastName, Nic, gender, dob, contactNo, email, qualifications, position, dateOfJoining});
      })
      .catch(error => console.error('Error fetching employee:', error));
  }, [id, user.token]);

  const validateForm = () => {
    if (!validator.isAlpha(formData.FirstName)) {
      alert('First Name must contain only letters');
      return false;
    }
    if (!validator.isAlpha(formData.LastName)) {
      alert('Last Name must contain only letters');
      return false;
    }

    if (!/^\d*$/.test(formData.contactNo) || (formData.contactNo.length !== 10 && formData.contactNo.length !== 0)) {
      alert('Contact Number must be 10 digits');
      return false;
    }
    return true;
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
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      // Update employee using PUT request
      await axios.put(`http://localhost:3000/employee/updateEmployee/${id}`, formData, { headers: { Authorization: `Bearer ${user.token}` } }); // Include authorization token in headers
      console.log('Employee updated successfully:', formData);
      // Show success message notification
      setSuccessMessage('Employee data updated successfully');
      toast.success('Employee data updated successfully', { position: toast.POSITION.TOP_CENTER });
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  const formContainerStyle = {
    margin:'auto',
    marginTop:'20px',
    marginBottom:'20px' 
    
  };

  return (
    <div className="" style={formContainerStyle}>
      <div className="flex justify-center flex-grow">
        <form onSubmit={handleSubmit} className="w-full max-w-xl p-8 bg-white rounded-lg shadow-lg">
          <h2 className="mb-4 text-2xl font-semibold text-center">Edit Employee</h2>
          <div className="grid grid-cols-2 gap-4">
            {/* Form fields */}
            <div className="mb-6">
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
            </div>
            <div className="mb-6">
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
            </div>
             
            {/* NIC */}
            <div className="mb-6">
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
            {/* Gender */}
            <div className="mb-6">
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
            {/* Date of Birth */}
            <div className="mb-6">
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
            {/* Contact Number */}
            <div className="mb-6">
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
            </div>
            {/* Email */}
            <div className="mb-6">
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
            {/* Qualifications */}
            <div className="col-span-2 mb-6">
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
            {/* Position */}
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
            {/* Date of Joining */}
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
          <button type="submit" className="w-full px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600">Update Employee</button>
        </form>
        {successMessage && (
          <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center">
            <div className="p-4 text-white bg-green-500 rounded shadow-lg">
              <p className="text-lg">{successMessage}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditEmployee;
