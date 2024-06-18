import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { useAuthContext } from "../../hooks/useAuthContext";

const EditOrder = () => {
    const { user } = useAuthContext();
    const [equipment, setEquipment] = useState("");
    const [supName, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [startDate, setStart] = useState("");
    const [endDate, setEnd] = useState("");
    const [cost, setCost] = useState("");
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();


    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:3000/rental/get/${id}`,{headers: {Authorization: `Bearer ${user.token}`  }
        })
            .then((res) => {
                const { rental } = res.data;

                const startDate = new Date(rental.startDate);
                const endDate = new Date(rental.endDate);

                const formattedStartDate = format(startDate, 'yyyy-MM-dd');
                const formattedEndDate = format(endDate, 'yyyy-MM-dd');

                setEquipment(rental.equipment || '');
                setName(rental.supName || '');
                setQuantity(rental.quantity || '');
                setStart(formattedStartDate || '');
                setEnd(formattedEndDate || '');
                setCost(rental.cost || '');
                setStatus(rental.status || '');
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                alert("An error happened. Please check the console.");
                console.log(err);
            });
    }, [id]);

    const handleEditRental = () => {
        
        //Validations
        if (!/^[a-zA-Z\s]+$/.test(supName) || supName.trim().length === 0) {
            alert("Supplier Name should contain only letters.");
            return;
        }

        if (!/^[a-zA-Z\s]+$/.test(equipment) || equipment.trim().length === 0) {
            alert("Equipment should contain only letters.");
            return;
        }

        if (quantity <= 0) {
            alert("Quantity must be greater than 0.");
            return;
        }
        if (cost <= 0) {
            alert("Cost must be greater than 0.");
            return;
        }
        
        if (new Date(endDate) <= new Date(startDate)) {
            alert("Invalid End date");
            return;
        }

        const data = {
            equipment,
            supName,
            quantity,
            startDate,
            endDate,
            cost,
            status
        };
        setLoading(true);
        axios
            .put(`http://localhost:3000/rental/update/${id}`, data,{headers: {Authorization: `Bearer ${user.token}`  }
        })
            .then(() => {
                setLoading(false);
                alert ("Order updated successfully.");
                navigate("/admin/rental/dashboard/manage");
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            });
    };

    //Update order form
    return (
        <div className="mx-auto my-10">
    
            <div className="flex justify-between p-6 mb-6 rounded-xl bg-sidebar-blue">
                <h2 className="text-3xl font-bold text-white ">Edit Order</h2>
            </div>
            <div className="flex flex-col border-2 border-sidebar-orange rounded-xl w-[600px] p-4 mx-auto">
                <div className="my-4">
                    <label className="mr-4 text-xl text-white text-md">Equipment</label>
                    <input
                        type="text"
                        value={equipment}
                        onChange={(e) => setEquipment(e.target.value)}
                        className="w-full px-4 py-2 border-2 border-gray-500"
                        required
                    />
                </div>

                <div className="my-4">
                    <label className="mr-4 text-xl text-white text-md">Supplier Name</label>
                    <input
                        type="text"
                        value={supName}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2 border-2 border-gray-500"
                        required
                    />
                </div>

                <div className="my-4">
                    <label className="mr-4 text-xl text-white text-md">Quantity</label>
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="w-full px-4 py-2 border-2 border-gray-500"
                        required
                    />
                </div>

                <div className="my-4">
                    <label className="mr-4 text-xl text-white text-md">Start Date</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStart(e.target.value)}
                        className="w-full px-4 py-2 border-2 border-gray-500"
                        required
                    />
                </div>

                <div className="my-4">
                    <label className="mr-4 text-xl text-white text-md">End Date</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEnd(e.target.value)}
                        className="w-full px-4 py-2 border-2 border-gray-500"
                        required
                    />
                </div>

                <div className="my-4">
                    <label className="mr-4 text-xl text-white text-md">Total Cost (LKR)</label>
                    <input
                        type="text"
                        value={cost}
                        onChange={(e) => setCost(e.target.value)}
                        className="w-full px-4 py-2 border-2 border-gray-500"
                        required
                    />
                </div>

                <div className="my-4">
                    <label className="mr-4 text-xl text-white text-md">Status</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full px-4 py-2 border-2 border-gray-500"
                        required
                    >
                        <option value="Active">Active</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>

                <button className="p-2 m-8 font-bold text-white rounded-sm bg-sidebar-orange hover:bg-sidebar-blue" onClick={handleEditRental}>
                    Update
                </button>
            </div>
        </div>
    );
};

export default EditOrder;