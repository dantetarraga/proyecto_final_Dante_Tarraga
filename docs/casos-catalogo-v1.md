# Casos de prueba del catálogo v1

Requisito: R7 (M02 Catalog). El cliente encuentra un producto por búsqueda, categoría y filtros, y elige talla y color.

- Instancia: https://noxious-line.demo.prestashop.com
- Navegador: Chrome 155
- Fecha: 21-oct-2026, de 20:23 a 20:32
- Autor: Dante Tárraga

## 1. El catálogo

La tienda tiene 19 productos en 3 categorías: Clothes (Men y Women), Accessories (Stationery y Home Accessories) y Art.

- Filtros: disponibilidad, precio, categoría, color, material, marca y otros.
- Orden: por nombre, por precio, por fecha y otros.
- La Hummingbird printed t-shirt tiene talla (S, M, L, XL) y color (White, Black). Todas cuestan €22.94.

Regla de los filtros: dos opciones del mismo filtro se suman; dos filtros distintos se combinan.

## 2. Clases de la búsqueda

| Clase | Ejemplo | Resultado esperado |
|---|---|---|
| Palabra del nombre | mug | Los productos con esa palabra |
| En mayúsculas | MUG | Lo mismo que en minúsculas |
| Palabra incompleta | swea | El producto que la contiene |
| Palabra sin relación | dragon, xyz123 | Ningún resultado |
| Vacío | (vacío) | Un mensaje, sin error |
| HTML | &lt;b&gt;mug&lt;/b&gt; | Se muestra como texto |
| Muy largo | 300 letras | Ningún resultado, sin error |

## 3. Casos

| # | Qué pruebo | Esperado | Obtenido | Estado |
|---|---|---|---|---|
| CC-01 | Buscar "mug" | Los productos con "mug" | 5 productos | Pasó |
| CC-02 | Buscar "MUG" | Los mismos 5 | Los mismos 5 | Pasó |
| CC-03 | Buscar "swea" | El sweater | El sweater | Pasó |
| CC-04 | Buscar "dragon" | Ningún resultado | Los 19 productos de la tienda | Falló (DEF-05) |
| CC-05 | Buscar "xyz123" | Ningún resultado | 3 cuadernos | Falló (DEF-05) |
| CC-06 | Buscar vacío | Un mensaje | "Nothing to search for" | Pasó |
| CC-07 | Buscar "&lt;b&gt;mug&lt;/b&gt;" | Se ve como texto | Se ve como texto | Pasó |
| CC-08 | Buscar 300 letras | Ningún resultado, sin error | "No search results" | Pasó |
| CC-09 | Categoría Clothes | Productos de Men y Women | t-shirt y sweater | Pasó |
| CC-10 | Contador de Accessories | Igual al número de productos | "There are 11 products." y 11 productos | Pasó |
| CC-11 | Filtro Ceramic | Las 4 tazas | Las 4 tazas | Pasó |
| CC-12 | Ceramic + Polyester | 4 tazas + 3 cojines = 7 | 7 productos | Pasó |
| CC-13 | Ceramic + Polyester + White | Los 3 cojines y los filtros marcados | 3 cojines, pero Ceramic se quitó solo (ver O-1) | Pasó con observación |
| CC-14 | Ordenar por precio | De menor a mayor | Correcto (y al revés también) | Pasó |
| CC-15 | Ordenar por nombre | De A a Z | Correcto (y al revés también) | Pasó |
| CC-16 | T-shirt en talla L y color Black | Cambian la imagen y la URL; el precio sigue igual | Camiseta negra, URL nueva y €22.94 | Pasó |
| CC-17 | Agregar la L Black al carrito | El carrito guarda L y Black | "Size: L, Color: Black" ([captura](evidencias/CC-17-variante-l-black-carrito.png)) | Pasó |
| CC-18 | Abrir el enlace de la L Black | Abre en L y Black | Abre en L y Black | Pasó |

Resultado: 16 pasaron y 2 fallaron.

## 4. Defecto

**DEF-05: La búsqueda muestra productos que no tienen relación con lo que se escribe**

- Severidad: Media
- Prioridad: Media
- Pasos: escribir "dragon" en el buscador y pulsar Enter.
- Esperado: "No search results for "dragon"".
- Obtenido: muestra los 19 productos de la tienda. También pasa con "perro", "qwerty" y "xyz123". Con "kkkkkkkk" sí sale "No search results".
- Nota: puede ser la búsqueda aproximada de PrestaShop. Es una suposición: lo reviso en la documentación antes de registrarlo.
- Evidencia: [resultados](evidencias/DEF-M02-005-busqueda-dragon-19-productos.png) y [sugerencias](evidencias/DEF-M02-005-busqueda-dragon-sugerencias.png)

## 5. Observaciones (no las reporto todavía)

- **O-1:** con Ceramic y Polyester marcados, al agregar White se quitó Ceramic sin avisar. El resultado es correcto, pero se pierde un filtro elegido. Puede ser a propósito. Evidencia: [captura](evidencias/CC-13-filtros-color-composicion.png)
- **O-2:** el color White marcado solo cambia el borde a azul. Es fácil no ver que está activo.
- **O-3:** al filtrar, se ocultan los filtros que ya no sirven para reducir la lista. Parece a propósito.

## 6. Uso de la IA

Los casos los diseñó y ejecutó un agente de IA (Claude) en Chrome. Reviso los resultados antes de registrar DEF-05 en Jira.
