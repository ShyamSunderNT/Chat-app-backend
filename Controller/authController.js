import User from "../Models/User.js";
import bcryptjs from 'bcryptjs'
import { generateToken } from "../utils/jwtwebToken.js";


export const registerUser = async (req, res, next) => {
    try {
        let { firstName, lastName, email, password } = req.body;
        const existingUser = await User.findOne({ email: email });
        
        if (existingUser) {
            return res.status(400).json({ message: `User Already Exists` });
        }

        password = bcryptjs.hashSync(password, 8);
        const userData = new User({
            firstName,
            lastName,
            email,
            password,
        });

        const user = await userData.save();
        const jwt = generateToken(user._id);

        res.status(200).json({
            message: "Registration Successful",
            token: jwt,
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Failed to register user. Please try again.' });
    }
};

export const loginUser = async (req, res) => {
    try {
        let { email, password } = req.body;
        let user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ message: `User Not Found` });
        }

        const isPasswordValid = bcryptjs.compareSync(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid Password" });
        }

        const jwt = generateToken(user._id);
        user.password = null;

        res.status(200).json({
            message: "Login Successful",
            data: user,
            token: jwt,
        });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Failed to login user. Please try again.' });
    }
};


export const getAuthUser = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(404).json({ message: `User Not Found` });
        }

        res.status(200).json({
            data: req.user,
        });
    } catch (error) {
        console.error('Error fetching auth user:', error);
        res.status(500).json({ message: 'Failed to fetch auth user. Please try again.' });
    }
};
// Update user profile
export const updateUser = async (req, res) => {
    try {
        const { firstName, lastName, email } = req.body;
        const userId = req.user._id;

        if (!firstName || !lastName || !email) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;

        await user.save();

        const jwt = generateToken(user._id);

        res.status(200).json({ success: true, message: 'User profile updated successfully', token: jwt });
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ message: 'Failed to update user profile. Please try again.' });
    }
};


export const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find({ _id: { $ne: req.user._id } }).select("-password").sort({ _id: -1 });

        res.status(200).json({ data: allUsers });
    } catch (error) {
        console.error('Error fetching all users:', error);
        res.status(500).json({ message: 'Failed to fetch all users. Please try again.' });
    }
};