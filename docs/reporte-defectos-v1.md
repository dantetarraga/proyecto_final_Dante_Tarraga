# Reporte de defectos v1

Reúne los cinco defectos encontrados en el carrito y en el checkout de la demo de PrestaShop, reproducidos en la demo y registrados en Jira.

- Proyecto: PrestaShop 9.2.0 (demo.prestashop.com), front office
- Fecha: 19-oct-2026
- Autor: Dante Tárraga
- Datos base: Hummingbird printed t-shirt, talla S, color blanco (€22.94; stock 300; compra mínima 1)
- Navegador: Chrome 155 (escritorio)
- Jira: [proyecto PS](https://dantetarraga.atlassian.net/jira/software/projects/PS/boards/2)
- Requisitos: ver [matriz-trazabilidad-v1.md](matriz-trazabilidad-v1.md)

## 1. Resumen

| ID | Título | Severidad | Prioridad | Estado | Requisito | Jira |
|---|---|---|---|---|---|---|
| DEF-01 | El total no coincide con precio × cantidad | Media | Alta | Nuevo | R1 | PS-3 |
| DEF-02 | Al borrar la cantidad aparece un 1 y lo que se escribe se suma detrás | Alta | Alta | Nuevo | R3 | PS-4 |
| A11Y-01 | Los bordes de los campos y de los radio buttons casi no se ven | Media | Media | Nuevo | R5 | PS-17 |
| A11Y-02 | El campo contraseña de "Sign in" en el checkout no tiene nombre | Alta | Alta | Nuevo | R5 | PS-18 |
| A11Y-03 | Los íconos de garantías se leen con el nombre del archivo | Baja | Baja | Nuevo | R5 | PS-19 |

Severidad (impacto) y prioridad (urgencia) son propuestas del autor, cada una con su justificación en el detalle. "Nuevo" corresponde al estado "Por hacer" de Jira.

## 2. Detalle de los defectos

### DEF-01: El total no coincide con precio × cantidad

| Campo | Detalle |
|---|---|
| Encontrado en | Casos CP-02, CP-03 y CP-04. Observado el 9-oct-2026 en miniature-railway.demo.prestashop.com. |
| Pasos para reproducir | 1) Agregar la Hummingbird printed t-shirt (S, blanco, €22.94) al carrito. 2) En el carrito, cambiar la cantidad a 2 y pulsar Enter. 3) Leer el total. |
| Resultado esperado | €45.88 (2 × €22.94). |
| Resultado obtenido | €45.89. Con 299 unidades €6,860.26 (esperado €6,859.06) y con 300 unidades €6,883.20 (esperado €6,882.00). |
| Evidencia | [evidencias/DEF-M04-001-total-2-unidades.png](evidencias/DEF-M04-001-total-2-unidades.png) |
| Severidad / prioridad | Media / alta. El cliente paga más de lo que ve en el precio unitario; la diferencia crece con la cantidad y afecta la confianza en el cobro. |
| Requisito | R1 |
| Nota | Parece que calcula con €22.944 (20 % de descuento sobre €28.68 sin redondear) y en pantalla muestra €22.94. Es una hipótesis: no hay acceso al código. |

### DEF-02: Al borrar la cantidad aparece un 1 y lo que se escribe se suma detrás

| Campo | Detalle |
|---|---|
| Encontrado en | Casos CP-08 a CP-12. Observado el 9-oct-2026 en miniature-railway.demo.prestashop.com. |
| Pasos para reproducir | 1) Con la camiseta en el carrito, seleccionar la cantidad y borrarla. 2) Escribir 7. 3) Pulsar Enter. |
| Resultado esperado | 7 unidades. |
| Resultado obtenido | Al borrar, el campo pone 1 solo y queda 17. Lo mismo con -1 (11), 1.5 (15) y 007 (107). Con "abc" el carrito baja a 1. No sale ningún mensaje. |
| Evidencia | [evidencias/DEF-M04-002-cantidad-17.png](evidencias/DEF-M04-002-cantidad-17.png) |
| Severidad / prioridad | Alta / alta. El carrito cambia la cantidad sin avisar y el cliente puede comprar 10 veces más unidades de las que quería. |
| Requisito | R3 |

### A11Y-01: Los bordes de los campos y de los radio buttons casi no se ven

| Campo | Detalle |
|---|---|
| Encontrado en | Prueba rápida 2 (contraste). Observado el 14-oct-2026 en stormy-flock.demo.prestashop.com. |
| Pasos para reproducir | 1) Agregar un producto e ir al checkout. 2) En "Order as a guest", medir con DevTools el color del borde de First name, Last name, Email, Birthdate y Mr./Mrs. contra el fondo. |
| Resultado esperado | Bordes con al menos 3 : 1 contra el fondo blanco (WCAG 1.4.11 Contraste sin texto). |
| Resultado obtenido | Borde `rgb(222, 226, 230)` sobre blanco = 1.3 : 1. |
| Afecta a | Personas con baja visión: no distinguen dónde está el campo ni si el radio está marcado. |
| Evidencia | [evidencias/A11Y-01-bordes-campos-checkout.png](evidencias/A11Y-01-bordes-campos-checkout.png) |
| Severidad / prioridad | Media / media. Dificulta llenar el formulario, pero no lo impide. |
| Requisito | R5 |

