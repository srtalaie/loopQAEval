import { test } from "@playwright/test"

import { projectNavigator, tester } from "../utils/helpers"

import { tests } from "../data/testsWR"

// Navigate to "Cross-functional project plan, Project." before each test
test.beforeEach(async ({ page }) => {
  await page.goto('https://app.asana.com/')
  await projectNavigator(page, 'Work Requests')
})

tests.forEach((test) => {
  console.log(`Testing ${test.test_case_name} - ${test.task_name}`)
  tester(test.test_case_name, test.task_name, test.swim_lane, test.swim_lane_nth_loc, test.task_card_testid, test.tags_array)
})