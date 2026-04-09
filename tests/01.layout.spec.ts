import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('has correct page title', async ({ page }) => {
  await expect(page).toHaveTitle(/campus events/i);
});

test('header displays logo with app name', async ({ page }) => {
  const logo = page.getByRole('link', { name: 'Campus Events' }).first();
  await expect(logo).toBeVisible();
});

test('navigation bar contains all main links', async ({ page }) => {
  await expect(page.getByRole('navigation').getByRole('link', { name: 'Home' })).toBeVisible();
  await expect(page.getByRole('navigation').getByRole('link', { name: 'About' })).toBeVisible();
  await expect(page.getByRole('navigation').getByRole('link', { name: 'Events' })).toBeVisible();
  await expect(page.getByRole('navigation').getByRole('link', { name: 'Settings' })).toBeVisible();
});

test('Login button is visible in the header', async ({ page }) => {
  await expect(page.getByRole('link', { name: 'Login' })).toBeVisible();
});

test('footer is visible with copyright text', async ({ page }) => {
  await expect(page.getByText('© 2026 Campus Events')).toBeVisible();
});
