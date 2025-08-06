import {expect, test} from "@playwright/test";

test('Advanced Interaction', async ({page}) => {
    await page.goto('file://D:\\IDE_Projects\\JetBrains\\Rozetka\\tests\\workshop_3\\index.html');

    await page.hover('button#hover-me');

    expect(await page.textContent('button#hover-me')).toContain('Text Changed!');

    await page.click('button#context-menu', {button: 'right'});
    expect(await page.getByText('Context Menu Appears!').textContent()).toContain('Context Menu Appears!');

    await page.dblclick('button#double-click')
    expect(await page.locator('img').count()).toBe(1);
});

test('Drag and Drop', async ({page}) => {
    await page.goto('file://D:\\IDE_Projects\\JetBrains\\Rozetka\\tests\\workshop_3\\index.html');

    await page.dragAndDrop('.drag-source', '.drop-target');

    expect(await page.textContent('.drop-target')).toContain('Success');
})

test('Handling iframe', async ({page}) => {
    await page.goto('file://D:\\IDE_Projects\\JetBrains\\Rozetka\\tests\\workshop_3\\index.html');
    const iframeElement = page.frame({name: 'iframeName'});
    const inputSelector = '#iframe-input';
    if (iframeElement) {
        await iframeElement.type(inputSelector, 'Hello Playwright!');
        expect(await iframeElement.locator(inputSelector).inputValue()).toContain('Hello Playwright!');
    } else {
        console.error('iframe is not available');
    }
})