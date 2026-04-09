import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/about');
});

test('About page shows subtitle text', async ({ page }) => {
  await expect(page.getByText(/mission to help students discover/i)).toBeVisible();
});

test('About page shows three info cards', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'Our Mission' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Built with React' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Open to All' })).toBeVisible();
});
