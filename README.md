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
│   ├── casos-catalogo-v1.md                                Semana 3 · casos del catálogo
│   ├── casos-checkout-v1.md                                Semana 3 · checkout y compra completa
│   ├── sesion-exploratoria-1.md                            Semana 3 · sesión exploratoria
│   ├── Plan de pruebas v1 — PrestaShop.docx                Semana 3 · entregable
│   ├── Matriz de trazabilidad v1 — PrestaShop.docx         Semana 3 · entregable
│   ├── Reporte de defectos v1 — PrestaShop.docx            Semana 3 · entregable
│   ├── Tabla de decisión v1 — PrestaShop.docx              Semana 3 · entregable
│   └── evidencias/                                         capturas de defectos, hallazgos, Jira y reportes de la suite
├── playwright.config.ts                             Módulo 2 · configuración de Playwright y reporteros
├── allurerc.mjs                                     Módulo 2 · configuración del reporte Allure
├── scripts/metrics.mjs                              Módulo 2 · métricas de la última corrida
├── .env.example                                     plantilla de variables de entorno
└── test/                                            Módulo 2 · pruebas automatizadas
    ├── e2e/            specs: login.spec.ts, carrito.spec.ts, catalogo.spec.ts y checkout.spec.ts
    ├── pages/          Page Objects (BasePage, LoginPage, MyAccountPage, ProductPage, ProductListPage, CartPage, CheckoutPage, OrderConfirmationPage)
    ├── components/     componentes compartidos (HeaderComponent, SearchBarComponent, CartModalComponent)
    ├── fixtures/       test extendido con los Page Objects, la sesión guardada por worker y el carrito del cliente
    ├── data/           datos de prueba (cliente desde .env, casos de login, productos, variantes, catálogo y pedidos del checkout)
    └── support/        utilidades (requireEnv valida las variables del .env)
```

## Suite web automatizada (Playwright)

Suite end-to-end sobre la tienda de PrestaShop: autenticación, carrito, catálogo y checkout completo hasta el pedido confirmado. Usa TypeScript, Page Object Model, fixtures y datos en archivos aparte, y deja un reporte de cada ejecución.

### Requisitos

- Node.js 24 (el repositorio trae `.nvmrc`; con nvm: `nvm use`)
- npm
- Chromium de Playwright (se instala con el comando de abajo)

### Instalación

```bash
npm install
npx playwright install chromium
cp .env.example .env
```

### Configuración del entorno

| Variable | Uso |
|---|---|
| `BASE_URL` | URL de la tienda temporal de la demo |
| `CUSTOMER_EMAIL`, `CUSTOMER_PASSWORD`, `CUSTOMER_NAME` | Cliente de ejemplo de la demo (`pub@prestashop.com`) |

La demo crea una instancia temporal por visita. Abre https://demo.prestashop.com en el navegador, copia la URL de la tienda (por ejemplo `https://algo-algo.demo.prestashop.com`) en `BASE_URL` y deja esa pestaña abierta mientras corren las pruebas: al cerrarla, la instancia se apaga. Si falta una variable, la suite se detiene con un mensaje que la nombra (`requireEnv`). El archivo `.env` no se versiona.

### Scripts

| Comando | Uso |
|---|---|
| `npm test` | Corre toda la suite en Chromium (`--project=chromium`) sin interfaz y excluye la demo `@flaky`. Antes borra los resultados de Allure de la corrida anterior |
| `npm run test:smoke` | Solo las pruebas etiquetadas `@smoke` |
| `npm run test:headed` | La suite con el navegador visible |
| `npm run test:flaky` | Corre 10 veces, sin reintentos, la demo de prueba inestable (`@flaky`) |
| `npm run report` | Abre el reporte HTML de Playwright de la última corrida |
| `npm run report:allure` | Genera el reporte Allure (con el historial de corridas) y lo abre |
| `npm run metrics` | Imprime la tabla de métricas de la última corrida, leída de `results.json` |
| `npm run typecheck` | Revisa los tipos de TypeScript |

### Reportes

Cada corrida deja cuatro salidas; ninguna se versiona:

| Salida | Dónde | Para qué |
|---|---|---|
| `list` | Terminal | Una línea por prueba mientras corre |
| HTML de Playwright | `playwright-report/` (`open: "never"`) | Pasos, capturas, video y trace de cada prueba |
| JSON | `results.json` | Los mismos resultados para leerlos con código (`npm run metrics`) |
| Allure | `allure-results/` → `allure-report/` | Resumen con gráficos; `allure-history.jsonl` acumula las corridas y muestra la tendencia |

Ante un fallo quedan la captura (`screenshot: "only-on-failure"`) y el video, y el trace se graba en el primer reintento (`trace: "on-first-retry"`). Las pruebas del checkout dividen el flujo en pasos (`test.step`) y adjuntan la captura del pedido confirmado.

### Métricas de la última corrida

Salida de `npm run metrics` tras `npm test`:

