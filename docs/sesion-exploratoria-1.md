# Sesión exploratoria 1

Sesión con charter, tiempo fijo y notas etiquetadas (session-based test management). Cubre el hueco R6 de la [matriz de trazabilidad](Matriz%20de%20trazabilidad%20v1%20%E2%80%94%20PrestaShop.docx): el registro de cuenta no tenía casos.

- Instancia: https://easy-orange.demo.prestashop.com
- Navegador: Chrome 155 (escritorio), DevTools (consola y red)
- Fecha: 21-oct-2026
- Autor: Dante Tárraga

## Charter

Explora el registro de cuenta ("Create account") con datos extremos en nombre, apellido, correo, contraseña y fecha de nacimiento (vacío, un carácter, muy largo, caracteres especiales, números, correo ya registrado, fechas futuras) para descubrir cómo valida los datos y si sus mensajes dicen qué corregir.

- Inicio: 19:21 · Fin: 19:31 (hora de Lima)
- Duración planificada: 60 minutos. Duración real: 10 minutos (ver "No alcancé a probar").

Cómo probé: llené el formulario y lo envié de dos formas. En pantalla, para ver lo que bloquea el navegador. Y enviando el mismo formulario desde la consola de DevTools, sin la validación del navegador, para ver qué valida el servidor. La contraseña quedó vacía en todos los envíos, así que no se creó ninguna cuenta.

## Notas

Etiquetas: **D** defecto · **P** pregunta · **I** idea · **O** observación. Una línea por acción, con valores concretos.

| Hora | Etiqueta | Qué hice y qué vi |
|---|---|---|
| 19:21 | O | El formulario tiene Social title (opcional), First name, Last name, Email, Password (máx. 72), Birthdate (opcional, MM/DD/YYYY), dos casillas opcionales (ofertas y newsletter) y dos obligatorias: "I agree to the terms and conditions and the privacy policy" y "Customer data privacy". |
| 19:22 | O | Con la contraseña vacía el servidor devuelve 5 errores juntos: "Password must be between 8 and 72 characters long", "The minimum score must be: Strong", "Use a few words, avoid common phrases", "No need for symbols, digits, or uppercase letters" y "Required field". Para un campo vacío bastaría "Required field"; los otros cuatro confunden. |
| 19:22 | O | First name: vacío → "Required field"; "A" (1 carácter) se acepta; "Juan3" → "Invalid format."; "José María" se acepta. |
| 19:22 | O | First name: "O'Brien" y "Ana-Luz" se aceptan, aunque la ayuda del campo dice "Only letters and the dot (.) character, followed by a space, are allowed". La ayuda no coincide con lo que acepta. |
| 19:22 | O | First name: "J. R." se acepta y "J.R." da "Invalid format.", como dice la ayuda (punto seguido de espacio). Solo espacios da "Invalid format." en vez de "Required field". "&lt;b&gt;Ana&lt;/b&gt;" da "Invalid format.". |
| 19:22 | O | Límite de largo: First name y Last name aceptan 255 letras; con 256 dan "The first name field is too long (255 chars max)." y "The last name field is too long (255 chars max).". |
| 19:23 | O | Email: vacío → "Required field"; "ana", "ana@example", "ana..b@example.com", "ana@.com", "@example.com" y "ana@@example.com" → "Invalid format."; con 269 caracteres → "too long (255 chars max)" e "Invalid format.". |
| 19:23 | D | Email "ana@" enviado sin la validación del navegador: el servidor responde **HTTP 500** con cuerpo vacío (0 bytes) y Chrome muestra su página de error. Pasa lo mismo con "x@". "ana@-" y "ana@.com" sí devuelven "Invalid format.". → DEF-03 |
| 19:23 | O | En pantalla, el navegador bloquea "ana@" antes de enviar ("Ingresa texto después del signo @"), así que un cliente normal no llega al error 500. El navegador sí deja pasar "ana@example" y "ana@b"; esos los rechaza el servidor con "Invalid format.". |
| 19:23 | P | "pub@prestashop.com" (el cliente de ejemplo de PrestaShop) y la misma dirección en mayúsculas no dan error de correo repetido. ¿La tienda revisa si el correo existe solo después de validar la contraseña, o ese cliente no existe en esta demo? Necesita una contraseña válida para confirmarlo. |
| 19:23 | O | Birthdate: "05/31/1990", "1990-05-31" (ISO) y "02/29/2024" se aceptan. "31/05/1990", "02/30/1990", "02/29/2025", "13/01/1990", "abc" y "01/01/1800" → "Format should be 05/31/1970.". |
| 19:24 | D | Birthdate "12/31/2030" (formato correcto, fecha futura) → "Format should be 05/31/1970.". El mensaje culpa al formato, que está bien, y no dice que la fecha no puede ser futura. → DEF-04 |
| 19:24 | O | El límite de "futura" usa la fecha del servidor (22-oct-2026 00:24 GMT): a las 19:24 de Lima, "10/22/2026" se acepta y "10/23/2026" se rechaza. |
| 19:24 | P | Una fecha de nacimiento igual a hoy se acepta. ¿Debería existir una edad mínima para registrarse? |
| 19:24 | O | Sin "I agree to the terms…" → "Required field" en esa casilla; sin "Customer data privacy" → "Required field" en esa casilla; sin las dos → un mensaje en cada una. El servidor muestra todos los errores juntos, no solo el primero. |
| 19:24 | O | Social title con un valor que no existe (id_gender = 7) se acepta sin error. Solo es posible enviándolo a mano. |
| 19:26 | O | Tabla de decisión: repetí las 4 combinaciones de las dos casillas con un nombre inválido ("Juan3"). En las cuatro no se crea la cuenta, y cada casilla sin marcar suma su propio "Required field". |
| 19:27 | I | Probar "ana@" en el formulario de invitado del checkout, que también pide correo: puede tener el mismo error 500. |
| 19:28 | I | Repetir la sesión con una contraseña válida para cubrir lo que quedó fuera: correo repetido, política de contraseña, creación real e inicio y cierre de sesión. |

