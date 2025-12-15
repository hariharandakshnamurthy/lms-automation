import { test, expect } from "../../Fixtures/auth.fixture";
import { DashboardPage } from "../../pages/DashboardPage";
import { KeywordTrackerPage } from "../../pages/KeywordTrackerPage";
import { SUCCESS_MESSAGES } from "../../utils/Constants";
import { KEYWORD_TRACKER_TEST_DATA } from "../testdata/KeywordTracker.data";

test("UI and Navigation Cases for Listing Tracker", async ({
  loggedInPage,
  page,
}) => {
  const ktPage = new DashboardPage(loggedInPage);

  await ktPage.gotoKeywordTracker();
  console.log(page.url());
  await expect(page).toHaveURL(
    "/keyword-tracker/listing-management/keyword_tracker"
  );
});

test("Keyword Tracker initial load behavior", async ({ loggedInPage }) => {
  const dashboard = new DashboardPage(loggedInPage);
  const ktPage = new KeywordTrackerPage(loggedInPage);

  const dataApiPromise = loggedInPage.waitForResponse(
    (res) => res.url().includes("/keyword-tracker") && res.status() === 200
  );

  await dashboard.gotoKeywordTracker();

  await ktPage.verifyTableLoader(true);

  await dataApiPromise;

  await ktPage.verifyTableLoader(false);
});

test("Keyword Tracker shows empty state when no products exist", async ({
  loggedInPage,
}) => {
  const dashboard = new DashboardPage(loggedInPage);
  const ktPage = new KeywordTrackerPage(loggedInPage);

  await dashboard.gotoKeywordTracker();

  await ktPage.verifyTableLoader(false);
  await ktPage.verifyEmptyState();
});

test("Renders product table when data exists", async ({ loggedInPage }) => {
  const dashboard = new DashboardPage(loggedInPage);
  const ktPage = new KeywordTrackerPage(loggedInPage);

  // Mocked API completion
  await loggedInPage.route("**/keyword-tracker/keyword_tracker/list", (route) =>
    route.fulfill({
      status: 200,
      body: JSON.stringify({
        data: [
          {
            product_id: "123",
            product_name: "Test Product",
            marketplace: "US",
            status: "ACTIVE",
          },
        ],
      }),
    })
  );

  await dashboard.gotoKeywordTracker();

  await ktPage.verifyTableLoader(false);

  await ktPage.verifyTableIsVisible();
  await ktPage.isTableBodyVisible();
});

test("Does not call keyword tracker list API multiple times on initial load", async ({
  loggedInPage,
}) => {
  test.fail(true, "Issue has been raised - #I7933");
  const dashboard = new DashboardPage(loggedInPage);
  const ktPage = new KeywordTrackerPage(loggedInPage);

  let apiCallCount = 0;

  // the Method should be a GET need to raise bug card / need clarification
  await loggedInPage.route("**/keyword_tracker/list", async (route) => {
    const request = route.request();

    if (request.method() === "POST") {
      apiCallCount++;
    }

    await route.continue();
  });

  await dashboard.gotoKeywordTracker();

  await ktPage.verifyTableLoader(false);
  await ktPage.verifyTableIsVisible();
  await ktPage.isTableBodyVisible();
  await ktPage.waitForTimeout();
  console.log(apiCallCount);
  expect(apiCallCount).toEqual(1);
});

test("Add Product Modal opens on clicking the button", async ({
  loggedInPage,
}) => {
  const dashboard = new DashboardPage(loggedInPage);
  const ktPage = new KeywordTrackerPage(loggedInPage);

  await dashboard.gotoKeywordTracker();
  await ktPage.verifyTableLoader(false);
  await ktPage.verifyEmptyState();

  await ktPage.clickAddProduct();
  await ktPage.verifyAddProductDrawerIsVisible();
});

test("Add Product Drawer can be closed", async ({ loggedInPage }) => {
  const dashboard = new DashboardPage(loggedInPage);
  const ktPage = new KeywordTrackerPage(loggedInPage);

  await dashboard.gotoKeywordTracker();
  await ktPage.verifyTableLoader(false);
  await ktPage.clickAddProduct();
  await ktPage.clickCloseAddProductDrawer();
  await ktPage.verifyAddProductDrawerIsClosed();
});

test("Validation messages show on clicking Start Tracking without data", async ({
  loggedInPage,
}) => {
  const dashboard = new DashboardPage(loggedInPage);
  const ktPage = new KeywordTrackerPage(loggedInPage);

  await dashboard.gotoKeywordTracker();
  await ktPage.verifyTableLoader(false);
  await ktPage.clickAddProduct();

  await ktPage.clickStartTrackingBtn();
  await ktPage.verifyRequiredFieldValidationMessages();
  const message = await ktPage.asinError.textContent();
  console.log(message);
  // Need to check if the Text match case required
});

test.fixme(
  "User can successfully start tracking with minimal valid input",
  async ({ loggedInPage }) => {
    const dashboard = new DashboardPage(loggedInPage);
    const ktPage = new KeywordTrackerPage(loggedInPage);

    await dashboard.gotoKeywordTracker();
    await ktPage.verifyTableLoader(false);
    await ktPage.clickAddProduct();
    await ktPage.verifyAddProductDrawerIsVisible();

    await ktPage.selectMyProduct(KEYWORD_TRACKER_TEST_DATA.VALID_ASIN);
    await ktPage.fillKeywords(KEYWORD_TRACKER_TEST_DATA.VALID_KEYWORD);

    await ktPage.clickStartTrackingBtn();
    await ktPage.waitForTimeout(2000);
    await expect(
      loggedInPage.getByText(SUCCESS_MESSAGES.ADDED_PRODUCT)
    ).toBeVisible({ timeout: 10000 });
  }
);
