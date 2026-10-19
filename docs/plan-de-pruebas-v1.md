# Plan de pruebas v1

Dice qué se prueba en la demo de PrestaShop y qué no, cómo, con qué entorno, quién, cuándo y cuándo se da por terminado. Se basa en el Documento de Alcance de Calidad (QA-ALC-001, v1.1); lo que todavía no se sabe queda como "por completar".

## 1. Identificación

| Campo | Detalle |
|---|---|
| Proyecto | PrestaShop 9.2.0, demo oficial (front office y back office) |
| Autor | Dante Tárraga |
| Versión y fecha | v1 · 19-oct-2026 |
| Documento base | [Documento de Alcance de Calidad — PrestaShop.docx](Documento%20de%20Alcance%20de%20Calidad%20%E2%80%94%20PrestaShop.docx) (QA-ALC-001) |

## 2. Objetivo y alcance

Objetivo: verificar que un cliente pueda crear una cuenta o iniciar sesión, encontrar un producto, agregarlo al carrito y completar la compra sin errores y con totales correctos, que el flujo de compra sea usable con teclado y lector de pantalla, y que un empleado pueda ver ese pedido en el back office.

| Alcance | Elemento | Motivo |
|---|---|---|
| Dentro | M01 Log in y Sign up: crear cuenta, entrar y salir, validación de campos | Sin cuenta el cliente no compra con ella. Prioridad alta. |
| Dentro | M02 Catalog: búsqueda, categorías, filtros y variantes (talla y color) | Si el cliente no encuentra el producto, no compra. Prioridad alta. |
| Dentro | M04 My Cart: agregar, quitar, cambiar cantidades y cálculo del total | Un total incorrecto cobra mal al cliente. Prioridad alta. |
| Dentro | M05 Check Out: datos personales, dirección, transportista, pago y confirmación | Si falla, la tienda no vende. Prioridad alta. |
| Dentro | M03 Back Office: ver el pedido y cambiar su estado | La tienda debe poder procesar lo que vende. Prioridad media: se cubre después de los módulos de prioridad alta. |
| Dentro | Accesibilidad básica del flujo de compra | Las cinco pruebas rápidas sobre la ficha del producto, el carrito y el checkout. |
| Fuera | Rendimiento y carga | Se ven en el Módulo 4 del curso. |
| Fuera | Seguridad avanzada | Se ve en el Módulo 4 del curso. |
| Fuera | Automatización | Empieza en el Módulo 2; en el Módulo 1 todo es manual. |
| Fuera | Otros navegadores y móviles | Solo Chrome de escritorio. |
| Fuera | Cobro real | La demo usa métodos de pago de demostración; se prueba hasta la confirmación. |
| Fuera | Configuración avanzada del back office (módulos, temas, idiomas, monedas) | No forma parte del flujo de compra. |

Los requisitos se infirieron de la pantalla (por ejemplo, stock 300 y compra mínima 1 en la ficha del producto) porque la demo no publica un documento de requisitos. Ver [matriz-trazabilidad-v1.md](matriz-trazabilidad-v1.md).

## 3. Enfoque

| Tipo de prueba | Cómo se realiza |
|---|---|
| Casos manuales | Diseñados con partición de equivalencia y valores límite. Hechos para M04 (12 casos en [casos-manuales-v1.md](casos-manuales-v1.md)); M01, M02 y M05 por completar. |
| Tablas de decisión | Para reglas que combinan varias condiciones (por ejemplo, el checkout como invitado o con cuenta). Por completar en `tabla-decision-v1`. |
| Exploratoria | Sesiones con charter, notas etiquetadas (D, P, I, O) y balance de tiempo, de 60 a 90 minutos. La primera es [sesion-exploratoria-1.md](sesion-exploratoria-1.md), sobre el registro de cuenta (M01). |
| Accesibilidad | Las cinco pruebas rápidas: teclado, contraste, texto alternativo, formularios y nombres de enlaces y botones ([accesibilidad-usabilidad-v1.md](accesibilidad-usabilidad-v1.md)). Lighthouse solo como apoyo: dio 100 en el checkout y la revisión manual encontró 3 hallazgos. |
| Regresión | Repetir los casos que fallaron (CP-02 a CP-04 y CP-08 a CP-12) cuando se corrija un defecto. |
| Herramientas | Chrome 155 con DevTools (red, árbol de accesibilidad, estilos calculados) y Lighthouse; Jira (plan Free) para casos y defectos; Git y GitHub para versionar con rama y pull request. |

## 4. Criterios de entrada y de salida

