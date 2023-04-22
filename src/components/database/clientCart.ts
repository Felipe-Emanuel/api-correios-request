import db from "./config";
import {
  addDoc,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
  DocumentData,
} from "firebase/firestore";

export const addProductCart = async (product: DocumentData) => {
    try {
      const cartRef = collection(db, "carts");
      const querySnapshot = await getDocs(
        query(cartRef, where("id", "==", product.id))
      );
  
      if (querySnapshot.docs.length > 0) {
        const docRef = querySnapshot.docs[0].ref;
        await updateDoc(docRef, product);
      } else {
        const docRef = await addDoc(cartRef, product);
        console.log("Produto Adicionado com ID: ", docRef.id);
      }
    } catch (error) {
      console.error("Ocorreu um erro na adição ou atualização do produto", error);
    }
  };
  