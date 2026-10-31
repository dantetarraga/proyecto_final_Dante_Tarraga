import type { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly heading: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  readonly errorAlert: Locator;

  constructor(page: Page) {
    super(page);
    const form = page.locator('#login-form');
    this.heading = page.getByRole('heading', { level: 1, name: 'Sign in' });
    this.emailInput = form.getByRole('textbox', { name: 'Email' });
    this.passwordInput = form.getByRole('textbox', { name: 'Password' });
    this.signInButton = form.getByRole('button', { name: 'Sign in' });
    this.errorAlert = page.locator('.alert-danger');
  }

  async goto() {
    await this.page.goto('/login?back=my-account');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }
}
