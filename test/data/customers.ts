import { requireEnv } from '../support/env';

export type Customer = {
  email: string;
  password: string;
  fullName: string;
};

export const defaultCustomer: Customer = {
  email: requireEnv('CUSTOMER_EMAIL'),
  password: requireEnv('CUSTOMER_PASSWORD'),
  fullName: requireEnv('CUSTOMER_NAME'),
};

export const wrongPassword = 'contrasena-incorrecta';

type ServerRejectedLogin = {
  id: string;
  title: string;
  email?: string;
  password?: string;
};

type BrowserBlockedLogin = {
  id: string;
  title: string;
  email?: string;
  password?: string;
  invalidField: 'email' | 'password';
  validity: 'valueMissing' | 'typeMismatch';
};

export const serverRejectedLogins: ServerRejectedLogin[] = [
  { id: 'LOGIN-NEG-01', title: 'contraseña incorrecta', password: wrongPassword },
  { id: 'LOGIN-NEG-02', title: 'correo no registrado', email: 'no-registrado@example.com' },
];

export const browserBlockedLogins: BrowserBlockedLogin[] = [
  { id: 'LOGIN-NEG-03', title: 'correo vacío', email: '', invalidField: 'email', validity: 'valueMissing' },
  { id: 'LOGIN-NEG-04', title: 'correo sin @', email: 'pubprestashop.com', invalidField: 'email', validity: 'typeMismatch' },
  { id: 'LOGIN-NEG-05', title: 'contraseña vacía', password: '', invalidField: 'password', validity: 'valueMissing' },
];
