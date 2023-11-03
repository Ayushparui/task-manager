'use client'
import React, { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import styles from "./styles.module.css"
import Link from "next/link"


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
                alert("Successfully Loged In")
            }else{
                console.log("Error")
                alert("Error")
            }
        }catch(error){
            console.log(error)
        }
    }

    return (
        <div className={styles.main}>
            <div className={styles.form}>
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <input type="email"
                className={styles.input}
                id="email"
                placeholder="Enter Email"
                value={data.email}
                onChange={(e) => setData({...data, email: e.target.value})}
                />
                <input type="password"
                id="password"
                className={styles.input}
                placeholder="Enter Password"
                value={data.password}
                onChange={(e) => setData({...data, password: e.target.value})}
                />
                <button type="submit"
                className={styles.submitBtn}
                >Submit</button>
            </form>
        <h4>Create Account? <Link href="/signup">
              <button className={styles.signUp}>Signup</button>
            </Link></h4>
        
        </div>
        </div>
    )
}

export default Login