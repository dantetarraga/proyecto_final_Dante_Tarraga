import { readFileSync } from 'node:fs';

const report = JSON.parse(readFileSync(new URL('../results.json', import.meta.url), 'utf8'));

const tests = [];
const collect = (suite) => {
  for (const spec of suite.specs ?? []) {
    for (const test of spec.tests) tests.push({ file: spec.file, ...test });
  }
  for (const child of suite.suites ?? []) collect(child);
};
report.suites.forEach(collect);

const { expected, unexpected, flaky, skipped, duration, startTime } = report.stats;
const files = new Set(tests.map((test) => test.file)).size;
const projects = [...new Set(tests.map((test) => test.projectName))].join(', ');
const retried = tests.filter((test) => test.results.length > 1).length;
const executed = expected + unexpected + flaky;
const passRate = executed ? ((expected / executed) * 100).toFixed(1) : '0.0';
const seconds = (duration / 1000).toFixed(1);

const rows = [
  ['Fecha de la corrida', new Date(startTime).toLocaleString('es-PE')],
  ['Navegador', projects],
  ['Archivos de prueba', files],
  ['Pruebas ejecutadas', executed],
  ['Aprobadas', expected],
  ['Fallidas', unexpected],
  ['Inestables (flaky)', flaky],
  ['Omitidas', skipped],
  ['Pruebas reintentadas', retried],
  ['Tasa de aprobación', `${passRate} %`],
  ['Duración', `${seconds} s`],
];

console.log('| Métrica | Valor |');
console.log('|---|---:|');
for (const [name, value] of rows) console.log(`| ${name} | ${value} |`);
