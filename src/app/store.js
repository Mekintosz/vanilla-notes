const listeners = new Set();

let state = {
  folders: [],
  notes: [],
  selectedFolderId: null,
  selectedNoteId: null,
};

export function getState() {
  return structuredClone(state);
}

export function setState(updater) {
  const nextState = updater(state);
  state = nextState;
  console.log("state updated", state);
  listeners.forEach((listener) => {
    listener();
  });
}

export function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
