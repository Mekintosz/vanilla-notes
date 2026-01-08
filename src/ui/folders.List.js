import { addFolder, deleteFolder, renameFolder, selectFolder } from "../app/actions.js";
import { getState, subscribe } from "../app/store.js";
import { uuid } from "../utils/uuid.js";

const folderContainer = document.getElementById("folder-list");
const newFolder = docuument.getElementById("new-folder-input");
const newFolderButton = document.getElementById("new-folder-button");

function renderFolders() {
  const state = getState();
  const folders = state.folders;
  const selectedFolderId = state.selectedFolderId;

  // Clear previouse
  folderContainer.innerHTML = "";

  if (folders.length === 0) {
    folderContainer.innerHTML = "<p>No folders yet</p>";
    return;
  }
  // Render folders
  folders.forEach((folder) => {
    const folderElement = document.createElement("div");
    folderElement.classList.add("folder");
    if (folder.id === selectedFolderId) folderElement.classList.add("selected");
    folderElement.textContent = folder.name;

    // Click to select
    folderElement.addEventListener("click", () => {
      selectFolder(folder.id);
    });

    // Right-click to rename
    folderElement.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      const newName = prompt("Rename folder:", folder.name);
      if (newName) {
        renameFolder(folder.id, newName);
      }
    });

    // Optional delete button inside folder element
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", (e) => {
      e.stopPropagation(); //prevent selection
      if (confirm(`Delete folder ${folder.name}?`)) {
        deleteFolder(folder.id);
      }
    });

    folderContainer.appendChild(folderElement);
  });
}

newFolderButton.addEventListener("click", () => {
  const name = newFolder.value.trim();
  if (!name) return;
  addFolder({ id: uuid(), name, createedAt: Date.now() });
  newFolder.value = "";
});

// Subscribe to store changes
subscribe(renderFolders);

// Initial render
renderFolders();
