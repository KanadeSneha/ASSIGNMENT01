import { Given, Then, When } from "@cucumber/cucumber"
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/world";

When('I click on three-dot icon', async function (this:CustomWorld) {
  await this.page.locator(`//tr[1]/td[4]/button`).click();
});

When('click on Delete button', async function (this:CustomWorld) {
  await this.page.getByText('Delete', { exact: true }).click();
});


Then('the newly added {string} items should be removed', async function (this:CustomWorld,text: string) {
  await expect(this.page.locator(`text=${text}`)).toHaveCount(0);
});


Then('ToDo list should be sorted by due date ascending order', async function (this:CustomWorld) {
  const date: string[] = await this.page.locator('td.cdk-column-dueDate').allTextContents();
  const actualDates = date.map(text => new Date(text.trim()).getTime());
  const sortedDates = [...actualDates].sort((a, b) => a - b);
  expect(actualDates).toEqual(sortedDates);
});

When('click on Archive button', async function (this:CustomWorld) {
  await this.page.getByText('Archive', { exact: true }).click();
});

Then('the newly added {string} items should be displayed under Archive list', async function (this:CustomWorld,text:string) {
  const archivedHeader = await this.page.locator('.archived');
  const grabbedText = await archivedHeader.locator(`text="${text}"`).textContent();
  expect(grabbedText).toContain(text);;
});
