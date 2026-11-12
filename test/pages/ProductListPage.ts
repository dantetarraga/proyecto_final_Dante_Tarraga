import type { Locator, Page } from '@playwright/test';
import type { SortOption } from '../data/catalog';
import { BasePage } from './BasePage';

export class ProductListPage extends BasePage {
  readonly heading: Locator;
  readonly productCount: Locator;
  readonly productTitles: Locator;
  readonly productPrices: Locator;
  readonly sortButton: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { level: 1 });
    this.productCount = page.locator('.products__count');
    this.productTitles = page.locator('.product-miniature__title');
    this.productPrices = page.locator('.product-miniature__price');
    this.sortButton = page.getByRole('button', { name: 'Change sort order' });
  }

  async goto(path: string) {
    await this.page.goto(path);
  }

  async chooseSort(option: SortOption) {
    await this.sortButton.click();
    await this.page.getByRole('menuitem', { name: `Sort products by: ${option}` }).click();
  }

  async sortBy(option: SortOption) {
    const listResponse = this.page.waitForResponse(
      (res) => res.url().includes('from-xhr') && res.ok(),
    );
    await this.chooseSort(option);
    await listResponse;
  }

  async prices(): Promise<number[]> {
    const texts = await this.productPrices.allTextContents();
    return texts.map((text) => Number(text.replace(/[^\d.]/g, '')));
  }
}
