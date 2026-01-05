# Vanilla Notes

A simple client-side **Knowledge Manager / Notes app** built with **vanilla JavaScript**, designed to demonstrate **advanced JS concepts, state management, and browser APIs** without any backend.

---

## Features (MVP)

* Create, rename, and delete folders
* Add, edit, and delete notes within folders
* Auto-save notes on input (debounced)
* Persistent storage using **IndexedDB**
* Selected folder and note restored on reload
* Sort notes by most recently updated
* Simple, responsive two-column layout (folders + notes/editor)

---

## Architecture

* **State Management:** Central store with pub/sub pattern for UI updates
* **Persistence:** IndexedDB for saving folders and notes
* **UI Rendering:** Modular components (`folderList.js`, `noteList.js`, `editor.js`)
* **Utilities:** Debounce, UUID generation, and modular helpers

**Folder structure:**

```
src/
 ├─ main.js          # App entry point
 ├─ app/             # Store, actions, selectors
 ├─ db/              # IndexedDB helpers
 ├─ ui/              # Rendering components
 └─ utils/           # Debounce, UUID, etc.
```

---

## Why Vanilla JS?

* Demonstrates understanding of **state management and unidirectional data flow** without frameworks
* Shows practical use of **IndexedDB** for persistence
* Modular architecture prepares for frameworks like React or TypeScript in the future
* Emphasizes clean, maintainable, and testable code

---

## Future Improvements (Stretch Goals)

* Undo / redo functionality
* Keyboard shortcuts
* Search notes across folders
* Light/Dark theme toggle
* Export / import notes as JSON

---

## License

MIT © Michał Łazicki
