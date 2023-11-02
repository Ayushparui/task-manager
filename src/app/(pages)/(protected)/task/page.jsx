'use client'
import React, {useEffect, useState} from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css"




const Task = () => {

    const [data, setData] = useState({
        task: '',
        description: '',
        date: '',
        usId: ''
    })


    const [taskList, setTaskList] = useState([])



    const router = useRouter()

    // logout
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

    // Create Task
    const createTask = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post("/api/tasks/add", data)
            if(response && response.data.success === true){
                console.log("Task Created")
            }
            getTask()
        } catch (error) {
            console.log(error)
        }
    }

    // Get User
    useEffect(() => {
        userId()
    }, [])
    const userId = async () => {
        try {
            const response = await axios.get("/api/users/user")
            console.log(response.data.userId)
            setData({...data, usId: response.data.userId})
        } catch (error) {
            console.log(error)
        }
    }

    // Get Task

    useEffect(() => {
        getTask()
    }, [])
    const getTask = async () => {
        try {
            const getTask = await axios.get("/api/tasks/list", userId)
            if(getTask && getTask.data.success === true){
                // console.log(getTask.data.getTask)
                setTaskList(getTask.data.getTask)
            }
        } catch (error) {
            console.log(error)
        }
    }

    // Update Task Modal

    const updateCompleted = async (index) => {
        try {
            const response = await axios.patch("/api/tasks/update", {
                _id: index,
                isCompleted: true
            });
    
            if (response && response.data.success === true) {
                console.log("Task Updated");
            }
        } catch (error) {
            console.log(error);
        }
    }
    

    // Update Task List
    // const updateTaskList = async (e) => {
    //     e.preventDefault()
    //     try {
    //         const response = await axios.patch("/api/tasks/update", updateTaskData)
    //         if(response && response.data.success === true){
    //             console.log("Task Updated")
    //         }
    //         getTask()
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }


    return (
        <div>
        <h1>Task ,Dashboard</h1>
        <form onSubmit={createTask}>
            <input type="text"
            placeholder="Enter Task"
            id="task"
            value={data.task}
            onChange={(e) => setData({...data, task: e.target.value})}
            />
            <input type="text"
            placeholder="Enter Description"
            id="description"
            value={data.description}
            onChange={(e) => setData({...data, description: e.target.value})}
            />
            <input
            type="date"
            id="date"
            value={data.date}
            onChange={(e) => setData({...data, date: e.target.value})}
            />
            <button type="submit">Submit</button>
        </form>
        <button onClick={logout}>Logout</button>


        {/* Update Task */}
        {/* list Task */}
        <div>
            {taskList && taskList.map((task, index) => {
                return(
                    <div key={index} className={styles.box}>
                        <h3>{task._id}</h3>
                        <h3>{task.task}</h3>
                        <h3>{task.description}</h3>
                        <h3>{task.date}</h3>
                        <button onClick={() => updateCompleted(task._id)}>Update</button>
                    </div>
                )
            })}
        </div>

        {/* Update Task Modal */}
        
        
        {/* <button onClick={userId}>User Id</button> */}
        </div>
    );
}
export default Task;