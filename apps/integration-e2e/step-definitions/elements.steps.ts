import { expect } from 'chai';
import { Given, Then, When } from 'cucumber';
import { ElementsPage } from '../pages/elements.po';
import { ViewerPage } from '../pages/viewer.po';
import { browser } from 'protractor';

const elementsPage = new ElementsPage();
const viewerPage = new ViewerPage();
