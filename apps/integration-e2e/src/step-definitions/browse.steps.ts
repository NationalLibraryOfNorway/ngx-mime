import { Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/custom-world';

When(
  'the user swipe {word} and the velocity is between {int}-{int}',
  async function (
    this: CustomWorld,
    direction: string,
    velocityStart: number,
    velocityEnd: number
  ) {
    if (direction === 'left-to-right') {
      const start = {
        x: 200,
        y: 0,
      };
      const end = {
        x: 0,
        y: 0,
      };
      await this.viewerPage.swipe(start, end);
    }
  }
);

When(
  'the user swipe {word} and the velocity is equal or greater than {int}',
  async function (this: CustomWorld, direction: string, velocity: number) {
    return 'pending';
  }
);

When(
  'the user swipe {word} but the velocity is less than {int}',
  async function (this: CustomWorld, direction: string, velocity: number) {
    return 'pending';
  }
);

When(
  'the user drags the page slider to page {int}',
  async function (this: CustomWorld, canvasGroupIndex: number) {
    await this.viewerPage.slideToCanvasGroup(canvasGroupIndex - 1);
  }
);

When(
  'the user enters {int} in the page dialog',
  async function (this: CustomWorld, canvasGroupIndex: number) {
    await this.viewerPage.goToCanvasGroupWithDialog(canvasGroupIndex);
  }
);

Then(
  'page {word} is displayed',
  async function (this: CustomWorld, canvasGroupIndex: string) {
    const currentCanvasGroupString =
      await this.viewerPage.getCurrentCanvasGroupLabel();
    expect(currentCanvasGroupString.includes(canvasGroupIndex)).toBeTruthy();
  }
);

When(
  'the user click the {word} button',
  async function (this: CustomWorld, navigationButton: string) {
    if (navigationButton === 'next') {
      await this.viewerPage.clickNextButton();
    } else if (navigationButton === 'previous') {
      await this.viewerPage.clickPreviousButton();
    }
  }
);
