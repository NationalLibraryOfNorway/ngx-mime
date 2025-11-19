import {
  EnvironmentProviders,
  makeEnvironmentProviders,
  Provider,
  Type,
} from '@angular/core';
import { MimeViewerIntl } from './viewer-intl';
import { MimeViewerIntlLt } from './viewer-intl.lt';
import { MimeViewerIntlNoNb } from './viewer-intl.no_nb';

export const provideMimeViewerIntl = (options?: {
  locale?: string;
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
  locale: string | undefined,
): Type<MimeViewerIntl | MimeViewerIntlNoNb | MimeViewerIntlLt> => {
  switch (locale) {
    case 'lt':
      return MimeViewerIntlLt;
    case 'nb':
      return MimeViewerIntlNoNb;
    default:
      return MimeViewerIntl;
  }
};
