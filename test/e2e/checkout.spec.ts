import { checkoutOrders, franceAddress, invalidPostcodeAddress } from '../data/checkout';
import { hummingbirdTShirt } from '../data/products';
import { expect, test } from '../fixtures';

test.describe('Checkout con sesión iniciada', () => {
  for (const { id, title, address, carrier, payment, expected } of checkoutOrders) {
    test(`${id}: confirma el pedido (${title})`, { tag: '@smoke' }, async ({
      checkoutWithProduct: checkout,
      orderConfirmationPage: confirmation,
    }) => {
      await checkout.selectAddress(address.alias);
      await checkout.continueToShipping();
      await checkout.selectCarrier(carrier);
      await checkout.continueToPayment();
      await checkout.selectPayment(payment);
      await checkout.acceptTerms();
      await checkout.placeOrder();

      await expect(confirmation.heading).toHaveText('Your order is confirmed');
      await expect(confirmation.reference).toBeVisible();
      await expect(confirmation.products).toHaveCount(1);
      await expect(confirmation.products).toContainText(hummingbirdTShirt.name);
      await expect(confirmation.detail('Payment method')).toHaveText(`Payment method: ${expected.paymentMethod}`);
      await expect(confirmation.detail('Shipping method')).toContainText(carrier);
      await expect(confirmation.amount('Subtotal')).toHaveText(expected.subtotal);
      await expect(confirmation.amount('Shipping and handling')).toHaveText(expected.shipping);
      await expect(confirmation.amount('Total')).toHaveText(expected.total);
    });
  }

  test('CK-05: un código postal inválido no deja guardar la dirección', async ({
    checkoutWithProduct: checkout,
  }) => {
    await checkout.fillNewAddress(invalidPostcodeAddress);

    await expect(checkout.addressError).toHaveText(invalidPostcodeAddress.error);
    await expect(checkout.postcodeInput).toHaveValue(invalidPostcodeAddress.postcode);
    await expect(checkout.continueToShippingButton).toBeHidden();
  });

  test('CK-08: sin aceptar los términos no se puede confirmar el pedido', async ({
    checkoutWithProduct: checkout,
  }) => {
    await checkout.selectAddress(franceAddress.alias);
    await checkout.continueToShipping();
    await checkout.continueToPayment();
    await checkout.selectPayment('Pay by bank wire');

    await expect(checkout.termsCheckbox).not.toBeChecked();
    await expect(checkout.placeOrderButton).toBeDisabled();

    await checkout.acceptTerms();
    await expect(checkout.placeOrderButton).toBeEnabled();
  });
});
