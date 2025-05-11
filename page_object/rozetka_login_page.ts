import { expect, Page } from '@playwright/test';
import { BasePage } from './base_page';
import { LoginData } from '../globals/globals';

class RozetkaLogin extends BasePage {
  async clickRegistrationIcon() {
    await this.page.locator('.header-actions button.header__button').click({ timeout: 2000 });
  }

  async clickOpenSocialButton() {
    await this.page.locator('.social-buttons button.social-buttons__button-open').click();
  }

  async clickOpenEmailButton() {
    await this.page.locator('button[title="Email"]').click();
  }

  async writeInvalidDataInEmailInputField() {
    await this.page.locator('#email').fill(LoginData.invalidEmail);
  }
  async writeInvalidDataInPasswordInputField() {
    await this.page.locator('#password').fill(LoginData.invalidPassword);
  }

  async clickSubmitButton() {
    await this.page.locator('.button[type="submit"]').click();
  }
  async userIsNotRegisteredErrorMessageDisplayed() {
    const element = this.page.locator('//div[text()="Такий користувач не зареєстрований"]');
    await expect(element).toBeVisible();
  }
}

export { RozetkaLogin };
