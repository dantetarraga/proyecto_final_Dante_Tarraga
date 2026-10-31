import type { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class MyAccountPage extends BasePage {
  readonly heading: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { level: 1 });
  }
}
