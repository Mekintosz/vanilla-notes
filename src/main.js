import { setState } from "./app/store.js";
import { initDB, loadAll } from "./db/indexedDB.js";
import "./app/folderActions.js";
import "./app/store.js";
import "./ui/foldersList.js";

await initDB();

const persisted = await loadAll();
if (persisted) {
  setState(() => persisted);
}
