import React, { useEffect, useState } from "react";
import { useLoaderData, useParams, useNavigate } from "react-router-dom";
import {
  Button,
  Label,
  Select,
  TextInput,
  Textarea,
} from "flowbite-react";
import { toast } from "react-toastify";
import { useAuthContext } from "../../hooks/useAuthContext";
import profile from "../../images/profile.jpg";

const EditTransaction = () => {
  const { id } = useParams();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [amountError, setAmountError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const [finance,setFinance]=useState({
    transactionType:"",
    category:"",
    amount:"",
    date:"",
    paymentMethod:"",
    paymentStatus:"",
    description:"",
    invoiceImage:"",
  })

  const transactionType = finance.transactionType;
  const category = finance.category;
  const amount = finance.amount;
  const date = finance.date ? new Date(finance.date).toLocaleDateString() : "";
  const paymentMethod = finance.paymentMethod;
  const paymentStatus = finance.paymentStatus;
  const description = finance.description;
  const invoiceImage = finance.invoiceImage;
  
  const categoris = {
    income: ["equipment rental", "service fee", "hut rental", "Other"],
    expense: ["maintenance fee", "utility bill", "transport fee", "marketing fee", "Other"]
  };
  const [selectedCategory, setSelectedCategory] = useState(categoris.income[0]);

  const paymentMethods = ["cash", "card"];
  const [selectedPaymentMethod, setselectedPaymentMethod] = useState(
    paymentMethods[0]
  );

  const paymentStatuses = ["success", "pending"];
  const [selectedPaymentStatus, setselectedPaymentStatus] = useState(
    paymentStatuses[0]
  );

  const handleUpdateTransaction = async (event) => {
    event.preventDefault();
    const form = event.target;

    const transactionType = form.transactionType.value;
    const category = selectedCategory;
    const amount = form.amount.value;
    const date = form.date.value;
    const paymentMethod = selectedPaymentMethod;
    const paymentStatus = selectedPaymentStatus;
    const description = form.description.value;

    const transactionObj = {
      transactionType,
      category,
      amount,
      date,
      paymentMethod,
      paymentStatus,
      description,
    };

    fetch(`http://localhost:3000/finance/update/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`,
      },
      body: JSON.stringify(transactionObj),
    })
      .then((res) => res.json())
      .then((data) => {
        navigate("/admin/finance/dashboard/manage-transaction")
        toast.success("Transaction updated successfully!", {
          position: "bottom-right",
          theme: "colored",
          autoClose: 1000,
        });
      });
  };

  const handleAmountChange = (event) => {
    const amount = event.target.value;
    if (!/^[1-9]\d*$/.test(amount)) {
      setAmountError("Amount must be a positive number");
    } else {
      setAmountError("");
    }
  };

  const handleDescriptionChange = (event) => {
    const description = event.target.value;
    if (!description.trim()) {
      setDescriptionError("Description must not be blank");
    } else {
      setDescriptionError("");
    }
  };

  useEffect(() => {
    if (user && user.token) {
      setLoading(true);
      fetch(`http://localhost:3000/finance/get/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setFinance(prevState => ({...prevState, ...data}));
          setSelectedCategory(data.category);
          setselectedPaymentMethod(data.paymentMethod);
          setselectedPaymentStatus(data.paymentStatus);
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
    <div className="h-[100vh] px-4 pt-4">
      <div className="flex justify-between p-4 mb-6 shadow-lg rounded-xl bg-sidebar-blue">
        <h2 className="text-3xl font-bold text-white ">
          Edit Transactions
        </h2>
      
      </div>

      <form
        onSubmit={handleUpdateTransaction}
        className="flex lg:w-[1180px] flex-col flex-wrap gap-4"
      >
        <div className="flex gap-8">
          <div className="lg:w-1/2">
            <div className="block mb-2">
              <Label htmlFor="transactionType" value="Transaction Type" className="text-white text-md"/>
            </div>
            <TextInput
              id="transactionType"
              name="transactionType"
              className="w-full rounded"
              value={transactionType}
              readOnly
              />
          </div>
          <div className="lg:w-1/2">
            <div className="block mb-2">
              <Label htmlFor="category" value="Category" className="text-white text-md"/>
            </div>
            <Select
              id="category"
              name="category"
              className="w-full rounded"
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
            >
              {transactionType === "income" ? (
                categoris.income.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))
              ) : (
                categoris.expense.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))
              )}
            </Select>
          </div>
        </div>
        <div className="flex gap-8">
          <div className="lg:w-1/2">
            <div className="block mb-2">
              <Label htmlFor="amount" value="Amount" className="text-white text-md"/>
            </div>
            <TextInput
              id="amount"
              name="amount"
              type="number"
              placeholder="Amount"
              required
              defaultValue={amount}
              min="1"
              pattern="[1-9]\d*"
              title="Amount must be a positive number"
              onChange={handleAmountChange}
            />
            {amountError && <p className="text-red-500">{amountError}</p>}
          </div>
          <div className="lg:w-1/2">
            <div className="block mb-2">
              <Label htmlFor="date" value="Date" className="text-white text-md"/>
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
              <Label htmlFor="paymentMethod" value="Payment Method" className="text-white text-md"/>
            </div>
            <Select
              id="paymentMethod"
              name="paymentMethod"
              className="w-full rounded"
              value={selectedPaymentMethod}
              onChange={(event) => setselectedPaymentMethod(event.target.value)}
            >
              {paymentMethods.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </div>
          <div className="lg:w-1/2">
            <div className="block mb-2">
              <Label htmlFor="paymentStatus" value="Payment Status" className="text-white text-md"/>
            </div>
            <Select
              id="paymentStatus"
              name="paymentStatus"
              className="w-full rounded"
              value={selectedPaymentStatus}
              onChange={(event) => setselectedPaymentStatus(event.target.value)}
            >
              {paymentStatuses.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </div>
        </div>
        <div>
          <div className="block mb-2">
            <Label htmlFor="description" value="Description" className="text-white text-md"/>
          </div>
          <Textarea
            id="description"
            name="description"
            placeholder="Description"
            required
            rows={4}
            defaultValue={description}
            onChange={handleDescriptionChange}
          />
          {descriptionError && <p className="text-red-500">{descriptionError}</p>}
        </div>

        <Button type="submit"  className="mt-5 shadow-lg bg-header-orange rounded-2xl">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default EditTransaction;
