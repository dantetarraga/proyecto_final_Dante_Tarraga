# Sesión exploratoria 1

Objetivo: probar el registro de cuenta, que no tenía casos (hueco R6 de la [matriz de trazabilidad](Matriz%20de%20trazabilidad%20v1%20%E2%80%94%20PrestaShop.docx)).

- Instancia: https://easy-orange.demo.prestashop.com
- Navegador: Chrome 155
- Fecha: 21-oct-2026, de 19:21 a 19:31
- Autor: Dante Tárraga

## Charter

Explora el registro de cuenta con datos extremos (vacíos, muy largos, con números o símbolos, correo repetido, fechas futuras) para descubrir cómo valida los datos y si los mensajes dicen qué corregir.

Duración planificada: 60 minutos. Duración real: 10 minutos.

Dejé la contraseña vacía en todos los envíos para no crear cuentas. Para ver qué valida el servidor, también envié el formulario sin la validación del navegador (desde la consola de DevTools).

## Notas

D = defecto · P = pregunta · I = idea · O = observación

| Hora | Tipo | Qué hice y qué vi |
|---|---|---|
| 19:21 | O | El formulario pide nombre, apellido, correo y contraseña. La fecha de nacimiento es opcional. Hay dos casillas obligatorias: términos y privacidad. |
| 19:22 | O | Con la contraseña vacía salen 5 mensajes de error a la vez. Bastaría con "Required field". |
| 19:22 | O | Nombre: "Juan3" da "Invalid format.". "A", "José María", "O'Brien" y "Ana-Luz" se aceptan. |
| 19:22 | O | La ayuda del nombre dice "solo letras y punto", pero acepta el apóstrofo y el guion. |
| 19:22 | O | Nombre y apellido aceptan hasta 255 letras. Con 256 sale "too long (255 chars max)". |
| 19:23 | O | Correo: "ana", "ana@example" y "ana..b@example.com" dan "Invalid format.". |
| 19:23 | D | Correo "ana@": el servidor responde con error 500 y la página queda en blanco. Pasa lo mismo con "x@". → DEF-03 |
| 19:23 | O | En pantalla el navegador no deja enviar "ana@", así que un cliente normal no ve el error. |
| 19:23 | P | El correo del cliente de ejemplo (pub@prestashop.com) no da error de correo repetido. ¿Se revisa solo con una contraseña válida? |
| 19:24 | D | Fecha 12/31/2030 (futura): sale "Format should be 05/31/1970.", aunque el formato está bien. → DEF-04 |
| 19:24 | O | Una fecha imposible (02/30/1990) o muy antigua (01/01/1800) da el mismo mensaje. |
| 19:24 | P | Se acepta una fecha de nacimiento igual a hoy. ¿Debería haber una edad mínima? |
| 19:24 | O | Sin una casilla obligatoria sale "Required field" en esa casilla. Si fallan varias cosas, salen todos los errores juntos. |
| 19:26 | O | Para la tabla de decisión probé las 4 combinaciones de casillas con un nombre inválido: en ninguna se crea la cuenta. |
| 19:27 | I | Probar "ana@" en el formulario de invitado del checkout. (Hecho el 21-oct: también da error 500, caso CK-01.) |
| 19:28 | I | Repetir la sesión con una contraseña válida. |

## Balance de tiempo

| Prueba | Reporte | Entorno |
|---|---|---|
| 6 min | 2 min | 2 min |

## Defectos

| Nota | Defecto | Jira |
|---|---|---|
| 19:23 | DEF-03 · Un correo que termina en "@" da error 500 ([captura 1](evidencias/DEF-M01-003-correo-incompleto-respuesta-500.png), [captura 2](evidencias/DEF-M01-003-correo-incompleto-bloqueo-navegador.png)) | PS-20 |
| 19:24 | DEF-04 · Una fecha futura da un mensaje de formato ([captura](evidencias/DEF-M01-004-fecha-futura-mensaje-formato.png)) | PS-21 |

## No alcancé a probar

- La contraseña (largo y nivel de seguridad).
- El correo repetido.
- Crear la cuenta, entrar y salir.

Estos puntos necesitan una contraseña. Los hace el autor en la sesión exploratoria 2.

## Uso de la IA

La sesión la hizo un agente de IA (Claude) en Chrome. DEF-03 y DEF-04 se reprodujeron en una instancia nueva (previous-wrist, 21-oct) y están en Jira como PS-20 y PS-21.
