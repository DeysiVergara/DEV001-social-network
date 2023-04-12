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
});
