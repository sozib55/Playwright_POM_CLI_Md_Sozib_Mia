class InventoryPage {
    constructor(page) {
        this.page = page;

        this.inventoryTitle = page.locator('.title');
        this.productList = page.locator('.inventory_list');
    }

    // True when the "Products" title and the product list are both visible.
    async isLoaded() {
        try {
            await this.inventoryTitle.waitFor({ state: 'visible', timeout: 10000 });
            await this.productList.waitFor({ state: 'visible', timeout: 10000 });
            return true;
        } catch (error) {
            return false;
        }
    }
}

module.exports = { InventoryPage };