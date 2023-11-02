'use client'
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Task = () => {


    const router = useRouter()
    const logout = async () => {

        try {
            const response = await axios.get("/api/users/logout")
            if(response){
                router.push("/login")
            }
        } catch (error) {
            console.log(error)
        }
    
    }

    return (
        <div>
        <h1>Task ,Dashboard</h1>
        <button onClick={logout}>Logout</button>
        </div>
    );
}
export default Task;