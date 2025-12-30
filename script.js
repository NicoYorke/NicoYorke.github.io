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

// Initialiser Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ------------------------
// 3️⃣ Référence au document compteur
// ------------------------
const counterRef = doc(db, "global", "counter");

// ------------------------
// 4️⃣ Sélection des éléments
// ------------------------
const btn = document.getElementById("btn");
const countEl = document.getElementById("count");

// ------------------------
// 5️⃣ Initialiser le compteur si document n'existe pas
// ------------------------
async function initCounter() {
  const snap = await getDoc(counterRef);
  if (!snap.exists()) {
    await setDoc(counterRef, { value: 0 });
  }
}

// ------------------------
// 6️⃣ Mettre à jour le compteur en temps réel
// ------------------------
onSnapshot(counterRef, (docSnap) => {
  if (docSnap.exists()) {
    const value = docSnap.data().value;
    countEl.textContent = `Le Ratio Score : ${value}`;
  }
});

// ------------------------
// 7️⃣ Gestion du clic
// ------------------------
btn.addEventListener("click", async () => {
  const snap = await getDoc(counterRef);
  const value = snap.data().value + 1;
  await updateDoc(counterRef, { value });
});

// ------------------------
// 8️⃣ Lancer l'initialisation
// ------------------------
initCounter();
