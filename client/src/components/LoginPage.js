import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

const LogIn = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        person: "",
        password: ""
    });
    const setErrorMessage = (msg) => {
        Swal.fire({
            titleText: msg,
            showConfirmButton: true,
            icon: "warning"
        })
    }
    useEffect(()=>{
        axios.get("https://photo-gallery-app-backend.onrender.com/users/info", { withCredentials: true }).then(response => {
            if (response.data.msg === "User Found") {
                navigate("/gallery")
            }
        })
    },[])
    const submitHandler = (e) => {
        e.preventDefault();
        if(data.person.length<=10){
            setErrorMessage("Please enter valid Email or Phone Number");
            return;
        }
        if(data.password.length<=5){
            setErrorMessage("Please enter valid password");
            return;
        }
        axios.post("https://photo-gallery-app-backend.onrender.com/users/login", data, { withCredentials: true }).then((res)=>{
            if(res.data.msg==="Logged In Successfully"){
                Swal.fire({
                    titleText: res.data.msg,
                    showConfirmButton: false,
                    icon: "success",
                    timer: 1000,
                    timerProgressBar: true
                }).then(()=>{
                    navigate("/gallery");
                })
            }else{
                Swal.fire({
                    titleText: res.data.msg,
                    showConfirmButton: true,
                    icon: "warning"
                })
            }
        })
    }
    return <section className="landing">
        <form method="POST" onSubmit={submitHandler}>
            <h1>Sign In</h1>
            <input required placeholder="Email or Phone" type="text" value={data.person} onChange={(e) => { setData({ ...data, person: e.target.value }) }} />
            <input required placeholder="Password" type="password" value={data.password} onChange={(e) => { setData({ ...data, password: e.target.value }) }} />
            <div id="buttons">
            <button type="submit">Sign In</button>
            <button onClick={() => {navigate("/register")}}>Register</button>
            </div>
        </form>
    </section>
}

export default LogIn;