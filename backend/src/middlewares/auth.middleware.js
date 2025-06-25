import User from '../models/user.model.js'
import { verifyToken } from '../lib/utils.js'


export const protectRoute = async (req , res , next)=>{
    try {
        const token = req.cookies.jwt;
        if(!token) return res.status(401).json({message: "Unauthorized token not provided"});

        const decoded = verifyToken(token);
        const user = await User.findById(decoded.userId).select("-password");
        if(!user) return res.status(401).json({message: "Unauthorized user not found"});

        req.user = user;
        next();
    } catch (error) {
        console.log(`Error in protectRoute middleware ${error.message}`);
        res.status(500).json({message: "Internal server error in auth middleware" + error.message});
    }
}