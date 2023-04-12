/* eslint-disable spaced-comment */
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  query,
  deleteDoc,
  doc,
} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD8ezxkCWL4WmQZThxfpEr4R0EZ2WlPvaQ',
  authDomain: 'redsocial-c43f8.firebaseapp.com',
  projectId: 'redsocial-c43f8',
  storageBucket: 'redsocial-c43f8.appspot.com',
  messagingSenderId: '911521058464',
  appId: '1:911521058464:web:65494d46a23d6ad7adc3c5',
  measurementId: 'G-8VT5Y8E72X',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

// eslint-disable-next-line max-len
export const sign = (email, password) => signInWithEmailAndPassword(auth, email, password); // función ingreso con correo y contraseña
export const signInGoogle = (onNavigate) => { // funcion de ingreso con cta google
  // eslint-disable-next-line arrow-parens, no-unused-vars
  signInWithPopup(auth, provider).then(result => {
    onNavigate('/muro');
  // eslint-disable-next-line arrow-parens
  }).catch(error => {
    // eslint-disable-next-line no-console
    console.log(error);
  });
};

export const addComment = (text, author) => {
  addDoc(collection(db, 'comment'), { // el objeto db es la conección a la base de datos
    text,
    author,
    date: new Date(),
  });
}; // funcion que lleva los posts a la coleccion de firestore

export const deleteComment = (id) => deleteDoc(doc(db, 'comment', id));

export const showComments = () => { //funcion que lleva los posts a consola IU y a IU.
  const allComments = query(collection(db, 'comment'));
  let newComment = '';
  onSnapshot(allComments, (querySnapshot) => {
    newComment = '';
    querySnapshot.forEach((docum) => {
      const comment = docum.data();
      newComment += `
      <div class="comment">
      <h5> ${comment.author}</h5>
      <p> ${comment.text}</p>
      <button class="btnParaDeletear" data-id=${docum.id}>Eliminar</button>
      </div>
      `;
    });
    const newCommentBox = document.getElementById('postsPrints');
    newCommentBox.innerHTML = '';
    document.getElementById('postsPrints').innerHTML = newComment;
    newCommentBox.querySelectorAll('.btnParaDeletear').forEach((button) => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        deleteComment(e.target.dataset.id);
      });
    });
  });
  return (newComment);
};
