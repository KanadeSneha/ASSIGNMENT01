import { Given, Then, When, setDefaultTimeout } from "@cucumber/cucumber"
import { expect } from "@playwright/test";

When('I click on three-dot icon', async function () {
  await this.page.locator(`//tr[1]/td[4]/button`).click();
});

When('click on Delete button', async function () {
  await this.page.getByText('Delete', { exact: true }).click();
});


Then('the newly added {string} items should be removed', async function (text: string) {
  await expect(this.page.locator(`text=${text}`)).toHaveCount(0);
});


Then('ToDo list should be sorted by due date ascending order', async function () {
  const dateTexts: string[] = await this.page.locator('td.cdk-column-dueDate').allTextContents();
  const actualDates = dateTexts.map(text => new Date(text.trim()).getTime());
  const sortedDates = [...actualDates].sort((a, b) => a - b);
  expect(actualDates).toEqual(sortedDates);
});

When('click on Archive button', async function () {
  await this.page.getByText('Archive', { exact: true }).click();
});

Then('the newly added {string} items should be displayed under Archive list', async function (text:string) {
  const archivedHeader = await this.page.locator('.archived');
  const grabbedText = await archivedHeader.locator(`text="${text}"`).textContent();
  expect(grabbedText).toContain(text);;
});
