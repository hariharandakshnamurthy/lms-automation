export class DashboardPage {
  constructor(page) {
    this.page = page;
    this.url = "/dashboard";
    this.listMenu = page.getByRole("menuitem", { name: "Listing" });
    this.keywordTrackerIcon = page.getByRole("menuitem", {
      name: "Keyword Tracker",
    });
  }
  async gotoKeywordTracker() {
    await this.listMenu.hover();
    await this.keywordTrackerIcon.click();
  }

  async waitForTimeout() {
    await this.page.waitForTimeout(2000);
  }
}
