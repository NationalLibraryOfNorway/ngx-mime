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
