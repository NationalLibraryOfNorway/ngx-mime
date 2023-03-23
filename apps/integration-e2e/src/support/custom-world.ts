import { IWorld, World } from '@cucumber/cucumber';
import { Page } from 'playwright';
import { Animations } from '../helpers/animations';
import { ContentSearchPage } from '../pages/content-search.po';
import { InformationDialogPage } from '../pages/information-dialog.po';
import { ElementsPage } from '../pages/elements.po';
import { HelpDialogPage } from '../pages/help-dialog.po';
import { MetadataPage } from '../pages/metadata.po';
import { TableOfContentsPage } from '../pages/table-of-contents.po';
import { ViewerPage } from '../pages/viewer.po';

export class CustomWorld extends World {
  page!: Page;
  informationDialogPage!: InformationDialogPage;
  viewerPage!: ViewerPage;
  elementsPage!: ElementsPage;
  metadataPage!: MetadataPage;
  tocPage!: TableOfContentsPage;
  contentSearchPage!: ContentSearchPage;
  helpDialogPage!: HelpDialogPage;
  animations!: Animations;

  async init(this: IWorld): Promise<void> {
    this.animations = new Animations(this.page);
    this.informationDialogPage = new InformationDialogPage(this.page);
    this.viewerPage = new ViewerPage(
      this.parameters,
      this.page,
      this.animations
    );
    this.elementsPage = new ElementsPage(
      this.parameters,
      this.page,
      this.viewerPage
    );
    this.metadataPage = new MetadataPage(this.page);
    this.tocPage = new TableOfContentsPage(this.page);
    this.contentSearchPage = new ContentSearchPage(
      this.page,
      this.viewerPage,
      this.animations
    );
    this.helpDialogPage = new HelpDialogPage(this.page);
  }
}
