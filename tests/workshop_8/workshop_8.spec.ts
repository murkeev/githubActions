import {expect, test} from "@playwright/test";
import {PageObject} from "./page/Page";

test.describe('Sample Test',() => {
    let pageObject: PageObject

    test.beforeEach(async ({browser}) => {
        const page = await browser.newPage();
        pageObject = new PageObject(page);
        await pageObject.open('D:\\IDE_Projects\\JetBrains\\Rozetka\\tests\\workshop_8\\index.html')
    })
    test('Test 1, Fill all inputs', async () => {
        await pageObject.fillFirstName('John');
        await pageObject.fillAge('30');
        await pageObject.checkIsStudent()
        await pageObject.applyData();

        expect(await pageObject.text(pageObject.displayFirstName)).toBe('John');
        expect(await pageObject.text(pageObject.displayAge)).toBe('30');
        expect(await pageObject.text(pageObject.displayIsStudent)).toBe('Yes');
    })
})