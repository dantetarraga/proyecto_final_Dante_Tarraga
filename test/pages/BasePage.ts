import type { Page } from '@playwright/test';
import { HeaderComponent } from '../components/HeaderComponent';

export class BasePage {
  readonly header: HeaderComponent;

  constructor(protected readonly page: Page) {
    this.header = new HeaderComponent(page);
  }
}
