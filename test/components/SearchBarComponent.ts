import type { Locator, Page, Response } from '@playwright/test';

export class SearchBarComponent {
  readonly input: Locator;
  readonly suggestions: Locator;

  constructor(private readonly page: Page) {
    this.input = page.getByRole('combobox', { name: /search/i });
    this.suggestions = page.locator('#ps_searchbar_results').getByRole('option');
  }

  async typeAndWaitForSuggestions(term: string): Promise<Response> {
    const suggestionsResponse = this.page.waitForResponse(
      (res) => res.request().method() === 'POST' && new URL(res.url()).pathname === '/search',
    );
    await this.input.fill(term);
    return suggestionsResponse;
  }

  async submit(term: string) {
    await this.input.fill(term);
    await this.input.press('Enter');
    await this.page.waitForURL(/\/search\?.*s=/);
  }
}
