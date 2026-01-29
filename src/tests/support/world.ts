import { Browser, BrowserContext, Page, chromium } from 'playwright';
import { setWorldConstructor } from '@cucumber/cucumber';

export class CustomWorld {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;

  async init() {
    this.browser = await chromium.launch({ headless: true });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
  }

  async cleanup() {
    await this.browser.close();
  }

}

setWorldConstructor(CustomWorld);
