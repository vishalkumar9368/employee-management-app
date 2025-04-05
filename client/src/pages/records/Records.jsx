import React, { useState, useEffect } from "react";
import Modal from "../modals/Modal";
import { useEmployee } from "../../context/EmployeeContext";
import { FaEdit, FaTrash } from "react-icons/fa";

const Records = () => {
  // get all records from the context
  const { deleteRecords, filteredRecords, setFilteredRecords, allRecords } =
    useEmployee();
  // state to handle modal open and close
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalName, setModalName] = useState("add");
  const [initialData, setInitialData] = useState({});

  const [filter, setFilter] = useState({
    searchTerm: "",
    department: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  // filtering logic inside useEffect
  useEffect(() => {
    const filterResult = allRecords.filter((item) => {
      const matchedSearch =
        filter.searchTerm.trim() === "" ||
        item.name
          .toLowerCase()
          .startsWith(filter.searchTerm.trim().toLowerCase());
      const matchedDepartment =
        filter.department === "" ||
        item.department.toLowerCase() === filter.department.toLowerCase();
      return matchedSearch && matchedDepartment;
    });
    setFilteredRecords(filterResult);
  }, [filter]);

  // hide scrolling on background when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isModalOpen]);

  return (
    <div className="p-6 min-h-screen h-auto">
      {/* record table */}
      <div className="flex flex-col  md:flex-row md:justify-between items-start mb-6 gap-4 ">
        <input
          type="search"
          placeholder="Search by name "
          name="searchTerm"
          value={filter.searchTerm}
          className="w-full md:w-1/3 px-4 py-2 border  border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          onChange={(e) => {
            handleInputChange(e);
          }}
        />
        <select
          name="department"
          id=""
          value={filter.department}
          className="w-full md:w-1/3 px-4 py-2 border  border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          onChange={(e) => {
            handleInputChange(e);
          }}
        >
          <option value="">All department</option>
          <option value="HR">HR</option>
          <option value="IT">IT</option>
          <option value="Sales">Sales</option>
          <option value="Marketing">Marketing</option>
          <option value="Support">Support</option>
        </select>
        <button
          onClick={() => {
            setIsModalOpen(true);
            setModalName("add");
          }}
          className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg shadow:md transition-all"
        >
          Add Record
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4">
        {filteredRecords.length === 0 ? (
          <div>No Records Found.</div>
        ) : (
          <table className="w-full border-collapse ">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Age</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Address</th>
                <th className="px-4 py-3">Department</th>
                <th className="px-4 py-3">Designition</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredRecords.map((item) => (
                <tr key={item._id} className="hover:bg-gray-100 transition">
                  <td className="px-4 py-3">{item.name}</td>
                  <td className="px-4 py-3">{item.age}</td>
                  <td className="px-4 py-3">{item.email}</td>
                  <td className="px-4 py-3">{item.phone}</td>
                  <td className="px-4 py-3">{item.address}</td>
                  <td className="px-4 py-3">{item.department}</td>
                  <td className="px-4 py-3">{item.designition}</td>
                  <td className="px-4 py-3 ">
                    <button
                      onClick={() => {
                        setIsModalOpen(true);
                        setModalName("edit");
                        setInitialData(item);
                      }}
                      className="text-blue-500 hover:text-blue-600 transition mx-1"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => deleteRecords(item._id)}
                      className="text-red-500 hover:text-red-600 transition mx-1"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {isModalOpen && (
        <Modal
          type={modalName}
          initialData={initialData}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
};

export default Records;
