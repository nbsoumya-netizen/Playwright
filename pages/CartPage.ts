import { Page } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  async viewCart() {
    await this.page.getByRole('button', { name: '   Cart' } ).click();
  }

  async proceedToCheckout() {
    const buyNowButton = this.page.getByRole('button', { name: 'Buy Now❯' });
    const checkoutButton = this.page.getByRole('button', { name: 'Checkout❯' });

    if (await buyNowButton.isVisible()) {
      await buyNowButton.click();
    } else {
      await checkoutButton.click();
    }
  }
}
