import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/dbConfig/db";
import bcryptjs from "bcryptjs";
import User from "@/models/userModel";
import jwt from "jsonwebtoken";
import config from "@/config/config";


connectToDatabase();


export async function POST(request) {
   

   try{
    const reqBody = await request.json()
    const {email, password} = reqBody;
    console.log(reqBody);

    const user = await User.findOne({email})
    if(!user){
        return NextResponse.json({error: "User does not exist"}, {status: 400})
    }
   
    const validPassword = await bcryptjs.compare(password, user.password)
        if(!validPassword){
            return NextResponse.json({error: "Invalid password"}, {status: 400})
        }
        console.log(user);

    const tokenData = {
        id: user._id,
        name: user.name,
        email: user.email
    }

    const token = await jwt.sign(tokenData, config.TOKEN_SECRET, {expiresIn: "1d"})

    const response = NextResponse.json({
        message: "Login successful",
        success: true,
    })
    response.cookies.set("token", token, {
        httpOnly: true, 
        
    })
    return response;

    } catch (error) {
        const response = NextResponse.json({ message: "Login failed", success: false });
        return response
    }

}