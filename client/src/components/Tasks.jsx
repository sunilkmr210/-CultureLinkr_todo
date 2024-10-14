import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const Tasks = () => {

    const location = useLocation();
    const { user } = location.state;
    const [tasks, setTasks] = useState([]);

    useEffect(() => {

        const fetchTask = async () => {
            const res = await fetch(`http://localhost:5000/api/tasks/fetchTasks`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'token': `bearer ${user.accesstoken}`
                },
            });

            const data = await res.json();
            console.log(data);
            setTasks(data);
        }

        fetchTask();

    }, [user]);

    const handleStatus = async (task) => {

        const newStatus = task.status==="complete"?"incomplete":"complete";

        try {

            const res = await fetch(`http://localhost:5000/api/tasks/updateTask/${task._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'token': `bearer ${user.accesstoken}`
                },
                body : JSON.stringify({status: newStatus})
            });

            setTasks((prevTasks) =>
                prevTasks.map((t) =>
                  t._id === task._id ? { ...t, status: newStatus } : t
                )
            );

        } catch (err) {
            console.log(err);
        }

    }

    const handleDelete = async (id) => {
        try {

            const res = await fetch(`http://localhost:5000/api/tasks/deleteTask/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'token': `bearer ${user.accesstoken}`
                },
            });

            setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div style={{
            flex: 4,
            height: "100vh",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
        }}>



            {!tasks.empty&&tasks.map((task) => (
                <div style={{ border: "1px solid black", padding: "4px", width: 200 }}>
                    <div style={{ fontSize: "25px", marginBottom: 5 }}>{task.title}</div>
                    <div>{task.description}</div>
                    <div style={{ cursor: "pointer" }} onClick={() => handleStatus(task)}>{task.status}</div>
                    <div style={{ cursor: "pointer", marginLeft: 150 }} onClick={() => handleDelete(task._id)}>Delete</div>
                </div>
            ))}


        </div>
    )
}

export default Tasks
