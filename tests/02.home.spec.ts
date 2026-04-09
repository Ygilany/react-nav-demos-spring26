import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('Home page shows hero section with title and CTA', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'Discover Campus Events' })).toBeVisible();
  await expect(page.getByRole('link', { name: /Browse Events/i })).toBeVisible();
});

test('Home page shows hero badge', async ({ page }) => {
  await expect(page.getByText('Spring 2026 Events are live!')).toBeVisible();
});

test('Home page shows stats row', async ({ page }) => {
  await expect(page.getByText('3+')).toBeVisible();
  await expect(page.getByText('Events', { exact: true }).last()).toBeVisible();
  await expect(page.getByText('500+')).toBeVisible();
  await expect(page.getByText('Attendees')).toBeVisible();
});

test('Home page shows three feature cards', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'Upcoming Events' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Networking' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Find Locations' })).toBeVisible();
});

test('Browse Events CTA navigates to events page', async ({ page }) => {
  const cta = page.locator('.hero-cta');
  await expect(cta).toBeVisible();
  await expect(cta).toHaveAttribute('href', '/events');
});
