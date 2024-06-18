import React, { useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '../../../hooks/useAuthContext';

const AddInventory = () => {
  const { user } = useAuthContext();
  const [formData, setFormData] = useState({
    itemName: '',
    modelNumber: '',
    category: '',
    quantityInStock: 0,
    unitPrice: 0,
    dateAdded: '',
    condition: '',
    supplier: {
      name: '',
      contactNumber: '',
    },
    description: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const response = await axios.post(
        'http://localhost:3000/inventory/',
        formData,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setSuccessMessage('Your Inventory item is Successfully Added !');
      setFormData({
        itemName: '',
        modelNumber: '',
        category: '',
        quantityInStock: 0,
        unitPrice: 0,
        dateAdded: '',
        condition: '',
        supplier: {
          name: '',
          contactNumber: '',
        },
        description: '',
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'supplierName' || name === 'supplierContactNumber') {
      setFormData((prevData) => ({
        ...prevData,
        supplier: {
          ...prevData.supplier,
          [name === 'supplierName' ? 'name' : 'contactNumber']: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!formData.itemName.trim()) {
      errors.itemName = 'Item name is required';
      isValid = false;
    }

    if (!formData.modelNumber.trim() || !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/.test(formData.modelNumber.trim())) {
      errors.modelNumber = 'Model number must contain at least one letter and one number';
      isValid = false;
    }
    

    if (!formData.category.trim()) {
      errors.category = 'Category is required';
      isValid = false;
    }

    if (formData.quantityInStock <= 0) {
      errors.quantityInStock = 'Quantity must be greater than 0';
      isValid = false;
    }

    if (formData.unitPrice <= 0) {
      errors.unitPrice = 'Unit price must be greater than 0';
      isValid = false;
    }

    if (!formData.dateAdded) {
      errors.dateAdded = 'Date added is required';
      isValid = false;
    } else {
      const currentDate = new Date().toISOString().split('T')[0];
      if (formData.dateAdded < currentDate) {
        errors.dateAdded = 'Date cannot be in the past';
        isValid = false;
      }
    }

    if (!formData.condition.trim()) {
      errors.condition = 'Condition is required';
      isValid = false;
    }

    if (!formData.supplier.name.trim()) {
      errors.supplierName = 'Supplier name is required';
      isValid = false;
    }

    if (!formData.supplier.contactNumber.trim() || !/^\d{10}$/.test(formData.supplier.contactNumber.trim())) {
      errors.supplierContactNumber = 'Supplier contact number must have 10 digits';
      isValid = false;
    }

    if (!formData.description.trim()) {
      errors.description = 'Description is required';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  return (
    <div className="flex items-center justify-center h-screen m-auto">
      <form onSubmit={handleSubmit} className="w-full max-w-screen-lg p-8 bg-white rounded-lg shadow-md">
        <h2 className="px-4 py-2 mb-4 text-3xl font-semibold text-center text-white bg-blue-900 rounded">Add Inventory</h2>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label htmlFor="itemName" className="block text-sm font-medium text-gray-700">Item Name:</label>
            <input
              type="text"
              id="itemName"
              name="itemName"
              value={formData.itemName}
              onChange={handleChange}
              required
              className="block w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
            {errors.itemName && <p className="mt-1 text-xs text-red-500">{errors.itemName}</p>}
          </div>
          <div>
            <label htmlFor="modelNumber" className="block text-sm font-medium text-gray-700">Model Number:</label>
            <input
              type="text"
              id="modelNumber"
              name="modelNumber"
              value={formData.modelNumber}
              onChange={handleChange}
              required
              className="block w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
            {errors.modelNumber && <p className="mt-1 text-xs text-red-500">{errors.modelNumber}</p>}
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category:</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="block w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            >
              <option value="">Select category</option>
              <option value="Electrical">Electrical</option>
              <option value="Lighting">Lighting</option>
              <option value="Sound">Sound</option>
              <option value="Stage Equipment">Stage Equipment</option>
            </select>
            {errors.category && <p className="mt-1 text-xs text-red-500">{errors.category}</p>}
          </div>
          {/* Adding rest of the fields */}
          <div>
            <label htmlFor="quantityInStock" className="block text-sm font-medium text-gray-700">Quantity in Stock:</label>
            <input
              type="number"
              id="quantityInStock"
              name="quantityInStock"
              value={formData.quantityInStock}
              onChange={handleChange}
              required
              className="block w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
            {errors.quantityInStock && <p className="mt-1 text-xs text-red-500">{errors.quantityInStock}</p>}
          </div>
          <div>
            <label htmlFor="unitPrice" className="block text-sm font-medium text-gray-700">Unit Price:</label>
            <input
              type="number"
              id="unitPrice"
              name="unitPrice"
              value={formData.unitPrice}
              onChange={handleChange}
              required
              className="block w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
            {errors.unitPrice && <p className="mt-1 text-xs text-red-500">{errors.unitPrice}</p>}
          </div>
          <div>
            <label htmlFor="dateAdded" className="block text-sm font-medium text-gray-700">Date Added:</label>
            <input
              type="date"
              id="dateAdded"
              name="dateAdded"
              value={formData.dateAdded}
              onChange={handleChange}
              required
              className="block w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
            {errors.dateAdded && <p className="mt-1 text-xs text-red-500">{errors.dateAdded}</p>}
          </div>
          <div>
            <label htmlFor="condition" className="block text-sm font-medium text-gray-700">Condition:</label>
            <select
              id="condition"
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              required
              className="block w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            >
              <option value="">Select condition</option>
              <option value="New">New</option>
              <option value="Used">Used</option>
              <option value="Refurbished">Refurbished</option>
            </select>
            {errors.condition && <p className="mt-1 text-xs text-red-500">{errors.condition}</p>}
          </div>
          <div>
            <label htmlFor="supplierName" className="block text-sm font-medium text-gray-700">Supplier Name:</label>
            <input
              type="text"
              id="supplierName"
              name="supplierName"
              value={formData.supplier.name}
              onChange={handleChange}
              required
              className="block w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
            {errors.supplierName && <p className="mt-1 text-xs text-red-500">{errors.supplierName}</p>}
          </div>
          <div>
            <label htmlFor="supplierContactNumber" className="block text-sm font-medium text-gray-700">Supplier Contact Number:</label>
            <input
              type="text"
              id="supplierContactNumber"
              name="supplierContactNumber"
              value={formData.supplier.contactNumber}
              onChange={handleChange}
              required
              className="block w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
            {errors.supplierContactNumber && <p className="mt-1 text-xs text-red-500">{errors.supplierContactNumber}</p>}
          </div>
          <div className="col-span-3">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              className="block w-full p-2 mt-1 border border-gray-300 rounded resize-none focus:outline-none focus:border-blue-500"
            ></textarea>
            {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description}</p>}
          </div>
        </div>
        <div className="text-center">
          <button type="submit" className="px-4 py-2 mt-4 text-white bg-orange-500 rounded hover:bg-orange-400">Add Item</button>
        </div>
      </form>
      {successMessage && (
        <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-8 bg-white rounded shadow-lg">
            <p className="text-lg text-black">{successMessage}</p>
            <button
              className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600"
              onClick={() => setSuccessMessage('')}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddInventory;  
