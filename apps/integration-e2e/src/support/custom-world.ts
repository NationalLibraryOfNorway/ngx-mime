import { IWorld, World } from '@cucumber/cucumber';
import { Page } from 'playwright';
import { Utils } from '../helpers/utils';
import { ContentSearchPage } from '../pages/content-search.po';
import { ContentsDialogPage } from '../pages/contents-dialog.po';
import { ElementsPage } from '../pages/elements.po';
import { HelpDialogPage } from '../pages/help-dialog.po';
import { MetadataPage } from '../pages/metadata.po';
import { TableOfContentsPage } from '../pages/table-of-contents.po';
import { ViewerPage } from '../pages/viewer.po';

export class CustomWorld extends World {
  page!: Page;
  contentsDialogPage!: ContentsDialogPage;
  viewerPage!: ViewerPage;
  elementsPage!: ElementsPage;
  metadataPage!: MetadataPage;
  tocPage!: TableOfContentsPage;
  contentSearchPage!: ContentSearchPage;
  helpDialogPage!: HelpDialogPage;
  utils!: Utils;

  async init(this: IWorld): Promise<void> {
    this.utils = new Utils(this.page);
    this.contentsDialogPage = new ContentsDialogPage(
      this.parameters,
      this.page
    );
    this.viewerPage = new ViewerPage(this.parameters, this.page);
    this.elementsPage = new ElementsPage(
      this.parameters,
      this.page,
      this.viewerPage
    );
    this.metadataPage = new MetadataPage(this.parameters, this.page);
    this.tocPage = new TableOfContentsPage(this.parameters, this.page);
    this.contentSearchPage = new ContentSearchPage(this.page, this.viewerPage);
    this.helpDialogPage = new HelpDialogPage(this.page);
  }
}
