import { describe, it, expect } from 'vitest';
import { getUserMessage } from '../src/utils.js';

describe('getUserMessage', () => {
  it('debería retornar mensaje de no resultados cuando el error tiene code NO_RESULTS', () => {
    const error = { code: 'NO_RESULTS' };
    expect(getUserMessage(error)).toBe('No se encontraron personajes.');
  });

  it('debería retornar mensaje de rate limit cuando el error tiene status 429', () => {
    const error = { status: 429, retryAfterSeconds: 10 };
    expect(getUserMessage(error)).toBe('Demasiados mensajes. Esperá 10 segundos.');
  });

  it('debería usar el valor por defecto de 5 segundos si retryAfterSeconds no está definido', () => {
    const error = { status: 429 };
    expect(getUserMessage(error)).toBe('Demasiados mensajes. Esperá 5 segundos.');
  });

  it('debería retornar mensaje 404 cuando el mensaje de error incluye HTTP 404', () => {
    const error = { message: 'HTTP 404 not found' };
    expect(getUserMessage(error)).toBe('Recurso no encontrado (404).');
  });

  it('debería retornar mensaje de servidor cuando el mensaje de error incluye HTTP 5xx', () => {
    const error = { message: 'HTTP 500 internal server error' };
    expect(getUserMessage(error)).toBe('Error en el servidor. Intentá de nuevo.');
  });

  it('debería retornar mensaje de sin conexión cuando el error es TypeError', () => {
    const error = { name: 'TypeError', message: 'Failed to fetch' };
    expect(getUserMessage(error)).toBe('Sin conexión a internet.');
  });

  it('debería retornar mensaje genérico para errores desconocidos', () => {
    const error = { message: 'Algo raro pasó' };
    expect(getUserMessage(error)).toBe('Ocurrió un error inesperado.');
  });
});
