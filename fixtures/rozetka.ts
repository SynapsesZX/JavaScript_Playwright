import { test as base, expect } from '@playwright/test';
import { Page } from '@playwright/test';
import { RozetkaLogin } from '../page_object/rozetka_login_page';

type MyFixtures = {
  LoginWithInvalidCredentials: Page;
};

const test = base.extend<MyFixtures>({
  LoginWithInvalidCredentials: async ({ page }, use) => {
    const user = new RozetkaLogin(page);
    await user.openLink('https://rozetka.com.ua/');
    await user.clickRegistrationIcon();
    await user.clickOpenSocialButton();
    await user.clickOpenEmailButton();
    await user.writeInvalidDataInEmailInputField();
    await user.writeInvalidDataInPasswordInputField();
    await user.clickSubmitButton();
    await use(page);
  },
});

export { test, expect };
