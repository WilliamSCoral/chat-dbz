# AI Prompting Log — Chat DBZ

Registro de uso de inteligencia artificial durante el desarrollo del proyecto.
La IA fue usada como apoyo técnico: base de código inicial, detección de errores,
explicación de conceptos y sugerencias puntuales. Todas las decisiones de diseño,
estructura y funcionalidad fueron tomadas por el desarrollador.

---

## Prompt 1 — Estructura base del proyecto (L1)

**Problema detectado:** Necesitaba arrancar el proyecto con una estructura Mobile-First
clara, con variables CSS y las vistas básicas del SPA, pero no tenía claro cómo
organizar el HTML para que el router pudiera controlar las vistas sin recargar la página.

**Prompt enviado:**
```
Contexto:
Estoy empezando un proyecto SPA de chat en vanilla JS, sin frameworks.
El proyecto se llama Chat DBZ. Tiene 3 vistas: Inicio, Chat y Acerca del proyecto.

Objetivo:
Quiero un index.html base con enfoque mobile-first, CSS con variables y las 3 vistas
como divs que el JS pueda mostrar/ocultar. Sin que el navegador recargue al navegar.

Restricciones:
- Sin frameworks ni librerías
- CSS mobile-first con breakpoints en 768px y 1024px
- Sin comentarios en el código

Evidencia:
Proyecto nuevo, sin código todavía.

Formato de salida:
HTML base + CSS inicial con variables y layout flex.

Criterios de éxito:
- 3 vistas en el HTML, solo una visible a la vez
- Navbar con los 3 links
- CSS con variables de color y tipografía
```

**Respuesta recibida:** La IA generó el `index.html` con las 4 vistas (`home`, `chat`,
`about`, `404`) como divs con clase `view`, un navbar con los links, y el `styles.css`
con variables CSS (`--color-primary`, `--color-bg`, `--color-surface`, etc.), layout
flex column y los breakpoints pedidos.

**Qué apliqué:** La estructura de vistas y las variables CSS. Ajusté los colores
a la paleta naranja/oscuro que quería para la temática DBZ.

**Verificación:** Abrí el HTML en el navegador y confirmé que el layout base se veía
correcto en mobile (columna) y en desktop (centrado con borde redondeado).

**Dónde la IA asumió mal:** Inicialmente generó los estilos con `height: 100vh` en `.app`.
Al probar en mobile, el viewport no consideraba la barra del navegador y cortaba el layout.
Lo corregí cambiando a `height: 100dvh` (dynamic viewport height), que maneja bien
la barra del browser en móviles.

---

## Prompt 2 — Router SPA con History API (L2)

**Problema detectado:** Al hacer clic en los links del navbar, el browser recargaba
la página en lugar de cambiar la vista. Necesitaba implementar el router con
`history.pushState()` e interceptar los clicks en los links.

**Prompt enviado:**
```
Contexto:
SPA vanilla JS con 4 vistas (home, chat, about, 404). Los links del navbar
tienen hrefs reales (/chat, /acerca-del-proyecto). El script es type="module".

Objetivo:
Que al hacer clic en un link, la URL cambie y se muestre la vista correcta
sin recargar la página. Al usar el botón atrás del browser, también debe funcionar.

Restricciones:
- Sin frameworks ni librerías
- Módulos ES separados: router.js, navigation.js, utils.js
- Sin comentarios en el código

Evidencia:
Actualmente el href hace una recarga completa de la página.

Formato de salida:
router.js con las rutas, navigation.js para interceptar clicks, utils.js
para showView(). Explicación de qué hace cada función.

Criterios de éxito:
- URL cambia en el browser sin recargar
- Botón atrás funciona
- Vista 404 aparece en rutas desconocidas
```

**Respuesta recibida:** La IA generó los 3 módulos. `router.js` con un objeto de rutas
y `navigateTo()`. `navigation.js` interceptando clicks con `event.target.closest('a')`.
`utils.js` con `showView()` que maneja la clase `view--active` y el link activo del navbar.

