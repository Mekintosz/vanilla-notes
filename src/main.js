import { setState } from "./app/store.js";
import { initDB, loadAll } from "./db/indexedDB.js";

await initDB();

const persisted = await loadAll();
if (persisted) {
  setState(() => persisted);
}
