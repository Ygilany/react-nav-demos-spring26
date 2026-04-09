import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('Settings page redirects unauthenticated users to login', async ({ page }) => {
  await page.getByRole('navigation').getByRole('link', { name: 'Settings' }).click();
  await expect(page).toHaveURL(/\/login/);
  await expect(page.getByRole('heading', { name: 'Welcome Back' })).toBeVisible();
});

test('Login page shows sign in button', async ({ page }) => {
  await page.goto('/login');
  await expect(page.getByRole('button', { name: /Sign In/i })).toBeVisible();
});

test('Login page shows descriptive text', async ({ page }) => {
  await page.goto('/login');
  await expect(page.getByText(/sign in to access your settings/i)).toBeVisible();
});

test('Signing in redirects back to settings', async ({ page }) => {
  await page.getByRole('navigation').getByRole('link', { name: 'Settings' }).click();
  await expect(page).toHaveURL(/\/login/);
  await page.getByRole('button', { name: /Sign In/i }).click();
  await expect(page).toHaveURL(/\/settings/);
});

test('After login, Logout button appears in header', async ({ page }) => {
  await page.getByRole('navigation').getByRole('link', { name: 'Settings' }).click();
  await page.getByRole('button', { name: /Sign In/i }).click();
  await expect(page.getByRole('button', { name: /Logout/i })).toBeVisible();
});

test('Logout button logs user out', async ({ page }) => {
  await page.getByRole('navigation').getByRole('link', { name: 'Settings' }).click();
  await page.getByRole('button', { name: /Sign In/i }).click();
  await expect(page.getByRole('button', { name: /Logout/i })).toBeVisible();
  await page.getByRole('button', { name: /Logout/i }).click();
  await expect(page.getByRole('link', { name: 'Login' })).toBeVisible();
});
