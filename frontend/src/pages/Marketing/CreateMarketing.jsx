import React, { useState } from "react";
import { Label, TextInput } from "flowbite-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Button } from "flowbite-react";
import { Select } from "flowbite-react";
import { useAuthContext } from "../../hooks/useAuthContext";

const CreateMarketing = () => {
  const { user } = useAuthContext();
  const [expenseDate, setExpenseDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [expenseCategory, setExpenseCategory] = useState("");
  const [expenseDescription, setExpenseDescription] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseDuedate, setExpenseDuedate] = useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveMarketing = () => {
    const data = {
      expenseDate,
      expenseCategory,
      expenseDescription,
      expenseAmount,
      expenseDuedate,
    };

    axios
      .post("http://localhost:3000/marketing/add", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then(() => {
        enqueueSnackbar("Added successfully!", { variant: "success" });
        navigate("/admin/service/dashboard");
      })
      .catch((error) => {
        enqueueSnackbar("An error occurred!", { variant: "error" });
        console.log(error);
      });
  };
  function validateExpense(x) {
    if (isNaN(x) || x < 1000) {
      return false;
    } else {
      return true;
    }
  }
  return (
    <div className="px-4 pb-4 h-[100vh] ">
      <div className="flex items-center justify-center p-4 mt-8 mb-6 shadow-lg rounded-xl bg-sidebar-blue">
        <h2 className="text-3xl font-bold text-white ">Add a new Promotion </h2>
      </div>

      <div className=" w-[400px] ">
        <div>
          <div className="mb-2 ">
            <Label
              className="text-white"
              htmlFor="small"
              value="Starting Date"
            />
          </div>
          <TextInput
            className="block w-full px-3 py-2 text-gray-900 placeholder-gray-400 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            maxLength={10}
            id="strdate"
            type="date"
            value={expenseDate}
            onChange={(e) => {
              const userDate = new Date(e.target.value);
              const today = new Date();
              if (userDate.toDateString() !== today.toDateString()) {
                return;
              }

              setExpenseDate(e.target.value);
            }}
          />
        </div>
        <div>
          <div className="mb-2 ">
            <Label className="text-white" htmlFor="base" value="Category" />
          </div>
          <Select
            id=""
            type="text"
            sizing="md"
            value={expenseCategory}
            onChange={(e) => setExpenseCategory(e.target.value)}
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="Ad Campaign">Ad Campaign</option>
            <option value="Social Media">Social Media</option>
            <option value="Email Marketing">Email Marketing</option>
            <option value="Discount Offer">Discount Offer</option>
            <option value="Event Sponsorship">Event Sponsorship</option>
            <option value="Print Media">Print Media</option>
            <option value="Promotional Giveaway">Promotional Giveaway</option>
            <option value="Radio Ads">Radio Ads</option>
          </Select>
        </div>
        <div>
          <div className="mb-2 ">
            <Label className="text-white" htmlFor="large" value="Description" />
          </div>
          <TextInput
            id="large"
            type="text"
            sizing="lg"
            value={expenseDescription}
            onChange={(e) => setExpenseDescription(e.target.value)}
          />
        </div>
        <div>
          <div className="mb-2 ">
            <Label className="text-white" htmlFor="large" value="Expenditure" />
          </div>
          <TextInput
            id="large"
            type="text"
            sizing="lg"
            value={expenseAmount}
            inputMode="numeric"
            onChange={(e) => setExpenseAmount(e.target.value)}
          />
        </div>
        <div>
          <p id="p1" className="text-xs text-red-500"></p>
        </div>
        <div>
          <div className="mb-2 ">
            <Label className="text-white" htmlFor="large" value="Ending Date" />
          </div>
          <TextInput
            id="large"
            type="date"
            sizing="lg"
            value={expenseDuedate}
            onChange={(e) => {
              const selectedDate = new Date(e.target.value);
              const today = new Date();
              if (selectedDate <= today) {
                return;
              }
              setExpenseDuedate(e.target.value);
            }}
          />
        </div>
        <div>
          <p id="p2" className="text-xs text-red-500"></p>
        </div>
        <div className="flex items-center justify-center">
          <Button
            color="dark"
            onClick={() => {
              if (validateExpense(expenseAmount)) {
                handleSaveMarketing();
              } else {
                document.getElementById("p1").innerHTML =
                  "Expense amount should be an Amount greater than 1000";
              }
            }}
            className="items-center justify-center px-4 py-2 mt-4 text-white rounded-full bg-sidebar-orange"
          >
            Create
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateMarketing;
