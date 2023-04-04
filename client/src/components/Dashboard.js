import Gallery from "./Gallery";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "",
        email: ""
    })
    const [photos, setPhotos] = useState([]);
    const refreshData = () => {
        axios.get("https://photo-gallery-app-backend.onrender.com/users/info", { withCredentials: true }).then(response => {
            if (response.data.msg === "User Found") {
                setUser({ name: response.data.name, email: response.data.email })
            } else {
                Swal.fire({
                    timer: 1000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                    icon: "info",
                    titleText: response.data.msg
                }).then(() => {
                    navigate("/");
                })
            }
        })
        axios.get("https://photo-gallery-app-backend.onrender.com/photos/view", { withCredentials: true }).then(response => {
            if (!response.data.msg) {
                setPhotos(response.data.result);
                console.log(response.data.result);
            }
        })
    }
    useEffect(() => { refreshData() }, []);
    return <>
    <Gallery fetchedPhotos={photos} refreshData={refreshData} user={user} />
    </>
}

export default Dashboard;