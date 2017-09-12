import { ViewerPage, Point } from '../pages/viewer.po';
import { defineSupportCode } from 'cucumber';
import { expect } from '../helpers/chai-imports';

defineSupportCode(function ({ Given, When, Then }) {
  const page = new ViewerPage();

  When(/^the user search for the word "([^"]*)"$/, async (term: string) => {
    return Promise.resolve('pending');
  });

  Then(/^there are 5 results found$/, async () => {
    return Promise.resolve('pending');
  });

  Then(/^the word "([^"]*)" should be highlighted$/, async (term: string) => {
    return Promise.resolve('pending');
  });

});
