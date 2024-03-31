import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from 'dotenv';
import Note from './models/Note.js'; 
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Database Connected");
  } catch (error) {
    console.error("Connection to database failed:", error);
  }
};
connectDB();

const PORT = process.env.PORT || 5000;

app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is healthy",
  });
});

app.post("/notes", async (req, res) => {
  const { title, content, category } = req.body;

  if (!title || !content || !category) {
    return res.status(400).json({
      success: false,
      message: "Title, content, and category are required",
      data: null
    });
  }

  try {
    const newNote = await Note.create({
      title,
      content,
      category
    });
    res.json({
      success: true,
      message: "Note added successfully!",
      data: newNote
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add note",
      error: error.message
    });
  }
});

app.get('/notes', async (req, res) => {
  try {
    const notes = await Note.find();
    res.json({
      success: true,
      message: "Notes fetched successfully",
      data: notes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch notes",
      error: error.message
    });
  }
});

app.get('/notes/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
        data: null
      });
    }
    res.json({
      success: true,
      message: "Note fetched successfully",
      data: note
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch note",
      error: error.message
    });
  }
});

app.put('/notes/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content, category } = req.body;

  try {
    const updatedNote = await Note.findByIdAndUpdate(id, {
      title,
      content,
      category
    }, { new: true });

    if (!updatedNote) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
        data: null
      });
    }

    res.json({
      success: true,
      message: "Note updated successfully",
      data: updatedNote
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update note",
      error: error.message
    });
  }
});

app.delete('/notes/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedNote = await Note.findByIdAndDelete(id);
    if (!deletedNote) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
        data: null
      });
    }
    res.json({
      success: true,
      message: "Note deleted successfully",
      data: null
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete note",
      error: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});