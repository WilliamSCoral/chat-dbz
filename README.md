# ProyectoM3 WilliamCoral — Dragon Ball Z AI Chat

Single Page Application que permite chatear con personajes de Dragon Ball Z usando inteligencia artificial. Proyecto Integrador M3 — Henry Bootcamp.

🌐 **App desplegada:** https://chat-dbz.vercel.app

---

## Descripción del personaje

La app incluye una galería con 6 personajes de Dragon Ball Z, cada uno con personalidad propia definida en su system prompt:

- **Goku** — amigable, entusiasta, siempre listo para pelear
- **Vegeta** — arrogante, orgulloso, nunca muestra debilidad
- **Gohan** — educado, reflexivo, mezcla de guerrero y estudiante
- **Freezer** — frío, elegante, condescendiente con todos
- **Bulma** — inteligente, sarcástica, resuelve todo con tecnología
- **Majin Buu** — infantil, inocente, obsesionado con los dulces

---

## Requisitos

- Node.js 18 o superior
- Cuenta en [OpenRouter](https://openrouter.ai) con API key gratuita
- Vercel CLI (`npm install -g vercel`)

---

## Cómo ejecutar localmente

### 1. Clonar el repositorio

```bash
git clone https://github.com/WilliamSCoral/ProyectoM3_WilliamCoral.git
cd ProyectoM3_WilliamCoral
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Copiá el archivo de ejemplo y completá tu API key:

```bash
cp .env.example .env.local
```

Editá `.env.local` y reemplazá el valor:

```
OPENROUTER_API_KEY=tu_api_key_real_de_openrouter
```

### 4. Levantar el servidor de desarrollo

```bash
vercel dev
```

Abrí http://localhost:3000 en el navegador.

> Nota: usá `vercel dev` (no `npm run dev`) para que las serverless functions funcionen localmente.

---

## Cómo ejecutar los tests

```bash
npm test
```

El proyecto incluye tests unitarios con Vitest distribuidos en 4 archivos:

- `tests/utils.test.js` — manejo de errores (getUserMessage)
- `tests/character.test.js` — transformación de datos de la API (toCharacterProfile)
- `tests/history.test.js` — gestión del historial de chat
- `tests/aiService.test.js` — normalización de respuestas AI y construcción de payloads

---

## Cómo desplegar en Vercel

### 1. Subir el código a GitHub

```bash
git add .
git commit -m "deploy"
git push origin main
```

### 2. Importar en Vercel

- Entrá a [vercel.com](https://vercel.com) e iniciá sesión con GitHub
- Clic en **Add New → Project**
- Seleccioná el repositorio `ProyectoM3_WilliamCoral`
- En **Environment Variables**, agregá `OPENROUTER_API_KEY` con tu API key
- Clic en **Deploy**

### 3. Redeploy después de agregar variables

Si ya deployaste sin la variable, entrá a **Settings → Environment Variables**, agregála y hacé **Redeploy** desde la pestaña Deployments.

---

## Estructura del proyecto

```
ProyectoM3_WilliamCoral/
├── api/
│   ├── chat.js              # Serverless function — proxy seguro a OpenRouter
│   └── chat_ejemplo.js      # Ejemplo alternativo con OpenRouter (referencia)
├── src/
│   ├── main.js              # Punto de entrada
│   ├── router.js            # Routing SPA con History API
│   ├── state.js             # Estado global de la app
│   ├── utils.js             # Funciones utilitarias
│   ├── navigation.js        # Navegación y navbar
│   ├── api.js               # fetchJson genérico con timeout
│   ├── theme.js             # Toggle modo oscuro/claro
│   ├── transform/
│   │   └── character.js     # Transforma datos crudos de la API al ViewModel
│   ├── services/
│   │   ├── dbzApi.js        # Fetch a la Dragon Ball API
│   │   └── aiService.js     # System prompts, buildPayload, normalizeAIResponse
│   ├── chat/
│   │   ├── history.js       # Manejo del historial de conversación
│   │   ├── apiFetch.js      # Fetch a la serverless function
│   │   └── mockFetch.js     # Respuestas mock para desarrollo sin AI
│   └── views/
│       ├── home.js          # Vista galería de personajes
│       ├── chat.js          # Vista y motor del chat
│       ├── about.js         # Vista about
│       └── notFound.js      # Vista 404
├── tests/
│   ├── utils.test.js
│   ├── character.test.js
│   ├── history.test.js
│   └── aiService.test.js
├── index.html
├── styles.css
├── vercel.json
├── package.json
├── .env.example
├── .gitignore
└── AI_PROMPTING_LOG.md      # Registro del uso de IA en el proyecto
```

---

## Registro de uso de IA

El uso de inteligencia artificial durante el desarrollo está documentado en [`AI_PROMPTING_LOG.md`](./AI_PROMPTING_LOG.md).

Se utilizó IA (Claude — Anthropic) como herramienta de apoyo para:

- Generación de la estructura base del proyecto y configuración inicial
- Corrección de errores y debugging (doble declaración de variables, CSS anidado incorrectamente, nombres de modelos inválidos)
- Implementación de features: modo oscuro/claro, timestamps, textarea con Shift+Enter, typing indicator
- Migración entre APIs (OpenRouter → Google AI Studio → OpenRouter)
- Consultas técnicas sobre formato de la Gemini API, roles de mensajes, y estructura de serverless functions en Vercel

Todas las decisiones de arquitectura, elección del personaje, diseño del system prompt y lógica de negocio fueron tomadas y comprendidas por el desarrollador.

---

## Tecnologías

- HTML, CSS, JavaScript vanilla (ES Modules)
- History API para routing SPA
- Fetch API con async/await
- Vercel Serverless Functions
- OpenRouter (proxy para modelos de IA — `google/gemini-3.1-flash-lite`)
- Vitest para tests unitarios
