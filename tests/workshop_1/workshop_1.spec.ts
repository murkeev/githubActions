import {test} from "@playwright/test";

test('Basic Navigation', async ({page}) => {
    await page.goto('https://gitlab.com');
    await page.waitForTimeout(3000);
    await page.reload();
});

test('Interacting with a Web Elements on Gitlab', async ({page}) => {
    await page.goto('https://gitlab.com');

    await page.locator('#be-navigation-desktop').getByRole('link', {name: 'Get free trial'}).click();
    await page.getByTestId('new-user-last-name-field').fill('John1');
    await page.getByTestId('new-user-last-name-field').fill('Doe1');
});

test('Using Various Locator Methods', async ({page}) => {
    await page.goto('https://gitlab.com');
    // await page.getByRole('button', {name: 'Search'}).click();
    // await page.getByRole('link', {name: 'Sign in'}).click();
    await page.click(':has-text("Sign in")');
});