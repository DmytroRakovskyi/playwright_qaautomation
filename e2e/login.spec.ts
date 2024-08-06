import { test, expect } from '@playwright/test';
import { LoginPage } from '../page_objects/loginPage';

test.describe('Login Page', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.visit();
  });

  test('Positive login test', async () => {
    await loginPage.login(process.env.USERN!, process.env.PASSWORD!);
    await loginPage.checkRedirection('https://dev.omni-dispatch.com/chats');
  });

  test('Negative login test', async () => {
    await loginPage.login('mihshakrug', 'zeleboba');
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBe('Wrong Email or password');
  });
});