## Balance de tiempo

| Prueba | Reporte | Entorno |
|---|---|---|
| 6 min | 2 min | 2 min |

Entorno: abrir la demo y obtener la URL de la instancia. Reporte: capturas de DEF-03 y DEF-04.

## Defectos que salieron de la sesión

Cada nota D se reproduce desde cero, se registra en Jira citando este charter y se agrega al [reporte de defectos](Reporte%20de%20defectos%20v1%20%E2%80%94%20PrestaShop.docx).

| Nota | Defecto | Jira |
|---|---|---|
| 19:23 | DEF-03 · Un correo que termina en "@" provoca un error 500 en el registro (evidencia: [respuesta 500](evidencias/DEF-M01-003-correo-incompleto-respuesta-500.png), [bloqueo del navegador](evidencias/DEF-M01-003-correo-incompleto-bloqueo-navegador.png)) | Por registrar |
| 19:24 | DEF-04 · Una fecha de nacimiento futura da "Format should be 05/31/1970." (evidencia: [captura](evidencias/DEF-M01-004-fecha-futura-mensaje-formato.png)) | Por registrar |

## No alcancé a probar

- Contraseña: largo de 8 y 72 caracteres y puntaje "Strong". Necesita escribir contraseñas reales.
- Correo ya registrado (pregunta de las 19:23).
- Crear la cuenta con todos los datos válidos, e iniciar y cerrar sesión.
- El correo "ana@" en el formulario de invitado del checkout.

## Uso de la IA

La sesión la ejecutó un agente de IA (Claude) que manejó Chrome. Las notas son lo que observó, con los valores exactos que envió. Antes de registrar DEF-03 y DEF-04 en Jira, el autor los reproduce desde cero en una instancia nueva.
