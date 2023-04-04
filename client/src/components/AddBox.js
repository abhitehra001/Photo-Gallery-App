import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AddBox = ({setIsAdd, refreshData}) => {
    const [photo, setPhoto] = useState({
        label: "",
        imageUrl: ""
    })
    const addPhoto = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/photos/add", photo, { withCredentials: true }).then(response => {
            Swal.fire({
                timer: 1000,
                timerProgressBar: true,
                icon: "success",
                titleText: response.data.msg
            }).then(()=>{
                refreshData();
                setIsAdd(false);
            })
        })
    }
    return <section id="addBox">
    <form method="POST" onSubmit={addPhoto}>
            <h2>Add a new Photo</h2>
            <p>Label</p>
            <input minLength="6" type="text" placeholder="Label" value={photo.label} onChange={(e) => { setPhoto({ ...photo, label: e.target.value }) }} required />
            <p>Photo Url</p>
            <input minLength="6" type="url" placeholder="Photo Url" value={photo.imageUrl} onChange={(e) => { setPhoto({ ...photo, imageUrl: e.target.value }) }} required />
            <div>
                <button type="submit">Submit</button>
                <button onClick={()=>{setIsAdd(false)}}>Cancel</button>
            </div>
        </form>
    </section>
}

export default AddBox;