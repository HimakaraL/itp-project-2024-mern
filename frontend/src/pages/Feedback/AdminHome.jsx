import React, { useEffect, useState } from "react";
import axios from 'axios';
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Button, Table } from "flowbite-react";

import { Link } from "react-router-dom";
import { BsInfoCircle } from "react-icons/bs";

import "./feedback.css";



import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const HomeFeedback = () => {
  const {user} = useAuthContext()
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    user&&
    axios
      .get(`http://localhost:3000/feedback`,{headers: {Authorization: `Bearer ${user.token}`  }
    })
      .then((res) => {
        setFeedbacks(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [user]);

  const handleExport = () => {
    const exportData = feedbacks.map(feedback => ({
      "Name": feedback.name,
      "Email": feedback.email,
      "Rating": feedback.rating,
      "Service": feedback.service,
      "feedback": feedback.feedback,
      "Date": formatDate(feedback.date),
    }));

    const headerRow = [
      "Name",
      "Email",
      "Rating",
      "Service",
      "Feedback",
      "Date",
          ];
    const tableRows = [
      headerRow.map((header) => ({
        text: header,
        fontSize: 10,
        bold: true,
        fillColor: "#04AA6D",
        color: "white",
      })),
      ...exportData.map((feedback, index) => {
        const backgroundColor = index % 2 === 0 ? "white" : "#f2f2f2";
        return Object.values(feedback).map((value) => ({
          text: value,
          fontSize: 8,
          fillColor: backgroundColor,
        }));
      }),
    ];

    const columnWidths = [60, 60, 60, 60, 180, 60, 80]; 


    const docDefinition = {
      content: [
        { text: "Feedback Report", style: "header" },
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
    pdfDoc.download("Feedback.pdf");
  };


  const formatDate = (isoDate) => {
    const dateObject = new Date(isoDate);
    return dateObject.toISOString().split('T')[0]; // Extracts YYYY-MM-DD
  };

  return (
    <div className="h-[130vh]">
    <div >
      <div className="px-4 pb-4 my-4 ">
        <div className="flex justify-between p-4 mb-6 shadow-lg bg-sidebar-blue rounded-xl" >
          <h2 className="text-3xl font-bold text-white">
            Manage Feedback & Reviews
          </h2>
        </div>

        <div className='p-4'>
          <div className='flex items-center justify-between'>
            <h1 className='my-8 text-3xl font-bold text-white'>Feedback List</h1>
            <Button
          onClick={handleExport}
          className="mb-4 shadow-lg bg-header-orange rounded-2xl"
        >
          Generate Report
        </Button>
          </div>
            <table className="table t1 table-lg table-pin-rows table-pin-cols highlighted-table" style={{ border: '2px solid black', borderCollapse: 'collapse' }}>
              <thead>
                <tr className="bg-sidebar-blue" style={{ textAlign: "center", border: '1px solid #ffcc00', padding: 50 }}>
                  <th className='text-white border border-slate-600'>No</th>
                  <th className='text-white border border-slate-600'>Name</th>
                  <th className='text-white border border-slate-600'>Email</th>
                  <th className='text-white border border-slate-600'>Rating</th>
                  <th className='text-white border border-slate-600'>Service</th>
                  <th className='text-white border border-slate-600'>Feedback</th>
                  <th className='text-white border border-slate-600'>Date</th>
                  <th className='text-white border border-slate-600'>Operations</th>
                </tr>
              </thead>
              <tbody>
                {feedbacks.map((feedback, index) => (
                  <tr key={feedback._id}>
                    <td className='text-center bg-white border border-slate-700'>{index + 1}</td>
                    <td className='text-center bg-white border border-slate-600'>{feedback.name}</td>
                    <td className='text-center bg-white border border-slate-600'>{feedback.email}</td>
                    <td className='text-center bg-white border border-slate-600'>{feedback.rating}</td>
                    <td className='text-center bg-white border border-slate-600'>{feedback.service}</td>
                    <td className='text-center bg-white border border-slate-600'>{feedback.feedback}</td>
                    <td className='text-center bg-white border border-slate-600'>{formatDate(feedback.date)}</td>
                    <td className="bg-white">
                      <div className="flex justify-center gap-x-4">
                        <Link to={`/admin/feedback/dashboard/getFeedback/${feedback._id}`}>
                          <BsInfoCircle className="text-2xl text-green-800" />
                        </Link>

                        <Link to={`/admin/feedback/dashboard/rejectFeedback/${feedback._id}`}>       
                      <MdOutlineDelete className="text-2xl text-red-600" />            
                        </Link>

                       
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
      </div>
    </div>
    </div>
  );
};

export default HomeFeedback;
