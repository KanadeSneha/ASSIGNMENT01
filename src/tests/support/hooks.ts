

import { Before, After, AfterStep, Status } from '@cucumber/cucumber';

Before(async function () {
  await this.init();
});

After(async function () {
  await this.cleanup();
});

// AfterStep(async function ({ result }) {
//   if (result?.status === Status.FAILED) {
//     const screenshot = await this.page.screenshot();
//     this.attach(screenshot, 'image/png');
//   }
// });