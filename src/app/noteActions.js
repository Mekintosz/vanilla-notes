import { saveAll } from "../db/indexedDB.js";
import { uuid } from "../utils/uuid.js";
import { setState } from "./store.js";

export function addNote(folderId, title, content) {
  setState((state) => {
    const note = {
      id: uuid(),
      folderId,
      title,
      content,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    const next = {
      ...state,
      notes: [...state.notes, note],
      selectedNoteId: note.id,
    };
    saveAll(next);
    return next;
  });
}

export function updateNote(noteId, updatedNote) {
  setState((state) => {
    const notes = state.notes.map((note) =>
      note.id === noteId ? updatedNote : note
    );
    const next = {
      ...state,
      notes,
    };
    saveAll(next);
    return next;
  });
}

export function deleteNote(noteId) {
  setState((state) => {
    const notes = state.notes.filter((note) => note.id !== noteId);
    const next = {
      ...state,
      notes,
      selectedNoteId:
        state.selectedNoteId === noteId ? null : state.selectedNoteId,
    };
    saveAll(next);
    return next;
  });
}

export function selectNote(noteId) {
  setState((state) => {
    const next = {
      ...state,
      selectedNoteId: noteId,
    };
    saveAll(next);
    return next;
  });
}
