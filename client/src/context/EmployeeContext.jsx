import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

export const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const { token } = useAuth();

  // state to store all the records - this will be our main state and will not change on applying filter or searches
  const [allRecords, setAllRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);

  // 1. function to get all records
  const getRecords = async () => {
    try {
      const response = await fetch("http://localhost:5000/user", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (response.status === 200) {
        setAllRecords(data);
        setFilteredRecords(data);
      }
    } catch (error) {
      console.log("error occured");
    }
  };

  // effect to fetch the records if token exists
  useEffect(() => {
    if (token) {
      getRecords();
    }
  }, [token]);

  // 2. function to delete a record
  const deleteRecords = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/user/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (response.status === 200) {
        setAllRecords(allRecords.filter((item) => item._id !== id));
        setFilteredRecords(filteredRecords.filter((item) => item._id !== id));
      }
    } catch (error) {
      console.log("error occured");
    }
  };

  // 3. function to edit a record
  const editRecords = async (formData, id) => {
    try {
      const response = await fetch(`http://localhost:5000/user/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.status === 200) {
        setAllRecords((prev) =>
          prev.map((item) =>
            item._id === id ? { ...item, ...formData } : item
          )
        );
        setFilteredRecords((prev) =>
          prev.map((item) =>
            item._id === id ? { ...item, ...formData } : item
          )
        );
      }
    } catch (error) {
      console.log("error data");
      updating;
    }
  };

  // 3. function to add a record
  const addRecord = async (formData) => {
    try {
      const response = await fetch("http://localhost:5000/user", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      // console.log(data);
      if (response.status === 200) {
        setAllRecords([...allRecords, data.newRecord]);
        setFilteredRecords([...allRecords, data.newRecord]);
      }
    } catch (error) {}
  };
  return (
    <EmployeeContext.Provider
      value={{
        getRecords,
        editRecords,
        deleteRecords,
        filteredRecords,
        addRecord,
        setFilteredRecords,
        allRecords,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployee = () => {
  return useContext(EmployeeContext);
};
