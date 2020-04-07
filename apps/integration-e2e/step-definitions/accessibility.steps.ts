import { expect } from 'chai';
import { Then } from 'cucumber';
import { browser } from 'protractor';

const AxeBuilder = require('axe-webdriverjs');

Then('the viewer should meet all accessibility criteria', async () => {
  await AxeBuilder(browser.driver)
    .disableRules(['page-has-heading-one', 'landmark-one-main'])
    .analyze()
    .then(results => {
      results.violations.forEach(v => v.nodes.forEach(n => console.log(n)));
      expect(results.violations.length).to.equal(0);
    });
});
