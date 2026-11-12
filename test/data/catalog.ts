export type SortOption =
  | 'Price, low to high'
  | 'Price, high to low'
  | 'Name, A to Z'
  | 'Name, Z to A';

export const accessoriesCategory = {
  path: '/6-accessories',
  heading: 'Accessories',
} as const;

export const mugSearch = {
  term: 'mug',
  heading: 'Search results for "mug"',
} as const;
