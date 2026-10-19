# proyecto_final_Dante_Tarraga

Proyecto final del curso QA Automatizador: pruebas de calidad sobre la demo oficial de **PrestaShop**, una plataforma de comercio electrónico de código abierto.

| Aspecto | Detalle |
|---|---|
| Aplicación bajo prueba | https://demo.prestashop.com (front office y back office) |
| Versión observada | PrestaShop 9.2.0 |
| Repositorio de la aplicación | https://github.com/PrestaShop/PrestaShop |
| Documentación | https://devdocs.prestashop-project.org/9/ |
| Autor | Dante Tárraga |

Cada visita a la demo crea una instancia temporal con datos de ejemplo, así que las cuentas y los pedidos de prueba se crean al inicio de cada sesión.

## Estructura

```
├── docs/   # Documentación de QA (alcance, casos, plan de pruebas)
└── test/   # Casos y scripts de prueba
```

## Entregables

| Semana | Entregable | Archivo |
|---|---|---|
| 1 | Documento de alcance de calidad (v1.1, actualizado el 14-oct-2026 con el avance de la semana 2) | [docs/Documento de Alcance de Calidad — PrestaShop.docx](docs/Documento%20de%20Alcance%20de%20Calidad%20%E2%80%94%20PrestaShop.docx) |
| 2 | Mapa de flujos críticos (diagrama cliente-servidor, endpoints y plantilla de caso) | [docs/mapa-flujos-criticos.md](docs/mapa-flujos-criticos.md) |
| 2 | Casos de prueba manuales v1 (campo cantidad del carrito: clases, escenarios y defectos) | [docs/casos-manuales-v1.md](docs/casos-manuales-v1.md) (también en imágenes: `docs/evidencias/casos-manuales-v1-*.png`) |
| 2 | Pruebas de accesibilidad y usabilidad v1 (cinco pruebas rápidas sobre el flujo de compra y hallazgos) | [docs/accesibilidad-usabilidad-v1.md](docs/accesibilidad-usabilidad-v1.md) (también en imagen: `docs/evidencias/accesibilidad-usabilidad-v1.png`) |
| 2 | **Documento de casos de prueba manuales v1** (entregable: flujos, 12 casos, defectos, accesibilidad, Jira y uso de IA) | [docs/Casos de prueba manuales v1 — PrestaShop.docx](docs/Casos%20de%20prueba%20manuales%20v1%20%E2%80%94%20PrestaShop.docx) |
| 2 | Registro en Jira (proyecto PS: casos de prueba, defectos y Sprint 1) | [Tablero de Jira](https://dantetarraga.atlassian.net/jira/software/projects/PS/boards/2) |
| 3 | Matriz de trazabilidad v1 (7 requisitos, casos, defectos y cobertura) | [docs/matriz-trazabilidad-v1.md](docs/matriz-trazabilidad-v1.md) |
| 3 | Reporte de defectos v1 (5 defectos con pasos, evidencia, severidad y requisito) | [docs/reporte-defectos-v1.md](docs/reporte-defectos-v1.md) |
| 3 | Plan de pruebas v1 | Pendiente |
