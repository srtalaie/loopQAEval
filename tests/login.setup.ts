import { chromium, expect, test as setup } from "@playwright/test";

const creds = {
  email: process.env.EMAIL as string,
  password: process.env.PASSWORD as string,
}

const authFile = 'playwright/.auth/user.json';

setup("Login", async () => {
  const browser = await chromium.launch()
  const context = await browser.newContext()
  const page = await context.newPage()

  await page.goto("https://app.asana.com/-/login")

  const email_input = await page.locator(".LoginEmailForm-emailInput")
  const continue_button = await page.locator(".LoginEmailForm-continueButton")

  await email_input.fill(creds.email)
  await continue_button.click()

  const email_card_content = await page.locator(".LoginOptionsLayout-emailAddress")
  await email_card_content.waitFor({ state: 'visible' })

  const password_input = await page.locator(".LoginPasswordForm-passwordInput")
  const login_button = await page.locator(".LoginPasswordForm-loginButton")

  await password_input.fill(creds.password)
  await login_button.click()
  
  await expect(page).toHaveTitle("Home - Asana", { timeout: 10000 })
  
  await page.context().storageState({ path: authFile });
})