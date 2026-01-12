const DB_NAME = "notes-app";

const DB_VERSION = 1;

const STORE_NAME = "app";

let db;

export function initDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      db.createObjectStore(STORE_NAME);
    };

    request.onsuccess = () => {
      db = request.result;
      resolve();
    };

    request.onerror = () => reject(request.error);
  });
}

export function loadAll() {
  return new Promise((resolve) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const req = store.get("state");
    req.onsuccess = () => resolve(req.result || null);
  });
}

export function saveAll(state) {
  const tx = db.transaction(STORE_NAME, "readwrite");
  tx.objectStore(STORE_NAME).put(state, "state");
}
