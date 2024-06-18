import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import Pagination from "./AdminPagination";
import { Button } from "flowbite-react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;


const ViewMaintain = () => {
  //read table
  const { user } = useAuthContext();
  const [schedules, setSchedules] = useState([]);
  const [query, setQuery] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);


  useEffect(() => {
    user&&
    axios
      .get("http://localhost:3000/maintain/", {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((response) => {
        setSchedules(response.data);
      })
      .catch((error) => {
        console.error("Error fetching schedules:", error);
      });
  }, [user]);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = schedules?.slice(firstPostIndex, lastPostIndex);

  const handleDelete = (id) => {
    //delete
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this schedule"
    );
    if (confirmDelete) {
      axios
        .delete(`http://localhost:3000/maintain/delete/${id}`,{
          headers: { Authorization: `Bearer ${user.token}` }})
        .then((response) => {
          setSchedules(schedules.filter((schedule) => schedule._id !== id));
          alert("Schedule deleted successfully");
        })
        .catch((error) => {
          console.error("Error deleting schedule:", error);
          alert("Error deleting schedule");
        });
    }
  };

   //search
  const handleSearch = () => {
   axios
      .get(`http://localhost:3000/maintain/search?query=${query}`,{
        headers: { Authorization: `Bearer ${user.token}` }})
      .then((response) => {
        setSchedules(response.data);
      })
      .catch((error) => {
        console.error("Error searching schedules:", error);
      });
  };
  //genarate report
  const handleExport = () => {
    const exportData = schedules.map((schedule) => ({
      "-- Equipment Name --": schedule.Equipment_name,
      "-- Description --": schedule.Description,
      "-- Maintenance Type --": schedule.Maintenance_type,
      "-- Scheduled Date --": schedule.Sheduled_date,
      "-- Status --": schedule.Status,
      "-- Technician --": schedule.Technician,
    }));
    const headerRow = [
      "Equipment Name",
      "Description" ,
      "Maintenance Type",
      "Scheduled Date",
      "Status",
      "Technician",
    ];
    const tableRows = [
      headerRow.map((header) => ({
        text: header,
        fontSize: 10,
        bold: true,
        fillColor: "#04AA6D",
        color: "white",
      })), 
      ...exportData.map((schedule, index) => {
        const backgroundColor = index % 2 === 0 ? "white" : "#f2f2f2"; 
        return Object.values(schedule).map((value) => ({
          text: value,
          fontSize: 8,
          fillColor: backgroundColor,
        }));
      }),
    ];

    const columnWidths = [80, 130, 80, 60, 80, 60];

    const docDefinition = {
      content: [
        { text: "Maintanance Schedule", style: "header" },
        {
          table: {
            headerRows: 1,
            widths: columnWidths,
            body: tableRows,
          },
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: "center",
          margin: [0, 0, 0, 20],
        },
      },
    };

    const pdfDoc = pdfMake.createPdf(docDefinition);
    pdfDoc.download("Schedules.pdf");

    
  };

  return (
    <div className="h-[100vh] w-[1200px] p-4">
      <div className="flex justify-between p-4 mb-6 shadow-lg rounded-xl bg-sidebar-blue">
        <h2 className="text-3xl font-bold text-white ">All Schedules</h2>
       
      </div>
      <div className="flex justify-between">
      <Button
          onClick={handleExport}
          className="mb-4 shadow-lg bg-header-orange rounded-2xl"
        >
          Generate Report
        </Button>
        <div className="relative text-gray-600 ">
          <input
            className="h-10 px-5 pr-16 text-sm bg-white border-2 border-gray-300 rounded-lg focus:outline-none"
            type="search"
            name="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
          />
          <button
            onClick={handleSearch}
            type="submit"
            className="absolute top-0 right-0 mt-3.5 mr-4"
          >
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
      <table className="w-full border border-collapse border-black">
        <thead>
          <tr>
            <th className="h-16 text-white border border-collapse border-black bg-sidebar-blue">No</th>
            <th className="text-white border border-collapse border-black bg-sidebar-blue">Equipment Name</th>
            <th className="text-white border border-collapse border-black bg-sidebar-blue">Description</th>
            <th className="text-white border border-collapse border-black bg-sidebar-blue">Maintenance type</th>
            <th className="text-white border border-collapse border-black bg-sidebar-blue">Sheduled date</th>
            <th className="text-white border border-collapse border-black bg-sidebar-blue">Status</th>
            <th className="text-white border border-collapse border-black bg-sidebar-blue">Technician</th>
            <th className="text-white border border-collapse border-black bg-sidebar-blue">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts?.map((schedule,index) => (
            <tr key={schedule._id}>
               <td className="px-4 py-2 bg-white border border-black">
               {firstPostIndex + index + 1}
              </td>
              <td className="px-4 py-2 bg-white border border-black">
                {schedule.Equipment_name}
              </td>
              <td className="px-4 py-2 bg-white border border-black">
                {schedule.Description}
              </td>
              <td className="px-4 py-2 bg-white border border-black">
                {schedule.Maintenance_type}
              </td>
              <td className="px-4 py-2 bg-white border border-black">
                {schedule.Sheduled_date}
              </td>
              <td className="px-4 py-2 bg-white border border-black">
                {schedule.Status}
              </td>
              
              <td className="px-4 py-2 bg-white border border-black">
                {schedule.Technician}
              </td>

              <td className="px-4 py-2 bg-white border border-black" style={{ textAlign: 'center' }}>
              <div>
                 <button style={{ display: 'inline-block', marginRight: '5px' }}>
                  <Link
                   to={`/admin/maintain/dashboard/update/${schedule._id}`}
                  className="px-4 py-1 font-semibold text-white bg-green-600 rounded-sm hover:bg-sky-600"
                  >Update</Link>
                  </button>
                  
                  <button
                  onClick={() => handleDelete(schedule._id)}
                  style={{ display: 'inline-block' }}
                  className="px-4 py-1 font-semibold text-white bg-red-600 rounded-sm hover:bg-sky-600"
                  >Delete
                  </button>
                </div>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-8">
      <Pagination
        totalPosts={schedules.length}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
      </div>
    </div>
  );
};

export default ViewMaintain;
