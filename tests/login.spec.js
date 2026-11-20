const { test, expect } = require('@playwright/test');

const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');

const users = require('../data/users.json');

// One test per entry in users.json, so the CLI reports 3 separate results.
for (const user of users) {
    test(`login with ${user.username} / ${user.password} -> expected ${user.expected}`, async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);

        await loginPage.goto();
        await loginPage.login(user.username, user.password);

        if (user.expected === 'success') {
            expect(await inventoryPage.isLoaded()).toBeTruthy();
        } else if (user.expected === 'error') {
            const errorMessage = await loginPage.getErrorMessage();
            expect(errorMessage).not.toBe('');
        }
    });
}
