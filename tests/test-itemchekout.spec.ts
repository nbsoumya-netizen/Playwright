import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import testData from '../fixtures/testData.json';
import { OrdersPage } from '../pages/OrdersPage';

test('Complete Purchase Flow with Page Object Model', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productPage = new ProductPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);
  const ordersPage = new OrdersPage(page);
  
  // Login
  await loginPage.goto();
  await loginPage.login(testData.credentials.email, testData.credentials.password);

  // Select Product and Add to Cart
  await productPage.addProductToCart(1);

  // View Cart and Proceed to Checkout
  await cartPage.viewCart();
  await cartPage.proceedToCheckout();

  // Complete Checkout
  await checkoutPage.enterCVV(testData.checkout.cvv);
  await checkoutPage.selectCountry(testData.checkout.country);
  await checkoutPage.placeOrder();

  // Verify Order Confirmation
  const successMessage = await checkoutPage.getSuccessMessage();
  await expect(successMessage).toContainText('Thankyou for the order.');

  // View Orders History
  await ordersPage.navigateToOrdersHistory();
  const ordersHeading = await ordersPage.getOrdersHeading();
  await expect(ordersHeading).toContainText("Your Orders");

  // View Order Details
  await ordersPage.viewFirstOrder();
  const confirmationMessage = await ordersPage.verifyOrderConfirmation();
  await expect(confirmationMessage).toBeVisible();

});


