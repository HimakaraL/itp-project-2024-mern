import React, { useEffect, useState } from "react";
import { Button, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import axios from 'axios';
import profile from "../../images/profile.jpg";
import { useAuthContext } from "../../hooks/useAuthContext";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ManageOrders = () => {
    const { user } = useAuthContext();
    const [orders, setOrders] = useState([]);
    const [query, setQuery] = useState("");
    const [selectedMonth, setSelectedMonth] = useState(new Date());


    useEffect(() => {
        user&&
        fetch('http://localhost:3000/rental/view', {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          })
            .then(response => response.json())
            .then(data => setOrders(data.data))
            .catch(error => console.error('Error fetching rental list:', error));
    }, [user]);

    //Search function
    const handleSearch = () => {
        axios.get(`http://localhost:3000/rental/search?query=${query}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          })
            .then(response => {
                setOrders(response.data);
            })
            .catch(error => {
                console.error('Error searching orders:', error);
            });
    };

    //Generate report function
    const handleExport = () => {
        const selectedMonthOrders = orders.filter(order => {
            const orderDate = new Date(order.startDate);
            return orderDate.getMonth() === selectedMonth.getMonth() && orderDate.getFullYear() === selectedMonth.getFullYear();
        });
        const doc = new jsPDF();
        
        const tableData = selectedMonthOrders.map((order) => [
            order.equipment,
            order.supName,
            order.quantity,
            new Date(order.startDate).toLocaleDateString(),
            new Date(order.endDate).toLocaleDateString(),
            order.cost,
            order.status,
        ]);
    
        doc.autoTable({
            head: [
                [
                    "Equipment",
                    "Supplier Name",
                    "Quantity",
                    "Start Date",
                    "End Date",
                    "Cost (LKR)",
                    "Status",
                ],
            ],
            body: tableData,
        });
    
        doc.save('Orders.pdf');
    };

    return (
        <div className="h-[100vh] px-4 pb-4 ">
            <div className="flex justify-between p-4 mt-8 mb-6 shadow-lg rounded-xl bg-sidebar-blue">
                <h2 className="text-3xl font-bold text-white ">
                    Rental Management
                </h2>
            </div>
            <div className="flex justify-between">
              
                <div className="flex items-center">
                    <Button onClick={handleExport} className="mb-4 mr-4 shadow-lg bg-header-orange rounded-2xl">
                        Generate Report
                    </Button>
                    <div className="mt-[-20px]">
                        <label className="block text-sm font-medium text-white">Select Month:</label>
                        <select
                            className="block py-2 pl-3 pr-10 mt-1 text-base border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={selectedMonth.getMonth()}
                            onChange={(e) => {
                                const selectedMonthValue = parseInt(e.target.value);
                                const newSelectedMonth = new Date(selectedMonth.getFullYear(), selectedMonthValue);
                                setSelectedMonth(newSelectedMonth);
                            }}
                        >
                            {Array.from({ length: 12 }, (_, i) => {
                                const monthDate = new Date(selectedMonth.getFullYear(), i);
                                return (
                                    <option key={i} value={i}>
                                        {monthDate.toLocaleString('default', { month: 'long' })}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                </div>
                <div className="relative text-gray-600 ">
                    <input
                        className="h-10 px-5 pr-16 text-sm bg-white border-2 border-gray-300 rounded-lg focus:outline-none"
                        type="search"
                        name="search"
                        placeholder="Search..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button onClick={handleSearch} type="submit" className="absolute top-0 right-0 mt-3.5 mr-4">
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

            {/*Display all orders*/}
            <Table className="lg:w-[1180px]">
                <Table.Head>
                    <Table.HeadCell className="text-white bg-sidebar-blue">
                        No
                    </Table.HeadCell>
                    <Table.HeadCell className="text-white bg-sidebar-blue">
                        Equipment
                    </Table.HeadCell>
                    <Table.HeadCell className="text-white bg-sidebar-blue">
                        Supplier Name
                    </Table.HeadCell>
                    <Table.HeadCell className="text-white bg-sidebar-blue">
                        Quantity
                    </Table.HeadCell>
                    <Table.HeadCell className="text-white bg-sidebar-blue">
                        Start Date
                    </Table.HeadCell>
                    <Table.HeadCell className="text-white bg-sidebar-blue">
                        End Date
                    </Table.HeadCell>
                    <Table.HeadCell className="text-white bg-sidebar-blue">
                        Total cost (LKR)
                    </Table.HeadCell>
                    <Table.HeadCell className="text-white bg-sidebar-blue">
                        status
                    </Table.HeadCell>
                    <Table.HeadCell className="text-center text-white bg-sidebar-blue">
                        <span>Manage</span>
                    </Table.HeadCell>
                </Table.Head>

                {orders?.map((rental, index) => (
                    <Table.Body
                        className={` divide-y ${index % 2 === 0
                            ? "bg-white dark:bg-gray-700"
                            : "bg-admin-gray dark:bg-gray-800"
                            }`}
                        key={rental._id}
                    >
                        <Table.Row className="dark:border-gray-700">
                            <Table.Cell className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {index + 1}
                            </Table.Cell>
                            <Table.Cell className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {rental.equipment}
                            </Table.Cell>
                            <Table.Cell>{rental.supName}</Table.Cell>
                            <Table.Cell>{rental.quantity}</Table.Cell>
                            <Table.Cell>{new Date(rental.startDate).toLocaleDateString()}</Table.Cell>
                            <Table.Cell>{new Date(rental.endDate).toLocaleDateString()}</Table.Cell>
                            <Table.Cell>{rental.cost}</Table.Cell>
                            <Table.Cell>{rental.status}</Table.Cell>
                            <Table.Cell>
                                <div className="flex justify-center gap-x-4">
                                    <Link to={`/admin/rental/dashboard/edit/${rental._id}`}>
                                        <Button className="px-4 py-1 font-semibold text-white bg-sidebar-orange hover:bg-black" > Edit </Button>
                                    </Link>
                                    <Link to={`/admin/rental/dashboard/delete/${rental._id}`}>
                                        <Button className="px-4 py-1 font-semibold text-white bg-red-600 hover:bg-black" > Delete </Button>
                                    </Link>
                                </div>
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                ))}
            </Table>
        </div>
    );
};

export default ManageOrders;