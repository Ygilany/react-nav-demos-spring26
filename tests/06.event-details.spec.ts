import { test, expect } from '@playwright/test';

test('Clicking an event card navigates to event details', async ({ page }) => {
  await page.goto('/events');
  await page.getByRole('heading', { name: 'Spring Innovation Fair' }).click();
  await expect(page).toHaveURL(/\/events\/1/);
  await expect(page.getByRole('heading', { name: 'Spring Innovation Fair' })).toBeVisible();
});

test('Event details page shows event description', async ({ page }) => {
  await page.goto('/events/1');
  await expect(page.getByText(/showcase of student innovation/i)).toBeVisible();
});

test('Event details page shows event image', async ({ page }) => {
  await page.goto('/events/1');
  await expect(page.getByRole('img', { name: 'Spring Innovation Fair' })).toBeVisible();
});

test('Event details page shows date, time, and location', async ({ page }) => {
  await page.goto('/events/1');
  await expect(page.getByText('2026-04-18')).toBeVisible();
  await expect(page.getByText('11:00 AM - 3:00 PM')).toBeVisible();
  await expect(page.getByText('Student Center Plaza')).toBeVisible();
});

test('Event details page shows tags', async ({ page }) => {
  await page.goto('/events/1');
  await expect(page.locator('.tags-title')).toBeVisible();
  await expect(page.locator('.tag').filter({ hasText: 'innovation' })).toBeVisible();
  await expect(page.locator('.tag').filter({ hasText: 'showcase' })).toBeVisible();
});

test('Event details page has back link to events list', async ({ page }) => {
  await page.goto('/events/1');
  await expect(page.getByRole('link', { name: /All Events/i })).toBeVisible();
});

test('Back link navigates to events list', async ({ page }) => {
  await page.goto('/events/1');
  await page.getByRole('link', { name: /All Events/i }).click();
  await expect(page).toHaveURL(/\/events$/);
});

test('Event details page for Career Fair shows correct data', async ({ page }) => {
  await page.goto('/events/2');
  await expect(page.getByRole('heading', { name: 'Career Fair' })).toBeVisible();
  await expect(page.getByText('2026-10-11')).toBeVisible();
  await expect(page.getByText('1:00 PM - 4:00 PM')).toBeVisible();
  await expect(page.getByText('University Conference Center')).toBeVisible();
  await expect(page.getByText('networking')).toBeVisible();
});

test('Non-existent event shows error message', async ({ page }) => {
  await page.goto('/events/999');
  await expect(page.getByText('Event does not exist')).toBeVisible();
  await expect(page.getByRole('link', { name: /Back to Events/i })).toBeVisible();
});

test('Non-existent event back link goes to events list', async ({ page }) => {
  await page.goto('/events/999');
  await page.getByRole('link', { name: /Back to Events/i }).click();
  await expect(page).toHaveURL(/\/events/);
});
