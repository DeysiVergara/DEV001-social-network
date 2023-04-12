// importamos la funcion que vamos a testear
import { Home } from '../src/Components/Home.js';

describe('myFunction', () => {
  it('debería ser una función', () => {
    expect(typeof Home).toBe('function');
  });
});
