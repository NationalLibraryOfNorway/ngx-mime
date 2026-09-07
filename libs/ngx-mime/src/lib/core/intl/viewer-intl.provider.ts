import {
  EnvironmentProviders,
  inject,
  InjectionToken,
  makeEnvironmentProviders,
  Provider,
  Type,
} from '@angular/core';
import { Locales } from './locales.enum';
import { MimeViewerIntl } from './viewer-intl';
import { MimeViewerIntlLt } from './viewer-intl.lt';
import { MimeViewerIntlNoNb } from './viewer-intl.no_nb';

const MIME_VIEWER_INTL_TYPE = new InjectionToken<Type<MimeViewerIntl>>(
  'MIME_VIEWER_INTL_TYPE',
  {
    providedIn: 'root',
    factory: () => MimeViewerIntl,
  },
);

export const MIME_VIEWER_INTL_PROVIDER: Provider = {
  provide: MimeViewerIntl,
  useFactory: () => {
    const intlType = inject(MIME_VIEWER_INTL_TYPE);

    return new intlType();
  },
};

export const provideMimeViewerIntl = (options?: {
  locale?: Locales;
}): EnvironmentProviders => {
  const providers: Provider[] = [
    {
      provide: MIME_VIEWER_INTL_TYPE,
      useValue: getMimeViewerIntl(options?.locale),
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
