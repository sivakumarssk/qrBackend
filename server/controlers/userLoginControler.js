const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const User = require('../models/userLogin')

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if all fields are provided
        if (!email || !password) {
            return res.status(400).send({ message: 'All fields are required.' });
        }

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({ message: 'User not found.' });
        }

        // Compare the provided password with the hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).send({ message: 'Invalid credentials.' });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user._id, email: user.email }, 'QrUser', {
            expiresIn: '1y', // Token expires in 1 hour
        });

        res.status(200).send({ message: 'Login successful.', token });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if all fields are provided
        if (!username || !email || !password) {
            return res.status(400).send({ message: 'All fields are required.' });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ message: 'Email is already registered.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            userName: username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(200).send({ message: 'User registered successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};


const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, "userName email");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports={
    registerUser,
    loginUser,
    getUsers
}