import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    });
    const navigate = useNavigate();
    const setErrorMessage = (msg) => {
        Swal.fire({
            titleText: msg,
            showConfirmButton: true,
            icon: "warning"
        })
    }
    const submitHandler = (e) => {
        e.preventDefault();
        if(!/^[a-zA-Z ]*$/.test(data.name)){
            setErrorMessage("Please Enter Valid Name");
            return;
        }
        if(data.email.length<=10 || !data.email.includes("@")){
            setErrorMessage("Please Enter Valid Email");
            return;
        }
        if(!/^[0-9]*$/.test(data.phone) || data.phone.length!==10 ){
            setErrorMessage("Please Enter Valid Phone Number");
            return;
        }
        if(data.password!==data.confirmPassword){
            setErrorMessage("Please Enter Same Password");
            return;
        }
        if(data.password.length<=5){
            setErrorMessage("Pasword should be atleast 6 Characters long");
            return;
        }
        axios.post("http://localhost:8000/users/register", data).then((res)=>{
            if(res.data.msg==="Registered Successfully"){
                Swal.fire({
                    titleText: res.data.msg,
                    showConfirmButton: false,
                    icon: "success",
                    timer: 1000,
                    timerProgressBar: true
                }).then(()=>{
                    navigate("/");
                })
            }else if(res.data.msg.includes("not registered")){
                Swal.fire({
                    titleText: res.data.msg,
                    timer: 2000,
                    timerProgressBar: true
                }).then(() => {
                    navigate("/register");
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
            <h1>Register</h1>
            <input required placeholder="Name" type="text" value={data.name} onChange={(e) => { setData({ ...data, name: e.target.value }) }} />
            <input required placeholder="Email" type="text" value={data.email} onChange={(e) => { setData({ ...data, email: e.target.value }) }} />
            <input required placeholder="Phone" type="text" value={data.phone} onChange={(e) => { setData({ ...data, phone: e.target.value }) }} />
            <input required placeholder="Password" type="password" value={data.password} onChange={(e) => { setData({ ...data, password: e.target.value }) }} />
            <input required placeholder="Confirm Password" type="password" value={data.confirmPassword} onChange={(e) => { setData({ ...data, confirmPassword: e.target.value }) }} />
            <div id="buttons">
            <button type="submit">Register</button>
            <button onClick={() => {navigate("/")}}>Sign In</button>
            </div>
        </form>
    </section>
}

export default Register;