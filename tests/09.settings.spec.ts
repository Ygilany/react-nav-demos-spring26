import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // Login before each test since Settings requires auth
  await page.goto('/');
  await page.getByRole('navigation').getByRole('link', { name: 'Settings' }).click();
  await page.getByRole('button', { name: /Sign In/i }).click();
});

test('Settings page shows heading after login', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'Settings' })).toBeVisible();
  await expect(page.getByText('Customize your experience')).toBeVisible();
});

test('Settings page has theme selector', async ({ page }) => {
  await expect(page.getByRole('combobox')).toBeVisible();
  await expect(page.getByText('Theme')).toBeVisible();
});

test('Settings page has save button', async ({ page }) => {
  await expect(page.getByRole('button', { name: /Save Settings/i })).toBeVisible();
});

test('Saving settings redirects to home', async ({ page }) => {
  await page.getByRole('button', { name: /Save Settings/i }).click();
  await expect(page).toHaveURL(/\/$/);
});

test('Can switch theme to dark and save', async ({ page }) => {
  await page.getByRole('combobox').selectOption('dark');
  await page.getByRole('button', { name: /Save Settings/i }).click();
  await expect(page).toHaveURL(/\/$/);
  const theme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
  expect(theme).toBe('dark');
});
