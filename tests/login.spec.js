const { test, expect } = require('@playwright/test');

const { LoginPage } = require('../pages/loginPage');
const { InventoryPage } = require('../pages/inventoryPage');

const users = require('../data/users.json');

test('Data Driven Login Test', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    for (const user of users) {

        await loginPage.goto();

        await loginPage.login(user.username, user.password);

        if (user.expected === 'success') {

            expect(await inventoryPage.isLoaded()).toBeTruthy();

        } else if (user.expected === 'error') {

            const errorMessage = await loginPage.getErrorMessage();

            expect(errorMessage).not.toBe('');

        }
    }

});