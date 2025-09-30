const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = async (req, res, next) => {

    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decode.id).select('-password');
            next();
        } catch (error) {

            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }


}


const isInstructor=(req,res,next)=>{

    if(req.user && req.user.role === 'Instructor'){
        next();
    }
    else{
        res.status(403).json({message:"Access denied. Instructor only."});
    }
}


module.exports = { protect , isInstructor};