**Qué apliqué:** Los 3 archivos completos. Agregué también la route-bar (indicador
de ruta actual en la esquina inferior derecha) por iniciativa propia, ya que en un
proyecto anterior me había parecido útil visualmente.

**Verificación:** Corrí `npx serve .` (necesario para ES modules, no funciona con
`file://`), navegué entre las vistas y usé el botón atrás. Funcionó correctamente.

**Error que encontré yo mismo:** Al cambiar el href del navbar a `/acerca del proyecto`
(con espacios), al hacer clic daba 404. Los espacios en el href no matcheaban la ruta
del router. Lo corregí cambiando a `/acerca-del-proyecto` en el HTML, el router y la vista.
La IA no cometió ese error — lo introduje yo al modificar el texto del link.

---

## Prompt 3 — Cards de personajes con Fetch API (L3)

**Problema detectado:** Quería mostrar 6 personajes específicos de DBZ (Goku, Vegeta,
Gohan, Freezer, Bulma, Majin Buu) usando la DragonBall API pública, con estados
de carga visibles para el usuario.

**Prompt enviado:**
```
Contexto:
SPA vanilla JS, vista Home. Necesito traer personajes de https://dragonball-api.com/api.

Objetivo:
Mostrar 6 personajes específicos como cards clickeables. Mientras cargan, mostrar
un estado "loading". Si falla, mostrar error con botón "Reintentar".
Al hacer clic en una card, guardar el personaje en sessionStorage y navegar a /chat.

Restricciones:
- Solo los personajes: Goku, Vegeta, Gohan, Freezer, Bulma, Majin Buu
- Sin frameworks
- Módulo separado: api.js para el fetch, home.js para el render

Evidencia:
La API devuelve: GET /characters?limit=58
Respuesta: { items: [ { id, name, image, ki, race... } ] }

Formato de salida:
api.js con fetchJson() y getCharacters(). home.js con renderHome() async.
Estados loading/error/success en el HTML.

Criterios de éxito:
- Solo los 6 personajes aparecen
- Estado loading visible mientras carga
- Error con retry si falla el fetch
- Click guarda en sessionStorage y navega a /chat
```

**Respuesta recibida:** La IA generó `api.js` con `fetchJson()` validando `response.ok`,
y `getCharacters()` filtrando los personajes por nombre. `home.js` con el ciclo completo
de estados. También generó `state.js` con `getState()`/`setState()`.

**Qué apliqué:** Todo el código base. Luego ajusté el diseño de las cards por cuenta propia.

**Problema de diseño que detecté yo:** Las cards mostraban las imágenes en círculos
y no se veía el rostro de los personajes — las imágenes son de cuerpo completo y el
recorte circular dejaba solo el torso. Pedí ayuda para rediseñarlas como retratos
verticales con `aspect-ratio: 3/4`.

**Segunda iteración — cards en portrait:**
```
Contexto: SPA DBZ, vista Home, grid de 6 personajes.

Objetivo:
Cambiar el diseño de las cards: en lugar de avatar circular, mostrar el personaje
completo en un recuadro vertical tipo portrait. Al pasar el mouse, el personaje
se sale un poco del recuadro. El nombre abajo de la card, no adentro.

Restricciones:
- Solo CSS y ajuste del HTML del template en home.js
- Sin librerías
- Mantener grid: 2 col mobile, 3 tablet, 6 desktop

Evidencia:
Las imágenes de la API son retratos de cuerpo completo con fondo blanco/transparente.
El recorte circular muestra solo el torso.

Formato de salida:
CSS actualizado para .character-card y .character-card__name.
Ajuste en home.js para el template HTML.

Criterios de éxito:
- Personaje visible completo en la card
- Nombre debajo de la card en negrita
- Hover: personaje se sale levemente del recuadro hacia arriba
```

**Verificación:** Abrí la vista Home, los 6 personajes aparecieron en portrait.
Al pasar el mouse, el efecto de zoom fue demasiado (scale 1.45). Pedí reducirlo
a 1.18 y quedó como quería.

