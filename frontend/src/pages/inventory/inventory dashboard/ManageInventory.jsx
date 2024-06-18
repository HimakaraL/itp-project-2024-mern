import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { FaSearch, FaFilePdf } from 'react-icons/fa';

const ManageInventory = () => {
  const { user } = useAuthContext();
  const [inventory, setInventory] = useState([]);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/inventory/', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch inventory data');
        }
        const data = await response.json();
        console.log('Fetched inventory data:', data);
        setInventory(data.data);
      } catch (error) {
        console.error('Error fetching inventory:', error);
        toast.error('Error fetching inventory data', { position: toast.POSITION.TOP_CENTER });
      }
    };

    fetchData();
  }, [user]);

  const handleDelete = (id) => {
    setItemToDelete(id);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/inventory/${itemToDelete}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete item');
      }

      setInventory((prevInventory) => prevInventory.filter((item) => item._id !== itemToDelete));
      toast.success('Item deleted successfully', { position: toast.POSITION.TOP_CENTER });
    } catch (error) {
      console.error('Error deleting inventory item:', error);
      toast.error('Error deleting item', { position: toast.POSITION.TOP_CENTER });
    }
    setItemToDelete(null); // Clear itemToDelete after deletion
  };

  const filteredInventory = inventory.filter((item) =>
    item.itemName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Export data as PDF
  const exportToPDF = () => {
    const input = document.getElementById('inventoryTable');

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 5, 5, imgWidth, imgHeight);
      pdf.save('InventoryData.pdf');
    });
  };

  return (
    <div className="h-[100vh]">
      <h2 className="px-5 py-4 mt-4 mb-4 text-3xl font-semibold text-center text-white bg-blue-900 rounded">All Inventory</h2>
      <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ padding: '5px 10px', marginRight: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          <FaSearch style={{ cursor: 'pointer', fontSize: '20px' }} />
        </div>
        <button
        className='bg-sidebar-orange'
          onClick={exportToPDF}
          style={{ padding: '8px 12px', borderRadius: '5px', border: '1px solid #007bff', color: '#fff' }}
        >
          Generate Report <FaFilePdf style={{ marginLeft: '50px' }} />
        </button>
      </div>
      <table id="inventoryTable" style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
        <thead className='bg-sidebar-blue'>
          <tr>
            <th style={{ color:'white' , padding: '10px', border: '1px solid #ddd', fontWeight: 'bold', textAlign: 'left' }}>Item Name</th>
            <th style={{ color:'white' , padding: '10px', border: '1px solid #ddd', fontWeight: 'bold', textAlign: 'left' }}>Model Number</th>
            <th style={{ color:'white' , padding: '10px', border: '1px solid #ddd', fontWeight: 'bold', textAlign: 'left' }}>Category</th>
            <th style={{ color:'white' , padding: '10px', border: '1px solid #ddd', fontWeight: 'bold', textAlign: 'left' }}>Quantity in Stock</th>
            <th style={{ color:'white' , padding: '10px', border: '1px solid #ddd', fontWeight: 'bold', textAlign: 'left' }}>Unit Price</th>
            <th style={{ color:'white' , padding: '10px', border: '1px solid #ddd', fontWeight: 'bold', textAlign: 'left' }}>Date Added</th>
            <th style={{ color:'white' , padding: '10px', border: '1px solid #ddd', fontWeight: 'bold', textAlign: 'left' }}>Condition</th>
            <th style={{ color:'white' , padding: '10px', border: '1px solid #ddd', fontWeight: 'bold', textAlign: 'left' }}>Supplier Name</th>
            <th style={{ color:'white' , padding: '10px', border: '1px solid #ddd', fontWeight: 'bold', textAlign: 'left' }}>Supplier Contact Number</th>
            <th style={{ color:'white' , padding: '10px', border: '1px solid #ddd', fontWeight: 'bold', textAlign: 'left' }}>Description</th>
            <th style={{ color:'white' , padding: '42px', border: '1px solid #ddd', fontWeight: 'bold', textAlign: 'left' }}>Manage</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(filteredInventory) && filteredInventory.length > 0 ? (
            filteredInventory.map((item, index) => (
              <tr key={item._id} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff' }}>
                <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>{item.itemName}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>{item.modelNumber}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>{item.category}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>{item.quantityInStock}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>{item.unitPrice}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>{new Date(item.dateAdded).toLocaleDateString()}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>{item.condition}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>{item.supplier ? item.supplier.name : '-'}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>{item.supplier ? item.supplier.contactNumber : '-'}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>{item.description}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>
                  <Link
                    to={`/admin/inventory/dashboard/edit-inventory/${item._id}`}
                    style={{
                      marginRight: '5px',
                      padding: '5px 10px',
                      border: '1px solid #ccc',
                      backgroundColor: '#4caf50',
                      color: '#fff',
                      textDecoration: 'none',
                      borderRadius: '5px',
                    }}
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(item._id)}
                    style={{ padding: '5px 10px', border: '1px solid #ccc', backgroundColor: '#f44336', color: '#fff', borderRadius: '2px' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="11" style={{ padding: '10px', textAlign: 'center', border: '1px solid #ddd' }}>No inventory data available</td>
            </tr>
          )}
        </tbody>
      </table>
      {itemToDelete && (
        <div
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '5px' }}>
            <p>Are you sure you want to delete this inventory?</p>
            <div>
              <button
                onClick={confirmDelete}
                style={{
                  marginRight: '5px',
                  padding: '5px 10px',
                  border: '1px solid #ccc',
                  backgroundColor: '#4caf50',
                  color: '#fff',
                  borderRadius: '5px',
                }}
              >
                Yes
              </button>
              <button
                onClick={() => setItemToDelete(null)}
                style={{ padding: '5px 10px', border: '1px solid #ccc', backgroundColor: '#f44336', color: '#fff', borderRadius: '5px' }}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};  

export default ManageInventory;
