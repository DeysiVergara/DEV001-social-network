import { signInWithEmailAndPassword } from 'firebase/auth';
import { sign } from '../src/lib/firebase.js';
// import { Home } from '../src/Components/Home.js';
// jest.mock('../src/lib/firebase.js');
jest.mock('firebase/auth');

describe('myFunction', () => {
  it('debería ser una función', () => {
    expect(typeof sign).toBe('function');
  });
});

describe('sign', () => {
  it('debería estar siendo llamada', () => {
    sign();
    expect(signInWithEmailAndPassword).toHaveBeenCalled();
  });

  it('deberia llamar correctamente createUserWithEmailAndPassword', () => {
    signInWithEmailAndPassword.mockImplementationOnce((auth, email, password) => {
      expect(email).toBe('test@test.test');
      expect(password).toBe('123');
      // return Promise.resolve({ user: { email, password } });
    });
    sign('test@test.test', '123');
  });
});
