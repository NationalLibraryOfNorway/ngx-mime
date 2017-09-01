import { defineSupportCode } from 'cucumber';

defineSupportCode(({ setDefaultTimeout }) => {
  setDefaultTimeout(480000);
});
