import React, { useEffect, useState } from "react";
import { Button, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import Pagination from "./ClientPagination";
import { useAuthContext } from "../../../hooks/useAuthContext";
import NavBar from "../../../components/landingPage/NavBar";
import FooterSection from "../../../components/landingPage/FooterSection";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import clientBGImg from "../../../images/clientBG.jpg"

const ManageReservations = () => {
  const { user } = useAuthContext();
  const [allReservations, setAllReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);
  const [showDeleted, setShowDeleted] = useState(false);

  useEffect(() => {
    user &&
      fetch("http://localhost:3000/reservation/all-reservations", {
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
        });
  }, [user]);

  const showLoadingToast = () => {
    if (!toast.isActive("loading")) {
      toast.info("Loading data...", {
        position: "bottom-right",
        autoClose: false,
        theme: "colored",
        toastId: "loading",
      });
    }
  };

  useEffect(() => {
    if (loading) {
      showLoadingToast();
    } else {
      toast.dismiss("loading");
    }
  }, [loading]);

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
      fetch(`http://localhost:3000/reservation/update-reservation/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ reservationStatus: "deleted" }),
      })
        .then((res) => res.json())
        .then(() => {
          setAllReservations((prevReservations) =>
            prevReservations.map((reservation) =>
              reservation._id === id
                ? { ...reservation, reservationStatus: "deleted" }
                : reservation
            )
          );
          showSuccess();
        });
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toDateString();
  };

  const compareDatesDescending = (a, b) => {
    const dateA = new Date(a.eventDate);
    const dateB = new Date(b.eventDate);
    return dateA - dateB;
  };

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = showDeleted
    ? allReservations
        .sort(compareDatesDescending)
        .slice(firstPostIndex, lastPostIndex)
    : allReservations
        .filter((reservation) => reservation.reservationStatus !== "deleted")
        .sort(compareDatesDescending)
        .slice(firstPostIndex, lastPostIndex);
  const toggleShowDeleted = () => {
    setShowDeleted(!showDeleted);
  };

  useEffect(() => {
    showLoadingToast();
  }, [loading]);

  return (
    <div style={{
      backgroundImage: `url(${clientBGImg})`,
      backgroundSize: "cover",
      backgroundPosition: "50% 10%",
      backgroundRepeat: "no-repeat",
    }}>
      <NavBar />
      <div className="flex justify-between p-4 mx-8 my-4 mb-6 shadow-2xl rounded-xl bg-client-brown">
        <h2 className="mx-4 text-3xl font-bold text-white ">
          Manage Your Reservations
        </h2>
        <div className="flex">
          <div className="relative text-gray-600 "></div>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="ml-8">
          <Button
            className="mb-4 mr-4 bg-blue-600 shadow-lg rounded-2xl"
            onClick={toggleShowDeleted}
          >
            {showDeleted
              ? "Hide Deleted Reservation"
              : "Show Deleted Reservation"}
          </Button>
        </div>

        <Link
          to={`/client/dashboard/create/`}
          className="mr-5 font-medium text-cyan-600 hover:underline dark:text-cyan-500"
        >
          <Button className="mb-4 mr-4 shadow-lg bg-client-brown rounded-2xl">
            Create Reservation
          </Button>
        </Link>
      </div>
      <div className="h-[60vh] mx-8">
      <Table>
  <Table.Head>
    <Table.HeadCell className="text-white bg-client-brown">No</Table.HeadCell>
    <Table.HeadCell className="text-white bg-client-brown">Contact Number</Table.HeadCell>
    <Table.HeadCell className="text-white bg-client-brown">Event Type</Table.HeadCell>
    <Table.HeadCell className="text-white bg-client-brown">Location</Table.HeadCell>
    <Table.HeadCell className="text-white bg-client-brown">Payment Amount</Table.HeadCell>
    <Table.HeadCell className="text-white bg-client-brown">Event Date</Table.HeadCell>
    <Table.HeadCell className="text-center text-white bg-client-brown">Actions</Table.HeadCell>
  </Table.Head>
  {currentPosts?.map((reservation, index) => (
    <Table.Body
      className={`divide-y ${
        index % 2 === 0
          ? "bg-white dark:bg-gray-700"
          : "bg-client-yellow dark:bg-gray-800"
      }`}
      key={reservation._id}
    >
      <Table.Row className="dark:border-gray-700">
        <Table.Cell className="font-medium text-gray-900 whitespace-nowrap dark:text-white" style={{ maxWidth: "50px", overflow: "hidden", textOverflow: "ellipsis" }}>{firstPostIndex + index + 1}</Table.Cell>
        <Table.Cell style={{ maxWidth: "120px", overflow: "hidden", textOverflow: "ellipsis" }}>{reservation.contactNumber}</Table.Cell>
        <Table.Cell style={{ maxWidth: "150px", overflow: "hidden", textOverflow: "ellipsis" }}>{reservation.eventType}</Table.Cell>
        <Table.Cell style={{ maxWidth: "200px",overflow: "hidden", textOverflow: "ellipsis" }}>{reservation.venueLocation}</Table.Cell>
        <Table.Cell style={{ maxWidth: "150px", textAlign:"center" , overflow: "hidden", textOverflow: "ellipsis" }}>{reservation.paymentAmount}</Table.Cell>
        <Table.Cell style={{ maxWidth: "120px", overflow: "hidden", textOverflow: "ellipsis" }}>{formatDate(reservation.eventDate)}</Table.Cell>
        <Table.Cell>
          <button className="px-4 py-1 mr-6 font-semibold text-white bg-green-600 rounded-xl hover:bg-green-800">
            <Link to={`/client/dashboard/view-reservation/${reservation._id}`} className="font-medium hover:underline">View</Link>
          </button>
          {reservation.reservationStatus !== "deleted" && (
            <button onClick={() => handleDelete(reservation._id)} className="px-4 py-1 font-semibold text-white bg-red-600 rounded-xl hover:bg-red-800">Delete</button>
          )}
          {reservation.reservationStatus !== "deleted" && (
            <Link to={`/client/dashboard/update-reservation/${reservation._id}`} className="mr-5 font-medium">
              <button className="px-4 py-1 ml-5 font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-800">Edit</button>
            </Link>
          )}
        </Table.Cell>
      </Table.Row>
    </Table.Body>
  ))}
</Table>

      </div>
      <div className="my-20">
        <Pagination
          totalPosts={allReservations.length}
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>

      <FooterSection />
    </div>
  );
};

export default ManageReservations;
