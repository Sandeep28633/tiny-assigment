import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {getUsersFromLocalStorage, saveUserstoLocalStorage} from "../utils";
const useAuth = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = () => {
        if(!email || !password){
            return setError("Email or password is invalid");
        }
        const users = getUsersFromLocalStorage();
        const user = users.find(user => user.email === email && user.password === password);
        if(user){
            localStorage.setItem("currentUser", JSON.stringify(user));
            navigate("/notes");
            setError("");
        }else{
            setError("Invalid email or password");
        }
    }

    const handleSignUp = () => {
        if(!email || !password){
            return setError("Email or password is invalid");
        }
        const users = getUsersFromLocalStorage();
        const user = users.find(user => user.email === email && user.password === password);
        if(user && user?.email){
            return setError("user already exists with same email");
        }

        const newUser = {email, password};
        users.push(newUser);
        saveUserstoLocalStorage(users);
        navigate("/");
        setError("");
    }

    const handleLogout = () => {
        localStorage.removeItem("currentUser");
        navigate("/");
    }

    return {
        email,
        setEmail,
        password,
        setPassword,
        handleLogin,
        handleSignUp,
        error,
        handleLogout
    }
}
export default useAuth;