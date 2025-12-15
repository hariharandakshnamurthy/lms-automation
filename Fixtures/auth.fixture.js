import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

export const test = base.extend({
  loggedInPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(process.env.EMAIL, process.env.PASSWORD);

    await use(page);
  },
});

export { expect } from "@playwright/test";
