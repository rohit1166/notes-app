import React, { useEffect, useState } from "react";
import "./UpdateNote.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const UpdateNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const { id } = useParams();

  const loadNote = async (id) => {
    if (!id) return;

    const response = await axios.get(`${process.env.REACT_APP_API_URL}/notes/${id}`);

    setTitle(response.data.data.title);
    setCategory(response.data.data.category);
    setContent(response.data.data.content);
  };

  const updateNote = async()=>{
    const response = await axios.put(`${process.env.REACT_APP_API_URL}/notes/${id}`, {
      title: title,
      category: category,
      content: content
    })

    toast.success(response.data.message)

    window.location.href='/'
  }

  useEffect(() => {
    loadNote(id);
  }, [id]);

  return (
    <div>
      <h1 className="heading">Update Note</h1>

      <form className="form">
        <input type="text" value={id} disabled className="id" />
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

        <button type="button" onClick={updateNote} className="save-btn">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateNote;
