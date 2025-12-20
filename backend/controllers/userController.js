import User from "../models/User.js";
import bcrypt from "bcryptjs";


export const register = async(req,res)=>{
 try {
    const {fullName, username, password,confirmPassword,gender,profilePhoto} =req.body;
    if(!fullName || !username || !password || !confirmPassword ||!gender){
        return res.status(400).json({message:"All fiels Are requried"})
    }


     if(password !== confirmPassword){
        return res.status(400).json({message:"Password and Confirm Password do not match"})
     }


     const user = await User.findOne({username});
     if(user){
        return res.status(400).json({message:"username already exists"})
     }
     const hashedPassword = await bcrypt.hash(password,10);
     
const boyProfilePicture = `https://avatar.iran.liara.run/public/boy?username:${username}`
const girlProfilePicture = `https://avatar.iran.liara.run/public/girly?username:${username}`

     
     await User.create({
        fullName,
        username,
       password:hashedPassword,
        profilePhoto:gender===male ? boyProfilePicture : girlProfilePicture,
        gender,
     });
 } catch (error) {
    console.log(error);
    
 }
}