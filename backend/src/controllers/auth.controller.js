import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import { generateToken } from "../lib/utils.js";
import cloudinary from '../lib/cloudinary.js'
import jwt from 'jsonwebtoken'
import { getGoogleUserInfo } from "../lib/google-auth.js";


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

export const updateProfile = async(req, res) => {
    try {
        const {profilePicture} = req.body;
        
        // Check if user exists in request (set by middleware)
        if (!req.user || !req.user._id) {
            return res.status(401).json({message: "User not authenticated"});
        }
        
        const userId = req.user._id;
        
        // Check if profilePicture is provided
        if (!profilePicture) {
            return res.status(400).json({message: "Profile picture is not selected"});
        }

        try {
            // Upload image to Cloudinary
            const updateResponse = await cloudinary.uploader.upload(profilePicture, {
                folder: "attend_track_profiles",
                timeout: 60000 // Increase timeout to 60 seconds
            });
            
            // Update user profile with new image URL
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                {profilePicture: updateResponse.secure_url},
                {new: true}
            ).select("-password"); // Exclude password from response
            
            if (!updatedUser) {
                return res.status(404).json({message: "User not found"});
            }
            
            return res.status(200).json({
                message: "Profile picture updated successfully", 
                user: updatedUser
            });
        } catch (cloudinaryError) {
            console.error("Cloudinary upload error:", cloudinaryError);
            return res.status(500).json({
                message: "Failed to upload image", 
                error: cloudinaryError.message
            });
        }
    } catch (error) {
        console.error(`Error in updateProfile controller: ${error.message}`);
        return res.status(500).json({
            message: "Internal server error in auth controller", 
            error: error.message
        });
    }
}

export const checkAuth = async(req , res)=>{
    try {
        const user = req.user;
        res.status(200).json({message: "User is authenticated", user});
    } catch (error) {
        console.log(`Error in checkAuth controller ${error.message}`);
        res.status(500).json({message: "Internal server error in auth controller" + error.message});
    }
}

// Google login function
export const googleLogin = async (req, res) => {
  try {
    const { email, name, googleId, picture, token } = req.body;
    
    // For debugging
    console.log("Google login attempt with:", { email, googleId });
    console.log("Using CLIENT_ID:", process.env.CLIENT_ID);
    
    if (!email || !googleId) {
      return res.status(400).json({ message: "Email and Google ID are required" });
    }

    // If token is provided, verify it with Google
    if (token) {
      try {
        // Get user info directly from Google to verify the token
        const googleUserInfo = await getGoogleUserInfo(token);
        
        // Verify that the email and ID match what was sent
        if (googleUserInfo.email !== email || googleUserInfo.id !== googleId) {
          return res.status(400).json({ message: "Invalid Google credentials" });
        }
      } catch (error) {
        console.error("Error verifying Google token:", error);
        return res.status(400).json({ message: "Failed to verify Google credentials" });
      }
    }
    
    // Check if user already exists
    let user = await User.findOne({ email });
    
    if (!user) {
      // Create new user if doesn't exist
      user = new User({
        name: name || email.split('@')[0],
        email,
        googleId,
        profilePicture: picture || '',
        // No password for Google users
      });
      
      await user.save();
    } else {
      // Update existing user with Google info if needed
      if (!user.googleId) {
        user.googleId = googleId;
        if (picture && !user.profilePicture) {
          user.profilePicture = picture;
        }
        await user.save();
      }
    }
    
    // Generate token using the existing utility function
    const authToken = generateToken(user._id, res);
    
    // Return user data (excluding password)
    const userWithoutPassword = {
      _id: user._id,
      name: user.name,
      email: user.email,
      profilePicture: user.profilePicture,
      createdAt: user.createdAt,
    };
    
    // Return in the same format as other auth functions
    return res.status(200).json({
      message: "Logged in with Google successfully", 
      user: userWithoutPassword, 
      token: authToken
    });
  } catch (error) {
    console.error("Error in Google login:", error);
    return res.status(500).json({ message: "Server error during Google login" });
  }
};