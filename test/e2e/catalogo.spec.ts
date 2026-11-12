import { accessoriesCategory, mugSearch } from '../data/catalog';
import { expect, test } from '../fixtures';

const sortedAscending = (values: number[]) => values.every((v, i) => i === 0 || values[i - 1] <= v);
const sortedDescending = (values: number[]) => values.every((v, i) => i === 0 || values[i - 1] >= v);

test.describe('Catálogo con esperas condicionales', () => {
  test('el autocompletado muestra solo sugerencias del término (waitForResponse)', async ({
    page,
    productListPage,
  }) => {
    await page.goto('/');
    const { searchBar } = productListPage.header;

    const response = await searchBar.typeAndWaitForSuggestions(mugSearch.term);

    expect(response.ok()).toBe(true);
    await expect(searchBar.suggestions.first()).toBeVisible();
    for (const name of await searchBar.suggestions.allTextContents()) {
      expect(name.toLowerCase()).toContain(mugSearch.term);
    }
  });

  test('buscar con Enter abre la página de resultados (waitForURL)', { tag: '@smoke' }, async ({
    page,
    productListPage,
  }) => {
    await page.goto('/');

    await productListPage.header.searchBar.submit(mugSearch.term);

    await expect(productListPage.heading).toHaveText(mugSearch.heading);
    await expect(productListPage.productTitles.first()).toBeVisible();
    await expect(productListPage.productCount).toHaveText(
      `There are ${await productListPage.productTitles.count()} products.`,
    );
  });

  test.describe('ordenar por precio', () => {
    test.beforeEach(async ({ productListPage }) => {
      await productListPage.goto(accessoriesCategory.path);
      await expect(productListPage.heading).toHaveText(accessoriesCategory.heading);
    });

    test('de menor a mayor (expect.poll)', async ({ page, productListPage }) => {
      await productListPage.chooseSort('Price, low to high');

      await expect(page).toHaveURL(/order=product\.price\.asc/);
      await expect.poll(() => productListPage.prices().then(sortedAscending)).toBe(true);
    });

    test('de mayor a menor (waitForResponse + toPass)', async ({ productListPage }) => {
      await productListPage.sortBy('Price, high to low');

      await expect(productListPage.sortButton).toHaveText('Price, high to low');
      await expect(async () => {
        const prices = await productListPage.prices();
        expect(prices.length).toBeGreaterThan(1);
        expect(prices).toEqual([...prices].sort((a, b) => b - a));
      }).toPass();
    });

    test('con espera fija (demo inestable)', { tag: '@flaky' }, async ({ page, productListPage }) => {
      await productListPage.chooseSort('Price, high to low');
      await page.waitForTimeout(1_800);

      expect(sortedDescending(await productListPage.prices())).toBe(true);
    });
  });
});
