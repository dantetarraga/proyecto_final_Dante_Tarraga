# Pruebas de accesibilidad y usabilidad v1

Flujo crítico: comprar un producto (ficha del producto → carrito → checkout, paso 1 "Personal Information").

- Instancia: https://stormy-flock.demo.prestashop.com
- Producto: Hummingbird printed t-shirt, talla S, color blanco (€22.94)
- Navegador: Chrome 155 (escritorio, 1440 × 900)
- Herramientas: teclado, DevTools (árbol de accesibilidad, estilos calculados), Lighthouse
- Fecha: 14-oct-2026
- Autor: Dante Tárraga

Versión en imagen: [accesibilidad-usabilidad-v1.png](evidencias/accesibilidad-usabilidad-v1.png)

## 1. Las cinco pruebas rápidas

| # | Prueba | Criterio WCAG | Qué hice | Resultado |
|---|---|---|---|---|
| 1 | Teclado | 2.1.1, 2.4.7 | Recorrí ficha, carrito y checkout con Tab, Mayús+Tab, Enter y Esc. Agregué al carrito con Enter y cerré el modal con Esc. | Pasó. Todo es alcanzable, el foco se ve (contorno de 2-3 px) y hay enlace "Skip to main content". |
| 2 | Contraste | 1.4.3, 1.4.11 | Medí el color del texto y de los bordes contra el fondo con DevTools. | Falló. Bordes de campos y radio buttons a 1.3 : 1 (A11Y-01). Números de los pasos del checkout a 1.49 : 1 (observación). |
| 3 | Texto alternativo | 1.1.1 | Revisé el `alt` de las imágenes y cómo aparecen en el árbol de accesibilidad. | Falló. Los íconos de "Security / Delivery / Return policy" se leen como "pack2_security" y "Created with Sketch." (A11Y-03). Las fotos de producto sí tienen `alt`. |
| 4 | Formularios | 3.3.2, 3.3.1 | Revisé las etiquetas de cada campo del checkout y envié datos inválidos. | Falló. El campo contraseña del inicio de sesión no tiene nombre (A11Y-02). El error "Invalid format." no está ligado al campo (observación). |
| 5 | Enlaces y botones con nombre | 2.4.4, 4.1.2 | Revisé el nombre accesible de enlaces y botones (+, −, ojo de la contraseña, eliminar, carrito). | Pasó. Los botones de íconos tienen `aria-label` ("Increase quantity of…", "Show password", "Remove … from cart"). |

## 2. Hallazgos

**A11Y-01: Los bordes de los campos y de los radio buttons casi no se ven**

- Criterio: WCAG 1.4.11 Contraste sin texto (mínimo 3 : 1)
- Severidad: Media
- Prioridad: Media
- Dónde: checkout, paso 1 (First name, Last name, Email, Birthdate y Mr./Mrs.)
- Esperado: el borde de cada campo tiene al menos 3 : 1 contra el fondo blanco.
- Obtenido: borde `rgb(222, 226, 230)` sobre blanco = 1.3 : 1. Una persona con baja visión no distingue dónde está el campo ni si el radio está marcado.
- Evidencia: [evidencias/A11Y-01-bordes-campos-checkout.png](evidencias/A11Y-01-bordes-campos-checkout.png)

**A11Y-02: El campo contraseña de "Sign in" en el checkout no tiene nombre**

- Criterio: WCAG 3.3.2 Etiquetas o instrucciones, 4.1.2 Nombre, función, valor
- Severidad: Alta
- Prioridad: Alta
- Pasos: con productos en el carrito, ir a checkout, abrir la pestaña "Sign in" y revisar el campo Password en el árbol de accesibilidad (o con un lector de pantalla).
- Esperado: el lector anuncia "Password, required".
- Obtenido: el campo no tiene nombre; el lector anuncia solo "edit, required". La etiqueta usa `for="field-password"`, pero ese id ya lo tiene el campo contraseña oculto del formulario de invitado, así que la etiqueta apunta a otro campo. Pasa lo mismo con `field-email` (se salva porque tiene `aria-label`). Además, hacer clic en la palabra "Password" no pone el cursor en el campo.
- Evidencia: [evidencias/A11Y-02-login-password-sin-etiqueta.png](evidencias/A11Y-02-login-password-sin-etiqueta.png). Árbol de accesibilidad: `textbox "Email" required` → `textbox required` → `button "Show password"`.

**A11Y-03: Los íconos de garantías se leen con el nombre del archivo**

- Criterio: WCAG 1.1.1 Contenido no textual
- Severidad: Baja
- Prioridad: Baja
- Dónde: columna derecha del checkout (Security policy, Delivery policy, Return policy).
- Esperado: como el texto ya está al lado, el ícono es decorativo y el lector lo debería ignorar (`alt=""` o `aria-hidden`).
- Obtenido: el lector dice "pack2_security, imagen, Created with Sketch." (lo mismo con pack2_carrier y pack2_parcel). Es ruido para quien usa lector de pantalla.
- Evidencia: árbol de accesibilidad de DevTools: `image "pack2_security" description="Created with Sketch."`

## 3. Observaciones (no las reporto todavía)

- Los números 2, 3 y 4 de los pasos del checkout son blancos sobre gris claro (1.49 : 1). WCAG excluye los controles inactivos, pero el número es información del progreso. Lo dejo para confirmar con el profesor. Evidencia: [evidencias/A11Y-obs-contraste-pasos-y-error-login.png](evidencias/A11Y-obs-contraste-pasos-y-error-login.png)
- Con "Juan3" en First name sale "Invalid format." en un recuadro rojo. Debajo del campo está la regla ("Only letters and the dot…"), pero el error no está ligado al campo (`aria-invalid` y `aria-describedby` vacíos) y el foco queda en el `body`. Con lector de pantalla no se sabe qué campo falló.
- El login fallido dice "Authentication failed." sin decir qué corregir. Lo acepto: no revelar si el email existe es una medida de seguridad (WCAG 3.3.3 lo permite).

## 4. Uso de la IA

Usé la IA solo para que me explicara por qué la etiqueta de la contraseña no funciona: un `id` debe ser único en la página, y `<label for>` se asocia al primer elemento con ese id, que aquí es el campo oculto del formulario de invitado.
