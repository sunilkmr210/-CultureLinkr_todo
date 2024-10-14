import React from 'react';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';


const AddTask = ({user}) => {

    const [title, setTitle] = useState("");
    const [task, setTask] = useState("");
    const navigate = useNavigate();


    const handleClick = async (e) => {

        const res = await fetch(`http://localhost:5000/api/tasks/addTask/${user._id}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              'token': `bearer ${user.accesstoken}`
            },
            body: JSON.stringify({title, task, user})
    });

        e.preventDefault();
        setTitle("");
        setTask("");

    }

    const handleClick1 = ()=>{

        //sending user data through location is not safe
        //but due to time constraint not using context api or redux
        navigate('/tasks', { state: { user} });
    }

        return (
            <div
                style={{
                    flex: 4,
                    height: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <input
                    style={{ padding: 10, marginBottom: 20, width: "500px" }}
                    type="text"
                    placeholder="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    style={{ padding: 10, marginBottom: 20, width: "500px", height: "300px" }}
                    type="text"
                    value={task}
                    placeholder="Write your task here"
                    onChange={(e) => setTask(e.target.value)}
                />
                <button onClick={handleClick} style={{ padding: 10, width: 100 }}>
                    Add task
                </button>
                <button onClick={handleClick1} style={{ padding: 10, width: 100 }}>
                    View all tasks
                </button>
            </div>
        )
    };

    export default AddTask;
