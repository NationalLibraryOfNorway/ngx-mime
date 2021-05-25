import { After, Status } from 'cucumber';
import { browser } from 'protractor';

After(function (testCase: any) {
  const world = this;
  if (testCase.result.status === Status.FAILED) {
    return browser.takeScreenshot().then(function (screenShot) {
      // screenShot is a base-64 encoded PNG
      world.attach(screenShot, 'image/png');
    });
  } else {
    return null;
  }
});
