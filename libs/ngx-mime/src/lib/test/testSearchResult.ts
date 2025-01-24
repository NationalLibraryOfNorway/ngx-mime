export let testSearchResult: any = {
  '@context': [
    'http://iiif.io/api/presentation/2/context.json',
    'http://iiif.io/api/search/0/context.json',
  ],
  '@id':
    'https://api.nb.no/catalog/v1/contentsearch/578dffe1fd335a33693bb4261dc738b5/search?q=america',
  '@type': 'sc:AnnotationList',
  resources: [
    {
      '@id':
        'https://api.nb.no/catalog/v1/iiif/578dffe1fd335a33693bb4261dc738b5/annotation/URN:NBN:no-nb_digibok_2013072924008_0003#xywh=304,1178,1024,137',
      '@type': 'oa:Annotation',
      motivation: 'sc:painting',
      resource: {
        '@type': 'cnt:ContentAsText',
        chars: 'AMERICA. ',
      },
      on: 'https://api.nb.no/catalog/v1/iiif/578dffe1fd335a33693bb4261dc738b5/canvas/URN:NBN:no-nb_digibok_2013072924008_0003#xywh=304,1178,1024,137',
    },
    {
      '@id':
        'https://api.nb.no/catalog/v1/iiif/578dffe1fd335a33693bb4261dc738b5/annotation/URN:NBN:no-nb_digibok_2013072924008_0005#xywh=968,1062,321,78',
      '@type': 'oa:Annotation',
      motivation: 'sc:painting',
      resource: {
        '@type': 'cnt:ContentAsText',
        chars: 'America, ',
      },
      on: 'https://api.nb.no/catalog/v1/iiif/578dffe1fd335a33693bb4261dc738b5/canvas/URN:NBN:no-nb_digibok_2013072924008_0005#xywh=968,1062,321,78',
    },
  ],
  hits: [
    {
      '@type': 'search:Hit',
      annotations: [
        'https://api.nb.no/catalog/v1/iiif/578dffe1fd335a33693bb4261dc738b5/annotation/URN:NBN:no-nb_digibok_2013072924008_0003#xywh=304,1178,1024,137',
      ],
      match: 'AMERICA. ',
      before: 'THE LA W S OF THE UNITED STATES OF y ',
      after:
        ' IN FOUR VOLUMES. VOL, IV. PUBLISHED BT AUTHORITT. : J PHILADELPHIA: ; PRIN7ED BT RICHARD FOLWELL, No. 63, NORTH FBONT-STREET. 1799» VOL, ',
    },
    {
      '@type': 'search:Hit',
      annotations: [
        'https://api.nb.no/catalog/v1/iiif/578dffe1fd335a33693bb4261dc738b5/annotation/URN:NBN:no-nb_digibok_2013072924008_0005#xywh=968,1062,321,78',
      ],
      match: 'America, ',
      before:
        'PASSED AT THE FIRST SESStOtf OF THE Fl FTH CONGRESS O F T H E United States of ',
      after:
        ' BEGUN AND HELD AT THE CITY OF PHILADELPHIA, On Monday the ffteenth of May j IN THE ',
    },
  ],
};

export let testSearchResultOverMultiplePages: any = {
  '@context': [
    'http://iiif.io/api/presentation/2/context.json',
    'http://iiif.io/api/search/0/context.json',
  ],
  '@id':
    'https://api.dev.nb.no/catalog/v1/contentsearch/ac21c8b1011362c2191a96584affd83b/search?q=lastebilk%C3%B8yraren',
  '@type': 'sc:AnnotationList',
  resources: [
    {
      '@id':
        'https://api.dev.nb.no/catalog/v1/iiif/ac21c8b1011362c2191a96584affd83b/annotation/URN:NBN:no-nb_digibok_2012062906086_0001#xywh=1406,2735,178,47',
      '@type': 'oa:Annotation',
      motivation: 'sc:painting',
      resource: {
        '@type': 'cnt:ContentAsText',
        chars: 'lastebilkøyraren ',
      },
      on: 'https://api.dev.nb.no/catalog/v1/iiif/ac21c8b1011362c2191a96584affd83b/canvas/URN:NBN:no-nb_digibok_2012062906086_0001#xywh=1406,2735,178,47',
    },
    {
      '@id':
        'https://api.dev.nb.no/catalog/v1/iiif/ac21c8b1011362c2191a96584affd83b/annotation/URN:NBN:no-nb_digibok_2012062906086_0002#xywh=375,239,231,61',
      '@type': 'oa:Annotation',
      motivation: 'sc:painting',
      resource: {
        '@type': 'cnt:ContentAsText',
        chars: 'lastebilkøyraren ',
      },
      on: 'https://api.dev.nb.no/catalog/v1/iiif/ac21c8b1011362c2191a96584affd83b/canvas/URN:NBN:no-nb_digibok_2012062906086_0002#xywh=375,239,231,61',
    },
    {
      '@id':
        'https://api.dev.nb.no/catalog/v1/iiif/ac21c8b1011362c2191a96584affd83b/annotation/URN:NBN:no-nb_digibok_2012062906086_0002#xywh=873,822,409,64',
      '@type': 'oa:Annotation',
      motivation: 'sc:painting',
      resource: {
        '@type': 'cnt:ContentAsText',
        chars: 'lastebilkøyraren ',
      },
      on: 'https://api.dev.nb.no/catalog/v1/iiif/ac21c8b1011362c2191a96584affd83b/canvas/URN:NBN:no-nb_digibok_2012062906086_0002#xywh=873,822,409,64',
    },
  ],
  hits: [
    {
      '@type': 'search:Hit',
      annotations: [
        'https://api.dev.nb.no/catalog/v1/iiif/ac21c8b1011362c2191a96584affd83b/annotation/URN:NBN:no-nb_digibok_2012062906086_0001#xywh=1406,2735,178,47',
        'https://api.dev.nb.no/catalog/v1/iiif/ac21c8b1011362c2191a96584affd83b/annotation/URN:NBN:no-nb_digibok_2012062906086_0002#xywh=375,239,231,61',
      ],
      match: 'lastebilkøyraren ',
      before:
        'jern sette den tunge maskina seg i rørsle. - Ein liten tanke til denne kanten, ropa 14 ',
      after:
        ' og gjorde på nytt eit teikn, men bare ein liten tanke! Olav Kås nikka, han hadde skjøna. ',
    },
    {
      '@type': 'search:Hit',
      annotations: [
        'https://api.dev.nb.no/catalog/v1/iiif/ac21c8b1011362c2191a96584affd83b/annotation/URN:NBN:no-nb_digibok_2012062906086_0002#xywh=873,822,409,64',
      ],
      match: 'lastebilkøyraren ',
      before:
        'på tverke og slo beltet mot lastekarmen og reiv han opp så flisane fauk. - Stans! skreik ',
      after:
        ' og strekte båe armane i været og riste kraftig på hovudet mot Olav Kås og sette i ',
    },
  ],
};
