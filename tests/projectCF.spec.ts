import { expect, selectors, test } from "@playwright/test"

import { projectNavigator, tagChecker } from "../utils/helpers"

selectors.setTestIdAttribute('data-task-id')

// Navigate to "Cross-functional project plan, Project." before each test
test.beforeEach(async ({ page }) => {
  await page.goto('https://app.asana.com/')
  await projectNavigator(page, 'Cross-functional project plan, Project, Project')

  // Verify To Do column exists
  await expect(page.getByRole("heading", { level: 3, name: "To Do" })).toBeVisible()
})

test('Data project brief', async ({ page }) => {
  // Verify To Do contains "Data project brief card"
  const column = await page.locator('.CommentOnlyBoardBody-column').locator('nth=1')
  await expect(column).toHaveText("To Do")

  const card = await column.getByTestId('1207728107119660')
  await expect(card).toHaveCount(1)
  await expect(card).toHaveText("Data project brief")

  // Verify tags exist in card
  const tags_layout = await card.locator('BoardCardLayout-customPropertiesAndTags')
  const tags_card = await tags_layout.locator('.BoardCardCustomPropertiesAndTags')
  await tagChecker(tags_card, ["Non-Priority", "On track"])
})