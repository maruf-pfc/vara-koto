import { test, expect } from '@playwright/test';

test.describe('Dhaka Bus Vara E2E User Journeys', () => {
	test('homepage renders calculator, stats, and popular shortcuts', async ({ page }) => {
		await page.goto('/');

		// Verify main heading
		await expect(page.locator('h1')).toBeVisible();

		// Verify search form is present
		const fromInput = page.locator('#journey-from');
		const toInput = page.locator('#journey-to');
		await expect(fromInput).toBeVisible();
		await expect(toInput).toBeVisible();

		// Verify quick select popular chips
		await expect(
			page.getByText('Mirpur 10 → Farmgate').or(page.getByText('মিরপুর ১০ → ফার্মগেট'))
		).toBeVisible();
	});

	test('select origin and destination, calculate fare, and view result cards', async ({ page }) => {
		await page.goto('/');

		const fromInput = page.locator('#journey-from');
		await fromInput.click();
		await fromInput.fill('Mirpur 10');
		// Wait for dropdown option
		const optionMirpur10 = page.locator('#journey-from-listbox li').first();
		await optionMirpur10.click();

		const toInput = page.locator('#journey-to');
		await toInput.click();
		await toInput.fill('Farmgate');
		const optionFarmgate = page.locator('#journey-to-listbox li').first();
		await optionFarmgate.click();

		// Click search submit button
		await page.locator('button[type="submit"]').click();

		// Should navigate to /route/mirpur-10/to/farmgate
		await expect(page).toHaveURL(/\/route\/mirpur-10\/to\/farmgate/);

		// Verify result page displays direct bus options (e.g. Bikalpa Auto or Shikhor)
		await expect(page.locator('a[href="/bus/bikalpa-auto"]').first()).toBeVisible();
		await expect(page.getByText(/15|১৫/).first()).toBeVisible();
	});

	test('swapping origin and destination redirects to reverse route', async ({ page }) => {
		await page.goto('/route/mirpur-10/to/farmgate');

		// Click reverse direction button
		const reverseButton = page.locator(
			'button:has-text("Reverse Direction"), button:has-text("বিপরীত রুট দেখুন")'
		);
		await reverseButton.click();

		await expect(page).toHaveURL(/\/route\/farmgate\/to\/mirpur-10/);
		await expect(page.locator('a[href="/bus/bikalpa-auto"]').first()).toBeVisible();
	});

	test('bus directory search and navigation to bus detail page', async ({ page }) => {
		await page.goto('/buses');

		// Verify directory title
		await expect(page.locator('h1')).toBeVisible();

		// Filter by bus name
		const searchInput = page.locator('input[type="text"]');
		await searchInput.fill('Raida');

		// Raida should be visible
		const raidaCard = page.locator('a[href="/bus/raida"]');
		await expect(raidaCard).toBeVisible();

		// Click to visit detail page
		await raidaCard.click();
		await expect(page).toHaveURL('/bus/raida');

		// Verify bus stop list timeline
		await expect(page.locator('a[href="/location/jatrabari"]').first()).toBeVisible();
		await expect(page.locator('a[href="/location/airport"]').first()).toBeVisible();
	});

	test('locations directory and location detail page', async ({ page }) => {
		await page.goto('/locations');

		// Verify locations title
		await expect(page.locator('h1')).toBeVisible();

		// Click on Mirpur 10
		const mirpur10Link = page.locator('a[href="/location/mirpur-10"]').first();
		await expect(mirpur10Link).toBeVisible();
		await mirpur10Link.click();

		await expect(page).toHaveURL('/location/mirpur-10');
		// Verify passing buses section
		await expect(page.locator('a[href="/bus/bikalpa-auto"]').first()).toBeVisible();
	});

	test('bilingual language switcher toggles between English and Bengali', async ({ page }) => {
		await page.goto('/');

		// Toggle language
		const langButton = page.locator(
			'button[aria-label="Toggle language between English and Bengali"]'
		);
		await expect(langButton).toBeVisible();

		const initialLangText = await langButton.innerText();
		await langButton.click();

		const updatedLangText = await langButton.innerText();
		expect(initialLangText).not.toBe(updatedLangText);
	});

	test('methodology, about, and contribute pages render properly', async ({ page }) => {
		await page.goto('/methodology');
		await expect(page.locator('h1')).toBeVisible();

		await page.goto('/about');
		await expect(page.locator('h1')).toBeVisible();

		await page.goto('/contribute');
		await expect(page.locator('h1')).toBeVisible();
	});
});
