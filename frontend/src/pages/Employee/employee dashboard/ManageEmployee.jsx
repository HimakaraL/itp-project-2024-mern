import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAuthContext } from '../../../hooks/useAuthContext';
 

const ManageEmployee = () => {
  const { user } = useAuthContext();

  const [employees, setEmployees] = useState([]);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/employee/employees/', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch employees data');
        }
        const data = await response.json();
        console.log('Fetched employees data:', data);
        setEmployees(data.data);
        localStorage.setItem('employees', JSON.stringify(data.data));
      } catch (error) {
        console.error('Error fetching employees:', error);
        // Handle the error (e.g., display an error message)
      }
    };

    fetchData();
  }, [user]);

  const handleDelete = (id) => {
    setEmployeeToDelete(id);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/employee/deleteEmployee/${employeeToDelete}`, { headers: { Authorization: `Bearer ${user.token}` } }); // Include authorization token in headers
      setEmployees((prevEmployees) => prevEmployees.filter((employee) => employee._id !== employeeToDelete));
      setEmployeeToDelete(null);
      localStorage.setItem('employees', JSON.stringify(employees.filter((employee) => employee._id !== employeeToDelete)));
      toast.success('Employee deleted successfully', { position: toast.POSITION.TOP_CENTER });
    } catch (error) {
      console.error('Error deleting employee:', error);
      toast.error('Error deleting employee', { position: toast.POSITION.TOP_CENTER });
    }
  };

  const handleGenerateReport = async () => {
    try {
      const response = await axios.get('http://localhost:3000/generate-employee-pdf/invoice/employees', {
        responseType: 'blob',
        headers: { Authorization: `Bearer ${user.token}` }, // Include authorization token in headers
      });
      const pdfUrl = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
      window.open(pdfUrl, '_blank');
    } catch (error) {
      console.error('Error generating report:', error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredEmployees = employees ? employees.filter((employee) => {
    const fullName = `${employee.FirstName} ${employee.LastName}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  }) : [];

 

  return (
    <div className="px-4 pb-4 h-[100vh] w-[1260px]">
      <div className="flex justify-between p-4 mt-8 mb-6 shadow-lg rounded-xl bg-sidebar-blue">
        <h2 className="text-3xl font-bold text-white">Manage Employees</h2>
        {/* Add your profile icon here */}
      </div>
      <div className="flex justify-between mb-4">
        <button
          className="px-4 py-2 text-white bg-orange-500 rounded-lg shadow-lg"
          onClick={handleGenerateReport}
        >
          Generate Report
        </button>
        <div className="relative text-gray-600">
          <input
            className="h-10 px-5 pr-16 text-sm bg-white border-2 border-gray-300 rounded-lg focus:outline-none"
            type="search"
            name="search"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button type="submit" className="absolute top-0 right-0 mt-3.5 mr-4">
            <svg
              className="w-4 h-4 text-gray-600 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              version="1.1"
              id="Capa_1"
              x="0px"
              y="0px"
              viewBox="0 0 56.966 56.966"
              style={{ enableBackground: "new 0 0 56.966 56.966" }}
              xmlSpace="preserve"
              width="512px"
              height="512px"
            >
              <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
            </svg>
          </button>
        </div>
      </div>
      <div className="h-[60vh] overflow-y-auto">
        <table className="w-full">
          <thead>
            <tr className="text-white bg-sidebar-blue">
              <th className="px-4 py-2">First Name</th>
              <th className="px-4 py-2">NIC</th>
              <th className="px-4 py-2">Gender</th>
              <th className="px-4 py-2">Date of Birth</th>
              <th className="px-4 py-2">Contact Number</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Qualifications</th>
              <th className="px-4 py-2">Position</th>
              <th className="px-4 py-2">Date of Joining</th>
              
              <th className="px-4 py-2">Manage</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee, index) => (
              <tr key={employee._id} className={index % 2 === 0 ? 'bg-white' : 'bg-admin-gray'}>
                <td className="px-4 py-2">{employee.FirstName}</td>
                <td className="px-4 py-2">{employee.Nic}</td>
                <td className="px-4 py-2">{employee.gender}</td>
                <td className="px-4 py-2">{new Date(employee.dob).toLocaleDateString()}</td>
                <td className="px-4 py-2">{employee.contactNo}</td>
                <td className="px-4 py-2">{employee.email}</td>
                <td className="px-4 py-2">{employee.qualifications}</td>
                <td className="px-4 py-2">{employee.position}</td>
                <td className="px-4 py-2">{new Date(employee.dateOfJoining).toLocaleDateString()}</td>
 
                <td className="px-4 py-2">
                  <Link
                    to={`/admin/empdashboard/edit-employee/${employee._id}`}
                    style={{
                      padding: '5px 10px',
                      backgroundColor: '#4caf50',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      textDecoration: 'none', // added inline style for text-decoration
                    }}
                  >
                    Edit
                  </Link>
                  {' | '}
                  <button
                    onClick={() => handleDelete(employee._id)}
                    style={{
                      padding: '5px 10px',
                      backgroundColor: '#f44336',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {employeeToDelete && (
        <div className="modal">
          <div className="modalContent">
            <p className='text-white'>Do you want to delete this employee?</p>
            <div>
              <button
                onClick={() => confirmDelete()}
                style={{
                  padding: '5px 10px',
                  backgroundColor: '#f44336',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  marginRight: '2px', // added inline style for margin-right
                }}
              >
                Yes
              </button>
              <button
                onClick={() => setEmployeeToDelete(null)}
                style={{
                  padding: '5px 10px',
                  backgroundColor: '#2196f3',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageEmployee;
