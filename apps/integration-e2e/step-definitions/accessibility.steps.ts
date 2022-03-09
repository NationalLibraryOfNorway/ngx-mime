import { expect } from 'chai';
import { Then } from 'cucumber';
import { browser } from 'protractor';

const AxeBuilder = require('@axe-core/webdriverjs');

Then('the viewer should meet all accessibility criteria', async () => {
  await new AxeBuilder(browser.driver)
    .disableRules(['page-has-heading-one', 'landmark-one-main'])
    .analyze()
    .then((results: any) => {
      results.violations.forEach((v: any) =>
        v.nodes.forEach((n: any) => console.log(n))
      );
      expect(results.violations.length).to.equal(0);
    });
});
