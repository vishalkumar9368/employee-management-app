import mongoose from "mongoose";
export const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to the database successfully"))
    .catch((error) => console.log("error connecting DB", error));
};
