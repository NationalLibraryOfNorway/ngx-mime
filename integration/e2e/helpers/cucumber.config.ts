import { defineSupportCode } from 'cucumber';

defineSupportCode(({ setDefaultTimeout }) => {
  setDefaultTimeout(60 * 1000);
});
