import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:5173/');
});

// ─────────────────────────────────────────────
// Title & Basic Layout
// ─────────────────────────────────────────────

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

// ─────────────────────────────────────────────
// Home Page
// ─────────────────────────────────────────────

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

// ─────────────────────────────────────────────
// Navigation
// ─────────────────────────────────────────────

test('Can navigate to About page', async ({ page }) => {
  await page.getByRole('navigation').getByRole('link', { name: 'About' }).click();
  await expect(page).toHaveURL(/\/about/);
  await expect(page.getByRole('heading', { name: 'About Campus Events' })).toBeVisible();
});

test('Can navigate to Events page', async ({ page }) => {
  await page.getByRole('navigation').getByRole('link', { name: 'Events' }).click();
  await expect(page).toHaveURL(/\/events/);
  await expect(page.getByRole('heading', { name: 'Events' })).toBeVisible();
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

// ─────────────────────────────────────────────
// About Page
// ─────────────────────────────────────────────

test('About page shows subtitle text', async ({ page }) => {
  await page.goto('http://localhost:5173/about');
  await expect(page.getByText(/mission to help students discover/i)).toBeVisible();
});

test('About page shows three info cards', async ({ page }) => {
  await page.goto('http://localhost:5173/about');
  await expect(page.getByRole('heading', { name: 'Our Mission' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Built with React' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Open to All' })).toBeVisible();
});

// ─────────────────────────────────────────────
// Events Page
// ─────────────────────────────────────────────

test('Events page shows search input', async ({ page }) => {
  await page.goto('http://localhost:5173/events');
  await expect(page.getByPlaceholder(/search events/i)).toBeVisible();
});

test('Events page shows tag filter pills', async ({ page }) => {
  await page.goto('http://localhost:5173/events');
  await expect(page.getByRole('button', { name: 'All' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'innovation' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'showcase' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'networking' })).toBeVisible();
});

test('Events page displays all 3 events by default', async ({ page }) => {
  await page.goto('http://localhost:5173/events');
  await expect(page.getByRole('heading', { name: 'Spring Innovation Fair' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Career Fair', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Career Fair 2' })).toBeVisible();
});

test('Search filters events by name', async ({ page }) => {
  await page.goto('http://localhost:5173/events');
  await page.getByPlaceholder(/search events/i).fill('career');
  await expect(page.getByRole('heading', { name: 'Career Fair', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Career Fair 2' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Spring Innovation Fair' })).not.toBeVisible();
});

test('Search with no results shows no-results message', async ({ page }) => {
  await page.goto('http://localhost:5173/events');
  await page.getByPlaceholder(/search events/i).fill('nonexistent event xyz');
  await expect(page.getByText(/no events found/i)).toBeVisible();
});

test('Tag filter: innovation shows only innovation events', async ({ page }) => {
  await page.goto('http://localhost:5173/events');
  await page.getByRole('button', { name: 'innovation' }).click();
  await expect(page.getByRole('heading', { name: 'Spring Innovation Fair' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Career Fair', exact: true })).not.toBeVisible();
});

test('Tag filter: networking shows only networking events', async ({ page }) => {
  await page.goto('http://localhost:5173/events');
  await page.getByRole('button', { name: 'networking' }).click();
  await expect(page.getByRole('heading', { name: 'Career Fair', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Career Fair 2' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Spring Innovation Fair' })).not.toBeVisible();
});

test('Tag filter: All resets to show all events', async ({ page }) => {
  await page.goto('http://localhost:5173/events');
  await page.getByRole('button', { name: 'networking' }).click();
  await expect(page.getByRole('heading', { name: 'Spring Innovation Fair' })).not.toBeVisible();
  await page.getByRole('button', { name: 'All' }).click();
  await expect(page.getByRole('heading', { name: 'Spring Innovation Fair' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Career Fair', exact: true })).toBeVisible();
});

test('Combined search + tag filter works', async ({ page }) => {
  await page.goto('http://localhost:5173/events');
  await page.getByPlaceholder(/search events/i).fill('spring');
  await page.getByRole('button', { name: 'innovation' }).click();
  await expect(page.getByRole('heading', { name: 'Spring Innovation Fair' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Career Fair', exact: true })).not.toBeVisible();
});

test('Search updates URL query parameters', async ({ page }) => {
  await page.goto('http://localhost:5173/events');
  await page.getByPlaceholder(/search events/i).fill('career');
  await expect(page).toHaveURL(/q=career/);
});

test('Tag filter updates URL query parameters', async ({ page }) => {
  await page.goto('http://localhost:5173/events');
  await page.getByRole('button', { name: 'networking' }).click();
  await expect(page).toHaveURL(/tag=networking/);
});

test('Event card shows date and location metadata', async ({ page }) => {
  await page.goto('http://localhost:5173/events');
  await expect(page.getByText('2026-04-18').first()).toBeVisible();
  await expect(page.getByText('Student Center Plaza').first()).toBeVisible();
});

test('Event card shows tag badges', async ({ page }) => {
  await page.goto('http://localhost:5173/events');
  await expect(page.getByText('innovation').first()).toBeVisible();
  await expect(page.getByText('showcase').first()).toBeVisible();
});

// ─────────────────────────────────────────────
// Event Details Page
// ─────────────────────────────────────────────

test('Clicking an event card navigates to event details', async ({ page }) => {
  await page.goto('http://localhost:5173/events');
  await page.getByRole('heading', { name: 'Spring Innovation Fair' }).click();
  await expect(page).toHaveURL(/\/events\/1/);
  await expect(page.getByRole('heading', { name: 'Spring Innovation Fair' })).toBeVisible();
});

test('Event details page shows event description', async ({ page }) => {
  await page.goto('http://localhost:5173/events/1');
  await expect(page.getByText(/showcase of student innovation/i)).toBeVisible();
});

test('Event details page shows event image', async ({ page }) => {
  await page.goto('http://localhost:5173/events/1');
  await expect(page.getByRole('img', { name: 'Spring Innovation Fair' })).toBeVisible();
});

test('Event details page shows date, time, and location', async ({ page }) => {
  await page.goto('http://localhost:5173/events/1');
  await expect(page.getByText('2026-04-18')).toBeVisible();
  await expect(page.getByText('11:00 AM - 3:00 PM')).toBeVisible();
  await expect(page.getByText('Student Center Plaza')).toBeVisible();
});

test('Event details page shows tags', async ({ page }) => {
  await page.goto('http://localhost:5173/events/1');
  await expect(page.locator('.tags-title')).toBeVisible();
  await expect(page.locator('.tag').filter({ hasText: 'innovation' })).toBeVisible();
  await expect(page.locator('.tag').filter({ hasText: 'showcase' })).toBeVisible();
});

test('Event details page has back link to events list', async ({ page }) => {
  await page.goto('http://localhost:5173/events/1');
  await expect(page.getByRole('link', { name: /All Events/i })).toBeVisible();
});

test('Back link navigates to events list', async ({ page }) => {
  await page.goto('http://localhost:5173/events/1');
  await page.getByRole('link', { name: /All Events/i }).click();
  await expect(page).toHaveURL(/\/events$/);
});

test('Event details page for Career Fair shows correct data', async ({ page }) => {
  await page.goto('http://localhost:5173/events/2');
  await expect(page.getByRole('heading', { name: 'Career Fair' })).toBeVisible();
  await expect(page.getByText('2026-10-11')).toBeVisible();
  await expect(page.getByText('1:00 PM - 4:00 PM')).toBeVisible();
  await expect(page.getByText('University Conference Center')).toBeVisible();
  await expect(page.getByText('networking')).toBeVisible();
});

test('Non-existent event shows error message', async ({ page }) => {
  await page.goto('http://localhost:5173/events/999');
  await expect(page.getByText('Event does not exist')).toBeVisible();
  await expect(page.getByRole('link', { name: /Back to Events/i })).toBeVisible();
});

test('Non-existent event back link goes to events list', async ({ page }) => {
  await page.goto('http://localhost:5173/events/999');
  await page.getByRole('link', { name: /Back to Events/i }).click();
  await expect(page).toHaveURL(/\/events/);
});

// ─────────────────────────────────────────────
// 404 Not Found Page
// ─────────────────────────────────────────────

test('Unknown route shows 404 page', async ({ page }) => {
  await page.goto('http://localhost:5173/some-nonexistent-route');
  await expect(page.getByRole('heading', { name: /404/i })).toBeVisible();
  await expect(page.getByText(/doesn.t exist/i)).toBeVisible();
});

test('404 page has link back to home', async ({ page }) => {
  await page.goto('http://localhost:5173/some-nonexistent-route');
  await page.getByRole('link', { name: /Go Home/i }).click();
  await expect(page).toHaveURL(/\/$/);
});

// ─────────────────────────────────────────────
// Login & Auth
// ─────────────────────────────────────────────

test('Settings page redirects unauthenticated users to login', async ({ page }) => {
  await page.getByRole('navigation').getByRole('link', { name: 'Settings' }).click();
  await expect(page).toHaveURL(/\/login/);
  await expect(page.getByRole('heading', { name: 'Welcome Back' })).toBeVisible();
});

test('Login page shows sign in button', async ({ page }) => {
  await page.goto('http://localhost:5173/login');
  await expect(page.getByRole('button', { name: /Sign In/i })).toBeVisible();
});

test('Login page shows descriptive text', async ({ page }) => {
  await page.goto('http://localhost:5173/login');
  await expect(page.getByText(/sign in to access your settings/i)).toBeVisible();
});

test('Signing in redirects back to settings', async ({ page }) => {
  // Try to go to settings (will redirect to login)
  await page.getByRole('navigation').getByRole('link', { name: 'Settings' }).click();
  await expect(page).toHaveURL(/\/login/);
  // Sign in
  await page.getByRole('button', { name: /Sign In/i }).click();
  // Should redirect back to settings
  await expect(page).toHaveURL(/\/settings/);
});

test('After login, Logout button appears in header', async ({ page }) => {
  await page.getByRole('navigation').getByRole('link', { name: 'Settings' }).click();
  await page.getByRole('button', { name: /Sign In/i }).click();
  await expect(page.getByRole('button', { name: /Logout/i })).toBeVisible();
});

test('Logout button logs user out', async ({ page }) => {
  // Login first
  await page.getByRole('navigation').getByRole('link', { name: 'Settings' }).click();
  await page.getByRole('button', { name: /Sign In/i }).click();
  await expect(page.getByRole('button', { name: /Logout/i })).toBeVisible();
  // Logout
  await page.getByRole('button', { name: /Logout/i }).click();
  // Login link should reappear
  await expect(page.getByRole('link', { name: 'Login' })).toBeVisible();
});

// ─────────────────────────────────────────────
// Settings Page (Authenticated)
// ─────────────────────────────────────────────

test('Settings page shows heading after login', async ({ page }) => {
  await page.getByRole('navigation').getByRole('link', { name: 'Settings' }).click();
  await page.getByRole('button', { name: /Sign In/i }).click();
  await expect(page.getByRole('heading', { name: 'Settings' })).toBeVisible();
  await expect(page.getByText('Customize your experience')).toBeVisible();
});

test('Settings page has theme selector', async ({ page }) => {
  await page.getByRole('navigation').getByRole('link', { name: 'Settings' }).click();
  await page.getByRole('button', { name: /Sign In/i }).click();
  await expect(page.getByRole('combobox')).toBeVisible();
  await expect(page.getByText('Theme')).toBeVisible();
});

test('Settings page has save button', async ({ page }) => {
  await page.getByRole('navigation').getByRole('link', { name: 'Settings' }).click();
  await page.getByRole('button', { name: /Sign In/i }).click();
  await expect(page.getByRole('button', { name: /Save Settings/i })).toBeVisible();
});

test('Saving settings redirects to home', async ({ page }) => {
  await page.getByRole('navigation').getByRole('link', { name: 'Settings' }).click();
  await page.getByRole('button', { name: /Sign In/i }).click();
  await page.getByRole('button', { name: /Save Settings/i }).click();
  await expect(page).toHaveURL(/\/$/);
});

test('Can switch theme to dark and save', async ({ page }) => {
  await page.getByRole('navigation').getByRole('link', { name: 'Settings' }).click();
  await page.getByRole('button', { name: /Sign In/i }).click();
  await page.getByRole('combobox').selectOption('dark');
  await page.getByRole('button', { name: /Save Settings/i }).click();
  await expect(page).toHaveURL(/\/$/);
  // Verify dark theme is applied
  const theme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
  expect(theme).toBe('dark');
});

// ─────────────────────────────────────────────
// Full User Flows
// ─────────────────────────────────────────────

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