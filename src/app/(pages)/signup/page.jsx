'use client'
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import styles from "./styles.module.css"

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
            if (response && response.data.success === true) {
                alert("Successfully Created Account")
                router.push("/login")
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className={styles.main}>
                <div className={styles.form}>
                    <form onSubmit={handleSubmit}>
                        <h1>Create An Account</h1>
                        <input type="text"
                            placeholder="Enter Name"
                            className={styles.input}
                            id="name"
                            value={data.name}
                            onChange={(e) => setData({ ...data, name: e.target.value })}
                        />
                        <input type="email"
                            placeholder="Enter Email"
                            className={styles.input}
                            id="email"
                            value={data.email}
                            onChange={(e) => setData({ ...data, email: e.target.value })}
                        />
                        <input type="password"
                            placeholder="Enter Password"
                            className={styles.input}
                            id="password"
                            value={data.password}
                            onChange={(e) => setData({ ...data, password: e.target.value })}
                        />
                        <button type="submit" className={styles.submitBtn}>Submit</button>
                    </form>
                    <h4>Already have an Account ?
                    <Link href="/login">
              <button className={styles.login}>Login</button>
            </Link>
                    </h4>
                </div>
            </div>
        </>
    )
}

export default Signup