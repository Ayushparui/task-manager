import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import config from "@/config/config";

export const getDataFromToken = (request) => {

    try{
    const token = request.cookies.get("token")?.value || ""
    const decodeToken = jwt.verify(token, config.TOKEN_SECRET)
    return decodeToken.id
    } catch (error) {
        throw new Error(error.message)
    }

}