import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Label,
  Select,
  TextInput,
  Textarea,
  Datepicker,
} from "flowbite-react";
import { toast } from "react-toastify";
import { useAuthContext } from "../../hooks/useAuthContext";
import upload from "../../images/upload.jpg";
import profile from "../../images/profile.jpg";

const Transaction = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [amountError, setAmountError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [fileUploaded, setFileUploaded] = useState(false);

  const transactionTypes = ["income", "expense"];
  const [selectedTransactionType, setSelectedTransactionType] = useState(
    transactionTypes[0]
  );

  const [selectedCategory, setSelectedCategory] = useState("");

  const handleTransactionTypeChange = (event) => {
    setSelectedTransactionType(event.target.value);
    setSelectedCategory("");
  };

  const categories = {
    income: ["equipment rental", "service fee", "hut rental", "Other"],
    expense: [
      "maintenance fee",
      "utility bill",
      "transport fee",
      "marketing fee",
      "Other",
    ],
  };

  const paymentMethods = ["cash", "card"];
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    paymentMethods[0]
  );

  const paymentStatues = ["success", "pending"];
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState(
    paymentStatues[0]
  );

  const [postImage, setPostImage] = useState();

  const handleCreateTransaction = async (event) => {
    event.preventDefault();
    const form = event.target;

    const transactionType = form.transactionType.value;
    const category = form.category.value;
    const amount = form.amount.value;
    const date = form.date.value;
    const paymentMethod = form.paymentMethod.value;
    const paymentStatus = form.paymentStatues.value;
    const description = form.description.value;

    const financeObj = {
      transactionType,
      category,
      amount,
      date,
      paymentMethod,
      paymentStatus,
      description,
    };

    const updatedPostImage = {
      ...postImage,
      ...financeObj,
    };

    if (!user) {
      setError("You must be logged in");
      return;
    }

    fetch("http://localhost:3000/finance/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(updatedPostImage),
    })
      .then((res) => res.json())
      .then((data) => {
        navigate("/admin/finance/dashboard/manage-transaction");
        toast.success("Transaction submitted successfully!!!", {
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

  const handleFileUpload = async (e) => {
    setFileUploaded(true);

    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setPostImage({ invoiceImage: base64 });
  };

  const today = new Date();
  const minDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 7
  );

  const maxDate = new Date(
    today.getFullYear() + 10,
    today.getMonth(),
    today.getDate()
  );

  return (
    <div className="h-[100vh] px-4 pt-4">
      <div className="flex justify-between p-4 mb-6 shadow-lg rounded-xl bg-sidebar-blue">
        <h2 className="text-3xl font-bold text-white ">Upload Transaction</h2>
      </div>

      <form
        onSubmit={handleCreateTransaction}
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
            <Select
              id="transactionType"
              name="transactionType"
              className="w-full rounded"
              value={selectedTransactionType}
              onChange={handleTransactionTypeChange}
            >
              {transactionTypes.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </div>
          <div className="lg:w-1/2">
            <div className="block mb-2">
              <Label
                htmlFor="category"
                value="Category"
                className="text-white text-md"
              />
            </div>
            <Select
              id="category"
              name="category"
              className="w-full rounded"
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
            >
              {categories[selectedTransactionType].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
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
              required
              min="1"
              pattern="[1-9]\d*"
              title="Amount must be a positive number"
              onChange={handleAmountChange}
            />
            {amountError && <p className="text-red-500">{amountError}</p>}
          </div>
          <div className="lg:w-1/2">
            <div className="lg:w-1/2">
              <div className="block mb-2">
                <Label
                  htmlFor="date"
                  value="Date"
                  className="text-white text-md"
                />
              </div>
              <div>
                <Datepicker
                  id="date"
                  name="date"
                  minDate={minDate}
                  maxDate={maxDate}
                />
              </div>
            </div>
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
            <Select
              id="paymentMethod"
              name="paymentMethod"
              className="w-full rounded"
              value={selectedPaymentMethod}
              onChange={(event) => setSelectedPaymentMethod(event.target.value)}
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
              <Label
                htmlFor="paymentStatus"
                value="Payment Status"
                className="text-white text-md"
              />
            </div>
            <Select
              id="paymentStatues"
              name="paymentStatues"
              className="w-full rounded"
              value={selectedPaymentStatus}
              onChange={(event) => setSelectedPaymentStatus(event.target.value)}
            >
              {paymentStatues.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
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
            required
            rows={4}
            onChange={handleDescriptionChange}
          />
          {descriptionError && (
            <p className="text-red-500">{descriptionError}</p>
          )}
          <div className="flex">
            <div>
              <p className="mt-4 font-bold text-white text-md">
                Upload Invoice Image
              </p>
              <div>
                <label
                  htmlFor="file-upload"
                  className="m-auto custom-file-upload "
                >
                  <img src={upload} alt="" />
                </label>
                <input
                  className="bg-black"
                  type="file"
                  label="Image"
                  name="invoiceImage"
                  id="file-upload"
                  accept=".jpeg,.png,.jpg"
                  onChange={(e) => handleFileUpload(e)}
                />
              </div>
            </div>
            <div className="mt-8 ml-96">
              <Button
                type="submit"
                className="mt-5 shadow-lg bg-header-orange rounded-2xl"
                disabled={!fileUploaded}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Transaction;

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}
