# Chat DBZ — Dragon Ball Z AI Chat

Single Page Application que permite chatear con personajes de Dragon Ball Z usando inteligencia artificial. Proyecto Integrador M3 — Henry Bootcamp.

🌐 **App desplegada:** https://chat-dbz.vercel.app

---

## Personajes disponibles

La app incluye una galería con 6 personajes, cada uno con su propia personalidad definida en el system prompt:

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
git clone https://github.com/TU_USUARIO/chat-dbz.git
cd chat-dbz
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Copiá el archivo de ejemplo y completá tu API key:

```bash
cp .env.example .env
```

Editá `.env` y reemplazá el valor:

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

El proyecto incluye 37 tests unitarios con Vitest distribuidos en 4 archivos:

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
- Seleccioná el repositorio `chat-dbz`
- En **Environment Variables**, agregá `OPENROUTER_API_KEY` con tu API key
- Clic en **Deploy**

### 3. Redeploy después de agregar variables

Si ya deployaste sin la variable, entrá a **Settings → Environment Variables**, agregála y hacé **Redeploy** desde la pestaña Deployments.

---

## Estructura del proyecto

```
chat-dbz/
├── api/
│   └── chat.js              # Serverless function — proxy seguro a OpenRouter
├── src/
│   ├── main.js              # Punto de entrada
│   ├── router.js            # Routing SPA con History API
│   ├── state.js             # Estado global de la app
│   ├── utils.js             # Funciones utilitarias
│   ├── navigation.js        # Navegación y navbar
│   ├── api.js               # fetchJson genérico
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

## Uso de IA en el proyecto

El uso de inteligencia artificial durante el desarrollo está documentado en [`AI_PROMPTING_LOG.md`](./AI_PROMPTING_LOG.md).

Se utilizó IA como herramienta de apoyo para: bases de código, corrección de errores, y consultas técnicas puntuales. Todas las decisiones de arquitectura y lógica fueron tomadas y comprendidas por el desarrollador.

---

## Tecnologías

- HTML, CSS, JavaScript vanilla (ES Modules)
- History API para routing SPA
- Fetch API con async/await
- Vercel Serverless Functions
- OpenRouter (proxy para modelos de IA)
- Vitest para tests unitarios
