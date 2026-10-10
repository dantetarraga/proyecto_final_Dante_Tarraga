# Casos de prueba manuales v1

Campo elegido: cantidad del carrito (M04 My Cart).

- Instancia: https://miniature-railway.demo.prestashop.com
- Producto: Hummingbird printed t-shirt, talla S, color blanco (€22.94)
- Navegador: Chrome 155
- Fecha: 09-oct-2026
- Autor: Dante Tárraga

Versión en imagen: [1. Campo](casos-manuales-v1-1-analisis-campo.png) · [2. Escenarios](casos-manuales-v1-2-escenarios.png) · [3. Defectos](casos-manuales-v1-3-defectos.png) · [4. Validación con IA](casos-manuales-v1-4-validacion-ia.png)

## 1. Campo y regla

Revisé los campos de registro (contraseña, fecha de nacimiento) y la cantidad. Elegí la cantidad porque está en el flujo de compra y tiene límites claros. En la página el producto tiene 300 unidades en stock y la compra mínima es 1.

Regla: la cantidad debe ser un número entero entre 1 y 300 (el stock). El total es precio × cantidad.

| Clase | Tipo | Ejemplo |
|---|---|---|
| Entero entre 1 y 300 | Válida | 1, 2, 299, 300 |
| Cero o negativo | Inválida | 0, -1 |
| Mayor que el stock | Inválida | 301 |
| Decimal | Inválida | 1.5 |
| Letras | Inválida | abc |
| Vacío | Inválida | (vacío) |

Valores límite: 0, 1, 2, 299, 300, 301.

## 2. Escenarios

| # | Dato | Esperado | Obtenido | Estado |
|---|---|---|---|---|
| 1 | 1 | 1 unidad, total €22.94 | 1 unidad, total €22.94 | Pasó |
| 2 | 2 | Total €45.88 | Total €45.89 | Falló (DEF-01) |
| 3 | 299 | Total €6,859.06 | Total €6,860.26 | Falló (DEF-01) |
| 4 | 300 | Total €6,882.00 | Total €6,883.20 | Falló (DEF-01) |
| 5 | 301 en la ficha del producto | No deja agregar | Botón deshabilitado y mensaje "There are not enough products in stock" | Pasó |
| 6 | 301 en el carrito | No deja cambiar | Mensaje "You can only buy 300..." y se queda en 300 | Pasó |
| 7 | 0 | No acepta 0 | El campo cambia a 1 | Pasó |
| 8 | -1 (había 3) | No acepta, se queda en 3 | El carrito queda en 11 | Falló (DEF-02) |
| 9 | 1.5 (había 5) | No acepta, se queda en 5 | El carrito queda en 15 | Falló (DEF-02) |
| 10 | abc (había 5) | No acepta, se queda en 5 | El carrito baja a 1 sin aviso | Falló (DEF-02) |
| 11 | Borrar y escribir 7 | 7 unidades | 17 unidades | Falló (DEF-02) |
| 12 | 007 | 7 unidades | 107 unidades | Falló (DEF-02) |

Resultado: 4 pasaron y 8 fallaron.

## 3. Defectos

**DEF-01: El total no coincide con precio × cantidad**

- Severidad: Media
- Prioridad: Alta
- Pasos: agregar la camiseta al carrito y cambiar la cantidad a 2.
- Esperado: €45.88 (2 × €22.94).
- Obtenido: €45.89. Con 300 unidades la diferencia es €1.20.
- Nota: parece que calcula con €22.944 (precio con descuento sin redondear) y en pantalla muestra €22.94.
- Evidencia: [evidencias/DEF-M04-001-total-2-unidades.png](evidencias/DEF-M04-001-total-2-unidades.png)

**DEF-02: Al borrar la cantidad aparece un 1 y lo que escribo se suma detrás**

- Severidad: Alta
- Prioridad: Alta
- Pasos: en el carrito, seleccionar la cantidad, borrarla y escribir 7. Pulsar Enter.
- Esperado: 7 unidades.
- Obtenido: el campo pone 1 solo al borrar y queda 17. Lo mismo pasa con -1 (11), 1.5 (15) y 007 (107). No sale ningún mensaje.
- Evidencia: [evidencias/DEF-M04-002-cantidad-17.png](evidencias/DEF-M04-002-cantidad-17.png)

## 4. Validación con IA

Le pedí a la IA que revisara si faltaban casos. Me sugirió:

- Probar con ceros a la izquierda (007). Lo agregué (escenario 12) y salió otro caso del DEF-02.
- Probar otra talla o color, porque el stock puede ser distinto. Lo dejo para la v2.
- Probar un producto con compra mínima mayor que 1. La demo no tiene uno, lo dejo para la v2.

También vi que con 1 unidad el botón "−" borra el producto del carrito sin preguntar. No lo reporto todavía porque no sé si es así a propósito.
