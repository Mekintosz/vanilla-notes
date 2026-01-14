import { selectNote } from "../app/noteActions.js";
import { getState, subscribe } from "../app/store.js";
import formatRelativeTime from "../utils/formatRelativeTime.js";

const notesContainer = document.getElementById("notes-list");
const noNotesMessage = document.createElement("p");
const containerClasses = "grid place-items-center h-full text-gray-500";

function renderNoteCards() {
  const state = getState();
  const { notes, selectedFolderId, selectedNoteId } = state;

  // Clear previous
  notesContainer.className = "";
  notesContainer.innerHTML = "";

  if (notes.length === 0) {
    notesContainer.className = containerClasses;
    notesContainer.appendChild(noNotesMessage);
    noNotesMessage.textContent = "No notes yet";
    return;
  }

  const visibleNotes = selectedFolderId
    ? notes.filter((note) => note.folderId === selectedFolderId)
    : notes;

  if (visibleNotes.length === 0) {
    notesContainer.className = containerClasses;
    notesContainer.appendChild(noNotesMessage);
    noNotesMessage.textContent = "No notes in this folder";
    return;
  }

  // Render notes
  visibleNotes
    .slice()
    .sort((a, b) => b.createdAt - a.createdAt)
    .forEach((note) => {
      const isSelected = note.id === selectedNoteId;
      notesContainer.appendChild(createNoteCardItem(note, isSelected));
    });
}

function createNoteCardItem(note, isSelected) {
  const noteCard = document.createElement("article");

  noteCard.className =
    "group relative cursor-pointer rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:border-gray-300";

  if (isSelected) {
    noteCard.classList.add(
      "border-(--color-teal-border)",
      "bg-(--color-teal-light)"
    );
  }

  // Top row
  const header = document.createElement("div");
  header.className = "mb-1 flex items-start justify-between";

  const title = document.createElement("h3");
  title.className = "truncate pr-2 text-sm font-semibold text-gray-900";
  title.textContent = note.title || "Untitled note";

  const time = document.createElement("span");
  time.className = "text-(--color-text-muted) shrink-0 text-xs";
  time.textContent = formatRelativeTime(note.updatedAt);

  header.append(title, time);

  // Preview text
  const preview = document.createElement("p");
  preview.className =
    "text-(--color-text-muted) mb-1 line-clamp-2 text-xs leading-relaxed";
  preview.textContent = note.content || "";

  // Menu icon
  const menu = document.createElement("div");
  menu.className = "absolute right-3 bottom-3 opacity-60 hover:opacity-100";

  const icon = document.createElement("i");
  icon.className = "fas fa-ellipsis-h text-gray-400";

  menu.append(icon);

  // Click handler
  noteCard.addEventListener("click", () => {
    selectNote(note.id);
  });

  noteCard.append(header, preview, menu);

  return noteCard;
}

subscribe(renderNoteCards);
renderNoteCards();
