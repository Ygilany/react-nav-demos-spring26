import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/events');
});

test('Events page shows search input', async ({ page }) => {
  await expect(page.getByPlaceholder(/search events/i)).toBeVisible();
});

test('Events page shows tag filter pills', async ({ page }) => {
  await expect(page.getByRole('button', { name: 'All' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'innovation' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'showcase' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'networking' })).toBeVisible();
});

test('Events page displays all 3 events by default', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'Spring Innovation Fair' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Career Fair', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Career Fair 2' })).toBeVisible();
});

test('Search filters events by name', async ({ page }) => {
  await page.getByPlaceholder(/search events/i).fill('career');
  await expect(page.getByRole('heading', { name: 'Career Fair', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Career Fair 2' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Spring Innovation Fair' })).not.toBeVisible();
});

test('Search with no results shows no-results message', async ({ page }) => {
  await page.getByPlaceholder(/search events/i).fill('nonexistent event xyz');
  await expect(page.getByText(/no events found/i)).toBeVisible();
});

test('Tag filter: innovation shows only innovation events', async ({ page }) => {
  await page.getByRole('button', { name: 'innovation' }).click();
  await expect(page.getByRole('heading', { name: 'Spring Innovation Fair' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Career Fair', exact: true })).not.toBeVisible();
});

test('Tag filter: networking shows only networking events', async ({ page }) => {
  await page.getByRole('button', { name: 'networking' }).click();
  await expect(page.getByRole('heading', { name: 'Career Fair', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Career Fair 2' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Spring Innovation Fair' })).not.toBeVisible();
});

test('Tag filter: All resets to show all events', async ({ page }) => {
  await page.getByRole('button', { name: 'networking' }).click();
  await expect(page.getByRole('heading', { name: 'Spring Innovation Fair' })).not.toBeVisible();
  await page.getByRole('button', { name: 'All' }).click();
  await expect(page.getByRole('heading', { name: 'Spring Innovation Fair' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Career Fair', exact: true })).toBeVisible();
});

test('Combined search + tag filter works', async ({ page }) => {
  await page.getByPlaceholder(/search events/i).fill('spring');
  await page.getByRole('button', { name: 'innovation' }).click();
  await expect(page.getByRole('heading', { name: 'Spring Innovation Fair' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Career Fair', exact: true })).not.toBeVisible();
});

test('Search updates URL query parameters', async ({ page }) => {
  await page.getByPlaceholder(/search events/i).fill('career');
  await expect(page).toHaveURL(/q=career/);
});

test('Tag filter updates URL query parameters', async ({ page }) => {
  await page.getByRole('button', { name: 'networking' }).click();
  await expect(page).toHaveURL(/tag=networking/);
});

test('Event card shows date and location metadata', async ({ page }) => {
  await expect(page.getByText('2026-04-18').first()).toBeVisible();
  await expect(page.getByText('Student Center Plaza').first()).toBeVisible();
});

test('Event card shows tag badges', async ({ page }) => {
  await expect(page.getByText('innovation').first()).toBeVisible();
  await expect(page.getByText('showcase').first()).toBeVisible();
});
