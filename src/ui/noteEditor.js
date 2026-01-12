import { addNote, deleteNote, updateNote } from "../app/noteActions.js";
import { getState, setState, subscribe } from "../app/store.js";

const noteEditor = document.getElementById("note-editor");
const noteTitle = document.getElementById("note-title");
const noteContent = document.getElementById("note-content");
const noSelectedNoteScreen = document.querySelector(
  "[data-purpose='no-selected-note-screen']"
);
const newNoteButton = document.getElementById("new-note-button");
const createNoteButton = document.getElementById("create-note-button");
const noteSaveButton = document.getElementById("note-save-button");
const noteDeleteButton = document.getElementById("note-delete-button");

function renderNoteEditor() {
  const state = getState();
  const selectedNote = state.notes.find(
    (note) => note.id === state.selectedNoteId
  );
  const hasNote = !!selectedNote;
  noSelectedNoteScreen.classList.toggle("hidden", hasNote);
  noteEditor.classList.toggle("hidden", !hasNote);
  if (!hasNote) return;
  noteTitle.value = selectedNote.title || "";
  noteContent.value = selectedNote.content || "";
}

function handleNoteSave() {
  const state = getState();
  const selectedNote = state.notes.find(
    (note) => note.id === state.selectedNoteId
  );
  if (!selectedNote) return;
  updateNote(selectedNote.id, {
    ...selectedNote,
    updatedAt: Date.now(),
  });
}

function handleNewNoteClick() {
  const state = getState();
  const selectedFolder = state.folders.find(
    (folder) => folder.id === state.selectedFolderId
  );
  if (!selectedFolder) {
    alert("Please select a folder first");
    return;
  }
  addNote(selectedFolder.id, "", "");
}

function handleNoteDeleteClick() {
  const state = getState();
  const selectedNote = state.notes.find(
    (note) => note.id === state.selectedNoteId
  );
  if (!selectedNote) return;
  if (confirm(`Delete note ${selectedNote.title}?`)) {
    deleteNote(selectedNote.id);
  }
}
/* 
function handleNoteTitleInput() {
  const state = getState();
  const selectedNote = state.notes.find(
    (note) => note.id === state.selectedNoteId
  );
  if (!selectedNote) return;
  updateNote(selectedNote.id, {
    ...selectedNote,
    title: noteTitle.value,
    updatedAt: Date.now(),
  });
}

function handleNoteContentInput() {
  const state = getState();
  const selectedNote = state.notes.find(
    (note) => note.id === state.selectedNoteId
  );
  if (!selectedNote) return;
  updateNote(selectedNote.id, {
    ...selectedNote,
    content: noteContent.value,
    updatedAt: Date.now(),
  });
}
*/

noteSaveButton.addEventListener("click", handleNoteSave);
newNoteButton.addEventListener("click", handleNewNoteClick);
createNoteButton.addEventListener("click", handleNewNoteClick);
noteDeleteButton.addEventListener("click", handleNoteDeleteClick);
//noteTitle.addEventListener("input", handleNoteTitleInput);
//noteContent.addEventListener("input", handleNoteContentInput);

subscribe(renderNoteEditor);
renderNoteEditor();
