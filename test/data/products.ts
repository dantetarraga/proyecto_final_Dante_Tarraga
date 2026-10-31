export type ProductVariant = {
  size: 'S' | 'M' | 'L' | 'XL';
  color: 'White' | 'Black';
  quantity: number;
};

export const hummingbirdTShirt = {
  name: 'Hummingbird printed t-shirt',
  path: '/1-1-hummingbird-printed-t-shirt.html',
  unitPrice: '€22.94',
} as const;
