export const testManifest: any = {
  '@context': [
    'http://www.w3.org/ns/anno.jsonld',
    'http://iiif.io/api/presentation/3/context.json',
  ],
  id: 'https://api.nb.no/catalog/v3/iiif/0266d0da8f0d064a7725048aacf19872/manifest',
  type: 'Manifest',
  label: {
    no: ['Fjellkongen Ludvig "Ludden"'],
  },
  metadata: [
    {
      label: {
        no: ['Tilgang'],
      },
      value: {
        no: ['Tilgang for norske IP-adresser'],
      },
    },
    {
      label: {
        no: ['Tittel'],
      },
      value: {
        no: ['Fjellkongen Ludvig "Ludden"'],
      },
    },
    {
      label: {
        no: ['Forfatter'],
      },
      value: {
        no: ['Skanche, Kari'],
      },
    },
    {
      label: {
        no: ['Omhandler'],
      },
      value: {
        no: ['Olestadengen, Ludvig Simensen'],
      },
    },
    {
      label: {
        no: ['Publisert'],
      },
      value: {
        no: ['Lillehammer:Thorsrud, Lokalhistorisk forl., 1994'],
      },
    },
    {
      label: {
        no: ['Emne'],
      },
      value: {
        no: ['ringsaker | originaler'],
      },
    },
    {
      label: {
        no: ['Andre opplysninger'],
      },
      value: {
        no: [
          'Om: Ludvig Simensen Olestadengen\nOpplagshistorikk:  2. oppl. 1994; 3. oppl. 1995; 4. oppl. 1999; 5. oppl. 2002\nElektronisk reproduksjon [Norge] Nasjonalbiblioteket Digital 2009-04-07\n',
        ],
      },
    },
    {
      label: {
        no: ['Språk'],
      },
      value: {
        no: ['Norsk (Bokmål)'],
      },
    },
    {
      label: {
        no: ['ISBN'],
      },
      value: {
        no: ['8290439857'],
      },
    },
    {
      label: {
        no: ['Kilde for metadata'],
      },
      value: {
        no: [
          'nb.bibsys.no (<a title="Link til post i Oria" href="https://www.oria.no/?vid=NB&search=999422181914702202">999422181914702202</a>)',
        ],
      },
    },
    {
      label: {
        no: ['Omfang'],
      },
      value: {
        no: ['79 s. ill.'],
      },
    },
    {
      label: {
        no: ['Medietype'],
      },
      value: {
        no: ['bøker'],
      },
    },
    {
      label: {
        no: ['Dewey'],
      },
      value: {
        no: ['920.71'],
      },
    },
    {
      label: {
        no: ['Varig lenke'],
      },
      value: {
        no: [
          '<a href="https://urn.nb.no/URN:NBN:no-nb_digibok_2008020404020" target="_blank">https://urn.nb.no/URN:NBN:no-nb_digibok_2008020404020</a>',
        ],
      },
    },
    {
      label: {
        no: [''],
      },
      value: {
        no: [
          '<a href="https://www.nb.no/items/0266d0da8f0d064a7725048aacf19872?manifest=https://api.nb.no/catalog/v3/iiif/0266d0da8f0d064a7725048aacf19872/manifest" target="_blank"><img src="https://www.nb.no/content/uploads/2018/08/logo-iiif.png" alt="IIIF Drag-n-drop"></a>',
        ],
      },
    },
  ],
  thumbnail: {
    id: 'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_C1/full/0,200/0/native.jpg',
    type: 'Image',
    format: 'image/jpeg',
    service: [
      {
        id: 'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_C1',
        type: 'ImageService2',
        profile: 'level1',
      },
    ],
  },
  behavior: ['paged'],
  rights: 'https://www.nb.no/lisens/stromming',
  requiredStatement: {
    label: {
      no: ['Tillatelse'],
    },
    value: {
      no: ['Det er kun tillatt å strømme dette materialet til privat bruk.'],
    },
  },
  service: [
    {
      id: 'http://example.org/services/identifier/search',
      type: 'SearchService1',
      profile: 'level1',
    },
  ],
  provider: [
    {
      id: 'https://example.org/about',
      type: 'Agent',
      label: { en: ['Example Organization'] },
      homepage: [
        {
          id: 'https://example.org/',
          type: 'Text',
          label: { en: ['Example Organization Homepage'] },
          format: 'text/html',
        },
      ],
      logo: [
        {
          id: 'https://example.org/images/logo.png',
          type: 'Image',
          format: 'image/png',
          height: 100,
          width: 120,
        },
      ],
      seeAlso: [
        {
          id: 'https://data.example.org/about/us.jsonld',
          type: 'Dataset',
          format: 'application/ld+json',
          profile: 'https://schema.org/',
        },
      ],
    },
  ],
  items: [
    {
      id: 'https://api.nb.no/catalog/v3/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_C1',
      type: 'Canvas',
      seeAlso: [
        {
          id: 'https://api.nb.no:443/catalog/v1/metadata/efdaa4d42d72672d9f095e5df5d032cf/altos/URN:NBN:no-nb_digimanus_313779_0001',
          type: 'Dataset',
          format: 'application/alto+xml',
          profile: 'http://www.loc.gov/standards/alto',
        },
      ],
      label: {
        '@none': ['81'],
      },
      height: 2564,
      width: 1839,
      items: [
        {
          id: 'https://api.nb.no/catalog/v3/iiif/0266d0da8f0d064a7725048aacf19872/annotationpage/URN:NBN:no-nb_digibok_2008020404020_C1',
          type: 'AnnotationPage',
          items: [
            {
              id: 'https://api.nb.no/catalog/v3/iiif/0266d0da8f0d064a7725048aacf19872/annotation/URN:NBN:no-nb_digibok_2008020404020_C1',
              type: 'Annotation',
              motivation: 'painting',
              body: {
                id: 'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_C1/full/full/0/native.jpg',
                type: 'Image',
                format: 'image/jpeg',
                service: [
                  {
                    id: 'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_C1',
                    type: 'ImageService2',
                    width: 1839,
                    height: 2564,
                    sizes: [
                      {
                        width: 919,
                        height: 1282,
                      },
                      {
                        width: 459,
                        height: 641,
                      },
                      {
                        width: 229,
                        height: 320,
                      },
                      {
                        width: 114,
                        height: 160,
                      },
                    ],
                    tiles: [
                      {
                        width: 1024,
                        scaleFactors: [1, 2, 4, 8, 16],
                      },
                    ],
                    profile: 'level1',
                    service: [
                      {
                        '@context':
                          'http://iiif.io/api/annex/services/physdim/1/context.json',
                        profile: 'http://iiif.io/api/annex/services/physdim',
                        physicalScale: 0.003333333333333333,
                        physicalUnits: 'in',
                      },
                    ],
                  },
                ],
                height: 2564,
                width: 1839,
              },
              target:
                'https://api.nb.no/catalog/v3/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_C1',
            },
          ],
        },
      ],
    },
  ],
  structures: [
    {
      id: 'https://api.nb.no/catalog/v3/iiif/0266d0da8f0d064a7725048aacf19872/range/r-0',
      type: 'Range',
      label: {
        no: ['Framside'],
      },
      items: [
        {
          id: 'https://api.nb.no/catalog/v3/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_C1',
          type: 'Canvas',
        },
      ],
    },
    {
      id: 'https://api.nb.no/catalog/v3/iiif/0266d0da8f0d064a7725048aacf19872/range/r-1',
      type: 'Range',
      label: {
        no: ['Tittelside'],
      },
      items: [
        {
          id: 'https://api.nb.no/catalog/v3/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0003',
          type: 'Canvas',
        },
      ],
    },
    {
      id: 'https://api.nb.no/catalog/v3/iiif/0266d0da8f0d064a7725048aacf19872/range/r-2',
      type: 'Range',
      label: {
        no: ['Bakside'],
      },
      items: [
        {
          id: 'https://api.nb.no/catalog/v3/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_C3',
          type: 'Canvas',
        },
      ],
    },
  ],
};
