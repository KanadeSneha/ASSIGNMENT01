import { Given, Then, When, setDefaultTimeout } from "@cucumber/cucumber"
import { expect } from "@playwright/test";
import { getCurrentDateISO, getPastDateISO, getFutureDateISO } from '../support/dateUtils'
import { CustomWorld } from "../support/world";

const errorMessages: Record<string, string> = {
  'max length': 'More than 100 characters not allowed',
  'required field': 'Todo content is required',
  'past date': 'Due date cannot be in the past',
  'mandatory': 'field is mandatory',
  'content': 'Content is required'
};
setDefaultTimeout(60 * 1000);

Given('I navigate to {string}', async function (this:CustomWorld,url: string) {
  await this.page.goto(url);
});

Then('I should be able to see dashborad page', async function (this:CustomWorld) {
  console.log("Verifying dashboard page");
  await this.page.waitForLoadState('networkidle');
  expect(this.page.url()).toContain('todo.testing.groupgti.com');

  const title = await this.page.title();
  expect(title).toBeTruthy();
  console.log(`Page title: ${title}`);
});

Given('I click on ToDo content textbox', async function (this:CustomWorld) {
  await this.page.getByRole('textbox', { name: 'Todo content' }).click();
  await this.page.locator('#mat-input-1').click();
});


Then('I should see {string} error message', async function (this:CustomWorld,errorType: string) {
    const expectedMessage = errorMessages[errorType];
    const errorText = await this.page.locator('#mat-mdc-error-0').textContent();
    expect(errorText).toContain(expectedMessage);
  }
);

Given('I enter text content {string}', async function (this:CustomWorld,text: string) {
  await this.page.getByRole('textbox', { name: 'Todo content' }).click();
  await this.page.getByRole('textbox', { name: 'Todo content' }).fill(text);
});

When('I click on Create Todo button', async function (this:CustomWorld) {
  await this.page.getByRole('button', { name: 'Create ToDo' }).click();

});

Then('I should be able to see {string} in ToDo item to list', async function (this:CustomWorld,text: string) {
  const grabbedText = await this.page.locator('table').locator(`text="${text}"`).textContent();
  expect(grabbedText).toContain(text);;
});

Then('I should see error message', async function () {
  const errortext = await this.page.locator('#mat-mdc-error-0').textContent();
  expect(errortext).toContain('More than 100 characters not allowed');
});

When('I click on Due date field', async function (this:CustomWorld) {
  await this.page.locator('#mat-input-1').click();
});


When('clear the Due date', async function (this:CustomWorld) {
  await this.page.locator('#mat-input-1').fill('');
});

When('add current date', async function (this:CustomWorld) {
  await this.page.fill('#mat-input-1', getCurrentDateISO());
});

When('I select a due date {int} days in the past', async function (this:CustomWorld, days: number) {
  const pastDate = getPastDateISO(days);
  await this.page.fill('#mat-input-1', pastDate);
});

When('I select a due date {int} days in the future', async function (days: number) {
  const futureDate = getFutureDateISO(days);
  await this.page.fill('#mat-input-1', futureDate);
});

Then('Create ToDo button should be disabled', async function (this:CustomWorld) {
  await expect(this.page.getByRole('button', { name: 'Create ToDo' })).toBeDisabled();
});