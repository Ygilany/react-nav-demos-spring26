import { test, expect } from '@playwright/test';

test('Unknown route shows 404 page', async ({ page }) => {
  await page.goto('/some-nonexistent-route');
  await expect(page.getByRole('heading', { name: /404/i })).toBeVisible();
  await expect(page.getByText(/doesn.t exist/i)).toBeVisible();
});

test('404 page has link back to home', async ({ page }) => {
  await page.goto('/some-nonexistent-route');
  await page.getByRole('link', { name: /Go Home/i }).click();
  await expect(page).toHaveURL(/\/$/);
});
