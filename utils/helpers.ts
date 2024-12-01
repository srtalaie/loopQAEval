import { Page, expect } from '@playwright/test'

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
