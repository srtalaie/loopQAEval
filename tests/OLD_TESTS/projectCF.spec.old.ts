import { expect, selectors, test } from "@playwright/test"

import { projectNavigator, tagChecker } from "../../utils/helpers"

// Navigate to "Cross-functional project plan, Project." before each test
test.beforeEach(async ({ page }) => {
  await page.goto('https://app.asana.com/')
  await projectNavigator(page, 'Cross-functional project plan, Project, Project')

  // Verify To do column exists
  await expect(page.getByRole("heading", { level: 3, name: "To Do" })).toBeVisible()
})

test('Data project brief', async ({ page }) => {
  // Set test id attr
  selectors.setTestIdAttribute('data-task-id')

  // Verify To do contains "Data project brief" card
  const column = await page.locator('.CommentOnlyBoardBody-column').locator('nth=1')
  const header = await column.getByRole("heading", { level: 3 })
  await expect(header).toHaveText("To do")

  const card = await page.getByTestId('1207728107119660')
  await expect(card).toHaveCount(1)
  await expect(card.locator('.BoardCard-taskName')).toHaveText("Draft project brief")

  // Verify tags exist in card
  const tags_layout = await card.locator('.BoardCardLayout-customPropertiesAndTags')
  const tags_card = await tags_layout.locator('.BoardCardCustomPropertiesAndTags')
  await tagChecker(tags_card, ["Non-Priority", "On track"])
})

test('Schedule kickoff meeting', async ({ page }) => {
  // Set test id attr
  selectors.setTestIdAttribute('data-task-id')

  // Verify To Do contains "Schedule kickoff meeting" card
  const column = await page.locator('.CommentOnlyBoardBody-column').locator('nth=1')
  const header = await column.getByRole("heading", { level: 3 })
  await expect(header).toHaveText("To do")

  const card = await page.getByTestId('1207770129170812')
  await expect(card).toHaveCount(1)
  await expect(card.locator('.BoardCard-taskName')).toHaveText("Schedule kickoff meeting")

  // Verify tags exist in card
  const tags_layout = await card.locator('.BoardCardLayout-customPropertiesAndTags')
  const tags_card = await tags_layout.locator('.BoardCardCustomPropertiesAndTags')
  await tagChecker(tags_card, ["Medium", "At risk"])
})

test('Share timeline with teammates', async ({ page }) => {
  // Set test id attr
  selectors.setTestIdAttribute('data-task-id')

  // Verify To Do contains "Share timeline with teammates" card
  const column = await page.locator('.CommentOnlyBoardBody-column').locator('nth=1')
  const header = await column.getByRole("heading", { level: 3 })
  await expect(header).toHaveText("To do")

  const card = await page.getByTestId('1207770129170814')
  await expect(card).toHaveCount(1)
  await expect(card.locator('.BoardCard-taskName')).toHaveText("Share timeline with teammates")

  // Verify tags exist in card
  const tags_layout = await card.locator('.BoardCardLayout-customPropertiesAndTags')
  const tags_card = await tags_layout.locator('.BoardCardCustomPropertiesAndTags')
  await tagChecker(tags_card, ["High", "Off track"])
})