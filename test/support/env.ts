export function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Falta la variable ${name} en el archivo .env (revisa .env.example)`);
  }
  return value;
}
