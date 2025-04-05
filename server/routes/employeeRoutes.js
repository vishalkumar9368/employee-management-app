import express from "express";
import Employee from "../models/employeeModel.js";

const router = express.Router();

// route to get all record

router.get("/", async (req, res) => {
  try {
    const { id } = req.user;
    // find the records with the companty id
    const records = await Employee.find({ company: id });
    // if no record found
    if (records.length === 0) {
      return res.status(404).json({ message: "No records found." });
    }
    res.status(200).json(records);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error." });
  }
});

// route to create a record
router.post("/", async (req, res) => {
  try {
    const { name, email, address, phone, designition, age, department } =
      req.body;
    const { id } = req.user;

    // implement validation
    if (
      !name ||
      !email ||
      !age ||
      !address ||
      !department ||
      !designition ||
      !phone
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // we have got all the data from the user so now create a new object and save it in the database

    const newEmployee = {
      name,
      email,
      age,
      address,
      department,
      designition,
      phone,
      company: id,
    };

    const newRecord = await Employee.create(newEmployee);
    res.status(200).json({ message: "Record added successfully", newRecord });
  } catch (error) {
    return res.status(500).json("Internal server error");
  }
});

// route to delete a record from the colledtion

router.delete("/:id", async (req, res) => {
  try {
    // we have got the id required to find a record
    const { id } = req.params;
    const companyId = req.user.id;

    // find the record by id
    const recordExists = await Employee.findByIdAndDelete(id);

    // check if record exists
    if (!recordExists) {
      return res.status(404).json({ message: "Record does not exists." });
    }
    // ensure that the employee belong to the logged-in company
    if (recordExists.company.toString() !== companyId) {
      return res.status(403).json({
        message:
          "Unauthorized: You can only delete employees from your company.",
      });
    }

    res.status(200).json({ message: "Record deleted successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error." });
  }
});

// route to update the record

router.put("/:id", async (req, res) => {
  try {
    // we have got the id required to find a record
    const { id } = req.params;
    const updatedData = req.body;

    const updatedRecord = await Employee.findByIdAndUpdate(id, updatedData, {
      new: true, // Return updated record
      runValidators: true, // Ensure validation rules are applied
    });

    if (!updatedRecord) {
      return res.status(404).json({ message: "Record does not exists." });
    }

    res.status(200).json({ message: "Record updated successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error." });
  }
});

export default router;
