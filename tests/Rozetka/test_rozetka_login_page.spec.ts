import { test, expect } from '../../fixtures/rozetka';
import { RozetkaLogin } from '../../page_object/rozetka_login_page';

test.describe('Test Rozetka Login Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`https://rozetka.com.ua/`);
  });

  test('Login With Invalid Required Data', async ({ page }) => {
    const user = new RozetkaLogin(page);
    await user.clickRegistrationIcon();
    await user.clickOpenSocialButton();
    await user.clickOpenEmailButton();
    await user.writeInvalidDataInEmailInputField();
    await user.writeInvalidDataInPasswordInputField();
    await user.clickSubmitButton();
    await user.userIsNotRegisteredErrorMessageDisplayed();
  });

  test('Login With fixture', async ({ loggedInPage }) => {});
});
