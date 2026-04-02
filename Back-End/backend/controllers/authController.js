const User = require("../models/User");
const bcrypt = require("bcryptjs");
const sendOTP = require("../utils/sendOtp");


//Register Api

exports.register = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const otp = Math.floor(100000 + Math.random() * 900000);

        const user = new User({
            name,
            email,
            password: hashedPassword,
            otp
        });

        await user.save();

        await sendOTP(email, otp);

        res.json({
            message: "OTP sent to email"
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }

    
};



//Verify OTP API

exports.verifyOTP = async (req, res) => {

    try {

        const { email, otp } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }

        if (user.otp != otp) {
            return res.status(400).json({
                message: "Invalid OTP"
            });
        }

        user.isVerified = true;
        user.otp = null;

        await user.save();

        res.json({
            message: "Email verified successfully"
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};



// Login API

const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }

        if (!user.isVerified) {
            return res.status(400).json({
                message: "Please verify email first"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid password"
            });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({
            token,
            user
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};


//