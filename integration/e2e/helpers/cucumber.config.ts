import { defineSupportCode } from 'cucumber';

defineSupportCode(({ setDefaultTimeout }) => {
  setDefaultTimeout(240 * 1000);
});
