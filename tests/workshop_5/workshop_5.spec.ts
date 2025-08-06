import {expect, test} from "@playwright/test";

test('Open new window and navigate back', async ({context, page}) => {
    await page.goto('file://D:\\IDE_Projects\\JetBrains\\Rozetka\\tests\\workshop_5\\index.html');
    const pagePromise = context.waitForEvent('page');
    await page.click('#openNewWindow');
    const newPage = await pagePromise;
    await newPage.waitForLoadState()
    console.log(await newPage.title())
    await expect(newPage.getByRole('heading', {name: 'Welcome to the New Page'})).toBeVisible();
});

test('Add Cookie', async ({page})=>{
    await page.goto('file://D:\\IDE_Projects\\JetBrains\\Rozetka\\tests\\workshop_5\\index.html');
    await page.click('#setCookie');
    const cookies = await page.context().cookies('file:///Users/vshpak/Desktop/vs-playwright-course/tests/workshop_5/index.html');
    const sessionCookie = cookies.find(cookies => cookies.name === 'session');
    console.log('Session cookie',sessionCookie);
    await expect(sessionCookie).toBeDefined();
});

test('Delete cookie', async({page})=>{
    await page.goto('file://D:\\IDE_Projects\\JetBrains\\Rozetka\\tests\\workshop_5\\index.html');
    await page.click('#setCookie');
    const cookies = await page.context().cookies('file://D:\\IDE_Projects\\JetBrains\\Rozetka\\tests\\workshop_5\\index.html');
    const sessionCookie = cookies.find(cookies => cookies.name === 'session');
    console.log('Session cookie',sessionCookie);

    await page.click('#deleteCookie');
    const deletedCookies = await page.context().cookies('file://D:\\IDE_Projects\\JetBrains\\Rozetka\\tests\\workshop_5\\index.html');
    const deletedSessionCookie = deletedCookies.find(cookies => cookies.name === 'session');
    console.log('Session cookie',deletedSessionCookie);
    expect(deletedSessionCookie).toBeUndefined();

})