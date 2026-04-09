import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('Can navigate to About page', async ({ page }) => {
  await page.getByRole('navigation').getByRole('link', { name: 'About' }).click();
  await expect(page).toHaveURL(/\/about/);
  await expect(page.getByRole('heading', { name: 'About Campus Events' })).toBeVisible();
});

test('Can navigate to Events page', async ({ page }) => {
  await page.getByRole('navigation').getByRole('link', { name: 'Events' }).click();
  await expect(page).toHaveURL(/\/events/);
  await expect(page.getByRole('heading', { name: 'Events', exact: true })).toBeVisible();
});

test('Can navigate to Settings page (redirects to login)', async ({ page }) => {
  await page.getByRole('navigation').getByRole('link', { name: 'Settings' }).click();
  await expect(page).toHaveURL(/\/login/);
});

test('Can navigate back to Home via logo', async ({ page }) => {
  await page.getByRole('navigation').getByRole('link', { name: 'About' }).click();
  await expect(page).toHaveURL(/\/about/);
  await page.getByRole('link', { name: 'Campus Events' }).first().click();
  await expect(page).toHaveURL(/\/$/);
});

test('Active nav link is highlighted on Home page', async ({ page }) => {
  const homeLink = page.getByRole('navigation').getByRole('link', { name: 'Home' });
  await expect(homeLink).toHaveClass(/active/);
});

test('Active nav link updates when navigating', async ({ page }) => {
  await page.getByRole('navigation').getByRole('link', { name: 'About' }).click();
  const aboutLink = page.getByRole('navigation').getByRole('link', { name: 'About' });
  await expect(aboutLink).toHaveClass(/active/);
  const homeLink = page.getByRole('navigation').getByRole('link', { name: 'Home' });
  await expect(homeLink).not.toHaveClass(/active/);
});
