import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Label,
  Select,
  TextInput,
  Textarea,
  FileInput,
} from "flowbite-react";
import { toast } from "react-toastify";
import { useAuthContext } from "../../hooks/useAuthContext";

const ViewTransaction = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();
  const [finance, setFinance] = useState({
    transactionType: "",
    category: "",
    amount: "",
    date: "",
    paymentMethod: "",
    paymentStatus: "",
    description: "",
    invoiceImage: "",
  });

  const transactionType = finance.transactionType;
  const category = finance.category;
  const amount = finance.amount;
  const date = finance.date ? new Date(finance.date).toLocaleDateString() : "";
  const paymentMethod = finance.paymentMethod;
  const paymentStatus = finance.paymentStatus;
  const description = finance.description;
  const invoiceImage = finance.invoiceImage;

  const confirmNavigation = () => {
    navigate("/admin/finance/dashboard/manage-transaction");
  };

  useEffect(() => {
    if (user && user.token) {
      setLoading(true);
      fetch(`http://localhost:3000/finance/get/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setFinance(data)
          setLoading(false);
        });
    }
  }, [user]);

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
    <div className="h-[100vh] px-4">
      <div className="flex justify-between p-6 mt-8 mb-6 rounded-xl bg-sidebar-blue">
        <h2 className="text-3xl font-bold text-white">
          View More Transaction Details
        </h2>
      </div>

      <form
        onSubmit={confirmNavigation}
        className="flex lg:w-[1180px] flex-col flex-wrap gap-4"
      >
        <div className="flex gap-8">
          <div className="lg:w-1/2">
            <div className="block mb-2">
              <Label
                htmlFor="transactionType"
                value="Transaction Type"
                className="text-white text-md"
              />
            </div>
            <TextInput
              id="transactionType"
              name="transactionType"
              className="w-full rounded"
              type="text"
              value={transactionType}
              readOnly
            />
          </div>
          <div className="lg:w-1/2">
            <div className="block mb-2">
              <Label
                htmlFor="category"
                value="Category"
                className="text-white text-md"
              />
            </div>
            <TextInput
              id="category"
              name="category"
              className="w-full rounded"
              type="text"
              value={category}
              readOnly
            />
          </div>
        </div>
        <div className="flex gap-8">
          <div className="lg:w-1/2">
            <div className="block mb-2">
              <Label
                htmlFor="amount"
                value="Amount"
                className="text-white text-md"
              />
            </div>
            <TextInput
              id="amount"
              name="amount"
              type="number"
              placeholder="Amount"
              readOnly
              defaultValue={amount}
            />
          </div>
          <div className="lg:w-1/2">
            <div className="block mb-2">
              <Label
                htmlFor="date"
                value="Date"
                className="text-white text-md"
              />
            </div>
            <TextInput
              id="date"
              name="date"
              type="text"
              readOnly
              defaultValue={date}
            />
          </div>
        </div>
        <div className="flex gap-8">
          <div className="lg:w-1/2">
            <div className="block mb-2">
              <Label
                htmlFor="paymentMethod"
                value="Payment Method"
                className="text-white text-md"
              />
            </div>
            <TextInput
              id="paymentMethod"
              name="paymentMethod"
              className="w-full rounded"
              type="text"
              value={paymentMethod}
              readOnly
            />
          </div>
          <div className="lg:w-1/2">
            <div className="block mb-2">
              <Label
                htmlFor="paymentStatus"
                value="Payment Status"
                className="text-white text-md"
              />
            </div>
            <TextInput
              id="paymentStatus"
              name="paymentStatus"
              className="w-full rounded"
              type="text"
              value={paymentStatus}
              readOnly
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex lg:w-1/2">
            <div className="block mb-2">
              <Label
                htmlFor="invoiceImage"
                value="Invoice Image"
                className="text-white text-md"
              />
              <img src={invoiceImage} className="h-16" alt="invoiceImage" />
            </div>
            
          </div>

          <div>
            <div className="block mb-2">
              <Label
                htmlFor="description"
                value="Description"
                className="text-white text-md"
              />
            </div>
            <Textarea
              id="description"
              name="description"
              placeholder="Description"
              readOnly
              rows={4}
              cols={83}
              defaultValue={description}
            />
          </div>
        </div>
        <Button
          type="submit"
          className="mt-5 shadow-lg bg-header-orange rounded-2xl"
        >
          All Done
        </Button>
      </form>
    </div>
  );
};

export default ViewTransaction;