**Problema que tuve que debuggear yo:** Al cargar los personajes, las cards tenían
tamaños distintos — algunas más altas que otras. La IA propuso `align-items: start`
y `min-width: 0` en el wrapper, pero el problema persistía porque la imagen seguía
en el flujo normal del documento y empujaba el layout al cargar.
La solución final fue usar `position: absolute` en la imagen, sacándola del flujo:
eso lo detecté yo al entender que el tamaño de la card debe ser determinado solo
por `aspect-ratio`, no por la imagen.

---

## Prompt 4 — Transform layer y separación de responsabilidades (L4)

**Problema detectado:** La función `getCharacters()` en `api.js` hacía fetch, filtraba
y devolvía el dato crudo de la API directo a la vista. Si la API cambiaba un campo,
tendría que buscar el bug en varios archivos. Quería separar esas responsabilidades.

**Prompt enviado:**
```
Contexto:
SPA DBZ, vanilla JS. api.js tiene fetchJson() y getCharacters() mezclados.
getCharacters() hace fetch, filtra y devuelve datos crudos de la DragonBall API.

Objetivo:
Separar en 3 capas:
- api.js: solo fetchJson() genérico
- services/dbzApi.js: fetch + filtrado de personajes
- transform/character.js: convierte dato crudo a ViewModel con defaults

Restricciones:
- Sin frameworks
- Mantener estructura de módulos ES existente
- Sin comentarios en el código
- Agregar manejo de caso borde: si no se encuentran personajes, lanzar error con code NO_RESULTS

Evidencia:
API devuelve: { items: [ { id, name, ki, race, gender, image, affiliation, description } ] }
Algunos campos pueden ser null.

Formato de salida:
Los 3 archivos con sus responsabilidades separadas.
getUserMessage() en utils.js para mensajes de error legibles.

Criterios de éxito:
- home.js importa de services/dbzApi.js, no de api.js
- toCharacterProfile() aplica defaults con ?? para campos nulos
- Errores técnicos se muestran como mensajes entendibles al usuario
```

**Respuesta recibida:** La IA generó `src/transform/character.js` con `toCharacterProfile()`,
`src/services/dbzApi.js` con `getCharacters()` y `buildCharactersUrl()` usando `URLSearchParams`,
y `getUserMessage()` en `utils.js` con mensajes por tipo de error.

**Qué apliqué:** Los 3 archivos completos. Verifiqué que `home.js` importara desde
`services/dbzApi.js` y que la app siguiera funcionando igual visualmente.

**Verificación:** Recargué la app — los 6 personajes seguían cargando correctamente.
Abrí DevTools → Network y confirmé que la URL construida con `URLSearchParams`
era correcta (`?limit=58`). Verifiqué en Console que no había errores de importación.

**Lo que la IA no detectó:** Al mover la lógica a `services/dbzApi.js`, el import de
`toCharacterProfile` en `api.js` quedó huérfano. Tuve que limpiar `api.js` manualmente
para que quedara solo con `fetchJson()`, sin imports innecesarios.

---

## Estado actual del proyecto

| Módulo | Implementado | Commit |
|--------|-------------|--------|
| L1 — Mobile First CSS | ✅ | `feat: estructura base HTML y CSS mobile-first (L1)` |
| L2 — Router SPA | ✅ | `feat: router SPA con History API y navegación (L2)` |
| L3 — Fetch API + estados UI | ✅ | `feat: Fetch API, estados loading/success/error y DragonBall API (L3)` |
| L4-A — Transform + URLSearchParams | ✅ | `feat: capa transform con ViewModel y construcción de URL con URLSearchParams (L4-A)` |
| L4-B — Services + casos borde | ✅ | `feat: separar capa de servicios, manejo de errores legibles y casos borde (L4-B)` |
| L5 — AI Prompting Log | ✅ | este archivo |
| L6 — pendiente | ⏳ | — |
| L7 — pendiente | ⏳ | — |
| L8 — pendiente | ⏳ | — |

---

*Este log se actualiza con cada módulo completado.*
