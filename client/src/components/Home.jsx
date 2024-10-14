import { useState } from "react";
import axios from 'axios';
import AddTask from './AddTask';
import { useNavigate } from "react-router-dom";

const Home = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const navigate = useNavigate();


    const handleClick = async (e) => {
        e.preventDefault();
        const res = await axios.post('http://localhost:5000/api/auth/login', {
            username, password
        });
        
        setUser(res.data);
    };

    const handleClick1 = ()=>{
        navigate('/register');
    }

    return (
        <>
            {!user && <div
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
                <button onClick={handleClick} style={{ padding: 10, width: 100, marginBottom: 5 }}>
                    Login
                </button>
                <button onClick={handleClick1} style={{ padding: 10, width: 150 }}>
                    Don't have account then Register
                </button>
            </div>}
            {user && <>
                <AddTask user={user}/>
            </>}
        </>
    )
}

export default Home
