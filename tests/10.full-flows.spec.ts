import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('Full flow: browse events, view details, go back', async ({ page }) => {
  await page.getByRole('navigation').getByRole('link', { name: 'Events' }).click();
  await expect(page).toHaveURL(/\/events/);
  await page.getByRole('heading', { name: 'Spring Innovation Fair' }).click();
  await expect(page).toHaveURL(/\/events\/1/);
  await expect(page.getByText('Student Center Plaza')).toBeVisible();
  await page.getByRole('link', { name: /All Events/i }).click();
  await expect(page).toHaveURL(/\/events$/);
});

test('Full flow: search, filter, view event, navigate home', async ({ page }) => {
  await page.getByRole('navigation').getByRole('link', { name: 'Events' }).click();
  await page.getByPlaceholder(/search events/i).fill('career');
  await expect(page.getByRole('heading', { name: 'Spring Innovation Fair' })).not.toBeVisible();
  await page.getByRole('heading', { name: 'Career Fair', exact: true }).click();
  await expect(page).toHaveURL(/\/events\/2/);
  await page.getByRole('link', { name: 'Campus Events' }).first().click();
  await expect(page).toHaveURL(/\/$/);
});
