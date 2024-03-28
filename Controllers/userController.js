import asynchandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';

// @desc register user/set token
// route POST /api/users/signup
//  if you are not our user so  New User Registation
// @access Public
const registerUser = asynchandler(async (req, res) => {
    const { name, email, password, phoneNumber } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }
    const user = await User.create({
        name,
        email,
        password,
        phoneNumber,
    });

    if (user) {
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            password: user.password,
            phoneNumber: user.phoneNumber,
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
    res.status(200).json({ message: 'Register User' });
});

// @desc Auth user/set token
// route POST/ api/users/login
//  you are already sign up so now you are login
// @access Public
const authUser = asynchandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            password: user.password,
            phoneNumber: user.phoneNumber,
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

// @desc logout user/set token
// route POST /api/users/logout
// logout your account
// User LogOut
// @access Public
const logoutUser = asynchandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: 'User logged out successfully' });
});

// @desc get profile
// route GET /api/users/profile
// get your profile
// @access Public
const getUserProfile = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch users' });
    }
};

// @desc update user profile
// route Patch /api/users/profile
// @access Private
const updateUserProfile = asynchandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = req.body.password;
        }
        const updateduser = await user.save();
        res.status(200).json({
            _id: updateduser._id,
            name: updateduser.name,
            email: updateduser.email,
            phoneNumber: updateduser.phoneNumber,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

export { authUser, registerUser, getUserProfile, logoutUser, updateUserProfile };

