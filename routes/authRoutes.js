const express=require("express");
const router=express.Router();
const { registerUser, loginUser, getProfile, instructorTest }=require("../controllers/authController");

const { protect , isInstructor} = require('../middleware/authMiddleware');

router.post("/register",registerUser);
router.post("/login",loginUser);
router.get('/profile', protect, getProfile);
router.get('/instructor-test', protect, isInstructor, instructorTest);

module.exports=router;
