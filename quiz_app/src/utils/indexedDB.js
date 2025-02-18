export const openDB = () => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("QuizDB", 1);
  
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains("attempts")) {
          db.createObjectStore("attempts", { keyPath: "id", autoIncrement: true });
        }
      };
  
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject("IndexedDB error");
    });
  };
  
  export const saveAttempt = async (attempt) => {
    const db = await openDB();
    const transaction = db.transaction("attempts", "readwrite");
    const store = transaction.objectStore("attempts");
    store.add(attempt);
  };
  
  export const getAttempts = async () => {
    const db = await openDB();
    return new Promise((resolve) => {
      const transaction = db.transaction("attempts", "readonly");
      const store = transaction.objectStore("attempts");
      const request = store.getAll();
  
      request.onsuccess = () => resolve(request.result);
    });
  };
  