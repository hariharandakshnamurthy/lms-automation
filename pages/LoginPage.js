export class LoginPage {
  constructor(page) {
    this.page = page;

    this.emailInput = page.getByPlaceholder("Enter your email");
    this.passwordInput = page.getByPlaceholder("Enter your password");
    this.loginButton = page.getByRole("button", { name: "Login" });
  }

  async goto() {
    await this.page.goto("/login");
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.page.waitForTimeout(2000);
  }

  async close(){
    await  this.page.close();
  }
}
