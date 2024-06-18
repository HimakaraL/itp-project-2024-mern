import React, { useEffect, useState } from "react";
import { Button, Table } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import jsPDF from "jspdf";
import 'jspdf-autotable';
import { toast } from "react-toastify";
import Pagination from "./AdminPagination";
import profile from "../../images/profile.jpg";

const ManageTransaction = () => {
  const { user } = useAuthContext();
  const [query, setQuery] = useState("");
  const [allTransactions, setAllTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);
  const [loading, setLoading] = useState(false);
  const [transactionTypesCount, setTransactionTypesCount] = useState({});
  const [pieChartData, setPieChartData] = useState([]);
  
  useEffect(() => {
    if(user && user.token){
      setLoading(true);
      fetch("http://localhost:3000/finance/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setAllTransactions(data.data);
          setLoading(false);
        })
    }
  }, [user]);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = allTransactions?.slice(firstPostIndex, lastPostIndex);

  const handleDelete = (_id) => {
    console.log(_id);
    fetch(`http://localhost:3000/finance/delete/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAllTransactions((prevTransactions) =>
          prevTransactions.filter((transaction) => transaction._id !== _id)
        );
        toast.error("Transaction is deleted successfully!", {
          position: "bottom-right",
          theme: "colored",
          autoClose: 1000,
        });
        navigate("/admin/finance/dashboard/manage-transaction");
      });
  };


  const handleExport = () => {
    const months = [...new Set(allTransactions.map(transaction => new Date(transaction.date).toLocaleString('default', { month: 'long' })))];

    const select = document.createElement('select');
    select.innerHTML = months.map(month => `<option>${month}</option>`).join('');
    select.style.marginRight = '10px';

    const okButton = document.createElement('button');
    okButton.textContent = 'OK';

    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.style.marginLeft = '10px';

    const container = document.createElement('div');
    container.appendChild(select);
    container.appendChild(okButton);
    container.appendChild(cancelButton);

    const popup = window.open('', '', 'width=300,height=150');
    popup.document.body.appendChild(container);

    okButton.addEventListener('click', () => {
        const selectedMonth = select.value;
        const filteredData = allTransactions.filter(transaction => {
            const transactionMonth = new Date(transaction.date).toLocaleString('default', { month: 'long' });
            return transactionMonth === selectedMonth;
        });

        const doc = new jsPDF();

        const tableData = filteredData.map((transaction) => [
            transaction.transactionType,
            transaction.category,
            transaction.amount,
            transaction.date,
            transaction.paymentMethod,
            transaction.paymentStatus,
            transaction.description,
        ]);

        doc.autoTable({
            head: [
                [
                    "Transaction Type",
                    "Category",
                    "Amount",
                    "Date",
                    "Payment Method",
                    "Payment Status",
                    "Description",
                ],
            ],
            body: tableData,
        });

        doc.save('transaction.pdf');
        popup.close();
    });

    cancelButton.addEventListener('click', () => {
        popup.close();
    });
};

  const handleSearch = () => {
    setLoading(true);
    fetch(`http://localhost:3000/finance/search?query=${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAllTransactions(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (loading) {
      toast.info("Loading data...", {
        position: "bottom-right",
        autoClose: 5000,
        theme: "colored",
        toastId: "loading",
      });
    } else {
      toast.dismiss("loading");
    }
  }, [loading]);


  return (
    <div className="h-[100vh] w-[1300px] mr-4">
      <div className="flex justify-between p-4 mt-8 mb-6 shadow-lg rounded-xl bg-sidebar-blue">
        <h2 className="text-3xl font-bold text-white ">
          Manage Transactions
        </h2>
      </div>
      <div >
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
            onClick={handleSearch}
            type="submit"
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
        <div className="h-[60vh] overflow-x-auto">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell className="text-white bg-sidebar-blue">No.</Table.HeadCell>
            <Table.HeadCell className="text-white bg-sidebar-blue">Transaction Type</Table.HeadCell>
            <Table.HeadCell className="text-white bg-sidebar-blue">Category</Table.HeadCell>
            <Table.HeadCell className="text-white bg-sidebar-blue">Amount</Table.HeadCell>
            <Table.HeadCell className="text-white bg-sidebar-blue">Date</Table.HeadCell>
            <Table.HeadCell className="text-white bg-sidebar-blue">Payment Method</Table.HeadCell>
            <Table.HeadCell className="text-white bg-sidebar-blue">Payment Status</Table.HeadCell>
            <Table.HeadCell className="text-white bg-sidebar-blue">Description</Table.HeadCell>
            <Table.HeadCell className="text-center text-white bg-sidebar-blue">
              <span >Action</span>
            </Table.HeadCell>
          </Table.Head>
          {currentPosts?.map((transaction, index) => (
            <Table.Body className="divide-y" key={transaction._id}>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {firstPostIndex + index + 1}
                </Table.Cell>
                <Table.Cell>{transaction.transactionType}</Table.Cell>
                <Table.Cell>{transaction.category}</Table.Cell>
                <Table.Cell>{transaction.amount}</Table.Cell>
                <Table.Cell>{new Date(transaction.date).toLocaleDateString()}</Table.Cell>
                <Table.Cell>{transaction.paymentMethod}</Table.Cell>
                <Table.Cell>{transaction.paymentStatus}</Table.Cell>
                <Table.Cell>{transaction.description}</Table.Cell>
                <Table.Cell>
                  <div className="flex items-center">
                    <button className="px-4 py-1 mr-5 font-semibold text-white bg-green-600 rounded-sm hover:bg-green-600">
                      <Link
                        to={`/admin/finance/dashboard/view-transaction/${transaction._id}`}
                        className="font-medium hover:underline "
                      >
                        View
                      </Link>
                    </button>
                    <Link
                      to={`/admin/finance/dashboard/edit-transaction/${transaction._id}`}
                    >
                       <button className="px-4 py-1 mr-5 font-semibold text-white bg-blue-600 rounded-sm hover:bg-blue-600">
                        Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(transaction._id)}
                      className="px-4 py-1 font-semibold text-white bg-red-600 rounded-sm hover:bg-sky-600"
                    >
                      Delete
                    </button>
                  </div>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          ))}
        </Table>
        </div>
      </div>
      <Pagination
        totalPosts={allTransactions.length}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default ManageTransaction;