| Métrica | Valor |
|---|---:|
| Fecha de la corrida | 20/11/2026, 9:24:42 a. m. |
| Navegador | chromium |
| Archivos de prueba | 4 |
| Pruebas ejecutadas | 20 |
| Aprobadas | 20 |
| Fallidas | 0 |
| Inestables (flaky) | 0 |
| Omitidas | 0 |
| Pruebas reintentadas | 0 |
| Tasa de aprobación | 100.0 % |
| Duración | 74.0 s |

Evidencia de la corrida: [reporte HTML](docs/evidencias/AUTO-01-reporte-suite-verde.png), [pasos de CK-09-A](docs/evidencias/AUTO-02-reporte-checkout-pasos.png) y [resumen de Allure](docs/evidencias/AUTO-03-allure-resumen.png).

### Casos automatizados

| Spec | Caso |
|---|---|
| `login.spec.ts` | Login con credenciales válidas (`@smoke`) |
| `login.spec.ts` | Data-driven: contraseña incorrecta y correo no registrado muestran "Authentication failed." |
| `login.spec.ts` | Data-driven: correo vacío, correo sin @ y contraseña vacía los bloquea el navegador (validación HTML5) |
| `login.spec.ts` | La sesión guardada abre Mi cuenta sin pasar por el formulario |
| `carrito.spec.ts` | Visitante agrega el producto con la variante por defecto (`@smoke`) |
| `carrito.spec.ts` | Visitante agrega talla M, color Black y 2 unidades |
| `carrito.spec.ts` | Cliente con sesión iniciada agrega el producto y lo ve en el carrito (`@smoke`) |
| `catalogo.spec.ts` | El autocompletado sugiere solo productos del término (`waitForResponse`) |
| `catalogo.spec.ts` | Buscar con Enter abre los resultados (`waitForURL`, `@smoke`) |
| `catalogo.spec.ts` | Ordenar por precio de menor a mayor (`expect.poll`) y de mayor a menor (`waitForResponse` + `toPass`) |
| `catalogo.spec.ts` | Demo inestable: misma ordenación con espera fija (`@flaky`, fuera de `npm test`) |
| `checkout.spec.ts` | Data-driven CK-09-A a CK-09-C: compra completa con 3 combinaciones de dirección, envío y pago (`@smoke`) |
| `checkout.spec.ts` | Data-driven CK-09-D: compra de 3 productos; valida cada producto, subtotal, envío y total (`@smoke`) |
| `checkout.spec.ts` | CK-05: un código postal inválido muestra el error de formato y no deja continuar |
| `checkout.spec.ts` | CK-08: sin aceptar los términos, "Place Order" queda deshabilitado |

### Decisiones de diseño

**Flujo transaccional data-driven.** `checkout.spec.ts` recorre carrito → sesión → dirección → envío → pago → confirmación. Cada fila de `checkoutOrders` en `test/data/checkout.ts` genera un test con sus productos, dirección, transportista, método de pago y montos esperados: para probar otra combinación se agrega una fila, sin tocar el código. La fixture `customerCart` parte de la sesión guardada y vacía el carrito; los pedidos con varios productos se marcan con `test.slow()`.

**Sesión guardada.** La fixture `customerSession` inicia sesión por la UI una sola vez por worker y guarda las cookies con `storageState`. Los tests que piden `loggedIn` reciben esas cookies y empiezan con la sesión abierta, sin repetir el login.

**Esperas condicionales y pruebas inestables.** Las pruebas esperan eventos concretos de la tienda (la respuesta AJAX, la URL o el valor esperado) en lugar de pausas fijas. La demo `@flaky` hace lo contrario a propósito: espera 1,8 s cuando la tienda tarda entre 1,5 y 2,2 s, así que el mismo código pasa unas veces y falla otras.

**Reintentos.** La configuración permite 1 reintento, pero solo para las pruebas que no crean pedidos. `checkout.spec.ts` corre sin reintentos (`test.describe.configure({ retries: 0 })`): reintentar una compra crearía un segundo pedido y escondería el fallo real.

### Checklist del entregable

- [x] Autenticación: login válido, 5 casos inválidos data-driven y sesión guardada
- [x] Dos flujos adicionales: carrito y checkout completo hasta el pedido confirmado (más el catálogo)
- [x] Mantenibilidad: Page Objects, componentes, fixtures y datos fuera de las pruebas
- [x] Data-driven: login inválido y pedidos del checkout leídos de `test/data/`
- [x] Configuración: reporter HTML con `open: "never"`, `screenshot: "only-on-failure"` y `trace: "on-first-retry"`
- [x] `.gitignore`: `playwright-report/`, `test-results/`, `results.json`, salidas de Allure y `.env`
- [x] Corrida completa con `--project=chromium` (`npm test`) y reporte abierto (`npm run report`, `npm run report:allure`)
- [x] Reintentos solo en pruebas que no crean pedidos; checkout sin reintentos
- [x] Evidencia del reporte en `docs/evidencias/` (AUTO-01 a AUTO-03)
- [x] Métricas medidas con `npm run metrics`
- [x] README con requisitos, instalación, configuración, scripts, reportes y métricas
- [x] Tipos revisados con `npm run typecheck`

