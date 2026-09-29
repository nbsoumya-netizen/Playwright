import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://rahulshettyacademy.com/client/');
  }

  async login(email: string, password: string) {
    await this.page.getByRole('textbox', { name: 'email@example.com' }).fill(email);
    await this.page.getByRole('textbox', { name: 'enter your passsword' }).fill(password);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }
}
