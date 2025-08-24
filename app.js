// Importações Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, doc, getDoc, setDoc, updateDoc, query, orderBy } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Configuração Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDhd1ed6a-LnKICrpSmfVKB604r6aUcuOw",
  authDomain: "torneio-de-vendas.firebaseapp.com",
  projectId: "torneio-de-vendas",
  storageBucket: "torneio-de-vendas.appspot.com",
  messagingSenderId: "331253267330",
  appId: "1:331253267330:web:23b608ec07e35eccf9ed9b",
  measurementId: "G-DM37WVS841"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Exibir ranking para todos os usuários
async function carregarRanking() {
  const rankingContainer = document.getElementById('rankingContainer');
  if (!rankingContainer) return;

  const rankingRef = collection(db, "usuarios");
  const q = query(rankingRef, orderBy("pontuacao", "desc"));

  const querySnapshot = await getDocs(q);
  let html = `
    <h2 class="text-2xl font-bold mb-4">Ranking de Vendas</h2>
    <div class="grid grid-cols-1 gap-4">
  `;

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    html += `
      <div class="bg-white shadow rounded-lg p-4">
        <p class="font-bold text-lg">${data.nome || "Sem nome"} (${data.pontuacao || 0} pts)</p>
        <p>Ótica: ${data.otica || "-"}</p>
        <p>Cidade: ${data.cidade || "-"}</p>
        <p>Vendas: ${data.vendas || 0}</p>
      </div>
    `;
  });

  html += `</div>`;
  rankingContainer.innerHTML = html;
}

window.addEventListener("load", () => {
  carregarRanking(); // Carrega sempre que abrir
});
