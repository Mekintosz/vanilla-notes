import {
  addFolder,
  deleteFolder,
  renameFolder,
  selectFolder,
} from "../app/folderActions.js";
import { getState, subscribe } from "../app/store.js";

const folderContainer = document.getElementById("folder-list");
const newFolder = document.getElementById("new-folder-input");
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
    const isSelected = folder.id === selectedFolderId;

    folderContainer.appendChild(createFolderItem(folder, isSelected));
  });
}

function createFolderItem({ id, name }, isSelected) {
  const folderElement = document.createElement("button");

  folderElement.type = "button";
  folderElement.className =
    "flex w-full items-center w-full gap-2 rounded-lg p-2 text-sm text-gray-700 shadow-sm transition-colors hover:bg-gray-100";

  if (isSelected) {
    folderElement.classList.add("border", "border-gray-100", "bg-white");
  }

  // Icon
  const icon = document.createElement("i");
  icon.className = "fas fa-folder text-(--color-teal-primary)";

  // Text
  const text = document.createTextNode(name);

  // Delete button
  const deleteButton = document.createElement("button");
  deleteButton.className =
    "ml-auto hover:bg-(--color-teal-light) text-(--color-text-muted) hover:text-(--color-teal-primary) transition-colors";
  const deleteIcon = document.createElement("i");
  deleteIcon.className = "far fa-trash-alt text-sm";

  deleteButton.append(deleteIcon);
  deleteButton.addEventListener("click", (e) => {
    e.stopPropagation(); //prevent selection
    if (confirm(`Delete folder ${name}?`)) {
      deleteFolder(id);
    }
  });

  folderElement.append(icon, text, deleteButton);

  // Click to select
  folderElement.addEventListener("click", () => {
    selectFolder(id);
  });

  // Right-click to rename
  folderElement.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    const newName = prompt("Rename folder:", name);
    if (newName) {
      renameFolder(id, newName);
    }
  });

  return folderElement;
}

newFolderButton.addEventListener("click", () => {
  const name = newFolder.value.trim();
  if (!name) return;
  addFolder(name);
  newFolder.value = "";
});

// Subscribe to store changes
subscribe(renderFolders);

// Initial render
renderFolders();
