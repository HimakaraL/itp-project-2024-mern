import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuthContext } from '../../../hooks/useAuthContext';

const EditInventory = () => {
  const { id } = useParams();
  const { user } = useAuthContext(); 
  const [itemName, setItemName] = useState('');
  const [modelNumber, setModelNumber] = useState('');
  const [category, setCategory] = useState('');
  const [quantityInStock, setQuantityInStock] = useState(0);
  const [unitPrice, setUnitPrice] = useState(0);
  const [dateAdded, setDateAdded] = useState('');
  const [condition, setCondition] = useState('');
  const [supplierName, setSupplierName] = useState('');
  const [supplierContactNumber, setSupplierContactNumber] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!user) return; 

    axios.get(`http://localhost:3000/inventory/${id}`, {
      headers: { Authorization: `Bearer ${user.token}` },
    })
      .then(response => {
        const { itemName, modelNumber, category, quantityInStock, unitPrice, dateAdded, condition, supplier, description } = response.data;
        setItemName(itemName);
        setModelNumber(modelNumber);
        setCategory(category);
        setQuantityInStock(quantityInStock);
        setUnitPrice(unitPrice);
        setDateAdded(dateAdded);
        setCondition(condition);
        if (supplier) {
          setSupplierName(supplier.name);
          setSupplierContactNumber(supplier.contactNumber);
        }
        setDescription(description);
      })
      .catch(error => console.error('Error fetching inventory item:', error));
  }, [id, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'itemName':
        setItemName(value);
        break;
      case 'modelNumber':
        setModelNumber(value);
        break;
      case 'category':
        setCategory(value);
        break;
      case 'quantityInStock':
        setQuantityInStock(value);
        break;
      case 'unitPrice':
        setUnitPrice(value);
        break;
      case 'dateAdded':
        setDateAdded(value);
        break;
      case 'condition':
        setCondition(value);
        break;
      case 'supplierName':
        setSupplierName(value);
        break;
      case 'supplierContactNumber':
        setSupplierContactNumber(value);
        break;
      case 'description':
        setDescription(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      await axios.put(`http://localhost:3000/inventory/${id}`, {
        itemName,
        modelNumber,
        category,
        quantityInStock,
        unitPrice,
        dateAdded,
        condition,
        supplier: { name: supplierName, contactNumber: supplierContactNumber },
        description,
      }, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      console.log('Item updated successfully:', { itemName, modelNumber, category, quantityInStock, unitPrice, dateAdded, condition, supplier: { name: supplierName, contactNumber: supplierContactNumber }, description });
      alert('Your Inventory data is successfully updated');
    } catch (error) {
      console.error('Error updating inventory item:', error);
    }
  };

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    // Model Number Validation
    if (!modelNumber.trim() || !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/.test(modelNumber.trim())) {
      formErrors.modelNumber = 'Model number must contain at least one letter and one number';
      isValid = false;
    }

    // Date Added Validation
    const currentDate = new Date().toISOString().split('T')[0];
    if (dateAdded < currentDate) {
      formErrors.dateAdded = 'Date cannot be in the past';
      isValid = false;
    }

    // Supplier Contact Number Validation
    if (!supplierContactNumber.trim() || !/^\d{10}$/.test(supplierContactNumber.trim())) {
      formErrors.supplierContactNumber = 'Supplier contact number must have 10 digits';
      isValid = false;
    }

    // Quantity in Stock Validation
    if (quantityInStock <= 0) {
      formErrors.quantityInStock = 'Quantity must be greater than 0';
      isValid = false;
    }

    // Unit Price Validation
    if (unitPrice <= 0) {
      formErrors.unitPrice = 'Unit price must be greater than 0';
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  return (
    <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h2 className="text-3xl font-semibold mb-4 text-center bg-blue-800 text-white py-2 px-4 rounded">Edit Inventory Item</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4" style={{ background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
        {/* Item Name */}
        <div className="col-span-1">
          <label htmlFor="itemName" className="block mb-2">Item Name:</label>
          <input type="text" id="itemName" name="itemName" value={itemName} onChange={handleChange} className="block w-full px-4 py-2 border border-gray-300 rounded" required />
        </div>
        {/* Model Number */}
        <div className="col-span-1">
          <label htmlFor="modelNumber" className="block mb-2">Model Number:</label>
          <input type="text" id="modelNumber" name="modelNumber" value={modelNumber} onChange={handleChange} className="block w-full px-4 py-2 border border-gray-300 rounded" required />
          {errors.modelNumber && <p className="text-red-500 text-sm mt-1">{errors.modelNumber}</p>}
        </div>
        {/* Category */}
        <div className="col-span-1">
          <label htmlFor="category" className="block mb-2">Category:</label>
          <select id="category" name="category" value={category} onChange={handleChange} className="block w-full px-4 py-2 border border-gray-300 rounded" required>
            <option value="">Select category</option>
            <option value="Electrical">Electrical</option>
            <option value="Lighting">Lighting</option>
            <option value="Sound">Sound</option>
            <option value="Stage Equipment">Stage Equipment</option>
          </select>
        </div>
        {/* Quantity in Stock */}
        <div className="col-span-1">
          <label htmlFor="quantityInStock" className="block mb-2">Quantity in Stock:</label>
          <input type="number" id="quantityInStock" name="quantityInStock" value={quantityInStock} onChange={handleChange} className="block w-full px-4 py-2 border border-gray-300 rounded" required />
          {errors.quantityInStock && <p className="text-red-500 text-sm mt-1">{errors.quantityInStock}</p>}
        </div>
        {/* Unit Price */}
        <div className="col-span-1">
          <label htmlFor="unitPrice" className="block mb-2">Unit Price:</label>
          <input type="number" id="unitPrice" name="unitPrice" value={unitPrice} onChange={handleChange} className="block w-full px-4 py-2 border border-gray-300 rounded" required />
          {errors.unitPrice && <p className="text-red-500 text-sm mt-1">{errors.unitPrice}</p>}
        </div>
        {/* Date Added */}
        <div className="col-span-1">
          <label htmlFor="dateAdded" className="block mb-2">Date Added:</label>
          <input type="date" id="dateAdded" name="dateAdded" value={dateAdded} onChange={handleChange} className="block w-full px-4 py-2 border border-gray-300 rounded" required />
          {errors.dateAdded && <p className="text-red-500 text-sm mt-1">{errors.dateAdded}</p>}
        </div>
        {/* Condition */}
        <div className="col-span-1">
          <label htmlFor="condition" className="block mb-2">Condition:</label>
          <select id="condition" name="condition" value={condition} onChange={handleChange} className="block w-full px-4 py-2 border border-gray-300 rounded" required>
            <option value="">Select condition</option>
            <option value="New">New</option>
            <option value="Used">Used</option>
            <option value="Refurbished">Refurbished</option>
          </select>
        </div>
        {/* Supplier Name */}
        <div className="col-span-1">
          <label htmlFor="supplierName" className="block mb-2">Supplier Name:</label>
          <input type="text" id="supplierName" name="supplierName" value={supplierName} onChange={handleChange} className="block w-full px-4 py-2 border border-gray-300 rounded" />
        </div>
        {/* Supplier Contact Number */}
        <div className="col-span-1">
          <label htmlFor="supplierContactNumber" className="block mb-2">Supplier Contact Number:</label>
          <input type="text" id="supplierContactNumber" name="supplierContactNumber" value={supplierContactNumber} onChange={handleChange} className="block w-full px-4 py-2 border border-gray-300 rounded" />
          {errors.supplierContactNumber && <p className="text-red-500 text-sm mt-1">{errors.supplierContactNumber}</p>}
        </div>
        {/* Description */}
        <div className="col-span-3">
          <label htmlFor="description" className="block mb-2">Description:</label>
          <textarea id="description" name="description" value={description} onChange={handleChange} className="block w-full px-4 py-2 border border-gray-300 rounded" required />
        </div>
        {/* Display Errors */}
        <div className="col-span-3">
          {Object.keys(errors).length > 0 && (
            <div className="border border-red-500 rounded p-2 bg-red-100 text-red-500">
              {Object.keys(errors).map((fieldName) => (
                <p key={fieldName} className="text-sm">{errors[fieldName]}</p>
              ))}
            </div>
          )}
        </div>
        <div className="col-span-3">
          <button type="submit" className="bg-orange-500 text-white py-2 px-4 rounded cursor-pointer">Update Item</button>
        </div>
      </form>
    </div>
  );
};

export default EditInventory;
