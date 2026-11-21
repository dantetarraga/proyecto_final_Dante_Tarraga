export type ProductVariant = {
  size: 'S' | 'M' | 'L' | 'XL';
  color: 'White' | 'Black';
  quantity: number;
};

export type Product = {
  name: string;
  path: string;
  unitPrice: string;
};

export const hummingbirdTShirt = {
  name: 'Hummingbird printed t-shirt',
  path: '/1-1-hummingbird-printed-t-shirt.html',
  unitPrice: '€22.94',
} as const satisfies Product;

export const mugBestIsYetToCome = {
  name: 'Mug The best is yet to come',
  path: '/6-mug-the-best-is-yet-to-come.html',
  unitPrice: '€14.28',
} as const satisfies Product;

export const mugAdventureBegins = {
  name: 'Mug The adventure begins',
  path: '/7-mug-the-adventure-begins.html',
  unitPrice: '€14.28',
} as const satisfies Product;
