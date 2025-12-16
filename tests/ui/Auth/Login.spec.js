import { test, expect } from "@playwright/test";
import { LoginPage } from "../../../pages/LoginPage";

test("user can Login with valid credentials", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(process.env.EMAIL, process.env.PASSWORD);
  await page.waitForTimeout(5000);
  await page.waitForURL(/\/keyword-tracker\/dashboard$/);
});
