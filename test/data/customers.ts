export type Customer = {
  email: string;
  password: string;
  fullName: string;
};

export const defaultCustomer: Customer = {
  email: process.env.CUSTOMER_EMAIL!,
  password: process.env.CUSTOMER_PASSWORD!,
  fullName: process.env.CUSTOMER_NAME!,
};

export const wrongPassword = 'contrasena-incorrecta';
