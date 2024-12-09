// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  DocumentData,
  QueryConstraint,
  getFirestore,
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvGekNa-KWgizJfTK_lYa2_lJbL7uOF1w",
  authDomain: "maldplaces.firebaseapp.com",
  projectId: "maldplaces",
  storageBucket: "maldplaces.firebasestorage.app",
  messagingSenderId: "132185538104",
  appId: "1:132185538104:web:1499bc83e3b171f36570cd",
  measurementId: "G-0Y42B99651",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
//const analytics = getAnalytics(app);

//API codes
//GET
export const getDocumentById = async <T = DocumentData>(
  collectionName: string,
  documentId: string,
): Promise<T | null> => {
  try {
    const docRef = doc(db, collectionName, documentId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as T;
    }
    return null;
  } catch (error) {
    console.error("Error fetching document:", error);
    throw error;
  }
};

export const getDocumentsByCriteria = async <T = DocumentData>(
  collectionName: string,
  criteria: Record<string, unknown>,
): Promise<T[]> => {
  try {
    // Convert criteria to Firebase query constraints
    const queryConstraints: QueryConstraint[] = Object.entries(criteria).map(
      ([field, value]) => where(field, "==", value),
    );

    const q = query(collection(db, collectionName), ...queryConstraints);
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as T,
    );
  } catch (error) {
    console.error("Error fetching documents:", error);
    throw error;
  }
};

// Example usages:

// // Get document by ID
// const user = await getDocumentById('users', 'user123');

// // Get documents by simple criteria
// const activeUsers = await getDocumentsByCriteria('users', {
//   status: 'active',
//   age: 30
// });

//POST
export const addSingleDocument = async (
  collectionName: string,
  documentData: Record<string, any>,
): Promise<string> => {
  try {
    const collectionRef = collection(db, collectionName);
    const docRef = await addDoc(collectionRef, documentData);
    console.log(`Document written with ID: ${docRef.id}`);
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};

export const addMultipleDocuments = async (
  collectionName: string,
  documentsArray: Record<string, any>[],
): Promise<string[]> => {
  try {
    const docRefs = await Promise.all(
      documentsArray.map(async (documentData) => {
        const collectionRef = collection(db, collectionName);
        const docRef = await addDoc(collectionRef, documentData);
        return docRef.id;
      }),
    );

    console.log(`Added ${docRefs.length} documents`);
    return docRefs;
  } catch (error) {
    console.error("Error adding multiple documents: ", error);
    throw error;
  }
};

// Example usage:
// Single document
// await addSingleDocument('users', { name: 'John Doe', age: 30 });

// Multiple documents
// await addMultipleDocuments('users', [
//   { name: 'John Doe', age: 30 },
//   { name: 'Jane Smith', age: 25 }
// ]);
