# proyecto_final_Dante_Tarraga

Proyecto final del curso QA Automatizador: pruebas de calidad sobre la demo oficial de **PrestaShop**, una plataforma de comercio electrónico de código abierto.

| Aspecto | Detalle |
|---|---|
| Aplicación bajo prueba | https://demo.prestashop.com (front office y back office) |
| Versión observada | PrestaShop 9.2.0 |
| Repositorio de la aplicación | https://github.com/PrestaShop/PrestaShop |
| Documentación | https://devdocs.prestashop-project.org/9/ |
| Gestión de casos y defectos | [Jira, proyecto PS](https://dantetarraga.atlassian.net/jira/software/projects/PS/boards/2) |
| Autor | Dante Tárraga |

Cada visita a la demo crea una instancia temporal con datos de ejemplo, así que las cuentas y los pedidos de prueba se crean al inicio de cada sesión.

## Estructura

```
proyecto_final_Dante_Tarraga/
├── README.md                                        Semana 1 · presentación del proyecto
├── docs/
│   ├── Documento de Alcance de Calidad — PrestaShop.docx   Semana 1 · alcance de calidad
│   ├── Casos de prueba manuales v1 — PrestaShop.docx       Semana 2 · entregable
│   ├── casos-manuales-v1.md                                Semana 2 · campo cantidad del carrito
│   ├── accesibilidad-usabilidad-v1.md                      Semana 2 · cinco pruebas rápidas
│   ├── sesion-exploratoria-1.md                            Semana 3 · apoyo
│   ├── Plan de pruebas v1 — PrestaShop.docx                Semana 3 · entregable
│   ├── Matriz de trazabilidad v1 — PrestaShop.docx         Semana 3 · entregable
│   ├── Reporte de defectos v1 — PrestaShop.docx            Semana 3 · entregable
│   └── evidencias/                                         capturas de defectos, hallazgos y Jira
└── test/                                            scripts de prueba (desde el Módulo 2)
```

## Entregables

| Semana | Entregable | Archivo |
|---|---|---|
| 1 | Documento de alcance de calidad (v1.1, actualizado el 14-oct-2026 con el avance de la semana 2) | [Documento de Alcance de Calidad — PrestaShop.docx](docs/Documento%20de%20Alcance%20de%20Calidad%20%E2%80%94%20PrestaShop.docx) |
| 2 | **Documento de casos de prueba manuales v1** (flujos, 12 casos, defectos, accesibilidad, Jira y uso de IA) | [Casos de prueba manuales v1 — PrestaShop.docx](docs/Casos%20de%20prueba%20manuales%20v1%20%E2%80%94%20PrestaShop.docx) |
| 2 | Casos de prueba manuales v1 (campo cantidad del carrito: clases, escenarios y defectos) | [casos-manuales-v1.md](docs/casos-manuales-v1.md) (también en imágenes: `docs/evidencias/casos-manuales-v1-*.png`) |
| 2 | Pruebas de accesibilidad y usabilidad v1 (cinco pruebas rápidas sobre el flujo de compra) | [accesibilidad-usabilidad-v1.md](docs/accesibilidad-usabilidad-v1.md) (también en imagen: `docs/evidencias/accesibilidad-usabilidad-v1.png`) |
| 2 | Registro en Jira (proyecto PS: casos de prueba, defectos y Sprint 1) | [Tablero de Jira](https://dantetarraga.atlassian.net/jira/software/projects/PS/boards/2) (capturas: `docs/evidencias/JIRA-*.png`) |
| 3 | **Plan de pruebas v1** (alcance, enfoque, criterios verificables, entorno, cronograma y riesgos) | [Plan de pruebas v1 — PrestaShop.docx](docs/Plan%20de%20pruebas%20v1%20%E2%80%94%20PrestaShop.docx) |
| 3 | **Matriz de trazabilidad v1** (7 requisitos, casos, defectos, cobertura del 57 % y huecos) | [Matriz de trazabilidad v1 — PrestaShop.docx](docs/Matriz%20de%20trazabilidad%20v1%20%E2%80%94%20PrestaShop.docx) |
| 3 | **Reporte de defectos v1** (5 defectos con pasos, evidencia, severidad, requisito y Jira) | [Reporte de defectos v1 — PrestaShop.docx](docs/Reporte%20de%20defectos%20v1%20%E2%80%94%20PrestaShop.docx) |
| 3 | Sesión exploratoria 1 (charter sobre el registro de cuenta; notas por completar) | [sesion-exploratoria-1.md](docs/sesion-exploratoria-1.md) |
| 3 | Tabla de decisión v1 | Pendiente |

## Estado al 19-oct-2026

| Indicador | Valor |
|---|---|
| Casos ejecutados | 12 (M04 carrito): 4 pasaron, 8 fallaron |
| Pruebas de accesibilidad | 5 pruebas rápidas: 2 pasaron, 3 fallaron |
| Defectos documentados | 5 (DEF-01, DEF-02, A11Y-01, A11Y-02, A11Y-03), todos en Jira |
| Cobertura de requisitos | 4 de 7 (57 %); sin casos: compra completa, cuenta y catálogo |

## Flujo de trabajo

Cada entregable se agrega en una rama y se integra a `main` mediante pull request.
