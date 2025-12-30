import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, getDoc, updateDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔴 REMPLACE par ta config Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC7JSg1-9mr_IKi-eoywwFC7E4gmqpKS2E",
  authDomain: "ratio-pierre.firebaseapp.com",
  projectId: "ratio-pierre",
  storageBucket: "ratio-pierre.firebasestorage.app",
  messagingSenderId: "844308564658",
  appId: "1:844308564658:web:0c01d46c51a500230f57ab"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const counterRef = doc(db, "global", "counter");

const countEl = document.getElementById("count");
const btn = document.getElementById("btn");

// Charger la valeur
async function loadCounter() {
  const snap = await getDoc(counterRef);
  if (snap.exists()) {
    countEl.textContent = snap.data().value;
  } else {
    await setDoc(counterRef, { value: 0 });
    countEl.textContent = 0;
  }
}

// Incrémenter
btn.addEventListener("click", async () => {
  const snap = await getDoc(counterRef);
  const value = snap.data().value + 1;
  await updateDoc(counterRef, { value });
  countEl.textContent = value;
});

loadCounter();
