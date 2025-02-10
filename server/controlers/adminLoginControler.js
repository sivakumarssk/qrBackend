const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const Admin = require('../models/admin')

const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if all fields are provided
        if (!email || !password) {
            return res.status(400).send({ message: 'All fields are required.' });
        }

        // Find the Admin by email
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).send({ message: 'admin not found.' });
        }

        // Compare the provided password with the hashed password
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(400).send({ message: 'Invalid credentials.' });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: admin._id, email: admin.email }, 'QrAdmin', {
            expiresIn: '1y', // Token expires in 1 hour
        });

        res.status(200).send({ message: 'Login successful.', token });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

const registerAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if all fields are provided
        if (!email || !password) {
            return res.status(400).send({ message: 'All fields are required.' });
        }

        // Check if the Admin already exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).send({ message: 'Email is already registered.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new Admin
        const newAdmin = new Admin({
            email,
            password: hashedPassword,
        });

        await newAdmin.save();

        res.status(200).send({ message: 'Admin registered successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};


module.exports={
    registerAdmin,
    loginAdmin
}