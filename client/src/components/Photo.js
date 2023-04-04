import "../styles/photo.css";

const Photo = ({label, imageUrl, photoId, deleteHandler}) => {
    return <div className="photo" onClick={()=>{
        deleteHandler(photoId)
    }}>
    <img src={imageUrl} alt={label} />
    <p>{label}</p>
    </div>
}

export default Photo;