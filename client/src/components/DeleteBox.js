import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";

const DeleteBox = ({deleteId, deleteHandler, refreshData}) => {
    const [password, setPassword] = useState("");
    const deletePhoto = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/photos/delete", { photoId: deleteId, password: password }, { withCredentials: true }).then(response => {
            Swal.fire({
                timer: 2000,
                timerProgressBar: true,
                icon: "info",
                titleText: response.data.msg,
                showConfirmButton: false
            }).then(() => { refreshData(); deleteHandler("") });
        })
    }
    return <section id="passwordBox">
        <form method="POST" onSubmit={deletePhoto}>
            <h2>Are you Sure?</h2>
            <p>Password</p>
            <input minLength="6" type="password" placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value) }} required />
            <div>
                <button onClick={()=>{deleteHandler("")}}>Cancel</button>
                <button type="submit">Delete</button>
            </div>
        </form>
    </section>
}

export default DeleteBox;