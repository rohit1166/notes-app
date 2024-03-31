import React, { useState } from "react";
import "./NewNote.css";
import axios from "axios";
import toast from "react-hot-toast";


const NewNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const addNote = async() => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/notes` , {
      title: title,
      category: category,
      content: content
    })

    toast.success(response.data.message);
    setTitle('')
    setContent('')
    setCategory('')
  };
  return (
    <div>
      <h1 className="heading">NewNote</h1>
      <form className="form">
        <input
          className="title"
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />

        <select
          className="category"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        >
          <option value="">Select Category</option>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="learning">Learning</option>
          <option value="other">Other</option>
        </select>

        <input
          placeholder="Content"
          className="content"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />

        <button type="button" onClick={addNote} className="save-btn">
          Save
        </button>
      </form>
    </div>
  );
};

export default NewNote;