## Entregables

| Semana | Entregable | Archivo |
|---|---|---|
| 1 | Documento de alcance de calidad (v1.2, actualizado el 21-oct-2026 con el avance de la semana 3) | [Documento de Alcance de Calidad — PrestaShop.docx](docs/Documento%20de%20Alcance%20de%20Calidad%20%E2%80%94%20PrestaShop.docx) |
| 2 | **Documento de casos de prueba manuales v1** (flujos, 12 casos, defectos, accesibilidad, Jira y uso de IA) | [Casos de prueba manuales v1 — PrestaShop.docx](docs/Casos%20de%20prueba%20manuales%20v1%20%E2%80%94%20PrestaShop.docx) |
| 2 | Casos de prueba manuales v1 (campo cantidad del carrito: clases, escenarios y defectos) | [casos-manuales-v1.md](docs/casos-manuales-v1.md) (también en imágenes: `docs/evidencias/casos-manuales-v1-*.png`) |
| 2 | Pruebas de accesibilidad y usabilidad v1 (cinco pruebas rápidas sobre el flujo de compra) | [accesibilidad-usabilidad-v1.md](docs/accesibilidad-usabilidad-v1.md) (también en imagen: `docs/evidencias/accesibilidad-usabilidad-v1.png`) |
| 2 | Registro en Jira (proyecto PS: casos de prueba, defectos y Sprint 1) | [Tablero de Jira](https://dantetarraga.atlassian.net/jira/software/projects/PS/boards/2) (capturas: `docs/evidencias/JIRA-*.png`) |
| 3 | **Plan de pruebas v1** (alcance, enfoque, criterios, entorno, cronograma y riesgos) | [Plan de pruebas v1 — PrestaShop.docx](docs/Plan%20de%20pruebas%20v1%20%E2%80%94%20PrestaShop.docx) |
| 3 | **Matriz de trazabilidad v1** (7 requisitos, cobertura del 100 %) | [Matriz de trazabilidad v1 — PrestaShop.docx](docs/Matriz%20de%20trazabilidad%20v1%20%E2%80%94%20PrestaShop.docx) |
| 3 | **Reporte de defectos v1** (8 defectos y un hallazgo en dos versiones) | [Reporte de defectos v1 — PrestaShop.docx](docs/Reporte%20de%20defectos%20v1%20%E2%80%94%20PrestaShop.docx) |
| 3 | **Tabla de decisión v1** (registro de cuenta: 3 condiciones y 4 casos) | [Tabla de decisión v1 — PrestaShop.docx](docs/Tabla%20de%20decisi%C3%B3n%20v1%20%E2%80%94%20PrestaShop.docx) |
| 3 | Sesión exploratoria 1 (registro de cuenta, 2 defectos) | [sesion-exploratoria-1.md](docs/sesion-exploratoria-1.md) (capturas: `docs/evidencias/DEF-M01-*.png`) |
| 3 | Casos del catálogo v1 (18 casos, 1 defecto) | [casos-catalogo-v1.md](docs/casos-catalogo-v1.md) (capturas: `docs/evidencias/DEF-M02-*.png` y `CC-*.png`) |
| 3 | Casos del checkout v1 (9 casos y compra completa) | [casos-checkout-v1.md](docs/casos-checkout-v1.md) (captura del pedido: `docs/evidencias/CK-09-*.png`) |
| Módulo 2 | **Suite con el flujo transaccional automatizado (data-driven)** | `test/` y `npm test` (evidencia: [pantalla principal del reporte](docs/evidencias/AUTO-01-reporte-suite-verde.png) y [pasos de CK-09-A con la captura del pedido](docs/evidencias/AUTO-02-reporte-checkout-pasos.png)) |
| Módulo 2 | **Suite web completa con reporte de ejecución** (métricas, README, scripts y checklist) | [Suite web automatizada](#suite-web-automatizada-playwright) (evidencia: [resumen de Allure, 20 de 20](docs/evidencias/AUTO-03-allure-resumen.png)) |

## Estado al 21-oct-2026

| Indicador | Valor |
|---|---|
| Casos ejecutados | 40: 29 pasaron y 11 fallaron (3 más por ejecutar) |
| Pruebas de accesibilidad | 5 pruebas rápidas: 2 pasaron, 3 fallaron |
| Sesiones exploratorias | 1 (registro de cuenta) |
| Defectos documentados | 8, todos en Jira (PS-3, PS-4 y PS-17 a PS-22) |
| Cobertura de requisitos | 7 de 7 (100 %) |

## Flujo de trabajo

Cada entregable se agrega en una rama y se integra a `main` mediante pull request.
