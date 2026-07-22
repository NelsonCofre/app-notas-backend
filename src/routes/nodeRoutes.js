import express from "express";
import Note from "../models/noteModel.js";

const router = express.Router();

// Obtener todas las notas
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find();

    res.status(200).json({ message: "Notas obtenidas exitosamente", notes });
  } catch (error) {
    console.error("Error al obtener las notas:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Obtener nota por id
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ error: "Nota no encontrada" });
    }
    res.status(200).json({ message: "Nota obtenida exitosamente", note });
  } catch (error) {
    console.error("Error al obtener nota por id:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Crear una nueva nota
router.post("/", async (req, res) => {
  try {
    const { title, description } = req.body;
    const note = new Note({ title, description });

    const savedNote = await note.save();

    if (savedNote) {
      res
        .status(201)
        .json({ message: "Nota creada exitosamente", note: savedNote });
    }
  } catch (error) {
    console.error("Error al crear una nota:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Eliminar una nota

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedNote = await Note.findByIdAndDelete(id);
    if (!deletedNote) {
      return res.status(404).json({ error: "Nota no encontrada" });
    }
    res
      .status(200)
      .json({ message: "Nota eliminada exitosamente", note: deletedNote });
  } catch (error) {
    console.error("Error al eliminar una nota:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Editar una nota
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, description },
      { new: true },
    );

    if (!updatedNote) {
      return res.status(404).json({ error: "Nota no encontrada" });
    }
    res
      .status(200)
      .json({ message: "Nota editada exitosamente", note: updatedNote });

    
  } catch (error) {
    console.error("Error al editar una nota:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
