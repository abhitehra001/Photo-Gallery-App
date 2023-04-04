import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Photo from "./Photo";
import { FaUser } from "react-icons/fa"
import "../styles/gallery.css";
import DeleteBox from "./DeleteBox";
import AddBox from "./AddBox";

const Gallery = ({fetchedPhotos, refreshData, user}) => {
    const navigate = useNavigate();
    const deleteHandler = (photoId) => {
        setDeleteId(photoId);
    }
    const [search, setSearch] = useState("");
    const [isAdd, setIsAdd] = useState(false);

    const filterPhotos = () => {
        console.log(fetchedPhotos);
        const filteredPhotos = [];
        if(fetchedPhotos.length===0){
            return [];
        }
        for(let i of fetchedPhotos){
            if(i.label.toLowerCase().includes(search.toLowerCase())){
                filteredPhotos.push(i);
            }
        }
        return filteredPhotos;
    }
    useEffect(()=>{setPhotos(filterPhotos)}, [fetchedPhotos])
    const [photos, setPhotos] = useState(filterPhotos);
    useEffect(()=>{setPhotos(filterPhotos())}, [search])

    const [deleteId, setDeleteId] = useState("");

    return <section id="gallery">
        <header>
            <FaUser size={"60px"} color="black" />
            <div>
                <h4>{user.name}</h4>
                <p>{user.email}</p>
            </div>
            <input type="text" placeholder="Search by Name" value={search} onChange={(e)=>{
                setSearch(e.target.value)
            }} />
            <button onClick={()=>{setIsAdd(true)}}>Add Photo</button>
            <button onClick={()=>{
                axios.get("http://localhost:8000/users/logout", { withCredentials: true }).then(response=>{
                    navigate("/");
                })
            }}>Log Out</button>
        </header>
        <section id="photosContainer">
            {photos.map((photo, index) => {
                return <Photo key={index} imageUrl={photo.imageUrl} label={photo.label} photoId={photo._id} deleteHandler={deleteHandler} />
            })}
        </section>
        { deleteId ?
        <DeleteBox deleteId={deleteId} deleteHandler={deleteHandler} refreshData={refreshData} /> : <></>
        }
        {
            isAdd ?
            <AddBox setIsAdd={setIsAdd} refreshData={refreshData} /> : <></>
        }
    </section>
}

export default Gallery;