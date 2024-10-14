import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    const handleClick = async (e) => {
        e.preventDefault();

        const data = axios.post('http://localhost:5000/api/auth/register', {
            username, password
        });

        console.log(data);

        navigate('/');


    };


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
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                style={{ padding: 10, marginBottom: 20, width: "500px" }}
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleClick} style={{ padding: 10, width: 100 }}>
                Register
            </button>
        </div>
    );
};

export default Register;