'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css"


const Task = () => {

    const [data, setData] = useState({
        task: "",
        description: "",
        date: "",
        usId: "",
    });

    

    const router = useRouter();

    // logout
    const logout = async () => {
        try {
            const response = await axios.get("/api/users/logout");
            if (response) {
                router.push("/login");
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Create Task
    const createTask = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/tasks/add", data);
            if (response && response.data.success === true) {
                console.log("Task Created");
                setModal(false);
            }
            getTask();
        } catch (error) {
            console.log(error);
        }
    }

    // Get User
    useEffect(() => {
        userId();
    }, []);
    const userId = async () => {
        try {
            const response = await axios.get("/api/users/user");
            console.log(response.data.userId);
            setData({ ...data, usId: response.data.userId });
            // setInitialFilter("All"); // Set the initial filter to "All" after the user is loaded
            getTask();
        } catch (error) {
            console.log(error);
        }
    }

    // Get Task
    useEffect(() => {
        getTask();
    }, []);
    const getTask = async () => {
        try {
            const getTask = await axios.get("/api/tasks/list", userId);
            if (getTask && getTask.data.success === true) {
                setTaskList(getTask.data.getTask);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Update Task 
    const updateCompleted = async (index) => {
        try {
            const response = await axios.patch("/api/tasks/update", {
                _id: index,
                isCompleted: true,
            });

            if (response && response.data.success === true) {
                console.log("Task Updated");
                getTask();
            }
        } catch (error) {
            console.log(error);
        }
    }

   

    const [taskList, setTaskList] = useState([]);
    const [filterTask, setFilterTask] = useState([]); // Filtered tasks [All, Completed, Not Completed
    
    useEffect(() => {
        setFilterTask(taskList);
    }, [taskList]);

    console.log(filterTask)
    const handleFilter = (filter) => {

       
        if (filter === "All") {
            setFilterTask(taskList);
        }else if (filter === "Completed") {
            setFilterTask(taskList.filter((task) => task.isCompleted === true));

        }else if (filter === "Not Completed") {
            setFilterTask(taskList.filter((task) => task.isCompleted === false));
        }
    }

    // Filter Tasks
    
 
  
    
    

    useEffect(() => {
        userId();
        getTask(); // Fetch tasks when the component mounts
         // Set the initial filter to "All" after the tasks are loaded
         
      }, []);

    // Create Task Modal
    const [modal, setModal] = useState(false);
    const toggleModal = () => {
        setModal(!modal)
    }


    return (
        <div >
            {/* Task Creation Modal */}
            {modal && (
                <div className={styles.modal}>
                    <div onClick={toggleModal} className={styles.close}></div>
                    <div className={styles.modalContent}>
                        <form onSubmit={createTask} className={styles.input}>
                        
                            <input type="text"
                            className={styles.iOne}
                                placeholder="Enter Task"
                                id="task"
                                value={data.task}
                                onChange={(e) => setData({ ...data, task: e.target.value })}
                            />
                            <input type="text"
                            className={styles.iTwo}
                                placeholder="Enter Description"
                                id="description"
                                value={data.description}
                                onChange={(e) => setData({ ...data, description: e.target.value })}
                            />
                           <input
                            className={styles.iThree}
                            placeholder="Enter Due Date"
                                type="date"
                                id="date"
                                value={data.date}
                                onChange={(e) => setData({ ...data, date: e.target.value })}
                            />
                            <button type="submit" className={styles.submitBtn}>Submit</button>
                        </form>
                        <button className={styles.closeModal} onClick={toggleModal}>Close</button>
                    </div>
                </div>
            )}


            <div className={styles.mainContent}>
                <div className={styles.sidebar}>
                    <div className={styles.filterButtons}>
                        <button onClick={() => handleFilter("All")} className={styles.allbtnch}>All</button>
                        <button onClick={() => handleFilter("Completed")} className={styles.comp}>Completed</button>
                        <button onClick={() => handleFilter("Not Completed")} className={styles.inComp}>Not Completed</button>
                    </div>
                    <div className={styles.logoutBtn}>
                        <button onClick={logout} className={styles.btnLog}>Logout</button>
                    </div>
                </div>
                <div className={styles.taskContent}>
                    <div className={styles.header}>
                        <h1>Dashboard</h1>
                        <button onClick={toggleModal} className={styles.btnModal}>
                            +Create Task
                        </button>
                    </div>
                    <div className={styles.taskInsideContent}>
                        
                        {filterTask.map((task, index) => {
                            
                            const backgroundClass = task.isCompleted.toString() === "true" ? styles.completedBackground : styles.notCompletedBackground;
                            


                            return (
                                <div key={index} className={`${styles.box} ${backgroundClass}`}>
                                    <div className={styles.boxContent}>
                                        <h3 className={styles.tTitle}>{task.task}</h3>
                                        <p className={styles.tDescription}>Description:<br/>{task.description}</p>
                                        <p className={styles.tDate}>{new Date(task.date).toLocaleDateString()}</p>
                                        {task.isCompleted.toString() === "true" ? (

                                            <button onClick={() => updateCompleted(task._id)}
                                                className={styles.completed}
                                            >Completed</button>
                                        ): 
                                        <button onClick={() => updateCompleted(task._id)}
                                            className={styles.notCompleted}
                                        >Not Completed</button>
                                        }
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Task;