import { Page } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export class LoginPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async visit() {
    await this.page.goto('/');
  }

  async login(username: string, password: string) {
    const loginSelector = '#input-0';
    await this.page.waitForSelector(loginSelector);
    await this.clearInputField(loginSelector);
    await this.page.fill(loginSelector, username);

    const passwordSelector = '#input-2';
    await this.page.waitForSelector(passwordSelector);
    await this.clearInputField(passwordSelector); // toLearn
    await this.page.fill(passwordSelector, password);

    const submitButtonSelector = 'button[type="button"]:has-text("Log in")';
    await this.page.waitForSelector(submitButtonSelector);
    await this.page.click(submitButtonSelector);
  }

  async checkRedirection(expectedUrl: string) {
    await this.page.waitForURL(expectedUrl);
  }

  async getErrorMessage() {
    return this.page.textContent('.v-messages__message');
  }

  private async clearInputField(selector: string) {
    await this.page.waitForSelector(selector);
    await this.page.evaluate((sel) => {
      (document.querySelector(sel) as HTMLInputElement).value = '';
    }, selector);
  }
}
