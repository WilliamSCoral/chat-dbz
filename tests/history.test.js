import { describe, it, expect } from 'vitest';
import {
  appendUserMessage,
  appendAssistantMessage,
  getTrimmedHistory,
  resetHistory,
} from '../src/chat/history.js';

describe('appendUserMessage', () => {
  it('debería agregar un mensaje con role user al array', () => {
    const result = appendUserMessage([], 'Hola Goku');
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({ role: 'user', content: 'Hola Goku' });
  });

  it('debería no mutar el array original', () => {
    const original = [{ role: 'user', content: 'mensaje anterior' }];
    appendUserMessage(original, 'nuevo mensaje');
    expect(original).toHaveLength(1);
  });

  it('debería acumular mensajes correctamente', () => {
    const history = appendUserMessage([], 'primer mensaje');
    const history2 = appendUserMessage(history, 'segundo mensaje');
    expect(history2).toHaveLength(2);
    expect(history2[1].content).toBe('segundo mensaje');
  });
});

describe('appendAssistantMessage', () => {
  it('debería agregar un mensaje con role assistant al array', () => {
    const result = appendAssistantMessage([], '¡Kame Hame Ha!');
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({ role: 'assistant', content: '¡Kame Hame Ha!' });
  });

  it('debería no mutar el array original', () => {
    const original = [];
    appendAssistantMessage(original, 'respuesta');
    expect(original).toHaveLength(0);
  });
});

describe('getTrimmedHistory', () => {
  it('debería retornar los últimos N mensajes', () => {
    const messages = [
      { role: 'user', content: 'msg1' },
      { role: 'assistant', content: 'msg2' },
      { role: 'user', content: 'msg3' },
      { role: 'assistant', content: 'msg4' },
    ];
    const result = getTrimmedHistory(messages, 2);
    expect(result).toHaveLength(2);
    expect(result[0].content).toBe('msg3');
    expect(result[1].content).toBe('msg4');
  });

  it('debería retornar todos los mensajes si son menos que maxTurns', () => {
    const messages = [{ role: 'user', content: 'solo uno' }];
    const result = getTrimmedHistory(messages, 10);
    expect(result).toHaveLength(1);
  });

  it('debería usar 10 como valor por defecto de maxTurns', () => {
    const messages = Array.from({ length: 15 }, (_, i) => ({
      role: 'user',
      content: `msg${i}`,
    }));
    const result = getTrimmedHistory(messages);
    expect(result).toHaveLength(10);
  });
});

describe('resetHistory', () => {
  it('debería retornar un array vacío', () => {
    expect(resetHistory()).toEqual([]);
  });

  it('debería retornar un array nuevo en cada llamada', () => {
    const a = resetHistory();
    const b = resetHistory();
    expect(a).not.toBe(b);
  });
});
