const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {

    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(200).json({ message: "please fill in all fields" });
        }

        const userExist = await User.findOne({ email: email });

        if (userExist) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name: name,
            email: email,
            password: hashedPassword,
            role: role,
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                password: user.email,
                role: user.role,
            });
        }

        else {

            res.status(400).json({ message: 'Invalid user data' });
        }


    } catch (error) {

        console.error(error);
        res.status(500).json({ message: "server error" });


    }
};


//login controller

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password' });
        }

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);//comparing the hashed password with user password

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        //jwt token generating

        const payload = {
            id: user._id,
            role: user.role,
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: token,
        });

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "server error" })
    }
}

const getProfile = (req, res) => {

  res.status(200).json(req.user);
};

const instructorTest = (req, res) => {
  res.status(200).json({ message: 'Welcome, Instructor!' });
};

module.exports = {
    registerUser,
    loginUser,
    getProfile,
    instructorTest,
}