import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import NoteCard from "../../components/NoteCard/NoteCard";

const Home = () => {
  const [notes, setNotes] = useState([]);

  const loadNotes = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/notes`);

    
    setNotes(response.data.data);
  };

  const nevigateToNew= ()=>{
    window.location.href='/new'
  }
  useEffect(() => {
    loadNotes();
  }, []);

  return (
    <div>
      <h1 className="app-header">All Notes</h1>
       <button className="add-note-btn"
        onClick={nevigateToNew}>Add Note</button>
      {notes.map((note, index) => {
        const { _id, title, content, category } = note;
        return (
          <NoteCard
            key={_id}
            title={title}
            content={content}
            category={category}
            loadNotes={loadNotes}
            _id={_id}
          />
        );
      })}
    </div>
  );
};

export default Home;
