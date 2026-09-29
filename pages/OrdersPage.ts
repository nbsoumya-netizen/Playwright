import { Page, Locator } from '@playwright/test';

export class OrdersPage {
  constructor(private page: Page) {}

  async navigateToOrdersHistory() {
    await this.page.getByText('Orders History Page').click();
  }

  async getOrdersHeading(): Promise<Locator> {
    return this.page.locator('h1');
  }

  async viewFirstOrder() {
    await this.page.getByRole('button', { name: 'View' }).first().click();
  }

  async verifyOrderConfirmation() {
    return this.page.getByText('Thank you for Shopping With Us');
  }
}
