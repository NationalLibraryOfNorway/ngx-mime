import { Browser, BrowserContext, Page } from '@playwright/test';
import { Animations } from '../helpers/animations';
import { ContentSearchPage } from '../pages/content-search.po';
import { ElementsPage } from '../pages/elements.po';
import { HelpDialogPage } from '../pages/help-dialog.po';
import { InformationDialogPage } from '../pages/information-dialog.po';
import { MetadataPage } from '../pages/metadata.po';
import { TableOfContentsPage } from '../pages/table-of-contents.po';
import { ViewerPage } from '../pages/viewer.po';
import { ParameterType } from './ParameterType';

export class CustomWorld {
  readonly informationDialogPage: InformationDialogPage;
  readonly viewerPage: ViewerPage;
  readonly elementsPage: ElementsPage;
  readonly metadataPage: MetadataPage;
  readonly tocPage: TableOfContentsPage;
  readonly contentSearchPage: ContentSearchPage;
  readonly helpDialogPage: HelpDialogPage;
  readonly animations: Animations;

  constructor(
    readonly parameters: ParameterType,
    readonly page: Page,
    readonly browser: Browser,
    readonly context: BrowserContext,
  ) {
    this.animations = new Animations(this.page);
    this.informationDialogPage = new InformationDialogPage(this.page);
    this.viewerPage = new ViewerPage(
      this.parameters,
      this.page,
      this.animations,
    );
    this.elementsPage = new ElementsPage(
      this.parameters,
      this.page,
      this.viewerPage,
    );
    this.metadataPage = new MetadataPage(this.page);
    this.tocPage = new TableOfContentsPage(this.page);
    this.contentSearchPage = new ContentSearchPage(
      this.page,
      this.viewerPage,
      this.animations,
    );
    this.helpDialogPage = new HelpDialogPage(this.page);
  }
}
