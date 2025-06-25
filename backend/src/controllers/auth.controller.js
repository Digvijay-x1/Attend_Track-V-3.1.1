import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import { generateToken } from "../lib/utils.js";


export const signup = async (req , res)=>{
    const {name , email , password} = req.body;

    if(!name || !email || !password) return res.status(400).json({message: "All fields are required"}); 
    try {
        if(password.length < 6) return res.status(400).json({message: "Password must be at least 6 characters long"});

        const existingUser = await User.findOne({email});
        if(existingUser) return res.status(400).json({message: "User already exists please sign in"});

        let salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(password , salt);

        const newUser =  new User({name , email , password: hashedPassword});
        await newUser.save();

        const token = generateToken(newUser._id , res);

        res.status(201).json({message: "User created successfully", user: newUser , token});
    } catch (error) {
        res.status(500).json({message: "Internal server error in auth controller" + error.message});
    }
}

export const login = async(req , res)=>{
    const {email , password} = req.body;
    try {
        const existingUser = await User.findOne({email});
        if(!existingUser) return res.status(400).json({message: "Invalid credentials"});

        // compare password

        bcrypt.compare(password , existingUser.password , (err , isMatch)=>{
            if(err) return res.status(500).json({message: "Internal server error in auth controller" + err.message});

            if(!isMatch) return res.status(400).json({message: "Invalid credentials"});

            const token = generateToken(existingUser._id , res);
            res.status(200).json({message: "User logged in successfully", user: existingUser , token});
        })
    } catch (error) {
        console.log(`Error in login controller ${error.message}`);
        res.status(500).json({message: "Internal server error in auth controller" + error.message});
    }
}

export const logout = (req , res)=>{
    try {
        res.cookie("jwt" , "" , {maxAge: 0});
        res.status(200).json({message: "User logged out successfully"});
    } catch (error) {
        console.log(`Error in logout controller ${error.message}`);
        res.status(500).json({message: "Internal server error in auth controller" + error.message});
    }
}

export const updateProfile = async(req , res)=>{

}