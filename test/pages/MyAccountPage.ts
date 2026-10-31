import type { Locator, Page } from '@playwright/test';

export class MyAccountPage {
  readonly heading: Locator;

  constructor(page: Page) {
    this.heading = page.getByRole('heading', { level: 1 });
  }
}
