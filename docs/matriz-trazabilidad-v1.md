# Matriz de trazabilidad v1

Conecta cada requisito con sus casos de prueba y con los defectos hallados, y muestra los huecos de cobertura.

- Proyecto: PrestaShop 9.2.0 (demo.prestashop.com), front office
- Fecha: 19-oct-2026
- Autor: Dante Tárraga
- Fuentes: [casos-manuales-v1.md](casos-manuales-v1.md) (CP-01 a CP-12), [accesibilidad-usabilidad-v1.md](accesibilidad-usabilidad-v1.md) (pruebas rápidas 1 a 5) y [reporte-defectos-v1.md](reporte-defectos-v1.md)
- Estados: Pasó, Falló y Por ejecutar (escrito, sin ejecutar)

La demo no publica un documento de requisitos, así que los requisitos están inferidos de la pantalla (la ficha del producto indica 300 unidades en stock y compra mínima 1) y del objetivo de calidad del Documento de Alcance (QA-ALC-001).

## 1. Matriz requisito → casos → defectos

| ID | Módulo | Requisito (inferido) | Casos | Estado de ejecución | Defectos | Observación |
|---|---|---|---|---|---|---|
| R1 | M04 | El total del carrito es precio × cantidad para cualquier cantidad válida (1 a 300). | CP-01, CP-02, CP-03, CP-04 | CP-01 pasó; CP-02 a CP-04 fallaron | DEF-01 | El total usa €22.944 (precio con descuento sin redondear). |
| R2 | M04 | El carrito no acepta cantidades fuera del rango 1 a 300 (0 o más que el stock). | CP-05, CP-06, CP-07 | Los 3 pasaron | — | Probado en la ficha del producto y en el carrito. |
| R3 | M04 | Ante una cantidad inválida (negativa, decimal, letras o vacía) el carrito no cambia el pedido sin avisar. | CP-08, CP-09, CP-10, CP-11, CP-12 | Los 5 fallaron | DEF-02 | CP-12 (007) salió de la revisión con IA. |
| R4 | M04, M05 | El cliente completa la compra: buscar, ver el detalle, agregar al carrito, iniciar sesión, checkout y confirmación. | SIN CASOS | Recorrido sin caso formal | — | HUECO DE COBERTURA. El flujo se recorrió el 07-oct-2026 (pedido TCPDKGKBS, €31.34) para mapear endpoints, pero no hay un caso con resultado esperado. |
| R5 | M05 | El checkout es utilizable con teclado y lector de pantalla (contraste, etiquetas y texto alternativo). | Pruebas rápidas 1 a 5 | 1 y 5 pasaron; 2, 3 y 4 fallaron | A11Y-01, A11Y-02, A11Y-03 | Lighthouse dio 100 y la revisión manual encontró 3 hallazgos. |
| R6 | M01 | El cliente crea una cuenta, inicia y cierra sesión, con validación de campos y mensajes de error claros. | SIN CASOS | Sin ejecutar | — | HUECO DE COBERTURA: módulo de prioridad alta. |
| R7 | M02 | El cliente encuentra un producto por búsqueda, categoría y filtros, y elige talla y color. | SIN CASOS | Sin ejecutar | — | HUECO DE COBERTURA: módulo de prioridad alta. |

## 2. Qué muestra la matriz

### Huecos de cobertura

- R6 (Log in y Sign up) y R7 (Catalog) no tienen casos. Son módulos de prioridad alta del alcance, así que son los huecos principales.
- R4 no tiene un caso formal: la compra completa se recorrió para el mapa de flujos, pero sin pasos, datos y resultado esperado escritos. Hay que convertir ese recorrido en un caso.
- R1 a R3 cubren solo un producto (Hummingbird printed t-shirt, S, blanco). Otra talla o color, o un producto con compra mínima mayor que 1, quedan para la v2.
- No hay casos sin requisito: los 12 casos del carrito y las 5 pruebas de accesibilidad quedaron asociados.

### Impacto de los defectos

- R3 concentra el defecto más grave (DEF-02, severidad alta): 5 de los 5 casos fallaron. La validación de la cantidad es la parte más débil del carrito.
- R1 tiene un defecto de cálculo (DEF-01) que crece con la cantidad (€1.20 de más con 300 unidades).
- R5 tiene tres hallazgos de accesibilidad; el más grave (A11Y-02) está en el inicio de sesión del checkout, dentro del flujo crítico.

### Cobertura de requisitos

| Medida | Cálculo | Resultado |
|---|---|---|
| Requisitos con al menos un caso | 4 de 7 (R1, R2, R3 y R5) | 57 % |
| Requisitos con algún caso ejecutado | 4 de 7 (R1, R2, R3 y R5) | 57 % |
| Requisitos sin casos | 3 de 7 (R4, R6 y R7) | 43 % |

Nota: la cobertura mide presencia de casos, no su calidad. R1 a R3 tienen casos de clases de equivalencia y valores límite (0, 1, 2, 299, 300, 301), pero un solo producto; R5 tiene pruebas manuales rápidas, no una auditoría completa.

## 3. Acciones derivadas

| N.º | Acción | Responsable | Estado |
|---|---|---|---|
| 1 | Diseñar y ejecutar casos de cuenta e inicio de sesión para cubrir R6. | Dante Tárraga | Pendiente |
| 2 | Diseñar y ejecutar casos de búsqueda, filtros y variantes para cubrir R7. | Dante Tárraga | Pendiente |
| 3 | Escribir la compra completa como caso formal (R4) y ejecutarlo. | Dante Tárraga | Pendiente |
| 4 | Repetir CP-02 y CP-11 con otra talla o color para ver si DEF-01 y DEF-02 dependen del producto. | Dante Tárraga | Pendiente |
| 5 | Confirmar con el instructor si el contraste de los números de pasos del checkout (1.49 : 1) se reporta. | Dante Tárraga | Pendiente |

## Cómo se mantiene la matriz

- Se actualiza cada vez que cambia un requisito, se agrega un caso o aparece un defecto.
- Los requisitos inferidos se anotan como tales en la observación.
- Cada defecto va en la fila del requisito que incumple.
- Los huecos se revisan antes de cerrar el ciclo de pruebas.
