import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddBlog = () => {
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { title, description }
        console.log(data);
        fetch('http://localhost:8000/blogs', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        alert("Blog has been added successfully");
        navigate('/');
    }
    return (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <label>Blog Title</label><br />
                <input type="text" name="title" value={title} placeholder="Enter Title" onChange={(e) => setTitle(e.target.value)} required/><br />
                <label>Blog Description</label><br />
                <textarea name="description" value={description} placeholder="Enter Blog Description" onChange={(e) => setDescription(e.target.value)} required></textarea><br />
                <button type="submit">Add Blog</button>
            </form>
            <br/>
        </div>
    );
}

export default AddBlog;