### A11Y-02: El campo contraseña de "Sign in" en el checkout no tiene nombre

| Campo | Detalle |
|---|---|
| Encontrado en | Prueba rápida 4 (formularios). Observado el 14-oct-2026 en stormy-flock.demo.prestashop.com. |
| Pasos para reproducir | 1) Con productos en el carrito, ir al checkout. 2) Abrir la pestaña "Sign in". 3) Revisar el campo Password en el árbol de accesibilidad de DevTools o con un lector de pantalla. |
| Resultado esperado | El lector anuncia "Password, required" (WCAG 3.3.2 Etiquetas o instrucciones; 4.1.2 Nombre, función, valor). |
| Resultado obtenido | El lector anuncia solo "edit, required". La etiqueta usa `for="field-password"`, pero ese id ya lo tiene la contraseña oculta del formulario de invitado. Hacer clic en "Password" no pone el cursor en el campo. |
| Afecta a | Personas que usan lector de pantalla y quienes hacen clic en la etiqueta. |
| Evidencia | [evidencias/A11Y-02-login-password-sin-etiqueta.png](evidencias/A11Y-02-login-password-sin-etiqueta.png). Árbol de accesibilidad: `textbox "Email" required` → `textbox required` → `button "Show password"`. |
| Severidad / prioridad | Alta / alta. Está en el inicio de sesión del checkout, dentro del flujo crítico de compra. |
| Requisito | R5 |

### A11Y-03: Los íconos de garantías se leen con el nombre del archivo

| Campo | Detalle |
|---|---|
| Encontrado en | Prueba rápida 3 (texto alternativo). Observado el 14-oct-2026 en stormy-flock.demo.prestashop.com. |
| Pasos para reproducir | 1) Ir al checkout. 2) Revisar los íconos de Security, Delivery y Return policy (columna derecha) en el árbol de accesibilidad de DevTools. |
| Resultado esperado | Como el texto ya está al lado, el ícono es decorativo y el lector lo ignora (`alt=""` o `aria-hidden`) (WCAG 1.1.1 Contenido no textual). |
| Resultado obtenido | El lector dice "pack2_security, imagen, Created with Sketch."; lo mismo con pack2_carrier y pack2_parcel. |
| Afecta a | Personas que usan lector de pantalla: escuchan ruido sin información. |
| Evidencia | Árbol de accesibilidad de DevTools: `image "pack2_security" description="Created with Sketch."` |
| Severidad / prioridad | Baja / baja. Es ruido, no bloquea la compra. |
| Requisito | R5 |

### Por confirmar (no se reportan como defecto)

- Los números 2, 3 y 4 de los pasos del checkout son blancos sobre gris claro (1.49 : 1). WCAG excluye los controles inactivos, pero el número informa el progreso. Se confirma con el instructor. Evidencia: [evidencias/A11Y-obs-contraste-pasos-y-error-login.png](evidencias/A11Y-obs-contraste-pasos-y-error-login.png)
- Con 1 unidad, el botón "−" elimina el producto del carrito sin pedir confirmación. Puede ser una decisión de diseño (riesgo R03 del alcance).

## 3. Un hallazgo, dos versiones (DEF-02)

El mismo defecto se comunica distinto según quién lo lee.

| Para quién | Texto |
|---|---|
| Equipo técnico | **Título:** la cantidad del carrito se concatena con un 1 al borrarla. **Pasos:** 1) camiseta en el carrito; 2) seleccionar la cantidad y borrarla; 3) escribir 7 y pulsar Enter. **Esperado:** 7 unidades. **Obtenido:** 17 unidades, sin mensaje. Mismo patrón con -1 (11), 1.5 (15) y 007 (107); con "abc" baja a 1. |
| Quien decide | Cuando el cliente corrige la cantidad en el carrito, la tienda puede guardarle 10 veces más unidades de las que escribió y no le avisa. Si no lo nota en el resumen, paga de más y luego pide devolución o deja de confiar en la tienda. Se recomienda corregir el campo antes de cualquier campaña de ventas. |

## 4. Mejora de un reporte con IA (Nivel 2)

| Qué pedí | [Por completar: el pedido real a la IA y el reporte que le pasaste.] |
|---|---|
| Qué adopté | [Por completar] |
| Qué rechacé y por qué | [Por completar] |
| Cómo verifiqué | [Por completar: repetir los pasos del reporte mejorado y comprobar que se obtiene lo mismo.] |
