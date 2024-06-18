import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Table } from "flowbite-react";

import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";

const AllServices = () => {
  const { user } = useAuthContext();
  const [services, setServices] = useState([]);

  useEffect(() => {
    user &&
      fetch("http://localhost:3000/service/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setServices(data));
  }, [user]);

  return (
    <div className="px-4 pb-4 my-4 h-[100vh]">

      <div className="p-4 mb-6 shadow-lg rounded-xl bg-sidebar-blue flex justify-center items-center">
        <h2 className="text-3xl font-bold text-white ">
          Services and Packages
        </h2>
      </div>
      <div className="col-span-3">
        {/* <ServiceTable services={services} /> */}
        <div className="overflow-x-auto">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>No</Table.HeadCell>
              <Table.HeadCell>Service</Table.HeadCell>
              <Table.HeadCell>Validity Period(Days)</Table.HeadCell>
              <Table.HeadCell>Type</Table.HeadCell>
              <Table.HeadCell>Description</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
              <Table.HeadCell>Operations</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {services.map((service, index) => (
                <Table.Row
                  key={service._id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {index + 1}
                  </Table.Cell>
                  <Table.Cell>{service.sname}</Table.Cell>
                  <Table.Cell>{service.availability}</Table.Cell>
                  <Table.Cell>{service.type}</Table.Cell>
                  <Table.Cell>{service.description}</Table.Cell>
                  <Table.Cell>{service.status}</Table.Cell>
                  <Table.Cell>
                    <div className="flex gap-4">
                      <Link
                        to={`/admin/service/dashboard/update/${service._id}`}
                      >
                        <AiOutlineEdit className="text-black" />
                      </Link>
                      <Link
                        to={`/admin/service/dashboard/delete/${service._id}`}
                      >
                        <MdOutlineDelete className="text-red-500" />
                      </Link>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default AllServices;