const User = require("../models/User");

// Signup
const signup = async (req, res) => {
  try {
    const { firstname, lastname, username, email, password } = req.body;

    // check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // create user
    const newUser = new User({
      firstname,
      lastname,
      username,
      email,
      password,
    });
    await newUser.save();

    // ✅ remove password before sending
    const userResponse = newUser.toObject();
    delete userResponse.password;

    res.status(201).json({
      message: "User registered successfully",
      user: userResponse,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // check password (plain for now, since no hashing)
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // ✅ remove password before sending
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(200).json({
      message: "Login successful",
      user: userResponse,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { signup, login };
