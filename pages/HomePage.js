
export class HomePage {
  constructor(page) {
    this.page = page;
    this.url = '/listing-analyzer-lite'
    this.header = 'Listing Analyzer(Free)'
    this.marketplacedropdown = page.getByTestId('marketplace-select');
  }
  async gotoHomePage() {
    await this.page.goto(this.url);
    await this.page.waitForTimeout(2000)
  }

}