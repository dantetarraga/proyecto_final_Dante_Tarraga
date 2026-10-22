# Casos de prueba del checkout v1

Requisito: R4 (M04 y M05). El cliente completa la compra: agrega el producto, llena sus datos, elige el envío, paga y recibe la confirmación.

- Instancia: https://previous-wrist.demo.prestashop.com
- Navegador: Chrome 155
- Fecha: 21-oct-2026, de 21:00 a 21:10
- Autor: Dante Tárraga
- Compra como invitado con datos ficticios: Mrs. Ana Prueba, qa.invitado.2110@example.com, 10 Rue de Prueba, 75001 Paris (Francia).
- Producto: Hummingbird printed t-shirt, talla S, color blanco (€22.94).

## 1. Casos

| # | Paso | Qué pruebo | Esperado | Obtenido | Estado |
|---|---|---|---|---|---|
| CK-01 | 1. Datos personales | Correo "ana@" (sin la validación del navegador) | "Invalid format." en el correo | Error 500 y página en blanco | Falló (DEF-03) |
| CK-02 | 1. Datos personales | Nombre "Juan3" | "Invalid format." en el nombre | "Invalid format." | Pasó |
| CK-03 | 1. Datos personales | Sin marcar las casillas obligatorias | "Required field" en cada casilla | "Required field" en las dos | Pasó |
| CK-04 | 1. Datos personales | Datos válidos | Pasa a Addresses | Pasa a Addresses | Pasó |
| CK-05 | 2. Dirección | Código postal "ABC12" | Un error que diga el formato | "Invalid postcode - should look like "NNNNN"" y no se borra lo escrito | Pasó |
| CK-06 | 2. Dirección | Código postal 75001 | Pasa a Shipping Method | Pasa a Shipping Method | Pasó |
| CK-07 | 3. Envío | Elegir "My carrier" | Envío €8.40 y total €31.34 | Envío €8.40 y total €31.34 | Pasó |
| CK-08 | 4. Pago | Elegir pago por transferencia sin aceptar los términos | "Place Order" deshabilitado | Deshabilitado | Pasó |
| CK-09 | 4. Pago | Aceptar los términos y pulsar "Place Order" | "Your order is confirmed", con referencia y total | Pedido OJJKGSAGV, €31.34 ([captura](evidencias/CK-09-pedido-confirmado-OJJKGSAGV.png)) | Pasó |

Resultado: 8 pasaron y 1 falló. CK-09 es la compra completa de R4.

Nota: el envío dice "Free" hasta que se elige el transportista, porque la primera opción es "Click and collect" (recoger en tienda).

## 2. Repetición con otra variante (acción 4 de la matriz)

Para ver si DEF-01 y DEF-02 dependen del producto, repetí CP-02 y CP-11 con la camiseta en talla M y color negro.

| Caso | Dato | Esperado | Obtenido | Estado |
|---|---|---|---|---|
| CP-02 | Cantidad 2 | Total €45.88 | Total €45.89 ([captura](evidencias/DEF-M04-001-total-2-unidades-M-black.png)) | Falló (DEF-01) |
| CP-11 | Borrar la cantidad y escribir 7 | 7 unidades | 17 unidades ([captura](evidencias/DEF-M04-002-cantidad-17-M-black.png)) | Falló (DEF-02) |

Conclusión: los dos defectos se repiten con otra talla y color. No dependen de la variante.

## 3. Defectos reproducidos y registrados

En la misma instancia reproduje DEF-03, DEF-04 y DEF-05 (21:01). Los registré en Jira, dentro de PS Sprint 1 y con su captura:

| Defecto | Jira |
|---|---|
| DEF-03 · Un correo que termina en "@" da error 500 (también en el checkout) | PS-20 |
| DEF-04 · Una fecha futura da un mensaje de formato | PS-21 |
| DEF-05 · La búsqueda muestra productos que no tienen relación | PS-22 |

## 4. Uso de la IA

Los casos los ejecutó un agente de IA (Claude) en Chrome, con datos ficticios. La compra se hizo con el pago de demostración de la tienda; no hubo cobro real.
