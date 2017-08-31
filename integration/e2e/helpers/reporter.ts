import { Capabilities } from 'selenium-webdriver';
import { defineSupportCode } from 'cucumber';
const fs = require('fs-extra');
const jsonFile = require('jsonfile');
const path = require('path');
const projectRoot = process.cwd();

defineSupportCode(({ registerListener }) => {

  const snapshotPath = path.join(projectRoot, '.tmp/json-output');
  fs.ensureDirSync(snapshotPath);

});
