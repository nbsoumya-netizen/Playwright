import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
  constructor(private page: Page) {}

  async enterCVV(cvv: string) {
    await this.page.getByRole('textbox').nth(1).fill(cvv);
  }

  async selectCountry(country: string) {
    const countryField = this.page.getByRole('textbox', { name: 'Select Country' });
    await countryField.click();
    await countryField.type(country, { delay: 100 });
    const exactMatch = this.page.getByText(country, { exact: true });
    await exactMatch.click();
    }

  async placeOrder() {
    await this.page.getByText('Place Order').click();
  }

  async getSuccessMessage(): Promise<Locator> {
    return this.page.locator('h1');
  }
}
