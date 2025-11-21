import {
  EnvironmentProviders,
  makeEnvironmentProviders,
  Provider,
  Type,
} from '@angular/core';
import { Locales } from './locales.enum';
import { MimeViewerIntl } from './viewer-intl';
import { MimeViewerIntlLt } from './viewer-intl.lt';
import { MimeViewerIntlNoNb } from './viewer-intl.no_nb';

export const provideMimeViewerIntl = (options?: {
  locale?: Locales;
}): EnvironmentProviders => {
  const providers: Provider[] = [
    {
      provide: MimeViewerIntl,
      useClass: getMimeViewerIntl(options?.locale),
    },
  ];

  return makeEnvironmentProviders(providers);
};

const getMimeViewerIntl = (
  locale: Locales | undefined,
): Type<MimeViewerIntl | MimeViewerIntlNoNb | MimeViewerIntlLt> => {
  switch (locale) {
    case Locales.NORWEGIAN:
      return MimeViewerIntlNoNb;
    case Locales.LITHUANIAN:
      return MimeViewerIntlLt;
    case Locales.ENGLISH:
      return MimeViewerIntl;
    default:
      return MimeViewerIntl;
  }
};
