import { sign, signInGoogle } from '../lib/firebase';

export const Login = (onNavigate) => {
  const LoginDiv = document.createElement('div');
  const textLogin = document.createElement('h1');
  const buttonLogin = document.createElement('button');
  const buttonGoogle = document.createElement('button');
  const buttonHome = document.createElement('button');
  const loginEmail = document.createElement('input');
  const loginPassword = document.createElement('input');
  const boxMenu = document.createElement('div');

  textLogin.textContent = 'Ingresa a nuestra comunidad, comparte tus ideas.';
  buttonLogin.textContent = 'LOGIN';
  buttonGoogle.textContent = '';
  buttonHome.textContent = 'Volver al Home';
  buttonHome.className = 'volver';
  loginEmail.textContent = 'example@yahoo.es';
  loginPassword.textContent = '********';

  loginEmail.placeholder = 'example@yahoo.es';// .placeholder es usado parauna indicacion corta, para input o textarea. texto que aparecera en el input
  loginEmail.type = 'Email';// .type se usa para indicar el tipo de valor que se ingresara en el input, en este caso es el correo del usuario.
  loginPassword.placeholder = '********';
  loginPassword.type = 'password';

  LoginDiv.className = 'loginContent';
  textLogin.className = 'textLogin';
  boxMenu.className = 'cuadroMenu';
  buttonLogin.className = 'buttonLogin';
  buttonGoogle.className = 'buttonGoogle';
  loginEmail.className = 'loginEmail';
  loginPassword.className = 'loginPassword';

  buttonGoogle.addEventListener('click', () => {
    signInGoogle(onNavigate);
  });
  buttonHome.addEventListener('click', () => onNavigate('/'));

  buttonLogin.addEventListener('click', () => {
    sign(loginEmail.value, loginPassword.value)
      .then((person) => {
        // eslint-disable-next-line no-console
        window.userEmail = person.user.email;
        loginEmail.value = '';
        loginPassword.value = '';
        onNavigate('/muro');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // eslint-disable-next-line no-console
        console.log(errorCode, errorMessage);
      });
  });

  LoginDiv.appendChild(textLogin);
  boxMenu.appendChild(loginEmail);
  boxMenu.appendChild(loginPassword);
  boxMenu.appendChild(buttonLogin);
  boxMenu.appendChild(buttonGoogle);
  LoginDiv.appendChild(boxMenu);

  LoginDiv.appendChild(buttonHome);

  return LoginDiv;
};
