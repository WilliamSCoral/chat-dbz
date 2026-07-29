import { describe, it, expect } from 'vitest';
import { toCharacterProfile } from '../src/transform/character.js';

describe('toCharacterProfile', () => {
  it('debería mapear todos los campos correctamente con datos completos', () => {
    const raw = {
      id: 1,
      name: 'Goku',
      image: 'https://example.com/goku.png',
      ki: '60.000.000',
      race: 'Saiyan',
      gender: 'Male',
      affiliation: 'Z Fighter',
      description: 'El guerrero más poderoso de la Tierra.',
    };
    const result = toCharacterProfile(raw);

    expect(result.id).toBe(1);
    expect(result.name).toBe('Goku');
    expect(result.image).toBe('https://example.com/goku.png');
    expect(result.ki).toBe('60.000.000');
    expect(result.race).toBe('Saiyan');
    expect(result.gender).toBe('Male');
    expect(result.affiliation).toBe('Z Fighter');
    expect(result.description).toBe('El guerrero más poderoso de la Tierra.');
  });

  it('debería usar id 0 cuando no se proporciona id', () => {
    const raw = { name: 'Vegeta' };
    const result = toCharacterProfile(raw);
    expect(result.id).toBe(0);
  });

  it('debería usar "Desconocido" como nombre por defecto cuando falta el nombre', () => {
    const raw = { id: 2 };
    const result = toCharacterProfile(raw);
    expect(result.name).toBe('Desconocido');
  });

  it('debería usar string vacío para image cuando falta el campo', () => {
    const raw = { id: 3, name: 'Gohan' };
    const result = toCharacterProfile(raw);
    expect(result.image).toBe('');
  });

  it('debería usar "Desconocido" para ki, race, gender y affiliation cuando faltan', () => {
    const raw = { id: 4, name: 'Freezer' };
    const result = toCharacterProfile(raw);
    expect(result.ki).toBe('Desconocido');
    expect(result.race).toBe('Desconocido');
    expect(result.gender).toBe('Desconocido');
    expect(result.affiliation).toBe('Desconocido');
  });

  it('debería usar string vacío para description cuando falta el campo', () => {
    const raw = { id: 5, name: 'Bulma' };
    const result = toCharacterProfile(raw);
    expect(result.description).toBe('');
  });

  it('debería retornar un objeto nuevo sin mutar el original', () => {
    const raw = { id: 1, name: 'Goku' };
    const result = toCharacterProfile(raw);
    expect(result).not.toBe(raw);
  });
});
