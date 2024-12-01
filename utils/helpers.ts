import { Page, expect, selectors, test } from '@playwright/test'

export const tagChecker = async (tag_area: any, tags: string[]) => {
  for (const tag of tags) {
    const tag_cellWrapper = await tag_area.locator('.BoardCardCustomPropertiesAndTags-cellWrapper')
    const tag_pill = await tag_cellWrapper.locator('.PillPresentation')
    const tag_span = await tag_pill.locator(`span:has-text("${tag}")`)
    await expect(tag_span).toHaveText(tag)
  }
}

export const projectNavigator = async(page: Page, project_name: string) => {
  await page.getByLabel(project_name).click()
}

export const tester = async (
  test_case: string,
  task_name: string,
  swim_lane: string,
  swim_lane_nth_loc: string,
  task_card_testid: string,
  tags_array: string[]
) => {
  test(test_case, async ({ page }) => {
  // Set test id attr
    selectors.setTestIdAttribute('data-task-id')
    
  // Verify columns exists on page
  await expect(page.getByRole("heading", { level: 3, name: swim_lane })).toBeVisible()

  // Verify swim lane contains task card
  const column = await page.locator('.CommentOnlyBoardBody-column').locator(swim_lane_nth_loc)
  const header = await column.getByRole("heading", { level: 3 })
  await expect(header).toHaveText(swim_lane)

  const card = await page.getByTestId(task_card_testid)
  await expect(card).toHaveCount(1)
  await expect(card.locator('.BoardCard-taskName')).toHaveText(task_name)

  // Verify tags exist in card
  const tags_layout = await card.locator('.BoardCardLayout-customPropertiesAndTags')
  const tags_card = await tags_layout.locator('.BoardCardCustomPropertiesAndTags')
  await tagChecker(tags_card, tags_array)
})
}
