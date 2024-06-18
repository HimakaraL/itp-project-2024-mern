import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import validator from 'validator';
import { useAuthContext } from '../../../hooks/useAuthContext';

const EditSalary = () => {
  const { id } = useParams();
  const { user } = useAuthContext();
  const [formData, setFormData] = useState({
    Name: '',
    Eid: '',
    Nic: '',
    JobPosition: '',
    Month:'',
    OtRate: '',
    OtHours: '',
    BasicSalary: '',
    NetSalary: ''
  });

  const [calculated, setCalculated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    user &&
    axios.get(`http://localhost:3000/salary/getSalary/${id}`, { headers: { Authorization: `Bearer ${user.token}` } })
      .then(response => {
        const { Name, Eid, Nic, JobPosition, Month, OtRate, OtHours, BasicSalary, NetSalary } = response.data;
        setFormData({ Name, Eid, Nic, JobPosition, Month, OtRate, OtHours, BasicSalary, NetSalary });
      })
      .catch(error => console.error('Error fetching salary:', error));
  }, [user, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
    setCalculated(false);
  };

  const handleCalculate = () => {
    const NetSalary = parseFloat(formData.BasicSalary) + parseFloat(formData.OtRate) * parseFloat(formData.OtHours);
    setFormData(prevData => ({
      ...prevData,
      NetSalary: NetSalary.toFixed(2)
    }));
    setCalculated(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!calculated || !validateForm()) {
      return;
    }
    try {
      await axios.put(`http://localhost:3000/salary/updateSalary/${id}`, formData, { headers: { Authorization: `Bearer ${user.token}` } });
      console.log('Salary updated successfully:', formData);
      toast.success('Salary data updated successfully', { position: toast.POSITION.TOP_CENTER });
      alert('Salary updated successfully!');
    } catch (error) {
      console.error('Error updating salary:', error);
      alert('Salary updated successfully!');
    }
  };

     // Validation function for form fields
const validateForm = () => {
  // Validation for Name field
  if (!validator.isAlpha(formData.Name)) {
      alert('Name must contain only letters');
      return false;
  }
  // Validation for BasicSalary, OtHours, and OtRate fields
  if (parseFloat(formData.BasicSalary) < 0 || parseFloat(formData.OtHours) < 0 || parseFloat(formData.OtRate) < 0) {
      alert('Basic Salary, OT Hours, and OT Rate must be zero or positive numbers');
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
    <div className="" style={formContainerStyle}>
      <div className="flex justify-center flex-grow">
        <form onSubmit={handleSubmit} className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
          <h2 className="mb-4 text-2xl font-semibold text-center">Edit Salary</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-6">
              <label htmlFor="Eid" className="block text-sm font-medium text-gray-700">Eid:</label>
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
              <label htmlFor="Name" className="block text-sm font-medium text-gray-700">Name:</label>
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
              <label htmlFor="Nic" className="block text-sm font-medium text-gray-700">Nic:</label>
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
            <div className="mb-6">
              <label htmlFor="JobPosition" className="block text-sm font-medium text-gray-700">Job Position:</label>
              <select
                id="JobPosition"
                name="JobPosition"
                value={formData.JobPosition}
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
              <label htmlFor="Month" className="block text-sm font-medium text-gray-700">Month:</label>
              <select
                id="Month"
                name="Month"
                value={formData.Month}
                onChange={handleChange}
                required
                className="block w-full p-3 mt-1 border border-gray-300 rounded"
              >
                <option value="">Select Month</option>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
              </select>
            </div>
            <div className="mb-6">
              <label htmlFor="OtRate" className="block text-sm font-medium text-gray-700">Ot Rate:</label>
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
              <label htmlFor="OtHours" className="block text-sm font-medium text-gray-700">Ot Hours:</label>
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
              <label htmlFor="BasicSalary" className="block text-sm font-medium text-gray-700">Basic Salary:</label>
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
            <div className="mb-6">
              <label htmlFor="NetSalary" className="block text-sm font-medium text-gray-700">Net Salary:</label>
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
          <button type="button" onClick={handleCalculate} className="w-full px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600">{calculated ? 'Recalculate Net Salary' : 'Calculate Net Salary'}</button>
          <button type="submit" className={`bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full mt-4 ${calculated ? '' : 'opacity-50 cursor-not-allowed'}`}>{calculated ? 'Update Salary' : 'Calculate Net Salary First'}</button>
        </form>
      </div>
    </div>
  );
};

export default EditSalary;
