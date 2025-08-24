
// Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDhd1ed6a-LnKICrpSmfVKB604r6aUcuOw",
  authDomain: "torneio-de-vendas.firebaseapp.com",
  projectId: "torneio-de-vendas",
  storageBucket: "torneio-de-vendas.firebasestorage.app",
  messagingSenderId: "331253267330",
  appId: "1:331253267330:web:23b608ec07e35eccf9ed9b",
  measurementId: "G-DM37WVS841"
};

// Inicialização
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Função de login
window.login = function () {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      document.getElementById("loginScreen").classList.add("hidden");
      document.getElementById("mainSystem").classList.remove("hidden");
    })
    .catch((error) => {
      alert("Erro no login: " + error.message);
    });
};

// Função de cadastro
window.register = function () {
  const name = document.getElementById('regName').value;
  const email = document.getElementById('regEmail').value;
  const phone = document.getElementById('regPhone').value;
  const optica = document.getElementById('regOptica').value;
  const city = document.getElementById('regCity').value;
  const hoyaCode = document.getElementById('regHoyaCode').value;
  const role = document.getElementById('regFunction').value;
  const password = document.getElementById('regPassword').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const uid = userCredential.user.uid;
      return setDoc(doc(db, "users", uid), {
        name,
        email,
        phone,
        optica,
        city,
        hoyaCode,
        role,
        createdAt: new Date()
      });
    })
    .then(() => {
      alert("Usuário cadastrado com sucesso!");
      showLogin();
    })
    .catch((error) => {
      alert("Erro no cadastro: " + error.message);
    });
};

// Função de resetar senha
window.resetPassword = function () {
  const email = document.getElementById('forgotEmail').value;

  sendPasswordResetEmail(auth, email)
    .then(() => {
      alert("Email de recuperação enviado com sucesso.");
    })
    .catch((error) => {
      alert("Erro ao enviar email: " + error.message);
    });
};

// Alternar telas
window.showRegister = function () {
  document.getElementById('loginForm').classList.add('hidden');
  document.getElementById('registerForm').classList.remove('hidden');
  document.getElementById('forgotForm').classList.add('hidden');
};
window.showLogin = function () {
  document.getElementById('loginForm').classList.remove('hidden');
  document.getElementById('registerForm').classList.add('hidden');
  document.getElementById('forgotForm').classList.add('hidden');
};
window.showForgotPassword = function () {
  document.getElementById('loginForm').classList.add('hidden');
  document.getElementById('registerForm').classList.add('hidden');
  document.getElementById('forgotForm').classList.remove('hidden');
};
