import { expect, Page } from '@playwright/test';
import { BasePage } from './base_page';

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

  async writeDataInEmailInputField(email: string) {
    await this.page.locator('#email').fill(email);
  }
  async writeDataInPasswordInputField(password: string) {
    await this.page.locator('#password').fill(password);
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
