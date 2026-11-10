export type Carrier = 'Click and collect' | 'My carrier';
export type PaymentOption = 'Pay by bank wire' | 'Pay by Cash on Delivery' | 'Pay by Check';

export type SavedAddress = {
  alias: string;
  country: string;
};

export type CheckoutOrder = {
  id: string;
  title: string;
  address: SavedAddress;
  carrier: Carrier;
  payment: PaymentOption;
  expected: {
    paymentMethod: string;
    subtotal: string;
    shipping: string;
    total: string;
  };
};

export const franceAddress: SavedAddress = { alias: 'Mon adresse', country: 'France' };
export const usaAddress: SavedAddress = { alias: 'My address', country: 'United States' };

export const checkoutOrders: CheckoutOrder[] = [
  {
    id: 'CK-09-A',
    title: 'Francia, retiro en tienda y transferencia bancaria',
    address: franceAddress,
    carrier: 'Click and collect',
    payment: 'Pay by bank wire',
    expected: { paymentMethod: 'Bank transfer', subtotal: '€22.94', shipping: 'Free', total: '€22.94' },
  },
  {
    id: 'CK-09-B',
    title: 'Francia, envío al día siguiente y contra reembolso',
    address: franceAddress,
    carrier: 'My carrier',
    payment: 'Pay by Cash on Delivery',
    expected: { paymentMethod: 'Cash on delivery (COD)', subtotal: '€22.94', shipping: '€8.40', total: '€31.34' },
  },
  {
    id: 'CK-09-C',
    title: 'Estados Unidos, envío al día siguiente y cheque',
    address: usaAddress,
    carrier: 'My carrier',
    payment: 'Pay by Check',
    expected: { paymentMethod: 'Payments by check', subtotal: '€19.12', shipping: '€7.00', total: '€26.12' },
  },
];

export const invalidPostcodeAddress = {
  street: '10 Rue de Test',
  postcode: 'ABC12',
  city: 'Paris',
  error: 'Invalid postcode - should look like "NNNNN"',
} as const;
