import express from "express";
import JWT from "jsonwebtoken";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
const router = express.Router();

// login route
router.post("/login", async (req, res) => {
  try {
    // get the data from the frontend
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.status(400).json({ message: "all fields required." });
    }
    //  find if user exists
    const userExists = await User.findOne({ email });

    if (!userExists) {
      return res.status(404).json({ message: "User not found." });
    }

    // then compare passwords
    const isMatch = await bcrypt.compare(password, userExists.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // if match generate a token
    const token = JWT.sign({ id: userExists._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // send token with some user info to the frontend as a response
    res.status(200).json({
      message: "Login successsful",
      user: {
        id: userExists._id,
        name: userExists.name,
        email: userExists.email,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "user not found", error: error.message });
  }
});

// register route
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // validation
    if (!email || !password || !name) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // check if user with this email already exista then dont register him
    const userExists = await User.findOne({ email: email });

    if (userExists) {
      return res.status(409).json({ message: "User already exists." });
    }

    // otherwise just save the user to the database
    // first hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create a new user to save
    const newUser = {
      name,
      email,
      password: hashedPassword,
    };

    // save it to database
    await User.create(newUser);

    // then send some response to the frontend
    res.status(200).json({
      message: "User registered successfully.",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error.", error: error.message });
  }
});

export default router;
