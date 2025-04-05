import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    department: {
      type: String,
      enum: ["HR", "Sales", "IT", "Support", "Marketing"],
      required: true,
    },
    designition: {
      type: String,
      required: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId, // Foreign key
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// Add an index on `company` to optimize searches
employeeSchema.index({ company: 1 });

export default mongoose.model("Employee", employeeSchema);
