import User from "../models/user.js"
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const signupUser = async (req, res) => {
  const { username, email, password, bookIds } = req.body;

 
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Email already in use" });
  }

  
  const hashedPassword = await bcrypt.hash(password, 10);

 
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    books: bookIds || [], 
  });

  try {
    await newUser.save();

    
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );

    res.status(201).json({
      message: "User registered successfully",
      user: newUser,
      token: token,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
   
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

   
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );

    res.status(200).json({
      message: "Login successful",
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
