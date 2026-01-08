import { saveAll } from "../db/indexedDB.js";
import { uuid } from "../utils/uuid.js";
import { setState } from "./store.js";

export function addFolder(name) {
  setState((state) => {
    const folder = {
      id: uuid(),
      name,
      createdAt: Date.now(),
    };

    const next = {
      ...state,
      folders: [...state.folders, folder],
      selectedFolderId: folder.id,
    };

    saveAll(next);
    return next;
  });
}

export function renameFolder(folderId, newName) {
  const name = newName.trim();
  if (!name) return;

  setState((state) => {
    const folders = state.folders.map((folder) =>
      folder.id === folderId ? { ...folder, name } : folder
    );

    const next = {
      ...state,
      folders,
    };

    saveAll(next);
    return next;
  });
}

export function deleteFolder(folderId) {
  setState((state) => {
    const folders = state.folders.filter((folder) => folder.id !== folderId);

    const notes = state.notes.filter((note) => note.folderId !== folderId);

    let selectedFolderId = state.selectedFolderId;
    let selectedNoteId = state.selectedNoteId;

    if (selectedFolderId === folderId) {
      selectedFolderId = null;
    }

    if (selectedNoteId && !notes.some((note) => note.id === selectedNoteId)) {
      selectedNoteId = null;
    }

    const next = {
      ...state,
      folders,
      notes,
      selectedFolderId,
      selectedNoteId,
    };

    saveAll(next);
    return next;
  });
}

export function selectFolder(folderId) {
  setState((state) => {
    const next = {
      ...state,
      selectedFolderId: folderId,
    };

    saveAll(next);
    return next;
  });
}
