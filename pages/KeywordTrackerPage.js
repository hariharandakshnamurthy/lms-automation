import { expect } from "@playwright/test";
import { TITLES } from "../utils/Constants";

export class KeywordTrackerPage {
  constructor(page) {
    this.page = page;
    this.table = page.locator(".keyword-tracker-products-table");
    this.spinner = this.table.locator("[aria-busy='true']");
    this.loadingImg = page.getByRole("img", { name: "loading" }).first();
    this.addProductBtn = page.getByRole("button", { name: "Add Product" });
    this.emptyStateHeading = page.getByRole("heading", {
      name: TITLES.KT_EMPTY_STATE_TITLE,
    });
    this.tableBody = page.locator("//tbody[@class='ant-table-tbody']");
    this.addProductDrawer = page
      .locator(".keyword-tracker-add-product-modal")
      .first();
    this.closeProductDrawerBtn = page.getByRole("button", { name: "Close" });
    this.cancelAddProductBtn = page.getByRole("button", { name: "Cancel" });
    this.startTrackingBtn = page.getByRole("button", {
      name: "Start Tracking",
    });
    this.asinError = this.addProductDrawer.locator("#asin_help");
    this.keywordsError = this.addProductDrawer.locator("#keywords_help");
    this.productSelectInput = this.page.locator("//input[@id='asin']").first();
  }

  async verifyTableLoader(isVisible) {
    if (isVisible) {
      await expect(this.spinner).toBeVisible();
      await expect(this.loadingImg).toBeVisible();
    } else {
      await this.page.mouse.move(500, 500);
      await expect(this.loadingImg).not.toBeVisible();
    }
  }

  async verifyEmptyState() {
    await expect(this.emptyStateHeading).toBeVisible();
    await expect(this.addProductBtn).toBeVisible();
  }

  async verifyTableIsVisible() {
    await expect(this.table).toBeVisible();
  }

  async isTableBodyVisible() {
    await expect(this.tableBody).toBeVisible();
  }

  async waitForTimeout() {
    await this.page.waitForTimeout(3000);
  }

  async clickAddProduct() {
    await this.addProductBtn.click();
  }

  async verifyAddProductDrawerIsVisible() {
    await expect(this.addProductDrawer).toBeVisible();
  }

  async clickCloseAddProductDrawer() {
    await this.closeProductDrawerBtn.click();
  }

  async verifyAddProductDrawerIsClosed() {
    await expect(this.addProductDrawer).not.toBeVisible();
  }

  async clickStartTrackingBtn() {
    await this.startTrackingBtn.click();
  }

  async verifyRequiredFieldValidationMessages() {
    await expect(this.asinError).toBeVisible();
    await expect(this.keywordsError).toBeVisible();
  }
  async selectMyProduct(asin) {
    await this.productSelectInput.click();
    await this.productSelectInput.fill(asin);
    await this.page.waitForTimeout(2000);

    await this.page.getByText(asin).click();
  }
}
