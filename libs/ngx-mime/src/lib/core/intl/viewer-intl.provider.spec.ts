import { Injector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Locales } from './locales.enum';
import { MimeViewerIntl } from './viewer-intl';
import { MimeViewerIntlNoNb } from './viewer-intl.no_nb';
import {
  MIME_VIEWER_INTL_PROVIDER,
  provideMimeViewerIntl,
} from './viewer-intl.provider';

describe('provideMimeViewerIntl', () => {
  it('should create a separate configured instance for each viewer injector', () => {
    TestBed.configureTestingModule({
      providers: [provideMimeViewerIntl({ locale: Locales.NORWEGIAN })],
    });
    const createIntl = () =>
      Injector.create({
        providers: [MIME_VIEWER_INTL_PROVIDER],
        parent: TestBed.inject(Injector),
      }).get(MimeViewerIntl);

    const first = createIntl();
    const second = createIntl();

    expect(first).toBeInstanceOf(MimeViewerIntlNoNb);
    expect(second).toBeInstanceOf(MimeViewerIntlNoNb);
    expect(first).not.toBe(second);
  });
});
