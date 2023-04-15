import firebase, { db } from "./config";

export const addDocument = (colection, data) => {
  const query = db.collection(colection);

  query.add({
    ...data,
    createAt: firebase.firestore.FieldValue.serverTimestamp(),
  });
};

