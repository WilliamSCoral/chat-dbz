import { describe, it, expect } from 'vitest';
import {
  normalizeAIResponse,
  buildPayload,
  createSystemPrompt,
} from '../src/services/aiService.js';

describe('normalizeAIResponse', () => {
  it('debería extraer el texto de un bloque de tipo text', () => {
    const raw = { content: [{ type: 'text', text: '¡Voy a ser el más fuerte!' }] };
    expect(normalizeAIResponse(raw)).toBe('¡Voy a ser el más fuerte!');
  });

  it('debería unir múltiples bloques de texto', () => {
    const raw = {
      content: [
        { type: 'text', text: 'Hola ' },
        { type: 'text', text: 'mundo' },
      ],
    };
    expect(normalizeAIResponse(raw)).toBe('Hola mundo');
  });

  it('debería ignorar bloques que no sean de tipo text', () => {
    const raw = {
      content: [
        { type: 'image', url: 'https://example.com/img.png' },
        { type: 'text', text: 'Solo esto' },
      ],
    };
    expect(normalizeAIResponse(raw)).toBe('Solo esto');
  });

  it('debería retornar string vacío si no hay bloques de texto', () => {
    const raw = { content: [] };
    expect(normalizeAIResponse(raw)).toBe('');
  });

  it('debería retornar string vacío si raw es null', () => {
    expect(normalizeAIResponse(null)).toBe('');
  });

  it('debería hacer trim del resultado', () => {
    const raw = { content: [{ type: 'text', text: '  respuesta con espacios  ' }] };
    expect(normalizeAIResponse(raw)).toBe('respuesta con espacios');
  });
});

describe('buildPayload', () => {
  it('debería construir el payload con los mensajes y el system prompt', () => {
    const messages = [{ role: 'user', content: 'Hola' }];
    const systemPrompt = 'Eres Goku.';
    const payload = buildPayload(messages, systemPrompt);

    expect(payload.messages).toEqual(messages);
    expect(payload.system).toBe('Eres Goku.');
  });

  it('debería incluir max_tokens y temperature en el payload', () => {
    const payload = buildPayload([], 'prompt');
    expect(payload.max_tokens).toBeDefined();
    expect(payload.temperature).toBeDefined();
  });

  it('debería incluir el campo model en el payload', () => {
    const payload = buildPayload([], 'prompt');
    expect(typeof payload.model).toBe('string');
    expect(payload.model.length).toBeGreaterThan(0);
  });
});

describe('createSystemPrompt', () => {
  it('debería incluir el nombre del personaje en el prompt', () => {
    const character = { name: 'Goku' };
    const prompt = createSystemPrompt(character);
    expect(prompt).toContain('Goku');
  });

  it('debería incluir el rol del personaje en el prompt', () => {
    const character = { name: 'Vegeta' };
    const prompt = createSystemPrompt(character);
    expect(prompt).toContain('Príncipe de los Saiyans');
  });

  it('debería usar el perfil por defecto para personajes desconocidos', () => {
    const character = { name: 'Krilin' };
    const prompt = createSystemPrompt(character);
    expect(prompt).toContain('Krilin');
    expect(prompt).toContain('Dragon Ball');
  });

  it('debería retornar un string no vacío', () => {
    const character = { name: 'Bulma' };
    const prompt = createSystemPrompt(character);
    expect(typeof prompt).toBe('string');
    expect(prompt.length).toBeGreaterThan(0);
  });
});
