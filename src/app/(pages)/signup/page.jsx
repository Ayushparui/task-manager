'use client'
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {useRouter} from "next/navigation";
import axios from "axios";

const Signup = () => {

    const [data, setData] = useState({
        name: '',
        email: '',
        password: ''
    })

    const router = useRouter()


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post("/api/users/signup", data)
            if(response && response.data.success === true){
                router.push("/login")
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
       <>
        <form onSubmit={handleSubmit}>
            <input type="text"
            placeholder="Enter Name"
            id="name"
            value={data.name}
            onChange={(e) => setData({...data, name: e.target.value})}
            />
            <input type="email"
            placeholder="Enter Email"
            id="email"
            value={data.email}
            onChange={(e) => setData({...data, email: e.target.value})}
            />
            <input type="password"
            placeholder="Enter Password"
            id="password"
            value={data.password}
            onChange={(e) => setData({...data, password: e.target.value})}
            />
            <button type="submit">Submit</button>
        </form>
       </>
            
    )
}

export default Signup