import type { Locator, Page } from '@playwright/test';
import type { Carrier, PaymentOption } from '../data/checkout';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  readonly addressesStep: Locator;
  readonly deliveryStep: Locator;
  readonly paymentStep: Locator;
  readonly addNewAddressLink: Locator;
  readonly streetInput: Locator;
  readonly postcodeInput: Locator;
  readonly cityInput: Locator;
  readonly saveAddressButton: Locator;
  readonly addressError: Locator;
  readonly continueToShippingButton: Locator;
  readonly continueToPaymentButton: Locator;
  readonly termsCheckbox: Locator;
  readonly placeOrderButton: Locator;

  constructor(page: Page) {
    super(page);
    this.addressesStep = page.locator('#checkout-addresses-step');
    this.deliveryStep = page.locator('#checkout-delivery-step');
    this.paymentStep = page.locator('#checkout-payment-step');

    this.addNewAddressLink = this.addressesStep.getByRole('link', { name: 'Add new address' });
    this.streetInput = this.addressesStep.getByRole('textbox', { name: 'Address', exact: true });
    this.postcodeInput = this.addressesStep.getByRole('textbox', { name: 'Zip/Postal Code' });
    this.cityInput = this.addressesStep.getByRole('textbox', { name: 'City' });
    this.saveAddressButton = this.addressesStep.getByRole('button', { name: 'Continue' });
    this.addressError = this.addressesStep.locator('.alert-danger');
    this.continueToShippingButton = page.getByRole('button', { name: 'Continue to Shipping Method' });

    this.continueToPaymentButton = page.getByRole('button', { name: 'Continue to Payment' });

    this.termsCheckbox = this.paymentStep.getByRole('checkbox', { name: /terms of service/ });
    this.placeOrderButton = this.paymentStep.getByRole('button', { name: 'Place Order' });
  }

  async goto() {
    await this.page.goto('/order');
  }

  async selectAddress(alias: string) {
    await this.addressesStep.getByRole('radio', { name: `Select address: ${alias}` }).check();
  }

  async continueToShipping() {
    await this.continueToShippingButton.click();
  }

  async fillNewAddress(address: { street: string; postcode: string; city: string }) {
    await this.addNewAddressLink.click();
    await this.page.waitForURL(/newAddress/);
    await this.streetInput.fill(address.street);
    await this.postcodeInput.fill(address.postcode);
    await this.cityInput.fill(address.city);
    await this.saveAddressButton.click();
  }

  async selectCarrier(carrier: Carrier) {
    const option = this.deliveryStep.getByRole('radio', { name: carrier });
    if (await option.isChecked()) return;
    const saved = this.page.waitForResponse(
      (res) => res.url().includes('action=selectDeliveryOption') && res.ok(),
    );
    await option.check();
    await saved;
  }

  async continueToPayment() {
    await this.continueToPaymentButton.click();
  }

  async selectPayment(payment: PaymentOption) {
    await this.paymentStep.getByRole('radio', { name: payment }).check();
  }

  async acceptTerms() {
    await this.termsCheckbox.check();
  }

  async placeOrder() {
    await this.placeOrderButton.click();
    await this.page.waitForURL(/\/order-confirmation/);
  }
}
