import { getApps, getApp, initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  getDocs,
  deleteDoc,
  query,
  where,
  initializeFirestore,
  writeBatch
} from "firebase/firestore";
import { 
  getAuth, signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  
} from 'firebase/auth';

import products from "../json/products.json";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APPID,
};

const app_length = getApps().length > 0;

// Initialize Firebase
const app = app_length ? getApp() : initializeApp(firebaseConfig);

// REFERENCE DB
const db = app_length ? getFirestore(app) : initializeFirestore(app, { experimentalForceLongPolling: true, });

// REFERENCE AUTH
const auth = getAuth(app);


// REFERENCE COLLECTION
const productsCollection = collection(db, "products");

export const feedProducts = async () => {
  // DELETE ALL EXISTING DOCS
  const querySnapshot = await getDocs(productsCollection);
  querySnapshot.forEach(async (product) => {
    await deleteDoc(doc(db, "products", product.id));
  });
  // ADD NEW DOCS
  products.forEach(async (product) => {
    const docRef = await doc(productsCollection);
    await setDoc(docRef, { ...product, id: docRef.id, category: product.category.toUpperCase() });
  });
};

export const getProductById = async ({ queryKey }) => {
  const [id] = queryKey;
  const docRef = await doc(db, "products", id);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};

export const getProductsByCategory = async (category) => {
  try {
    const productsRef = collection(db, "products");
    const categoryQuery = query(productsRef, where("category", "==", category));
    const querySnapshot = await getDocs(categoryQuery);

    const products = [];
    querySnapshot.forEach((doc) => {
      const product = doc.data();
      products.push(product);
    });

    return products;
  } catch (error) {
    console.error("Error getting products by category:", error);
    return [];
  }
};

export const getProducts = async () => {
   const querySnapshot = await getDocs(productsCollection);
   // Convert query to a json array.
   let result = [];
   querySnapshot.forEach(async (product) => {
      await result.push(product.data());
   });
   return result;
};
 
export const updateProductInFirestore = async (productId, updatedData) => {
  try {
    const productRef = doc(db, "products", productId);
    await updateDoc(productRef, updatedData);
    console.log("Product updated in Firestore successfully");
  } catch (error) {
    console.error("Error updating product in Firestore:", error);
  }
};


export const getUserInfo = async () => {
  const storedUser = localStorage.getItem("user");
  const user = auth?.currentUser || JSON.parse(storedUser) || null;

  if(user) {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    const userDoc = docSnap.data();
    console.log(user, 'getUserinfo');
    return {
      uid: user.uid,
      email: user.email,
      // name: user.name,
      ...userDoc,
    };    
  } else {
    return {}
  }
}

export const login = async ({ email, password }) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const user = res.user;
    localStorage.setItem("user", JSON.stringify(user));
  } catch (error) {
    console.error("登入失敗：", error.code, error.message);
    throw error;
  }
};


export const register = async ({ name, email, password }) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential?.user;

    if (!user?.uid) {
      console.error("註冊成功但 user.uid 為 undefined！");
      throw new Error("無法取得使用者 UID");
    }

    localStorage.setItem("user", JSON.stringify(user));

    const docRef = doc(db, "users", user.uid);

    // 防錯：name 為空時避免寫入
    if (!name || typeof name !== "string") {
      console.warn(" name 欄位為空或型別錯誤：", name);
    }

    await setDoc(docRef, { name });
  } catch (error) {
    console.error(" 註冊錯誤：", error);
    throw error; // 確保 react-query 能抓到錯誤
  }
};


export const updateUserInfo = async ({ name, adrs, tel, uid }) => {
  const docRef = doc(db, "users", uid);
  await updateDoc(docRef, {
    name,
    adrs,
    tel,
  });
  const user = auth.currentUser;
  localStorage.setItem("user", JSON.stringify(user));
}


export const logout = async () => {
  await auth.signOut();
  localStorage.removeItem("user");
}