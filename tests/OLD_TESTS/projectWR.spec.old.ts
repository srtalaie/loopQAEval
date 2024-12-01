import { expect, selectors, test } from "@playwright/test"

import { projectNavigator, tagChecker } from "../../utils/helpers"

// Navigate to "Cross-functional project plan, Project." before each test
test.beforeEach(async ({ page }) => {
  await page.goto('https://app.asana.com/')
  await projectNavigator(page, 'Work Requests')
})

test('[Example] Laptop setup for new hire', async ({ page }) => {
  // Set test id attr
  selectors.setTestIdAttribute('data-task-id')

   // Verify columns exists on page
  await expect(page.getByRole("heading", { level: 3, name: "New Requests" })).toBeVisible()

  // Verify New Requests column contains "[Example] Laptop setup for new hire" card
  const column = await page.locator('.CommentOnlyBoardBody-column').locator('nth=0')
  const header = await column.getByRole("heading", { level: 3 })
  await expect(header).toHaveText("New Requests")

  const card = await page.getByTestId('1205367008167113')
  await expect(card).toHaveCount(1)
  await expect(card.locator('.BoardCard-taskName')).toHaveText("[Example] Laptop setup for new hire")

  // Verify tags exist in card
  const tags_layout = await card.locator('.BoardCardLayout-customPropertiesAndTags')
  const tags_card = await tags_layout.locator('.BoardCardCustomPropertiesAndTags')
  await tagChecker(tags_card, ["Medium priority", "Low effort", "New hardware", "Not Started"])
})

test('[Example] Password not working', async ({ page }) => {
  // Set test id attr
  selectors.setTestIdAttribute('data-task-id')

   // Verify columns exists on page
  await expect(page.getByRole("heading", { level: 3, name: "In Progress" })).toBeVisible()

  // Verify In Progress column contains "[Example] Password not working" card
  const column = await page.locator('.CommentOnlyBoardBody-column').locator('nth=2')
  const header = await column.getByRole("heading", { level: 3 })
  await expect(header).toHaveText("In Progress")

  const card = await page.getByTestId('1205367008167114')
  await expect(card).toHaveCount(1)
  await expect(card.locator('.BoardCard-taskName')).toHaveText("[Example] Password not working")

  // Verify tags exist in card
  const tags_layout = await card.locator('.BoardCardLayout-customPropertiesAndTags')
  const tags_card = await tags_layout.locator('.BoardCardCustomPropertiesAndTags')
  await tagChecker(tags_card, ["Low effort", "Low priority", "Password reset", "Waiting"])
})

test('[Example] New keycard for Daniela V', async ({ page }) => {
  // Set test id attr
  selectors.setTestIdAttribute('data-task-id')

   // Verify columns exists on page
  await expect(page.getByRole("heading", { level: 3, name: "Completed" })).toBeVisible()

  // Verify Completed column contains "[Example] New keycard for Daniela V" card
  const column = await page.locator('.CommentOnlyBoardBody-column').locator('nth=3')
  const header = await column.getByRole("heading", { level: 3 })
  await expect(header).toHaveText("Completed")

  const card = await page.getByTestId('1205367008167115')
  await expect(card).toHaveCount(1)
  await expect(card.locator('.BoardCard-taskName')).toHaveText("[Example] New keycard for Daniela V")

  // Verify tags exist in card
  const tags_layout = await card.locator('.BoardCardLayout-customPropertiesAndTags')
  const tags_card = await tags_layout.locator('.BoardCardCustomPropertiesAndTags')
  await tagChecker(tags_card, ["Low effort", "New hardware", "High priority", "Done"])
})