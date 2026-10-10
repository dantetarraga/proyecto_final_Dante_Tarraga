# Casos de prueba manuales v1 — Campo cantidad del carrito

Segunda parte del documento de casos de prueba (Semana 2). Continúa el [mapa de flujos críticos](mapa-flujos-criticos.md).

| Aspecto | Detalle |
|---|---|
| Sistema bajo prueba | Demo oficial de PrestaShop 9.2.0, tema Hummingbird (https://demo.prestashop.com) |
| Instancia usada | `https://miniature-railway.demo.prestashop.com` |
| Módulo | M04 My Cart (y la ficha de producto de M02, desde donde se agrega al carrito) |
| Producto de prueba | "Hummingbird printed t-shirt", talla S, color blanco (precio €22.94, antes €28.68 con 20 % de descuento) |
| Fecha de ejecución | 09-oct-2026 |
| Navegador | Google Chrome 155 (escritorio) |
| Autor | Dante Tárraga |

**Versión en imagen** (una por sección): [1. Análisis del campo](casos-manuales-v1-1-analisis-campo.png) · [2. Escenarios](casos-manuales-v1-2-escenarios.png) · [3. Defectos](casos-manuales-v1-3-defectos.png) · [4. Validación con IA](casos-manuales-v1-4-validacion-ia.png)

---

## 1. Elección y análisis del campo

### 1.1 Cómo se eligió el campo (3 iteraciones de análisis)

**Iteración 1: campos candidatos del proyecto.** Se revisaron los campos con regla de los flujos del alcance:

| Campo | Pantalla | Regla observada en la página | Valoración |
|---|---|---|---|
| Cantidad | Ficha de producto y carrito | `type="text"`, `inputmode="numeric"`, `pattern="[0-9]+"`, `min="1"`; el servidor informa el stock | Regla numérica con dos límites claros (mínimo y stock); está en el flujo crítico de compra |
| Contraseña | Registro | Mínimo 8 y máximo 72 caracteres, además de una puntuación de fortaleza mínima 3 | Mezcla longitud con fortaleza: las clases dependen de un algoritmo externo y no solo de la longitud |
| Fecha de nacimiento | Registro | Opcional, formato `MM/DD/YYYY` | Al ser opcional, un error no impide crear la cuenta; impacto bajo |
| Nombre y apellido | Registro | Solo letras y el punto seguido de espacio | Regla de formato, sin límites numéricos claros |

Se descartó la contraseña porque sus clases no se controlan solo con la longitud, y la fecha porque no bloquea ningún flujo crítico.

**Iteración 2: el campo cantidad en la página.** Se inspeccionó el HTML y la respuesta del servidor (`POST /index.php?controller=product&action=refresh`) para la combinación talla S, color blanco:

- Stock de la combinación: **300 unidades** ("In stock 300 Items" en *Product Details*).
- Cantidad mínima de compra: **1** (`product_minimal_quantity: 1`).
- Con 300 se muestra "Last items in stock"; con 301 el botón *Add to cart* se deshabilita y aparece "There are not enough products in stock".
- El servidor devuelve 1 cuando recibe 0, -1, "abc", "1.5" o vacío.
- El carrito (`/cart?action=show`) usa un campo con las mismas reglas y lo actualiza con `POST /cart?update=1&id_product=1&id_product_attribute=1`.

**Iteración 3: decisión y alcance final.** Se elige el **campo cantidad**, probado en sus dos puntos de entrada (ficha de producto y carrito), porque:

1. Es el campo que alimenta el total del pedido: un error se traduce directamente en cobrar mal (riesgo del módulo M04 en el documento de alcance).
2. Tiene una regla con dos límites verificables (1 y el stock).
3. Además del valor, se verifica que el **total** sea precio unitario × cantidad, porque es lo que ve y paga el cliente.

### 1.2 Regla

> La cantidad debe ser un número entero mayor o igual que la cantidad mínima de compra (1) y menor o igual que el stock disponible de la combinación (300). La suma de lo que ya está en el carrito y lo que se agrega tampoco puede superar el stock. El total de la línea es el precio unitario mostrado multiplicado por la cantidad.

### 1.3 Clases de equivalencia

| Id | Clase | Tipo | Valores representativos |
|---|---|---|---|
| CE1 | Entero entre 1 y 300 | Válida | 1, 2, 5, 299, 300 |
| CE2 | Cero | Inválida | 0 |
| CE3 | Entero negativo | Inválida | -1 |
| CE4 | Mayor que el stock | Inválida | 301, 99999999999 |
| CE5 | Decimal | Inválida | 1.5 |
| CE6 | Texto no numérico | Inválida | abc |
| CE7 | Campo vacío | Inválida | (vacío) |
| CE8 | Cantidad acumulada mayor que el stock (carrito + nueva) | Inválida | 300 en el carrito + 1 |

**Valores límite:** 0, 1, 2 (límite inferior) y 299, 300, 301 (límite superior).

---

## 2. Escenarios ejecutados

Los escenarios marcados con † se agregaron después de la revisión con IA (sección 4).

| Id | Pantalla | Clase / límite | Dato | Resultado esperado | Resultado obtenido | Estado |
|---|---|---|---|---|---|---|
| CP-M04-001 | Producto | CE1, límite inferior | 1 | Se agrega 1 unidad, total €22.94 | 1 unidad, total €22.94 | Pasó |
| CP-M04-002 | Carrito | CE1, límite inferior + 1 | 2 | 2 unidades, total €45.88 (2 × €22.94) | 2 unidades, total **€45.89** | Falló (DEF-M04-001) |
| CP-M04-003 | Carrito | CE1, valor típico | 5 | 5 unidades, total €114.70 | 5 unidades, total **€114.72** | Falló (DEF-M04-001) |
| CP-M04-004 | Carrito | CE1, límite superior − 1 | 299 | 299 unidades, total €6,859.06 | 299 unidades, total **€6,860.26** | Falló (DEF-M04-001) |
| CP-M04-005 | Carrito | CE1, límite superior | 300 | 300 unidades, total €6,882.00 | 300 unidades, total **€6,883.20** | Falló (DEF-M04-001) |
| CP-M04-006 | Producto | CE1, límite superior | 300 | Se agregan 300 unidades; aviso "Last items in stock" | Aviso "Last items in stock"; el modal confirma 300 unidades, pero el total es **€6,883.20** | Falló (DEF-M04-001) |
| CP-M04-007 | Producto | CE4, límite superior + 1 | 301 | No se puede agregar; mensaje de stock insuficiente | Botón *Add to cart* deshabilitado y mensaje "There are not enough products in stock" | Pasó |
| CP-M04-008 | Carrito | CE4, límite superior + 1 | 301 (con 300 en el carrito) | Se rechaza y se mantiene la cantidad anterior | Mensaje "You can only buy 300 … Please adjust the quantity in your cart to continue."; se mantiene en 300 | Pasó |
| CP-M04-009 | Producto | CE8 | 1 (con 300 en el carrito) | Se rechaza por stock acumulado | Mensaje "You can only buy 300 …" y la ficha pasa a "Out-of-Stock" | Pasó |
| CP-M04-010 | Producto | CE2 | 0 | No se acepta 0; se mantiene el mínimo 1 | El campo cambia a 1 al escribir | Pasó |
| CP-M04-011 | Carrito | CE2 | 0 (con 1 en el carrito) | Se rechaza y se mantiene la cantidad anterior | El campo cambia a 1; el carrito sigue con 1 | Pasó |
| CP-M04-012 | Carrito | CE7 | Borrar el contenido (con 3 en el carrito) y pulsar Enter | Se rechaza y se mantiene la cantidad anterior (3) | Al borrar, el campo pone "1" solo; con Enter el carrito baja a **1** sin aviso | Falló (DEF-M04-002) |
| CP-M04-013 | Carrito | CE3 | -1 (con 3 en el carrito) | Se rechaza y se mantiene 3 | El "-" se convierte en "1" y el "1" se añade detrás: el carrito pasa a **11** | Falló (DEF-M04-002) |
| CP-M04-014 | Carrito | CE5 | 1.5 (con 5 en el carrito) | Se rechaza y se mantiene 5 | Se elimina el punto: el carrito pasa a **15** | Falló (DEF-M04-002) |
| CP-M04-015 | Carrito | CE6 | abc (con 5 en el carrito) | Se rechaza con un mensaje y se mantiene 5 | El campo pone "1"; con Enter el carrito baja a **1** sin aviso | Falló (DEF-M04-002) |
| CP-M04-016 | Carrito | CE1 escrito tras borrar | Borrar el contenido y escribir 7 | 7 unidades | El campo muestra **17** y el carrito queda con 17 | Falló (DEF-M04-002) |
| CP-M04-017 | Carrito | Botón "−" en el límite inferior | Pulsar "−" con 1 en el carrito | No baja de 1 (mínimo), o pide confirmar antes de eliminar | El producto se elimina del carrito sin confirmación (0 artículos) | Por confirmar |
| CP-M04-018 † | Carrito | CE1 con ceros a la izquierda | 007 | 7 unidades | El primer "0" se convierte en "1": el carrito pasa a **107** | Falló (DEF-M04-002) |
| CP-M04-019 † | Carrito | CE4, valor extremo | 99999999999 (con 107 en el carrito) | Se rechaza sin errores del servidor | Mensaje "You can only buy 300 …" y la cantidad se ajusta sola a 300 | Pasó |

**Resumen:** 19 escenarios ejecutados: 7 pasaron, 11 fallaron y 1 queda por confirmar.

**Observaciones**

- **CP-M04-017:** no hay un requisito escrito que diga si "−" en 1 debe eliminar el producto. Se consulta antes de reportarlo como defecto.
- **CP-M04-019:** el mensaje pide "ajustar la cantidad", pero la tienda ya la ajustó sola a 300. No bloquea la compra, pero el mensaje no coincide con lo que pasó.
- **El servidor sí valida:** si el valor llega mal (0, -1, "abc"), el servidor lo convierte en 1. Los fallos de CE3, CE5, CE6 y CE7 se producen en el navegador, antes de enviar el valor.

---

## 3. Reporte de defectos

### DEF-M04-001 — El total del carrito no coincide con el precio unitario mostrado × la cantidad

| Campo | Detalle |
|---|---|
| Módulo | M04 My Cart |
| Severidad | Media: el cliente paga un importe distinto al que puede calcular con los precios que ve |
| Prioridad | Alta: afecta al cobro de todos los productos con descuento porcentual y crece con la cantidad |
| Casos | CP-M04-002 a CP-M04-006 |
| Ambiente | `https://miniature-railway.demo.prestashop.com` — Chrome 155 (escritorio) |
| Evidencia | [DEF-M04-001-total-2-unidades.png](evidencias/DEF-M04-001-total-2-unidades.png) |

**Pasos para reproducir**

1. Abrir "Hummingbird printed t-shirt", talla S, color blanco (precio mostrado €22.94).
2. Agregarla al carrito y abrir el carrito.
3. Cambiar la cantidad a 2 y pulsar Enter.

**Resultado esperado:** total €45.88 (2 × €22.94).

**Resultado obtenido:** total €45.89. La diferencia crece con la cantidad:

| Cantidad | Esperado (precio mostrado × cantidad) | Obtenido | Diferencia |
|---|---|---|---|
| 2 | €45.88 | €45.89 | €0.01 |
| 5 | €114.70 | €114.72 | €0.02 |
| 17 | €389.98 | €390.05 | €0.07 |
| 299 | €6,859.06 | €6,860.26 | €1.20 |
| 300 | €6,882.00 | €6,883.20 | €1.20 |

**Causa probable:** el total se calcula con el precio sin redondear (€28.68 × 0.80 = €22.944), mientras que la pantalla muestra el precio redondeado a €22.94.

### DEF-M04-002 — Al borrar el campo cantidad, se inserta un "1" y lo que se escribe después se añade detrás

| Campo | Detalle |
|---|---|
| Módulo | M04 My Cart (también ocurre en la ficha de producto de M02) |
| Severidad | Alta: el carrito queda con una cantidad distinta a la escrita (7 → 17, 7 → 107) sin ningún aviso, y el cliente puede comprar y pagar de más |
| Prioridad | Alta: ocurre con la forma más habitual de corregir un número (borrar y escribir) |
| Casos | CP-M04-012 a CP-M04-016 y CP-M04-018 |
| Ambiente | `https://miniature-railway.demo.prestashop.com` — Chrome 155 (escritorio) |
| Evidencia | [DEF-M04-002-cantidad-17.png](evidencias/DEF-M04-002-cantidad-17.png) |

**Pasos para reproducir**

1. Tener "Hummingbird printed t-shirt" (talla S, blanco) en el carrito y abrir el carrito.
2. Hacer clic en el campo cantidad, seleccionar todo (Ctrl+A) y pulsar Retroceso.
3. Escribir `7` y pulsar Enter.

**Resultado esperado:** el carrito queda con 7 unidades.

**Resultado obtenido:** al borrar, el campo pone "1" solo y el cursor queda detrás. Al escribir `7` el campo muestra "17", y con Enter el carrito se actualiza a 17 unidades (€390.05) sin aviso.

**Mismo origen en otras entradas:**

| Se escribe | Queda en el carrito |
|---|---|
| `-1` | 11 |
| `1.5` | 15 |
| `007` | 107 |
| `abc` | 1 (se pierden las unidades anteriores) |

---

## 4. Validación de la cobertura con IA

**Pregunta hecha a la IA (Claude):**

> Revisa la cobertura de estos escenarios para el campo cantidad del carrito de PrestaShop (regla: entero entre 1 y el stock de 300; clases CE1 a CE8; escenarios CP-M04-001 a CP-M04-017). ¿Qué clases, límites o formas de entrada faltan?

**Respuesta resumida de la IA:**

1. Las clases CE1 a CE8 y los límites 0, 1, 2, 299, 300 y 301 están cubiertos en las dos pantallas.
2. Falta un número con **ceros a la izquierda** (`007`): es una entrada válida mal escrita y puede revelar cómo se limpia el campo.
3. Falta un **valor extremo** (`99999999999`) para ver si el servidor responde con error o desbordamiento.
4. Falta probar otra **combinación con distinto stock** (por ejemplo, talla XL o color negro), porque el límite superior depende de la combinación.
5. Falta un producto con **cantidad mínima mayor que 1**, que cambia el límite inferior.
6. Faltan las otras formas de entrada: **pegar** el valor (Ctrl+V) en lugar de escribirlo, y los **botones + y −** en el límite superior.

**Qué se decidió**

| Sugerencia | Decisión | Motivo |
|---|---|---|
| Ceros a la izquierda | Agregado y ejecutado (CP-M04-018) | Rápido de probar; confirmó otra variante de DEF-M04-002 |
| Valor extremo | Agregado y ejecutado (CP-M04-019) | Rápido de probar; el servidor lo maneja bien |
| Otra combinación con distinto stock | Pendiente para la v2 | Necesita revisar el stock de cada combinación en el back office |
| Cantidad mínima mayor que 1 | Pendiente para la v2 | La demo no trae ningún producto así; hay que configurarlo en el back office (M03) |
| Pegar el valor y botón + en 300 | Pendiente para la v2 | Mismo campo y misma validación; prioridad baja frente a lo ya encontrado |
