import { signOut } from 'firebase/auth';
import {
  addComment,
  showComments,
  auth,
  deleteComment,
} from '../lib/firebase';

// eslint-disable-next-line no-unused-vars
export const Muro = (onNavigate) => {
  const muroDiv = document.createElement('div');
  const wallMenu = document.createElement('div');
  const newCommentBox = document.createElement('div');
  const postBox = document.createElement('form');
  const commentBox = document.createElement('textarea');
  const postButton = document.createElement('button');
  const signOutButton = document.createElement('button');
  const btnDelete = document.createElement('button');
  newCommentBox.setAttribute('id', 'containerComment'); // se agrega un atributo de clase a un elemento element.setAttribute(name, value)

  wallMenu.textContent = 'EXPERIENCIAS Y COMENTARIOS';
  postButton.textContent = 'PUBLICAR';
  signOutButton.textContent = 'CERRAR SESIÓN';

  newCommentBox.id = 'postsPrints';
  commentBox.id = 'commentBox';
  postBox.id = 'postBox';
  signOutButton.id = 'signOutButton';
  muroDiv.className = 'wallCont';
  postButton.className = 'enterPost';
  wallMenu.className = 'textoMuro';
  btnDelete.className = 'btnDelete';

  muroDiv.appendChild(wallMenu);
  muroDiv.appendChild(commentBox);
  muroDiv.appendChild(postButton);
  muroDiv.appendChild(postBox);
  muroDiv.appendChild(newCommentBox);
  muroDiv.appendChild(signOutButton);
  newCommentBox.appendChild(btnDelete);
  postButton.addEventListener('click', (event) => {
    event.preventDefault();
    if (commentBox.value) { addComment(commentBox.value, auth.currentUser.email); }
  });

  signOutButton.addEventListener('click', () => {
    signOut(auth).then(() => {
      onNavigate('/');
    }).catch((error) => {
      // eslint-disable-next-line no-console
      console.error(error);
    });
  });
  // eslint-disable-next-line no-console
  showComments();
  newCommentBox.querySelectorAll('.btnParaDeletear').forEach((button) => {
    console.log(button);
    button.addEventListener('click', (e) => {
      console.log('holas');
      // eslint-disable-next-line no-console
      e.preventDefault();
      deleteComment(button.dataset.id);
    });
  });

  return muroDiv;
};
