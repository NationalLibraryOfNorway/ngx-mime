import { Page } from 'playwright';

export class Animations {
  constructor(private page: Page) {}

  async waitFor(animationTime?: number): Promise<void> {
    if (animationTime === undefined) {
      animationTime = await this.getAnimationTimeInMs();
    }
    await this.page.waitForTimeout(animationTime);
  }

  private getAnimationTimeInMs(): Promise<number> {
    return new Promise((resolve, reject) => {
      this.getAnimationTimeInSec().then((time) => {
        resolve(time * 1000);
      });
    });
  }

  private getAnimationTimeInSec(): Promise<number> {
    return this.page.evaluate('window.openSeadragonViewer.animationTime;');
  }
}
