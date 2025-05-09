import { expect, Page } from '@playwright/test';

class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async openLink(link: string) {
    await this.page.goto(link, { waitUntil: 'load' });
    await expect(this.page).toHaveURL(link);
  }
}

export { BasePage };
