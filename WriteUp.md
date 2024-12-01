## Introduction:

The task is to create a suite of tests that test functionality within the Asana project section. Specifically to test that tasks are in their correct swim lanes, and those tasks contain specific tags.

## Implementation Details:

The solution for this should be fairly simple. Each test contains the same basic setup of:

Log into the app > Navigating to a specific Project > Verify a Task is in a specific Swim Lane > Verify that Task has specific tags

The project is set up as the following:

- A login test that is used as a setup for all other tests. The setup tests the login functionality and afterwards saves the session. Each test then will utilize this saved session.
- Separate spec files for "Cross-functional project plan, Project" & "Work Requests" projects
  - Each spec file will then have:
    - A beforeEach block to navigate to [Asana](https://app.asana.com/) then select the project name provided to navigate to the project page
    - Tests that test that a task is in the designated swim lane and contains the correct tags

## Challenges and Solutions

The overall challenge for this project will be to minimize code repetition. Because each test contains the same steps the challenge will be to create functions/helpers that perform the same tests on different provided parameters and to leverage Playwright's functionalities that allow for global setups.

Thus the solution is:

- To use a setup project to handle logging into the app and save the session in the setup so each subsequent test project that uses setup as a dependency can use that saved session - Create helper functions to navigate to a project based on the project name that is a string passed to the function
- Create a helper function that verifies tag existent based on a locator provided as well as an array of tag names to test against

## Results:

All tests pass. See test report after running `npm test` in command line. After tests run, run command `npx playwright show-report` in a new command line or ctrl+click `npx playwright show-report` in the command line.

## Recommendations:

The logging in functionality can be flaky. Sometimes the assertion that the page title is "Home - Asana" runs before the page fully loads causing a false negative.
It would be nice to combine the two spec files that contain the tests for the projects: "Cross-functional project plan, Project" & "Work Requests". The blocker for this was trying to figure out a way to run two separate beforeEach blocks in the same spec file. With some research this should be able to be achieved.
