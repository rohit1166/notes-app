import React from "react";
import "./NoteCard.css";
import DeleteIcon from "./delete-icon.png";
import axios from "axios";
import toast from "react-hot-toast";
import updateIcon from "./pen.png";
import { Link } from "react-router-dom";

const NoteCard = ({ _id, title, content, category, loadNotes }) => {
  const deleteNote = async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/notes/${_id}`
      );
      toast.success(response.data.message);
      loadNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div className="note-card">
      
      <h2 className="note-card-title">{title}</h2>
      <p className="note-card-content">{content}</p>
      <span className="note-card-category">{category}</span>
      <Link to={`./update/${_id}`} >
      <img src={updateIcon} alt="" className="update-icon" />
      </Link>
      <img
        src={DeleteIcon}
        alt="delete-icon"
        onClick={deleteNote}
        className="delete-icon"
      />
    </div>
  );
};

export default NoteCard;
