'use client'
import React, { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"


const Login = () => {

    const router = useRouter()
    const [data, setData] = useState({
        email: '',
        password: ''
    })


    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const response = await axios.post('/api/users/login', data)
            if(response.data.success === true){
                router.push("/task")
                console.log("Successfully Loged In")
                console.log(response)
            }else{
                console.log("Error")
            }
        }catch(error){
            console.log(error)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="email"
                id="email"
                placeholder="Enter Email"
                value={data.email}
                onChange={(e) => setData({...data, email: e.target.value})}
                />
                <input type="password"
                id="password"
                placeholder="Enter Password"
                value={data.password}
                onChange={(e) => setData({...data, password: e.target.value})}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Login