| Criterio | Condición verificable | Estado al 19-oct-2026 |
|---|---|---|
| Entrada | La demo responde y se puede crear una cuenta o iniciar sesión. | Sí |
| Entrada | Los datos base están definidos (Hummingbird printed t-shirt, S, blanco, €22.94). | Sí |
| Entrada | El repositorio y el tablero de Jira (proyecto PS) están creados. | Sí |
| Salida | Los módulos de prioridad alta (M01, M02, M04 y M05) tienen casos diseñados y ejecutados. | No: solo M04 tiene casos; M05 se probó en accesibilidad. |
| Salida | La matriz de trazabilidad no tiene requisitos sin casos. | No: R4, R6 y R7 sin casos. |
| Salida | Hay al menos 5 defectos documentados con pasos, esperado, obtenido, severidad y evidencia. | Sí: 5 en [reporte-defectos-v1.md](reporte-defectos-v1.md). |
| Salida | Se hizo al menos una sesión exploratoria con notas. | Por completar. |
| Salida | No quedan defectos de severidad crítica sin documentar. | Sí: el más grave (DEF-02) es de severidad alta. |

## 5. Entorno y datos de prueba

| Elemento | Detalle |
|---|---|
| Entorno | Demo pública https://demo.prestashop.com. Cada visita crea una instancia temporal; se anota su URL (por ejemplo, miniature-railway, stormy-flock). |
| Navegador | Google Chrome 155 de escritorio (1440 × 900), el mismo durante todo el módulo. |
| Cliente | Cuenta propia creada al inicio de cada sesión, porque la instancia es temporal. |
| Visitante | Sin cuenta: navegar y comprar como invitado. |
| Administrador | demoen@prestashop.com (SuperAdmin); la demo inicia sesión sola en el back office. Las contraseñas no se copian en el repositorio. |
| Producto base | Hummingbird printed t-shirt, talla S, color blanco (€22.94; stock 300; compra mínima 1). |
| Valores del campo cantidad | 0, 1, 2, 299, 300, 301, -1, 1.5, abc, vacío y 007. |
| Evidencias | Capturas en `docs/evidencias/` y adjuntas al defecto en Jira. |

## 6. Roles y cronograma

| Actividad | Responsable | Fecha |
|---|---|---|
| Documento de alcance y repositorio | Dante Tárraga | 30-sep al 05-oct-2026 (hecho) |
| Casos manuales v1 (M04) y registro en Jira | Dante Tárraga | 09-oct-2026 (hecho) |
| Pruebas de accesibilidad y usabilidad v1 | Dante Tárraga | 14-oct-2026 (hecho) |
| Sesión exploratoria 1 (M01) | Dante Tárraga | Por completar |
| Plan de pruebas, matriz de trazabilidad y reporte de defectos | Dante Tárraga | 19-oct-2026 |
| Casos de M01, M02 y M05 | Dante Tárraga | Por completar |
| Revisión del plan | Instructor (líder de QA) y pares | Por completar |

## 7. Riesgos y mitigación

| Riesgo | Mitigación |
|---|---|
| Cada visita crea una instancia nueva y los datos se pierden (ya pasó: tres instancias distintas y una respondió 502). | Anotar la URL de la instancia, crear los datos al inicio de cada sesión y guardar capturas como evidencia. |
| El sitio está lento o no disponible. | Registrar la hora, reintentar más tarde y avanzar con documentación mientras tanto. |
| Un comportamiento parece defecto pero es una decisión de diseño (por ejemplo, el "−" que elimina el producto con 1 unidad). | Revisar la documentación de PrestaShop y marcarlo "por confirmar" antes de reportarlo. |
| No alcanza el tiempo para todos los módulos. | Priorizar M04 y M05, luego M01 y M02, y dejar M03 declarado como no cubierto. |
| Lighthouse da un puntaje alto aunque haya problemas. | Aplicar siempre las cinco pruebas rápidas manuales y no reportar solo con la herramienta. |
| Un defecto no se reproduce en otra instancia. | Anotar pasos y valores exactos; si no se reproduce, registrarlo como "No reproducible" con lo intentado. |

## 8. Entregables

- Documento de alcance de calidad (QA-ALC-001)
- Casos de prueba manuales v1: [casos-manuales-v1.md](casos-manuales-v1.md) y el `.docx`
- Pruebas de accesibilidad y usabilidad v1: [accesibilidad-usabilidad-v1.md](accesibilidad-usabilidad-v1.md)
- Plan de pruebas v1 (este documento)
- Matriz de trazabilidad v1: [matriz-trazabilidad-v1.md](matriz-trazabilidad-v1.md)
- Reporte de defectos v1: [reporte-defectos-v1.md](reporte-defectos-v1.md)
- Notas de las sesiones exploratorias: [sesion-exploratoria-1.md](sesion-exploratoria-1.md)
- Tabla de decisión v1: por completar
