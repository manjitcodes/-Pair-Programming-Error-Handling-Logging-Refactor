import express from 'express';

import { NotFoundError, BadRequestError } from './errors/api-error.js';
import { requestLogger } from './middleware/request-logger.js';
import { errorHandler } from './middleware/error-handler.js';

const app = express();
const PORT = 3000;

app.use(express.json());

// Request logging middleware
app.use(requestLogger);

// In-memory notes data
let notes = [
  {
    id: 1,
    text: 'Learn Express',
    completed: false,
  },
];

// GET all notes
app.get('/notes', (req, res) => {
  res.json(notes);
});

// GET one note
app.get('/notes/:id', (req, res, next) => {
  const id = Number(req.params.id);

  const note = notes.find((note) => note.id === id);

  if (!note) {
    return next(new NotFoundError('Note not found'));
  }

  res.json(note);
});

// POST create note
app.post('/notes', (req, res, next) => {
  const { text, completed = false } = req.body;

  if (!text) {
    return next(new BadRequestError('Text is required'));
  }

  const note = {
    id: notes.length + 1,
    text,
    completed,
  };

  notes.push(note);

  res.status(201).json(note);
});

// PUT update note
app.put('/notes/:id', (req, res, next) => {
  const id = Number(req.params.id);

  const note = notes.find((note) => note.id === id);

  if (!note) {
    return next(new NotFoundError('Note not found'));
  }

  note.text = req.body.text;
  note.completed = req.body.completed;

  res.json(note);
});

// DELETE note
app.delete('/notes/:id', (req, res, next) => {
  const id = Number(req.params.id);

  const index = notes.findIndex((note) => note.id === id);

  if (index === -1) {
    return next(new NotFoundError('Note not found'));
  }

  const deletedNote = notes.splice(index, 1)[0];

  res.json(deletedNote);
});

// Handle unknown routes
app.use((req, res, next) => {
  next(new NotFoundError('Route not found'));
});

// Centralized error handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});