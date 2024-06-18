import React, { useEffect, useState } from "react";
import { Button, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import profile from "../../../images/profile.jpg";
import Pagination from "./AdminPagination";
import { useAuthContext } from "../../../hooks/useAuthContext";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import logo from "../../../images/logo.png";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const CancelledReservations = () => {
  const { user } = useAuthContext();
  const [query, setQuery] = useState("");
  const [allReservations, setAllReservations] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);

  useEffect(() => {
    if (user && user.token) {
      setLoading(true);
      fetch("http://localhost:3000/reservation/cancelled-reservations", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setAllReservations(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching cancelled reservations:", error);
          setLoading(false);
        });
    }
  }, [user]);

  const showSuccess = () => {
    toast.error("Reservation is deleted successfully!", {
      position: "bottom-right",
      theme: "colored",
    });
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this reservation?"
    );

    if (confirmDelete) {
      fetch(`http://localhost:3000/reservation/delete-reservation/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setAllReservations((prevReservations) =>
            prevReservations.filter((reservation) => reservation._id !== id)
          );
          showSuccess();
        });
    }
  };

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = allReservations.slice(firstPostIndex, lastPostIndex);

  const handleExport = async() => {
    const exportData = allReservations.map((reservation) => ({
      "Client Name": reservation.clientName,
      "Client Email": reservation.clientEmail,
      "Contact Number": reservation.contactNumber,
      "Event Type": reservation.eventType,
      "Event Description": reservation.eventDescription,
      "Event Date": formatDate(reservation.eventDate),
      "Venue Location": reservation.venueLocation,
      "Payment Amount": reservation.paymentAmount,
      "Reservation Status": reservation.reservationStatus,
    }));

    const headerRow = [
      "Client Name",
      "Client Email",
      "Contact Number",
      "Event Type",
      "Event Description",
      "Event Date",
      "Venue Location",
      "Payment Amount",
      "Reservation Status",
    ];
    const tableRows = [
      headerRow.map((header) => ({
        text: header,
        fontSize: 10,
        bold: true,
        fillColor: "#04AA6D",
        color: "white",
      })),
      ...exportData.map((reservation, index) => {
        const backgroundColor = index % 2 === 0 ? "white" : "#f2f2f2";
        return Object.values(reservation).map((value) => ({
          text: value,
          fontSize: 8,
          fillColor: backgroundColor,
        }));
      }),
    ];

    const columnWidths = [40, 45, 45, 30, 130, 30, 50, 29, 35];

    try {
      const response = await fetch(logo);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64data = reader.result;
        const docDefinition = {
          content: [
            {
              text: "Chandika Light",
              style: "additionalHeader",
              alignment: "center",
              margin: [0, 20, 0, 0],
            },
            {
              image: base64data,
              width: 50,
              alignment: "center",
            },
            { text: "Cancelled Reservations Report", style: "header" },
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
            additionalHeader: {
              fontSize: 16,
              bold: true,
            },
          },
        };

        const pdfDoc = pdfMake.createPdf(docDefinition);
        pdfDoc.download("cancelled_reservations.pdf");
      };
    } catch (error) {
      console.error("Error fetching or processing the image:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toDateString();
  };

  const handleSearch = () => {
    setLoading(true);
    fetch(`http://localhost:3000/reservation/search-cancelled?query=${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAllReservations(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error searching cancelled reservations:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (loading) {
      toast.info("Loading data...", {
        position: "bottom-right",
        autoClose: false,
        theme: "colored",
        toastId: "loading",
      });
    } else {
      toast.dismiss("loading");
    }
  }, [loading]);

  return (
    <div className="h-[100vh] px-4 pb-4 my-4">
      <div className="flex justify-between p-4 mb-6 shadow-lg rounded-xl bg-sidebar-blue">
        <h2 className="text-3xl font-bold text-white ">
          Cancelled Reservations
        </h2>
        
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
            type="submit"
            onClick={handleSearch}
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
      <div className="h-[60vh]">
        <Table className="lg:w-[1180px]">
          <Table.Head>
            <Table.HeadCell className="text-white bg-sidebar-blue">
              No
            </Table.HeadCell>
            <Table.HeadCell className="text-white bg-sidebar-blue">
              Client Name
            </Table.HeadCell>
            <Table.HeadCell className="text-white bg-sidebar-blue">
              Contact Number
            </Table.HeadCell>
            <Table.HeadCell className="text-white bg-sidebar-blue">
              Location
            </Table.HeadCell>
            <Table.HeadCell className="text-white bg-sidebar-blue">
              Payment
            </Table.HeadCell>
            <Table.HeadCell className="text-white bg-sidebar-blue">
              Event Date
            </Table.HeadCell>
            <Table.HeadCell className="text-center text-white bg-sidebar-blue">
              <span>Actions</span>
            </Table.HeadCell>
          </Table.Head>

          {currentPosts?.map((reservation, index) => (
            <Table.Body
              className={` divide-y ${
                index % 2 === 0
                  ? "bg-white dark:bg-gray-700"
                  : "bg-admin-gray dark:bg-gray-800"
              }`}
              key={reservation._id}
            >
              <Table.Row className="dark:border-gray-700">
                <Table.Cell
                  className="font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  style={{
                    maxWidth: "50px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {firstPostIndex + index + 1}
                </Table.Cell>
                <Table.Cell
                  className="font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  style={{
                    maxWidth: "200px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {reservation.clientName}
                </Table.Cell>
                <Table.Cell
                  style={{
                    maxWidth: "120px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {reservation.contactNumber}
                </Table.Cell>
                <Table.Cell
                  style={{
                    maxWidth: "250px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {reservation.venueLocation}
                </Table.Cell>
                <Table.Cell
                  style={{
                    maxWidth: "250px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {reservation.paymentAmount}
                </Table.Cell>
                <Table.Cell
                  style={{
                    maxWidth: "120px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {formatDate(reservation.eventDate)}
                </Table.Cell>
                <Table.Cell>
                  <button className="px-4 py-1 mr-6 font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-800">
                    <Link
                      to={`/admin/reservation/dashboard/view-reservation/${reservation._id}`}
                      className="font-medium hover:underline"
                    >
                      View
                    </Link>
                  </button>
                  <button
                    onClick={() => handleDelete(reservation._id)}
                    className="px-4 py-1 font-semibold text-white bg-red-600 rounded-xl hover:bg-red-800"
                  >
                    Delete
                  </button>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          ))}
        </Table>
      </div>
      <div className="mt-20">
        <Pagination
          totalPosts={allReservations.length}
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default CancelledReservations;
