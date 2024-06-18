import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAuthContext } from '../../../hooks/useAuthContext';

const ManageSalary = () => {
  const { user } = useAuthContext();

  const [salaries, setSalaries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [salaryToDelete, setSalaryToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchSalaries();
  }, [user]); // Fetch data whenever the user state changes

  const fetchSalaries = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3000/salary/salaries', { headers: { Authorization: `Bearer ${user.token}` } });
      setSalaries(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching salaries:', error);
      toast.error('Error fetching salaries', { position: toast.POSITION.TOP_CENTER });
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    setSalaryToDelete(id);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/salary/deleteSalary/${salaryToDelete}`, { headers: { Authorization: `Bearer ${user.token}` } }); // Include authorization token in headers
      setSalaries((prevSalaries) => prevSalaries.filter((salary) => salary._id !== salaryToDelete));
      setSalaryToDelete(null);
      toast.success('Salary deleted successfully', { position: toast.POSITION.TOP_CENTER });
    } catch (error) {
      console.error('Error deleting salary:', error);
      toast.error('Error deleting salary', { position: toast.POSITION.TOP_CENTER });
    }
  };

  const handleGenerateReport = async () => {
    try {
      const response = await axios.get('http://localhost:3000/generate-salary-pdf/invoice/salaries', {
        responseType: 'blob',
        headers: { Authorization: `Bearer ${user.token}` } // Include authorization token in headers
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

  const filteredSalaries = salaries.filter((salary) => {
    const fullName = `${salary.Name}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  return (
    <div className="px-4 pb-4  h-[100vh]">
       <div className="flex justify-between p-4 mt-8 mb-6 shadow-lg rounded-xl bg-sidebar-blue">
       
        <h2 className="text-3xl font-bold text-white">Manage Salaries</h2>
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
        <table className="w-full xl:w-max">
          <thead>
              <tr className="text-white bg-sidebar-blue">
              <th className="px-4 py-2">Eid</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">NIC</th>
              <th className="px-4 py-2">Job Position</th>
              <th className="px-4 py-2">Month</th>
              <th className="px-4 py-2">Ot Rate</th>
              <th className="px-4 py-2">Ot Hours</th>
              <th className="px-4 py-2">Basic Salary</th>
              <th className="px-4 py-2">Net Salary</th>
              <th className="px-4 py-2">Manage</th>
            </tr>
          </thead>
          <tbody>
            {filteredSalaries.map((salary, index) => (
              <tr key={salary._id} className={index % 2 === 0 ? 'bg-white' : 'bg-admin-gray'}>
               
               <td className="px-4 py-2">{salary.Eid}</td>
                <td className="px-4 py-2">{salary.Name}</td>
                <td className="px-4 py-2">{salary.Nic}</td>
                <td className="px-4 py-2">{salary.JobPosition}</td>
                <td className="px-4 py-2">{salary.Month}</td>
                <td className="px-4 py-2">{salary.OtRate}</td>
                <td className="px-4 py-2">{salary.OtHours}</td>
                <td className="px-4 py-2">{salary.BasicSalary}</td>
                <td className="px-4 py-2">{salary.NetSalary}</td>
                <td className="px-4 py-2">
                  <Link
                    to={`/admin/e_saldashboard/edit-salary/${salary._id}`}
                    style={{
                      padding: '5px 10px',
                      backgroundColor: '#4caf50',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      textDecoration: 'none',
                    }}
                  >
                    Edit
                  </Link>
                  {' | '}
                  <button
                    onClick={() => handleDelete(salary._id)}
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
      {salaryToDelete && (
        <div className="modal">
          <div className="modalContent">
            <p className='text-white'>Do you want to delete this Salary?</p>
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
                  marginRight: '2px',
                }}
              >
                Yes
              </button>
              <button
                onClick={() => setSalaryToDelete(null)}
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

export default ManageSalary;
