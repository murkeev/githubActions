import {expect, test} from "@playwright/test";

test('Automating Form Submissions', async ({page}) => {
    await page.goto('https://demo.playwright.dev/todomvc');

    const newTodo = await page.getByPlaceholder('What needs to be done?');
    await newTodo.fill('John Doe');
    await newTodo.press('Enter');
    await newTodo.fill('JJ Doe');
    await newTodo.press('Enter');

    await page.waitForTimeout(2500);

    const firstTodo = page.getByTestId('todo-item').nth(0);
    await firstTodo.getByRole('checkbox').check();

    const secondTodo = page.getByTestId('todo-item').nth(1);

    await expect(secondTodo).not.toHaveClass('completed');
    await expect(firstTodo).toHaveClass('completed');
});

test('Handling Form', async ({page}) => {
    await page.goto('https://demo.playwright.dev/todomvc');
    const placeholder = '[placeholder="What needs to be done?"]';
    await page.fill(placeholder, 'John Doe');
    await page.locator(placeholder).press('Enter');

    const checkbox = await page.locator('.toggle');
    await checkbox.click();
    await page.waitForTimeout(2500);
});