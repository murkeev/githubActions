import {expect, test} from "@playwright/test";

test('Handling Alerts', async ({page}) => {
    await page.goto('file://D:\\IDE_Projects\\JetBrains\\Rozetka\\tests\\workshop_4\\index.html');
    let alertMessage = '';
    page.on('dialog', async (dialog) => {
        expect(dialog.type()).toBe('alert');
        alertMessage = await dialog.message();
        await dialog.accept();
    })
    await page.click('#show-alert');
    await page.waitForTimeout(1000);
    expect(alertMessage).toBe('This is a simple alert.')
});
test('Confirm Alert', async ({page}) => {
    await page.goto('file://D:\\IDE_Projects\\JetBrains\\Rozetka\\tests\\workshop_4\\index.html');

    let alertMessage = '';

    page.on('dialog', async (dialog) => {
        alertMessage = await dialog.message();
        await dialog.dismiss();
    })

    await page.click('#show-confirm');
    expect(alertMessage).toBe('You clicked Cancel.')
})

test('Handling POP-UPs', async ({page}) => {
    await page.goto('file://D:\\IDE_Projects\\JetBrains\\Rozetka\\tests\\workshop_4\\index.html');
    const [popup] = await Promise.all([
        page.waitForEvent('popup'),
        page.click('#open-popup'),
    ]);

    await popup.waitForLoadState();

    // if(popup.url() === 'example url') {
    //
    // }

    await popup.close();
})