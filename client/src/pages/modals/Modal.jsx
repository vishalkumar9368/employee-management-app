import React from "react";
import { useState } from "react";
import { useEmployee } from "../../context/EmployeeContext";

const Modal = ({ type, setIsModalOpen, initialData }) => {
  const { editRecords, addRecord } = useEmployee();
  const [formData, setFormData] = useState(
    type === "edit"
      ? initialData
      : {
          name: "",
          age: "",
          phone: "",
          email: "",
          department: "",
          designition: "",
          address: "",
        }
  );

  // function to handleInput change
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.toString() });
  };

  // function to close the modaal
  const handleClose = () => {
    setIsModalOpen(false);
  };

  // handleSubmit function
  const handleSubmit = () => {
    if (type === "edit") {
      //run update function
      editRecords(formData, initialData._id);
    } else if (type === "add") {
      //run add record function
      addRecord(formData);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-50/70 backdrop-blur-sm z-50">
      <div className="bg-white rounded-lg p-8 w-96 shadow-xl">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          {type === "add" ? "ADD a Record" : "Edit a Record"}
        </h2>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500 transition-all duration-300"
          />
          <input
            type="email"
            placeholder="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500 transition-all duration-300"
          />
          <input
            type="Number"
            placeholder="Age"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500 transition-all duration-300"
          />
          <input
            type="Number"
            placeholder="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500 transition-all duration-300"
          />
          <input
            type="text"
            placeholder="Address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500 transition-all duration-300"
          />
          <input
            type="text"
            placeholder="Designition"
            name="designition"
            value={formData.designition}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500 transition-all duration-300"
          />
          <select
            name="department"
            id=""
            value={formData.department}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500 transition-all duration-300"
          >
            <option value="">Slelect a department</option>
            <option value="HR">HR</option>
            <option value="IT">IT</option>
            <option value="Sales">Sales</option>
            <option value="Marketing">Marketing</option>
            <option value="Support">Support</option>
          </select>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleClose}
              className="w-full bg-gradient-to-r from-gray-400 to-gray-500
            py-3
            hover:from-gray-500 to:bg-gray-400
            rounded-lg
            text-white
          shadow-md"
            >
              Close
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500
            hover:from-blue-600 hover:to-purple-600
            py-3
            rounded-lg
            text-white
           shadow-md"
            >
              {type === "add" ? "Add Record" : "Edit Record"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
