import type { Locator, Page } from '@playwright/test';
import { SearchBarComponent } from './SearchBarComponent';

export class HeaderComponent {
  readonly cartBadge: Locator;
  readonly searchBar: SearchBarComponent;

  constructor(private readonly page: Page) {
    this.cartBadge = page.locator('.blockcart .header-block__badge');
    this.searchBar = new SearchBarComponent(page);
  }

  accountMenu(fullName: string): Locator {
    return this.page.getByRole('button', { name: `View my account (${fullName})` });
  }
}
