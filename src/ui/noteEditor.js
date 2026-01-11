import { getState, subscribe } from "../app/store.js";

const noteEditor = document.getElementById("note-editor");
const noteTitle = document.getElementById("note-title");
const noteContent = document.getElementById("note-content");
const noSelectedNoteScreen = document.querySelector("[data-purpose='no-selected-note-screen']");

function renderNoteEditor() {
  const state = getState();
  const selectedNote = state.notes.find(note => note.id === state.selectedNoteId);
  if (!selectedNote) {
    noSelectedNoteScreen.classList.replace("hidden", "flex");
    return;
  }

  noSelectedNoteScreen.classList.replace("flex", "hidden");
  noteEditor.classList.replace("hidden", "flex");
  noteTitle.value = selectedNote.title;
  noteContent.value = selectedNote.content;
}

subscribe(renderNoteEditor);
renderNoteEditor();
