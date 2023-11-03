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

    const [taskList, setTaskList] = useState([]);

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
            setInitialFilter("All"); // Set the initial filter to "All" after the user is loaded
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

    // Filtering Task
    const [currentFilter, setCurrentFilter] = useState("All"); // "All", "Completed", or "Not Completed"
    const [filteredTasks, setFilteredTasks] = useState(taskList); // Initially, display all tasks
    const [initialFilter, setInitialFilter] = useState("All");

    const handleFilter = (filter) => {
        setCurrentFilter(filter);

        if (filter === "All") {
            setFilteredTasks(taskList);
        } else if (filter === "Completed") {
            const filtered = taskList.filter((task) => task.isCompleted === true);
            setFilteredTasks(filtered);
        } else if (filter === "Not Completed") {
            const filtered = taskList.filter((task) => task.isCompleted === false);
            setFilteredTasks(filtered);
        }
    };

    useEffect(() => {
        userId();
        getTask(); // Fetch tasks when the component mounts
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
                        <form onSubmit={createTask}>
                            <input type="text"
                                placeholder="Enter Task"
                                id="task"
                                value={data.task}
                                onChange={(e) => setData({ ...data, task: e.target.value })}
                            />
                            <input type="text"
                                placeholder="Enter Description"
                                id="description"
                                value={data.description}
                                onChange={(e) => setData({ ...data, description: e.target.value })}
                            />
                            <input
                                type="date"
                                id="date"
                                value={data.date}
                                onChange={(e) => setData({ ...data, date: e.target.value })}
                            />
                            <button type="submit">Submit</button>
                        </form>
                        <button className={styles.closeModal} onClick={toggleModal}>Close</button>
                    </div>
                </div>
            )}


            <div className={styles.mainContent}>
                <div className={styles.sidebar}>
                    <div className={styles.filterButtons}>
                        <button onClick={() => handleFilter("All")}>All</button>
                        <button onClick={() => handleFilter("Completed")}>Completed</button>
                        <button onClick={() => handleFilter("Not Completed")}>Not Completed</button>
                    </div>
                    <div className={styles.logoutBtn}>
                        <button onClick={logout}>Logout</button>
                    </div>
                </div>
                <div className={styles.taskContent}>
                    <div className={styles.header}>
                        <h1>Task ,Dashboard</h1>
                        <button onClick={toggleModal} className={styles.btnModal}>
                            +Create
                        </button>
                    </div>
                    <div className={styles.taskInsideContent}>
                        {filteredTasks.map((task, index) => {
                            return (
                                <div key={index} className={styles.box}>
                                    <div className={styles.boxContent}>
                                        <h3>{task._id}</h3>
                                        <h3>{task.task}</h3>
                                        <h3>{task.description}</h3>
                                        <h3>{task.date}</h3>
                                        <h3>{task.isCompleted.toString()}</h3>
                                        <button onClick={() => updateCompleted(task._id)}>Update</button>
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