import { Manifest } from './../core/models/manifest';

export let testManifest: any = {
  '@type': 'sc:Manifest',
  '@id':
    'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/manifest',
  label: 'Fjellkongen Ludvig "Ludden"',
  metadata: [
    {
      label: 'Tittel',
      value: 'Fjellkongen Ludvig "Ludden"'
    },
    {
      label: 'Forfatter',
      value: 'Skanche, Kari'
    },
    {
      label: 'Omhandler',
      value: 'Olestadengen, Ludvig Simensen'
    },
    {
      label: 'Publisert',
      value: 'Lillehammer: Thorsrud, Lokalhistorisk forl., 1994'
    },
    {
      label: 'Emne',
      value: 'ringsaker | originaler'
    },
    {
      label: 'Språk',
      value: 'Norsk (Bokmål)'
    },
    {
      label: 'ISBN',
      value: '8290439857'
    },
    {
      label: 'Varig lenke',
      value:
        "<a href='http://urn.nb.no/URN:NBN:no-nb_digibok_2008020404020' target='_blank'>" +
        'http://urn.nb.no/URN:NBN:no-nb_digibok_2008020404020' +
        '</a>'
    },
    {
      label: 'Medietype',
      value: 'Bøker'
    },
    {
      label: 'Dewey',
      value: '920.71'
    }
  ],
  license: 'https://beta.nb.no/lisens/copyright',
  attribution:
    'Dette verket kan ikke kopieres, spres, vises eller fremføres for ' +
    'allmennheten i noen form uten samtykke fra den enkelte rettighetshaver.',
  logo: 'http://example.com/dummylogo.jpg',
  service: {
    '@context': 'http://iiif.io/api/search/0/context.json',
    '@id': 'http://example.org/services/identifier/search',
    profile: 'http://iiif.io/api/search/0/search'
  },
  sequences: [
    {
      '@id':
        'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/sequence/normal',
      '@type': 'sc:Sequence',
      label: 'Current Page Order',
      viewingHint: 'paged',
      canvases: [
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_C1',
          '@type': 'sc:Canvas',
          seeAlso: [{
            '@id': "https://api.nb.no:443/catalog/v1/metadata/0266d0da8f0d064a7725048aacf19872/altos/URN:NBN:no-nb_digibok_2008020404020_C1",
            format: "application/alto+xml",
            profile: "http://www.loc.gov/standards/alto"
          }],
          label: '81',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_C1/full/72,0/0/native.jpg',
          height: 2564,
          width: 1839,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/annotation/URN:NBN:no-nb_digibok_2008020404020_C1',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_C1',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_C1',
                  protocol: 'http://iiif.io/api/image',
                  width: 1839,
                  height: 2564,
                  sizes: [
                    {
                      width: 919,
                      height: 1282
                    },
                    {
                      width: 459,
                      height: 641
                    },
                    {
                      width: 229,
                      height: 320
                    },
                    {
                      width: 114,
                      height: 160
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.003333333333333333,
                    physicalUnits: 'in'
                  }
                },
                height: 2564,
                width: 1839
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_C1'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_I1',
          '@type': 'sc:Canvas',
          seeAlso: [{
            '@id': "https://api.nb.no:443/catalog/v1/metadata/0266d0da8f0d064a7725048aacf19872/altos/URN:NBN:no-nb_digibok_2008020404020_I1",
            format: "application/alto+xml",
            profile: "http://www.loc.gov/standards/alto"
          }],
          label: '84',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_I1/full/72,0/0/native.jpg',
          height: 2592,
          width: 1818,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/annotation/URN:NBN:no-nb_digibok_2008020404020_I1',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_I1',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_I1',
                  protocol: 'http://iiif.io/api/image',
                  width: 1818,
                  height: 2592,
                  sizes: [
                    {
                      width: 909,
                      height: 1296
                    },
                    {
                      width: 454,
                      height: 648
                    },
                    {
                      width: 227,
                      height: 324
                    },
                    {
                      width: 113,
                      height: 162
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.003333333333333333,
                    physicalUnits: 'in'
                  }
                },
                height: 2592,
                width: 1818
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_I1'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0001',
          '@type': 'sc:Canvas',
          label: '1',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0001/full/72,0/0/native.jpg',
          height: 3272,
          width: 2368,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/' +
                'annotation/URN:NBN:no-nb_digibok_2008020404020_0001',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_0001',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0001',
                  protocol: 'http://iiif.io/api/image',
                  width: 2368,
                  height: 3272,
                  sizes: [
                    {
                      width: 1184,
                      height: 1636
                    },
                    {
                      width: 592,
                      height: 818
                    },
                    {
                      width: 296,
                      height: 409
                    },
                    {
                      width: 148,
                      height: 204
                    },
                    {
                      width: 74,
                      height: 102
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16, 32]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.0025,
                    physicalUnits: 'in'
                  }
                },
                height: 3272,
                width: 2368
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0001'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0002',
          '@type': 'sc:Canvas',
          label: '2',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0002/full/72,0/0/native.jpg',
          height: 3312,
          width: 2368,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/' +
                'annotation/URN:NBN:no-nb_digibok_2008020404020_0002',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_0002',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0002',
                  protocol: 'http://iiif.io/api/image',
                  width: 2368,
                  height: 3312,
                  sizes: [
                    {
                      width: 1184,
                      height: 1656
                    },
                    {
                      width: 592,
                      height: 828
                    },
                    {
                      width: 296,
                      height: 414
                    },
                    {
                      width: 148,
                      height: 207
                    },
                    {
                      width: 74,
                      height: 103
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16, 32]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.0025,
                    physicalUnits: 'in'
                  }
                },
                height: 3312,
                width: 2368
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0002'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0003',
          '@type': 'sc:Canvas',
          label: '3',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0003/full/72,0/0/native.jpg',
          height: 3272,
          width: 2368,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/' +
                'annotation/URN:NBN:no-nb_digibok_2008020404020_0003',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_0003',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0003',
                  protocol: 'http://iiif.io/api/image',
                  width: 2368,
                  height: 3272,
                  sizes: [
                    {
                      width: 1184,
                      height: 1636
                    },
                    {
                      width: 592,
                      height: 818
                    },
                    {
                      width: 296,
                      height: 409
                    },
                    {
                      width: 148,
                      height: 204
                    },
                    {
                      width: 74,
                      height: 102
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16, 32]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.0025,
                    physicalUnits: 'in'
                  }
                },
                height: 3272,
                width: 2368
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0003'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0004',
          '@type': 'sc:Canvas',
          label: '4',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0004/full/72,0/0/native.jpg',
          height: 3312,
          width: 2368,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/' +
                'annotation/URN:NBN:no-nb_digibok_2008020404020_0004',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_0004',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0004',
                  protocol: 'http://iiif.io/api/image',
                  width: 2368,
                  height: 3312,
                  sizes: [
                    {
                      width: 1184,
                      height: 1656
                    },
                    {
                      width: 592,
                      height: 828
                    },
                    {
                      width: 296,
                      height: 414
                    },
                    {
                      width: 148,
                      height: 207
                    },
                    {
                      width: 74,
                      height: 103
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16, 32]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.0025,
                    physicalUnits: 'in'
                  }
                },
                height: 3312,
                width: 2368
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0004'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0005',
          '@type': 'sc:Canvas',
          label: '5',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0005/full/72,0/0/native.jpg',
          height: 3272,
          width: 2360,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/' +
                'annotation/URN:NBN:no-nb_digibok_2008020404020_0005',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_0005',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0005',
                  protocol: 'http://iiif.io/api/image',
                  width: 2360,
                  height: 3272,
                  sizes: [
                    {
                      width: 1180,
                      height: 1636
                    },
                    {
                      width: 590,
                      height: 818
                    },
                    {
                      width: 295,
                      height: 409
                    },
                    {
                      width: 147,
                      height: 204
                    },
                    {
                      width: 73,
                      height: 102
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16, 32]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.0025,
                    physicalUnits: 'in'
                  }
                },
                height: 3272,
                width: 2360
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0005'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0006',
          '@type': 'sc:Canvas',
          label: '6',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0006/full/72,0/0/native.jpg',
          height: 3312,
          width: 2360,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/' +
                'annotation/URN:NBN:no-nb_digibok_2008020404020_0006',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_0006',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0006',
                  protocol: 'http://iiif.io/api/image',
                  width: 2360,
                  height: 3312,
                  sizes: [
                    {
                      width: 1180,
                      height: 1656
                    },
                    {
                      width: 590,
                      height: 828
                    },
                    {
                      width: 295,
                      height: 414
                    },
                    {
                      width: 147,
                      height: 207
                    },
                    {
                      width: 73,
                      height: 103
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16, 32]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.0025,
                    physicalUnits: 'in'
                  }
                },
                height: 3312,
                width: 2360
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0006'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0007',
          '@type': 'sc:Canvas',
          label: '7',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0007/full/72,0/0/native.jpg',
          height: 3272,
          width: 2360,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/' +
                'annotation/URN:NBN:no-nb_digibok_2008020404020_0007',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_0007',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0007',
                  protocol: 'http://iiif.io/api/image',
                  width: 2360,
                  height: 3272,
                  sizes: [
                    {
                      width: 1180,
                      height: 1636
                    },
                    {
                      width: 590,
                      height: 818
                    },
                    {
                      width: 295,
                      height: 409
                    },
                    {
                      width: 147,
                      height: 204
                    },
                    {
                      width: 73,
                      height: 102
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16, 32]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.0025,
                    physicalUnits: 'in'
                  }
                },
                height: 3272,
                width: 2360
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0007'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0008',
          '@type': 'sc:Canvas',
          label: '8',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0008/full/72,0/0/native.jpg',
          height: 3304,
          width: 2360,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/' +
                'annotation/URN:NBN:no-nb_digibok_2008020404020_0008',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_0008',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0008',
                  protocol: 'http://iiif.io/api/image',
                  width: 2360,
                  height: 3304,
                  sizes: [
                    {
                      width: 1180,
                      height: 1652
                    },
                    {
                      width: 590,
                      height: 826
                    },
                    {
                      width: 295,
                      height: 413
                    },
                    {
                      width: 147,
                      height: 206
                    },
                    {
                      width: 73,
                      height: 103
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16, 32]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.0025,
                    physicalUnits: 'in'
                  }
                },
                height: 3304,
                width: 2360
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0008'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0009',
          '@type': 'sc:Canvas',
          label: '9',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0009/full/72,0/0/native.jpg',
          height: 3272,
          width: 2360,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/' +
                'annotation/URN:NBN:no-nb_digibok_2008020404020_0009',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_0009',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0009',
                  protocol: 'http://iiif.io/api/image',
                  width: 2360,
                  height: 3272,
                  sizes: [
                    {
                      width: 1180,
                      height: 1636
                    },
                    {
                      width: 590,
                      height: 818
                    },
                    {
                      width: 295,
                      height: 409
                    },
                    {
                      width: 147,
                      height: 204
                    },
                    {
                      width: 73,
                      height: 102
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16, 32]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.0025,
                    physicalUnits: 'in'
                  }
                },
                height: 3272,
                width: 2360
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0009'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0010',
          '@type': 'sc:Canvas',
          label: '10',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0010/full/72,0/0/native.jpg',
          height: 3312,
          width: 2360,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/' +
                'annotation/URN:NBN:no-nb_digibok_2008020404020_0010',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_0010',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0010',
                  protocol: 'http://iiif.io/api/image',
                  width: 2360,
                  height: 3312,
                  sizes: [
                    {
                      width: 1180,
                      height: 1656
                    },
                    {
                      width: 590,
                      height: 828
                    },
                    {
                      width: 295,
                      height: 414
                    },
                    {
                      width: 147,
                      height: 207
                    },
                    {
                      width: 73,
                      height: 103
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16, 32]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.0025,
                    physicalUnits: 'in'
                  }
                },
                height: 3312,
                width: 2360
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0010'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0011',
          '@type': 'sc:Canvas',
          label: '11',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0011/full/72,0/0/native.jpg',
          height: 3272,
          width: 2352,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/' +
                'annotation/URN:NBN:no-nb_digibok_2008020404020_0011',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_0011',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0011',
                  protocol: 'http://iiif.io/api/image',
                  width: 2352,
                  height: 3272,
                  sizes: [
                    {
                      width: 1176,
                      height: 1636
                    },
                    {
                      width: 588,
                      height: 818
                    },
                    {
                      width: 294,
                      height: 409
                    },
                    {
                      width: 147,
                      height: 204
                    },
                    {
                      width: 73,
                      height: 102
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16, 32]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.0025,
                    physicalUnits: 'in'
                  }
                },
                height: 3272,
                width: 2352
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0011'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0012',
          '@type': 'sc:Canvas',
          label: '12',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0012/full/72,0/0/native.jpg',
          height: 3304,
          width: 2352,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/' +
                'annotation/URN:NBN:no-nb_digibok_2008020404020_0012',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_0012',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0012',
                  protocol: 'http://iiif.io/api/image',
                  width: 2352,
                  height: 3304,
                  sizes: [
                    {
                      width: 1176,
                      height: 1652
                    },
                    {
                      width: 588,
                      height: 826
                    },
                    {
                      width: 294,
                      height: 413
                    },
                    {
                      width: 147,
                      height: 206
                    },
                    {
                      width: 73,
                      height: 103
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16, 32]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.0025,
                    physicalUnits: 'in'
                  }
                },
                height: 3304,
                width: 2352
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0012'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0013',
          '@type': 'sc:Canvas',
          label: '13',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0013/full/72,0/0/native.jpg',
          height: 3272,
          width: 2360,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/' +
                'annotation/URN:NBN:no-nb_digibok_2008020404020_0013',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_0013',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0013',
                  protocol: 'http://iiif.io/api/image',
                  width: 2360,
                  height: 3272,
                  sizes: [
                    {
                      width: 1180,
                      height: 1636
                    },
                    {
                      width: 590,
                      height: 818
                    },
                    {
                      width: 295,
                      height: 409
                    },
                    {
                      width: 147,
                      height: 204
                    },
                    {
                      width: 73,
                      height: 102
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16, 32]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.0025,
                    physicalUnits: 'in'
                  }
                },
                height: 3272,
                width: 2360
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0013'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0014',
          '@type': 'sc:Canvas',
          label: '14',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0014/full/72,0/0/native.jpg',
          height: 3312,
          width: 2360,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/' +
                'annotation/URN:NBN:no-nb_digibok_2008020404020_0014',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_0014',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0014',
                  protocol: 'http://iiif.io/api/image',
                  width: 2360,
                  height: 3312,
                  sizes: [
                    {
                      width: 1180,
                      height: 1656
                    },
                    {
                      width: 590,
                      height: 828
                    },
                    {
                      width: 295,
                      height: 414
                    },
                    {
                      width: 147,
                      height: 207
                    },
                    {
                      width: 73,
                      height: 103
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16, 32]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.0025,
                    physicalUnits: 'in'
                  }
                },
                height: 3312,
                width: 2360
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0014'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0015',
          '@type': 'sc:Canvas',
          label: '15',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0015/full/72,0/0/native.jpg',
          height: 3272,
          width: 2352,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/' +
                'annotation/URN:NBN:no-nb_digibok_2008020404020_0015',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_0015',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0015',
                  protocol: 'http://iiif.io/api/image',
                  width: 2352,
                  height: 3272,
                  sizes: [
                    {
                      width: 1176,
                      height: 1636
                    },
                    {
                      width: 588,
                      height: 818
                    },
                    {
                      width: 294,
                      height: 409
                    },
                    {
                      width: 147,
                      height: 204
                    },
                    {
                      width: 73,
                      height: 102
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16, 32]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.0025,
                    physicalUnits: 'in'
                  }
                },
                height: 3272,
                width: 2352
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0015'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0016',
          '@type': 'sc:Canvas',
          label: '16',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0016/full/72,0/0/native.jpg',
          height: 3304,
          width: 2352,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/' +
                'annotation/URN:NBN:no-nb_digibok_2008020404020_0016',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_0016',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0016',
                  protocol: 'http://iiif.io/api/image',
                  width: 2352,
                  height: 3304,
                  sizes: [
                    {
                      width: 1176,
                      height: 1652
                    },
                    {
                      width: 588,
                      height: 826
                    },
                    {
                      width: 294,
                      height: 413
                    },
                    {
                      width: 147,
                      height: 206
                    },
                    {
                      width: 73,
                      height: 103
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16, 32]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.0025,
                    physicalUnits: 'in'
                  }
                },
                height: 3304,
                width: 2352
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0016'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0017',
          '@type': 'sc:Canvas',
          label: '17',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0017/full/72,0/0/native.jpg',
          height: 3272,
          width: 2352,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/' +
                'annotation/URN:NBN:no-nb_digibok_2008020404020_0017',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_0017',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0017',
                  protocol: 'http://iiif.io/api/image',
                  width: 2352,
                  height: 3272,
                  sizes: [
                    {
                      width: 1176,
                      height: 1636
                    },
                    {
                      width: 588,
                      height: 818
                    },
                    {
                      width: 294,
                      height: 409
                    },
                    {
                      width: 147,
                      height: 204
                    },
                    {
                      width: 73,
                      height: 102
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16, 32]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.0025,
                    physicalUnits: 'in'
                  }
                },
                height: 3272,
                width: 2352
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0017'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0018',
          '@type': 'sc:Canvas',
          label: '18',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0018/full/72,0/0/native.jpg',
          height: 3312,
          width: 2352,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/' +
                'annotation/URN:NBN:no-nb_digibok_2008020404020_0018',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_0018',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0018',
                  protocol: 'http://iiif.io/api/image',
                  width: 2352,
                  height: 3312,
                  sizes: [
                    {
                      width: 1176,
                      height: 1656
                    },
                    {
                      width: 588,
                      height: 828
                    },
                    {
                      width: 294,
                      height: 414
                    },
                    {
                      width: 147,
                      height: 207
                    },
                    {
                      width: 73,
                      height: 103
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16, 32]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.0025,
                    physicalUnits: 'in'
                  }
                },
                height: 3312,
                width: 2352
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0018'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0019',
          '@type': 'sc:Canvas',
          label: '19',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0019/full/72,0/0/native.jpg',
          height: 3272,
          width: 2352,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/' +
                'annotation/URN:NBN:no-nb_digibok_2008020404020_0019',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_0019',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0019',
                  protocol: 'http://iiif.io/api/image',
                  width: 2352,
                  height: 3272,
                  sizes: [
                    {
                      width: 1176,
                      height: 1636
                    },
                    {
                      width: 588,
                      height: 818
                    },
                    {
                      width: 294,
                      height: 409
                    },
                    {
                      width: 147,
                      height: 204
                    },
                    {
                      width: 73,
                      height: 102
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16, 32]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.0025,
                    physicalUnits: 'in'
                  }
                },
                height: 3272,
                width: 2352
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0019'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0020',
          '@type': 'sc:Canvas',
          label: '20',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0020/full/72,0/0/native.jpg',
          height: 3304,
          width: 2352,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/' +
                'annotation/URN:NBN:no-nb_digibok_2008020404020_0020',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_0020',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0020',
                  protocol: 'http://iiif.io/api/image',
                  width: 2352,
                  height: 3304,
                  sizes: [
                    {
                      width: 1176,
                      height: 1652
                    },
                    {
                      width: 588,
                      height: 826
                    },
                    {
                      width: 294,
                      height: 413
                    },
                    {
                      width: 147,
                      height: 206
                    },
                    {
                      width: 73,
                      height: 103
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16, 32]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.0025,
                    physicalUnits: 'in'
                  }
                },
                height: 3304,
                width: 2352
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0020'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0021',
          '@type': 'sc:Canvas',
          label: '21',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0021/full/72,0/0/native.jpg',
          height: 3272,
          width: 2344,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/' +
                'annotation/URN:NBN:no-nb_digibok_2008020404020_0021',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_0021',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0021',
                  protocol: 'http://iiif.io/api/image',
                  width: 2344,
                  height: 3272,
                  sizes: [
                    {
                      width: 1172,
                      height: 1636
                    },
                    {
                      width: 586,
                      height: 818
                    },
                    {
                      width: 293,
                      height: 409
                    },
                    {
                      width: 146,
                      height: 204
                    },
                    {
                      width: 73,
                      height: 102
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16, 32]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.0025,
                    physicalUnits: 'in'
                  }
                },
                height: 3272,
                width: 2344
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0021'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0022',
          '@type': 'sc:Canvas',
          label: '22',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0022/full/72,0/0/native.jpg',
          height: 3312,
          width: 2344,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/' +
                'annotation/URN:NBN:no-nb_digibok_2008020404020_0022',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_0022',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0022',
                  protocol: 'http://iiif.io/api/image',
                  width: 2344,
                  height: 3312,
                  sizes: [
                    {
                      width: 1172,
                      height: 1656
                    },
                    {
                      width: 586,
                      height: 828
                    },
                    {
                      width: 293,
                      height: 414
                    },
                    {
                      width: 146,
                      height: 207
                    },
                    {
                      width: 73,
                      height: 103
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16, 32]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.0025,
                    physicalUnits: 'in'
                  }
                },
                height: 3312,
                width: 2344
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0022'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0023',
          '@type': 'sc:Canvas',
          label: '23',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0023/full/72,0/0/native.jpg',
          height: 3272,
          width: 2344,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/' +
                'annotation/URN:NBN:no-nb_digibok_2008020404020_0023',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_0023',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0023',
                  protocol: 'http://iiif.io/api/image',
                  width: 2344,
                  height: 3272,
                  sizes: [
                    {
                      width: 1172,
                      height: 1636
                    },
                    {
                      width: 586,
                      height: 818
                    },
                    {
                      width: 293,
                      height: 409
                    },
                    {
                      width: 146,
                      height: 204
                    },
                    {
                      width: 73,
                      height: 102
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16, 32]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.0025,
                    physicalUnits: 'in'
                  }
                },
                height: 3272,
                width: 2344
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0023'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0024',
          '@type': 'sc:Canvas',
          label: '24',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0024/full/72,0/0/native.jpg',
          height: 3304,
          width: 2344,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/' +
                'annotation/URN:NBN:no-nb_digibok_2008020404020_0024',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_0024',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0024',
                  protocol: 'http://iiif.io/api/image',
                  width: 2344,
                  height: 3304,
                  sizes: [
                    {
                      width: 1172,
                      height: 1652
                    },
                    {
                      width: 586,
                      height: 826
                    },
                    {
                      width: 293,
                      height: 413
                    },
                    {
                      width: 146,
                      height: 206
                    },
                    {
                      width: 73,
                      height: 103
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16, 32]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.0025,
                    physicalUnits: 'in'
                  }
                },
                height: 3304,
                width: 2344
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0024'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0025',
          '@type': 'sc:Canvas',
          label: '25',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0025/full/72,0/0/native.jpg',
          height: 3272,
          width: 2352,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/' +
                'annotation/URN:NBN:no-nb_digibok_2008020404020_0025',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_0025',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0025',
                  protocol: 'http://iiif.io/api/image',
                  width: 2352,
                  height: 3272,
                  sizes: [
                    {
                      width: 1176,
                      height: 1636
                    },
                    {
                      width: 588,
                      height: 818
                    },
                    {
                      width: 294,
                      height: 409
                    },
                    {
                      width: 147,
                      height: 204
                    },
                    {
                      width: 73,
                      height: 102
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16, 32]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.0025,
                    physicalUnits: 'in'
                  }
                },
                height: 3272,
                width: 2352
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0025'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0026',
          '@type': 'sc:Canvas',
          label: '26',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0026/full/72,0/0/native.jpg',
          height: 3304,
          width: 2352,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/' +
                'annotation/URN:NBN:no-nb_digibok_2008020404020_0026',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_0026',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0026',
                  protocol: 'http://iiif.io/api/image',
                  width: 2352,
                  height: 3304,
                  sizes: [
                    {
                      width: 1176,
                      height: 1652
                    },
                    {
                      width: 588,
                      height: 826
                    },
                    {
                      width: 294,
                      height: 413
                    },
                    {
                      width: 147,
                      height: 206
                    },
                    {
                      width: 73,
                      height: 103
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16, 32]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.0025,
                    physicalUnits: 'in'
                  }
                },
                height: 3304,
                width: 2352
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0026'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0027',
          '@type': 'sc:Canvas',
          label: '27',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0027/full/72,0/0/native.jpg',
          height: 3272,
          width: 2352,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/' +
                'annotation/URN:NBN:no-nb_digibok_2008020404020_0027',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_0027',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0027',
                  protocol: 'http://iiif.io/api/image',
                  width: 2352,
                  height: 3272,
                  sizes: [
                    {
                      width: 1176,
                      height: 1636
                    },
                    {
                      width: 588,
                      height: 818
                    },
                    {
                      width: 294,
                      height: 409
                    },
                    {
                      width: 147,
                      height: 204
                    },
                    {
                      width: 73,
                      height: 102
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16, 32]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.0025,
                    physicalUnits: 'in'
                  }
                },
                height: 3272,
                width: 2352
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0027'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0028',
          '@type': 'sc:Canvas',
          label: '28',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0028/full/72,0/0/native.jpg',
          height: 3304,
          width: 2352,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/' +
                'annotation/URN:NBN:no-nb_digibok_2008020404020_0028',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_0028',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0028',
                  protocol: 'http://iiif.io/api/image',
                  width: 2352,
                  height: 3304,
                  sizes: [
                    {
                      width: 1176,
                      height: 1652
                    },
                    {
                      width: 588,
                      height: 826
                    },
                    {
                      width: 294,
                      height: 413
                    },
                    {
                      width: 147,
                      height: 206
                    },
                    {
                      width: 73,
                      height: 103
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16, 32]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.0025,
                    physicalUnits: 'in'
                  }
                },
                height: 3304,
                width: 2352
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0028'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0029',
          '@type': 'sc:Canvas',
          label: '29',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0029/full/72,0/0/native.jpg',
          height: 3272,
          width: 2336,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/' +
                'annotation/URN:NBN:no-nb_digibok_2008020404020_0029',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_0029',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0029',
                  protocol: 'http://iiif.io/api/image',
                  width: 2336,
                  height: 3272,
                  sizes: [
                    {
                      width: 1168,
                      height: 1636
                    },
                    {
                      width: 584,
                      height: 818
                    },
                    {
                      width: 292,
                      height: 409
                    },
                    {
                      width: 146,
                      height: 204
                    },
                    {
                      width: 73,
                      height: 102
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16, 32]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.0025,
                    physicalUnits: 'in'
                  }
                },
                height: 3272,
                width: 2336
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0029'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0030',
          '@type': 'sc:Canvas',
          label: '30',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0030/full/72,0/0/native.jpg',
          height: 3312,
          width: 2344,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/' +
                'annotation/URN:NBN:no-nb_digibok_2008020404020_0030',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_0030',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0030',
                  protocol: 'http://iiif.io/api/image',
                  width: 2344,
                  height: 3312,
                  sizes: [
                    {
                      width: 1172,
                      height: 1656
                    },
                    {
                      width: 586,
                      height: 828
                    },
                    {
                      width: 293,
                      height: 414
                    },
                    {
                      width: 146,
                      height: 207
                    },
                    {
                      width: 73,
                      height: 103
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16, 32]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.0025,
                    physicalUnits: 'in'
                  }
                },
                height: 3312,
                width: 2344
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0030'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0031',
          '@type': 'sc:Canvas',
          label: '31',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0031/full/72,0/0/native.jpg',
          height: 3272,
          width: 2336,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/' +
                'annotation/URN:NBN:no-nb_digibok_2008020404020_0031',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_0031',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0031',
                  protocol: 'http://iiif.io/api/image',
                  width: 2336,
                  height: 3272,
                  sizes: [
                    {
                      width: 1168,
                      height: 1636
                    },
                    {
                      width: 584,
                      height: 818
                    },
                    {
                      width: 292,
                      height: 409
                    },
                    {
                      width: 146,
                      height: 204
                    },
                    {
                      width: 73,
                      height: 102
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16, 32]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.0025,
                    physicalUnits: 'in'
                  }
                },
                height: 3272,
                width: 2336
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0031'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0032',
          '@type': 'sc:Canvas',
          label: '32',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0032/full/72,0/0/native.jpg',
          height: 3304,
          width: 2336,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/' +
                'annotation/URN:NBN:no-nb_digibok_2008020404020_0032',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_0032',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0032',
                  protocol: 'http://iiif.io/api/image',
                  width: 2336,
                  height: 3304,
                  sizes: [
                    {
                      width: 1168,
                      height: 1652
                    },
                    {
                      width: 584,
                      height: 826
                    },
                    {
                      width: 292,
                      height: 413
                    },
                    {
                      width: 146,
                      height: 206
                    },
                    {
                      width: 73,
                      height: 103
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16, 32]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.0025,
                    physicalUnits: 'in'
                  }
                },
                height: 3304,
                width: 2336
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0032'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0033',
          '@type': 'sc:Canvas',
          label: '33',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0033/full/72,0/0/native.jpg',
          height: 3272,
          width: 2352,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/' +
                'annotation/URN:NBN:no-nb_digibok_2008020404020_0033',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_0033',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0033',
                  protocol: 'http://iiif.io/api/image',
                  width: 2352,
                  height: 3272,
                  sizes: [
                    {
                      width: 1176,
                      height: 1636
                    },
                    {
                      width: 588,
                      height: 818
                    },
                    {
                      width: 294,
                      height: 409
                    },
                    {
                      width: 147,
                      height: 204
                    },
                    {
                      width: 73,
                      height: 102
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16, 32]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.0025,
                    physicalUnits: 'in'
                  }
                },
                height: 3272,
                width: 2352
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0033'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0034',
          '@type': 'sc:Canvas',
          label: '34',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0034/full/72,0/0/native.jpg',
          height: 3312,
          width: 2344,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/' +
                'annotation/URN:NBN:no-nb_digibok_2008020404020_0034',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_0034',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0034',
                  protocol: 'http://iiif.io/api/image',
                  width: 2344,
                  height: 3312,
                  sizes: [
                    {
                      width: 1172,
                      height: 1656
                    },
                    {
                      width: 586,
                      height: 828
                    },
                    {
                      width: 293,
                      height: 414
                    },
                    {
                      width: 146,
                      height: 207
                    },
                    {
                      width: 73,
                      height: 103
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16, 32]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.0025,
                    physicalUnits: 'in'
                  }
                },
                height: 3312,
                width: 2344
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0034'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0035',
          '@type': 'sc:Canvas',
          label: '35',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0035/full/72,0/0/native.jpg',
          height: 3272,
          width: 2352,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/' +
                'annotation/URN:NBN:no-nb_digibok_2008020404020_0035',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_0035',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0035',
                  protocol: 'http://iiif.io/api/image',
                  width: 2352,
                  height: 3272,
                  sizes: [
                    {
                      width: 1176,
                      height: 1636
                    },
                    {
                      width: 588,
                      height: 818
                    },
                    {
                      width: 294,
                      height: 409
                    },
                    {
                      width: 147,
                      height: 204
                    },
                    {
                      width: 73,
                      height: 102
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16, 32]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.0025,
                    physicalUnits: 'in'
                  }
                },
                height: 3272,
                width: 2352
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0035'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0036',
          '@type': 'sc:Canvas',
          label: '36',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0036/full/72,0/0/native.jpg',
          height: 3304,
          width: 2352,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/' +
                'annotation/URN:NBN:no-nb_digibok_2008020404020_0036',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_0036',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0036',
                  protocol: 'http://iiif.io/api/image',
                  width: 2352,
                  height: 3304,
                  sizes: [
                    {
                      width: 1176,
                      height: 1652
                    },
                    {
                      width: 588,
                      height: 826
                    },
                    {
                      width: 294,
                      height: 413
                    },
                    {
                      width: 147,
                      height: 206
                    },
                    {
                      width: 73,
                      height: 103
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16, 32]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.0025,
                    physicalUnits: 'in'
                  }
                },
                height: 3304,
                width: 2352
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0036'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0037',
          '@type': 'sc:Canvas',
          label: '37',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0037/full/72,0/0/native.jpg',
          height: 3272,
          width: 2336,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/' +
                'annotation/URN:NBN:no-nb_digibok_2008020404020_0037',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_0037',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0037',
                  protocol: 'http://iiif.io/api/image',
                  width: 2336,
                  height: 3272,
                  sizes: [
                    {
                      width: 1168,
                      height: 1636
                    },
                    {
                      width: 584,
                      height: 818
                    },
                    {
                      width: 292,
                      height: 409
                    },
                    {
                      width: 146,
                      height: 204
                    },
                    {
                      width: 73,
                      height: 102
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16, 32]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.0025,
                    physicalUnits: 'in'
                  }
                },
                height: 3272,
                width: 2336
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0037'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0038',
          '@type': 'sc:Canvas',
          label: '38',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0038/full/72,0/0/native.jpg',
          height: 3304,
          width: 2336,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/' +
                'annotation/URN:NBN:no-nb_digibok_2008020404020_0038',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_0038',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0038',
                  protocol: 'http://iiif.io/api/image',
                  width: 2336,
                  height: 3304,
                  sizes: [
                    {
                      width: 1168,
                      height: 1652
                    },
                    {
                      width: 584,
                      height: 826
                    },
                    {
                      width: 292,
                      height: 413
                    },
                    {
                      width: 146,
                      height: 206
                    },
                    {
                      width: 73,
                      height: 103
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16, 32]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.0025,
                    physicalUnits: 'in'
                  }
                },
                height: 3304,
                width: 2336
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0038'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0039',
          '@type': 'sc:Canvas',
          label: '39',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0039/full/72,0/0/native.jpg',
          height: 3272,
          width: 2336,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/' +
                'annotation/URN:NBN:no-nb_digibok_2008020404020_0039',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_0039',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0039',
                  protocol: 'http://iiif.io/api/image',
                  width: 2336,
                  height: 3272,
                  sizes: [
                    {
                      width: 1168,
                      height: 1636
                    },
                    {
                      width: 584,
                      height: 818
                    },
                    {
                      width: 292,
                      height: 409
                    },
                    {
                      width: 146,
                      height: 204
                    },
                    {
                      width: 73,
                      height: 102
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16, 32]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.0025,
                    physicalUnits: 'in'
                  }
                },
                height: 3272,
                width: 2336
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0039'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0040',
          '@type': 'sc:Canvas',
          label: '40',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0040/full/72,0/0/native.jpg',
          height: 3304,
          width: 2336,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/' +
                'annotation/URN:NBN:no-nb_digibok_2008020404020_0040',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_0040',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0040',
                  protocol: 'http://iiif.io/api/image',
                  width: 2336,
                  height: 3304,
                  sizes: [
                    {
                      width: 1168,
                      height: 1652
                    },
                    {
                      width: 584,
                      height: 826
                    },
                    {
                      width: 292,
                      height: 413
                    },
                    {
                      width: 146,
                      height: 206
                    },
                    {
                      width: 73,
                      height: 103
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16, 32]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.0025,
                    physicalUnits: 'in'
                  }
                },
                height: 3304,
                width: 2336
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0040'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0041',
          '@type': 'sc:Canvas',
          label: '41',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0041/full/72,0/0/native.jpg',
          height: 3272,
          width: 2344,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/' +
                'annotation/URN:NBN:no-nb_digibok_2008020404020_0041',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_0041',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0041',
                  protocol: 'http://iiif.io/api/image',
                  width: 2344,
                  height: 3272,
                  sizes: [
                    {
                      width: 1172,
                      height: 1636
                    },
                    {
                      width: 586,
                      height: 818
                    },
                    {
                      width: 293,
                      height: 409
                    },
                    {
                      width: 146,
                      height: 204
                    },
                    {
                      width: 73,
                      height: 102
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16, 32]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.0025,
                    physicalUnits: 'in'
                  }
                },
                height: 3272,
                width: 2344
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0041'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0042',
          '@type': 'sc:Canvas',
          label: '42',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0042/full/72,0/0/native.jpg',
          height: 3312,
          width: 2344,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/' +
                'annotation/URN:NBN:no-nb_digibok_2008020404020_0042',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_0042',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0042',
                  protocol: 'http://iiif.io/api/image',
                  width: 2344,
                  height: 3312,
                  sizes: [
                    {
                      width: 1172,
                      height: 1656
                    },
                    {
                      width: 586,
                      height: 828
                    },
                    {
                      width: 293,
                      height: 414
                    },
                    {
                      width: 146,
                      height: 207
                    },
                    {
                      width: 73,
                      height: 103
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16, 32]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.0025,
                    physicalUnits: 'in'
                  }
                },
                height: 3312,
                width: 2344
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0042'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0043',
          '@type': 'sc:Canvas',
          label: '43',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0043/full/72,0/0/native.jpg',
          height: 3272,
          width: 2336,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/' +
                'annotation/URN:NBN:no-nb_digibok_2008020404020_0043',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_0043',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0043',
                  protocol: 'http://iiif.io/api/image',
                  width: 2336,
                  height: 3272,
                  sizes: [
                    {
                      width: 1168,
                      height: 1636
                    },
                    {
                      width: 584,
                      height: 818
                    },
                    {
                      width: 292,
                      height: 409
                    },
                    {
                      width: 146,
                      height: 204
                    },
                    {
                      width: 73,
                      height: 102
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16, 32]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.0025,
                    physicalUnits: 'in'
                  }
                },
                height: 3272,
                width: 2336
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0043'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0044',
          '@type': 'sc:Canvas',
          label: '44',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0044/full/72,0/0/native.jpg',
          height: 3304,
          width: 2336,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/' +
                'annotation/URN:NBN:no-nb_digibok_2008020404020_0044',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_0044',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0044',
                  protocol: 'http://iiif.io/api/image',
                  width: 2336,
                  height: 3304,
                  sizes: [
                    {
                      width: 1168,
                      height: 1652
                    },
                    {
                      width: 584,
                      height: 826
                    },
                    {
                      width: 292,
                      height: 413
                    },
                    {
                      width: 146,
                      height: 206
                    },
                    {
                      width: 73,
                      height: 103
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16, 32]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.0025,
                    physicalUnits: 'in'
                  }
                },
                height: 3304,
                width: 2336
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0044'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0045',
          '@type': 'sc:Canvas',
          label: '45',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0045/full/72,0/0/native.jpg',
          height: 3272,
          width: 2336,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/' +
                'annotation/URN:NBN:no-nb_digibok_2008020404020_0045',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_0045',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0045',
                  protocol: 'http://iiif.io/api/image',
                  width: 2336,
                  height: 3272,
                  sizes: [
                    {
                      width: 1168,
                      height: 1636
                    },
                    {
                      width: 584,
                      height: 818
                    },
                    {
                      width: 292,
                      height: 409
                    },
                    {
                      width: 146,
                      height: 204
                    },
                    {
                      width: 73,
                      height: 102
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16, 32]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.0025,
                    physicalUnits: 'in'
                  }
                },
                height: 3272,
                width: 2336
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0045'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0046',
          '@type': 'sc:Canvas',
          label: '46',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0046/full/72,0/0/native.jpg',
          height: 3304,
          width: 2328,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/' +
                'annotation/URN:NBN:no-nb_digibok_2008020404020_0046',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_0046',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0046',
                  protocol: 'http://iiif.io/api/image',
                  width: 2328,
                  height: 3304,
                  sizes: [
                    {
                      width: 1164,
                      height: 1652
                    },
                    {
                      width: 582,
                      height: 826
                    },
                    {
                      width: 291,
                      height: 413
                    },
                    {
                      width: 145,
                      height: 206
                    },
                    {
                      width: 72,
                      height: 103
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16, 32]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.0025,
                    physicalUnits: 'in'
                  }
                },
                height: 3304,
                width: 2328
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0046'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0047',
          '@type': 'sc:Canvas',
          label: '47',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0047/full/72,0/0/native.jpg',
          height: 3272,
          width: 2328,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/' +
                'annotation/URN:NBN:no-nb_digibok_2008020404020_0047',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_0047',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0047',
                  protocol: 'http://iiif.io/api/image',
                  width: 2328,
                  height: 3272,
                  sizes: [
                    {
                      width: 1164,
                      height: 1636
                    },
                    {
                      width: 582,
                      height: 818
                    },
                    {
                      width: 291,
                      height: 409
                    },
                    {
                      width: 145,
                      height: 204
                    },
                    {
                      width: 72,
                      height: 102
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16, 32]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.0025,
                    physicalUnits: 'in'
                  }
                },
                height: 3272,
                width: 2328
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0047'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0048',
          '@type': 'sc:Canvas',
          label: '48',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0048/full/72,0/0/native.jpg',
          height: 3304,
          width: 2328,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/' +
                'annotation/URN:NBN:no-nb_digibok_2008020404020_0048',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_0048',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0048',
                  protocol: 'http://iiif.io/api/image',
                  width: 2328,
                  height: 3304,
                  sizes: [
                    {
                      width: 1164,
                      height: 1652
                    },
                    {
                      width: 582,
                      height: 826
                    },
                    {
                      width: 291,
                      height: 413
                    },
                    {
                      width: 145,
                      height: 206
                    },
                    {
                      width: 72,
                      height: 103
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16, 32]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.0025,
                    physicalUnits: 'in'
                  }
                },
                height: 3304,
                width: 2328
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0048'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0049',
          '@type': 'sc:Canvas',
          label: '49',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0049/full/72,0/0/native.jpg',
          height: 3272,
          width: 2344,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/' +
                'annotation/URN:NBN:no-nb_digibok_2008020404020_0049',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_0049',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0049',
                  protocol: 'http://iiif.io/api/image',
                  width: 2344,
                  height: 3272,
                  sizes: [
                    {
                      width: 1172,
                      height: 1636
                    },
                    {
                      width: 586,
                      height: 818
                    },
                    {
                      width: 293,
                      height: 409
                    },
                    {
                      width: 146,
                      height: 204
                    },
                    {
                      width: 73,
                      height: 102
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16, 32]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.0025,
                    physicalUnits: 'in'
                  }
                },
                height: 3272,
                width: 2344
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0049'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0050',
          '@type': 'sc:Canvas',
          label: '50',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0050/full/72,0/0/native.jpg',
          height: 3304,
          width: 2344,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/' +
                'annotation/URN:NBN:no-nb_digibok_2008020404020_0050',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_0050',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0050',
                  protocol: 'http://iiif.io/api/image',
                  width: 2344,
                  height: 3304,
                  sizes: [
                    {
                      width: 1172,
                      height: 1652
                    },
                    {
                      width: 586,
                      height: 826
                    },
                    {
                      width: 293,
                      height: 413
                    },
                    {
                      width: 146,
                      height: 206
                    },
                    {
                      width: 73,
                      height: 103
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16, 32]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.0025,
                    physicalUnits: 'in'
                  }
                },
                height: 3304,
                width: 2344
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0050'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0051',
          '@type': 'sc:Canvas',
          label: '51',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0051/full/72,0/0/native.jpg',
          height: 3272,
          width: 2336,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/' +
                'annotation/URN:NBN:no-nb_digibok_2008020404020_0051',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_0051',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0051',
                  protocol: 'http://iiif.io/api/image',
                  width: 2336,
                  height: 3272,
                  sizes: [
                    {
                      width: 1168,
                      height: 1636
                    },
                    {
                      width: 584,
                      height: 818
                    },
                    {
                      width: 292,
                      height: 409
                    },
                    {
                      width: 146,
                      height: 204
                    },
                    {
                      width: 73,
                      height: 102
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16, 32]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.0025,
                    physicalUnits: 'in'
                  }
                },
                height: 3272,
                width: 2336
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0051'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0052',
          '@type': 'sc:Canvas',
          label: '52',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0052/full/72,0/0/native.jpg',
          height: 3304,
          width: 2336,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/' +
                'annotation/URN:NBN:no-nb_digibok_2008020404020_0052',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_0052',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0052',
                  protocol: 'http://iiif.io/api/image',
                  width: 2336,
                  height: 3304,
                  sizes: [
                    {
                      width: 1168,
                      height: 1652
                    },
                    {
                      width: 584,
                      height: 826
                    },
                    {
                      width: 292,
                      height: 413
                    },
                    {
                      width: 146,
                      height: 206
                    },
                    {
                      width: 73,
                      height: 103
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16, 32]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.0025,
                    physicalUnits: 'in'
                  }
                },
                height: 3304,
                width: 2336
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0052'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0053',
          '@type': 'sc:Canvas',
          label: '53',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0053/full/72,0/0/native.jpg',
          height: 3272,
          width: 2336,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/' +
                'annotation/URN:NBN:no-nb_digibok_2008020404020_0053',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_0053',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0053',
                  protocol: 'http://iiif.io/api/image',
                  width: 2336,
                  height: 3272,
                  sizes: [
                    {
                      width: 1168,
                      height: 1636
                    },
                    {
                      width: 584,
                      height: 818
                    },
                    {
                      width: 292,
                      height: 409
                    },
                    {
                      width: 146,
                      height: 204
                    },
                    {
                      width: 73,
                      height: 102
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16, 32]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.0025,
                    physicalUnits: 'in'
                  }
                },
                height: 3272,
                width: 2336
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0053'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0054',
          '@type': 'sc:Canvas',
          label: '54',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0054/full/72,0/0/native.jpg',
          height: 3304,
          width: 2336,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/' +
                'annotation/URN:NBN:no-nb_digibok_2008020404020_0054',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_0054',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0054',
                  protocol: 'http://iiif.io/api/image',
                  width: 2336,
                  height: 3304,
                  sizes: [
                    {
                      width: 1168,
                      height: 1652
                    },
                    {
                      width: 584,
                      height: 826
                    },
                    {
                      width: 292,
                      height: 413
                    },
                    {
                      width: 146,
                      height: 206
                    },
                    {
                      width: 73,
                      height: 103
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16, 32]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.0025,
                    physicalUnits: 'in'
                  }
                },
                height: 3304,
                width: 2336
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0054'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0055',
          '@type': 'sc:Canvas',
          label: '55',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0055/full/72,0/0/native.jpg',
          height: 3272,
          width: 2328,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/' +
                'annotation/URN:NBN:no-nb_digibok_2008020404020_0055',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_0055',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0055',
                  protocol: 'http://iiif.io/api/image',
                  width: 2328,
                  height: 3272,
                  sizes: [
                    {
                      width: 1164,
                      height: 1636
                    },
                    {
                      width: 582,
                      height: 818
                    },
                    {
                      width: 291,
                      height: 409
                    },
                    {
                      width: 145,
                      height: 204
                    },
                    {
                      width: 72,
                      height: 102
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16, 32]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.0025,
                    physicalUnits: 'in'
                  }
                },
                height: 3272,
                width: 2328
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0055'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0056',
          '@type': 'sc:Canvas',
          label: '56',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0056/full/72,0/0/native.jpg',
          height: 3304,
          width: 2336,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/' +
                'annotation/URN:NBN:no-nb_digibok_2008020404020_0056',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_0056',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0056',
                  protocol: 'http://iiif.io/api/image',
                  width: 2336,
                  height: 3304,
                  sizes: [
                    {
                      width: 1168,
                      height: 1652
                    },
                    {
                      width: 584,
                      height: 826
                    },
                    {
                      width: 292,
                      height: 413
                    },
                    {
                      width: 146,
                      height: 206
                    },
                    {
                      width: 73,
                      height: 103
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16, 32]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.0025,
                    physicalUnits: 'in'
                  }
                },
                height: 3304,
                width: 2336
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0056'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0057',
          '@type': 'sc:Canvas',
          label: '57',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0057/full/72,0/0/native.jpg',
          height: 3272,
          width: 2336,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/' +
                'annotation/URN:NBN:no-nb_digibok_2008020404020_0057',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_0057',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0057',
                  protocol: 'http://iiif.io/api/image',
                  width: 2336,
                  height: 3272,
                  sizes: [
                    {
                      width: 1168,
                      height: 1636
                    },
                    {
                      width: 584,
                      height: 818
                    },
                    {
                      width: 292,
                      height: 409
                    },
                    {
                      width: 146,
                      height: 204
                    },
                    {
                      width: 73,
                      height: 102
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16, 32]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.0025,
                    physicalUnits: 'in'
                  }
                },
                height: 3272,
                width: 2336
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0057'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0058',
          '@type': 'sc:Canvas',
          label: '58',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0058/full/72,0/0/native.jpg',
          height: 3312,
          width: 2336,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/' +
                'annotation/URN:NBN:no-nb_digibok_2008020404020_0058',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_0058',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0058',
                  protocol: 'http://iiif.io/api/image',
                  width: 2336,
                  height: 3312,
                  sizes: [
                    {
                      width: 1168,
                      height: 1656
                    },
                    {
                      width: 584,
                      height: 828
                    },
                    {
                      width: 292,
                      height: 414
                    },
                    {
                      width: 146,
                      height: 207
                    },
                    {
                      width: 73,
                      height: 103
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16, 32]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.0025,
                    physicalUnits: 'in'
                  }
                },
                height: 3312,
                width: 2336
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0058'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0059',
          '@type': 'sc:Canvas',
          label: '59',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0059/full/72,0/0/native.jpg',
          height: 3272,
          width: 2336,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/' +
                'annotation/URN:NBN:no-nb_digibok_2008020404020_0059',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_0059',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0059',
                  protocol: 'http://iiif.io/api/image',
                  width: 2336,
                  height: 3272,
                  sizes: [
                    {
                      width: 1168,
                      height: 1636
                    },
                    {
                      width: 584,
                      height: 818
                    },
                    {
                      width: 292,
                      height: 409
                    },
                    {
                      width: 146,
                      height: 204
                    },
                    {
                      width: 73,
                      height: 102
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16, 32]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.0025,
                    physicalUnits: 'in'
                  }
                },
                height: 3272,
                width: 2336
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0059'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0060',
          '@type': 'sc:Canvas',
          label: '60',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0060/full/72,0/0/native.jpg',
          height: 3304,
          width: 2336,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/' +
                'annotation/URN:NBN:no-nb_digibok_2008020404020_0060',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_0060',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0060',
                  protocol: 'http://iiif.io/api/image',
                  width: 2336,
                  height: 3304,
                  sizes: [
                    {
                      width: 1168,
                      height: 1652
                    },
                    {
                      width: 584,
                      height: 826
                    },
                    {
                      width: 292,
                      height: 413
                    },
                    {
                      width: 146,
                      height: 206
                    },
                    {
                      width: 73,
                      height: 103
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16, 32]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.0025,
                    physicalUnits: 'in'
                  }
                },
                height: 3304,
                width: 2336
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0060'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0061',
          '@type': 'sc:Canvas',
          label: '61',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0061/full/72,0/0/native.jpg',
          height: 3272,
          width: 2328,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/' +
                'annotation/URN:NBN:no-nb_digibok_2008020404020_0061',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_0061',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0061',
                  protocol: 'http://iiif.io/api/image',
                  width: 2328,
                  height: 3272,
                  sizes: [
                    {
                      width: 1164,
                      height: 1636
                    },
                    {
                      width: 582,
                      height: 818
                    },
                    {
                      width: 291,
                      height: 409
                    },
                    {
                      width: 145,
                      height: 204
                    },
                    {
                      width: 72,
                      height: 102
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16, 32]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.0025,
                    physicalUnits: 'in'
                  }
                },
                height: 3272,
                width: 2328
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0061'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0062',
          '@type': 'sc:Canvas',
          label: '62',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0062/full/72,0/0/native.jpg',
          height: 3304,
          width: 2336,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/' +
                'annotation/URN:NBN:no-nb_digibok_2008020404020_0062',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_0062',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0062',
                  protocol: 'http://iiif.io/api/image',
                  width: 2336,
                  height: 3304,
                  sizes: [
                    {
                      width: 1168,
                      height: 1652
                    },
                    {
                      width: 584,
                      height: 826
                    },
                    {
                      width: 292,
                      height: 413
                    },
                    {
                      width: 146,
                      height: 206
                    },
                    {
                      width: 73,
                      height: 103
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16, 32]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.0025,
                    physicalUnits: 'in'
                  }
                },
                height: 3304,
                width: 2336
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0062'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0063',
          '@type': 'sc:Canvas',
          label: '63',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0063/full/72,0/0/native.jpg',
          height: 3272,
          width: 2328,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/' +
                'annotation/URN:NBN:no-nb_digibok_2008020404020_0063',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_0063',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0063',
                  protocol: 'http://iiif.io/api/image',
                  width: 2328,
                  height: 3272,
                  sizes: [
                    {
                      width: 1164,
                      height: 1636
                    },
                    {
                      width: 582,
                      height: 818
                    },
                    {
                      width: 291,
                      height: 409
                    },
                    {
                      width: 145,
                      height: 204
                    },
                    {
                      width: 72,
                      height: 102
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16, 32]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.0025,
                    physicalUnits: 'in'
                  }
                },
                height: 3272,
                width: 2328
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0063'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0064',
          '@type': 'sc:Canvas',
          label: '64',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0064/full/72,0/0/native.jpg',
          height: 3304,
          width: 2320,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/' +
                'annotation/URN:NBN:no-nb_digibok_2008020404020_0064',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_0064',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0064',
                  protocol: 'http://iiif.io/api/image',
                  width: 2320,
                  height: 3304,
                  sizes: [
                    {
                      width: 1160,
                      height: 1652
                    },
                    {
                      width: 580,
                      height: 826
                    },
                    {
                      width: 290,
                      height: 413
                    },
                    {
                      width: 145,
                      height: 206
                    },
                    {
                      width: 72,
                      height: 103
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16, 32]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.0025,
                    physicalUnits: 'in'
                  }
                },
                height: 3304,
                width: 2320
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0064'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0065',
          '@type': 'sc:Canvas',
          label: '65',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0065/full/72,0/0/native.jpg',
          height: 3272,
          width: 2336,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/' +
                'annotation/URN:NBN:no-nb_digibok_2008020404020_0065',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_0065',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0065',
                  protocol: 'http://iiif.io/api/image',
                  width: 2336,
                  height: 3272,
                  sizes: [
                    {
                      width: 1168,
                      height: 1636
                    },
                    {
                      width: 584,
                      height: 818
                    },
                    {
                      width: 292,
                      height: 409
                    },
                    {
                      width: 146,
                      height: 204
                    },
                    {
                      width: 73,
                      height: 102
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16, 32]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.0025,
                    physicalUnits: 'in'
                  }
                },
                height: 3272,
                width: 2336
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0065'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0066',
          '@type': 'sc:Canvas',
          label: '66',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0066/full/72,0/0/native.jpg',
          height: 3304,
          width: 2336,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/' +
                'annotation/URN:NBN:no-nb_digibok_2008020404020_0066',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_0066',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0066',
                  protocol: 'http://iiif.io/api/image',
                  width: 2336,
                  height: 3304,
                  sizes: [
                    {
                      width: 1168,
                      height: 1652
                    },
                    {
                      width: 584,
                      height: 826
                    },
                    {
                      width: 292,
                      height: 413
                    },
                    {
                      width: 146,
                      height: 206
                    },
                    {
                      width: 73,
                      height: 103
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16, 32]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.0025,
                    physicalUnits: 'in'
                  }
                },
                height: 3304,
                width: 2336
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0066'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0067',
          '@type': 'sc:Canvas',
          label: '67',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0067/full/72,0/0/native.jpg',
          height: 3272,
          width: 2336,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/' +
                'annotation/URN:NBN:no-nb_digibok_2008020404020_0067',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_0067',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0067',
                  protocol: 'http://iiif.io/api/image',
                  width: 2336,
                  height: 3272,
                  sizes: [
                    {
                      width: 1168,
                      height: 1636
                    },
                    {
                      width: 584,
                      height: 818
                    },
                    {
                      width: 292,
                      height: 409
                    },
                    {
                      width: 146,
                      height: 204
                    },
                    {
                      width: 73,
                      height: 102
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16, 32]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.0025,
                    physicalUnits: 'in'
                  }
                },
                height: 3272,
                width: 2336
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0067'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0068',
          '@type': 'sc:Canvas',
          label: '68',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0068/full/72,0/0/native.jpg',
          height: 3304,
          width: 2336,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/' +
                'annotation/URN:NBN:no-nb_digibok_2008020404020_0068',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_0068',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0068',
                  protocol: 'http://iiif.io/api/image',
                  width: 2336,
                  height: 3304,
                  sizes: [
                    {
                      width: 1168,
                      height: 1652
                    },
                    {
                      width: 584,
                      height: 826
                    },
                    {
                      width: 292,
                      height: 413
                    },
                    {
                      width: 146,
                      height: 206
                    },
                    {
                      width: 73,
                      height: 103
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16, 32]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.0025,
                    physicalUnits: 'in'
                  }
                },
                height: 3304,
                width: 2336
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0068'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0069',
          '@type': 'sc:Canvas',
          label: '69',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0069/full/72,0/0/native.jpg',
          height: 3272,
          width: 2328,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/' +
                'annotation/URN:NBN:no-nb_digibok_2008020404020_0069',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_0069',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0069',
                  protocol: 'http://iiif.io/api/image',
                  width: 2328,
                  height: 3272,
                  sizes: [
                    {
                      width: 1164,
                      height: 1636
                    },
                    {
                      width: 582,
                      height: 818
                    },
                    {
                      width: 291,
                      height: 409
                    },
                    {
                      width: 145,
                      height: 204
                    },
                    {
                      width: 72,
                      height: 102
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16, 32]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.0025,
                    physicalUnits: 'in'
                  }
                },
                height: 3272,
                width: 2328
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0069'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0070',
          '@type': 'sc:Canvas',
          label: '70',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0070/full/72,0/0/native.jpg',
          height: 3304,
          width: 2328,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/' +
                'annotation/URN:NBN:no-nb_digibok_2008020404020_0070',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_0070',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0070',
                  protocol: 'http://iiif.io/api/image',
                  width: 2328,
                  height: 3304,
                  sizes: [
                    {
                      width: 1164,
                      height: 1652
                    },
                    {
                      width: 582,
                      height: 826
                    },
                    {
                      width: 291,
                      height: 413
                    },
                    {
                      width: 145,
                      height: 206
                    },
                    {
                      width: 72,
                      height: 103
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16, 32]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.0025,
                    physicalUnits: 'in'
                  }
                },
                height: 3304,
                width: 2328
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0070'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0071',
          '@type': 'sc:Canvas',
          label: '71',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0071/full/72,0/0/native.jpg',
          height: 3272,
          width: 2328,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/' +
                'annotation/URN:NBN:no-nb_digibok_2008020404020_0071',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_0071',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0071',
                  protocol: 'http://iiif.io/api/image',
                  width: 2328,
                  height: 3272,
                  sizes: [
                    {
                      width: 1164,
                      height: 1636
                    },
                    {
                      width: 582,
                      height: 818
                    },
                    {
                      width: 291,
                      height: 409
                    },
                    {
                      width: 145,
                      height: 204
                    },
                    {
                      width: 72,
                      height: 102
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16, 32]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.0025,
                    physicalUnits: 'in'
                  }
                },
                height: 3272,
                width: 2328
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0071'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0072',
          '@type': 'sc:Canvas',
          label: '72',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0072/full/72,0/0/native.jpg',
          height: 3304,
          width: 2336,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/' +
                'annotation/URN:NBN:no-nb_digibok_2008020404020_0072',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_0072',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0072',
                  protocol: 'http://iiif.io/api/image',
                  width: 2336,
                  height: 3304,
                  sizes: [
                    {
                      width: 1168,
                      height: 1652
                    },
                    {
                      width: 584,
                      height: 826
                    },
                    {
                      width: 292,
                      height: 413
                    },
                    {
                      width: 146,
                      height: 206
                    },
                    {
                      width: 73,
                      height: 103
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16, 32]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.0025,
                    physicalUnits: 'in'
                  }
                },
                height: 3304,
                width: 2336
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0072'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0073',
          '@type': 'sc:Canvas',
          label: '73',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0073/full/72,0/0/native.jpg',
          height: 3272,
          width: 2344,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/' +
                'annotation/URN:NBN:no-nb_digibok_2008020404020_0073',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_0073',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0073',
                  protocol: 'http://iiif.io/api/image',
                  width: 2344,
                  height: 3272,
                  sizes: [
                    {
                      width: 1172,
                      height: 1636
                    },
                    {
                      width: 586,
                      height: 818
                    },
                    {
                      width: 293,
                      height: 409
                    },
                    {
                      width: 146,
                      height: 204
                    },
                    {
                      width: 73,
                      height: 102
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16, 32]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.0025,
                    physicalUnits: 'in'
                  }
                },
                height: 3272,
                width: 2344
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0073'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0074',
          '@type': 'sc:Canvas',
          label: '74',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0074/full/72,0/0/native.jpg',
          height: 3304,
          width: 2344,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/' +
                'annotation/URN:NBN:no-nb_digibok_2008020404020_0074',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_0074',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0074',
                  protocol: 'http://iiif.io/api/image',
                  width: 2344,
                  height: 3304,
                  sizes: [
                    {
                      width: 1172,
                      height: 1652
                    },
                    {
                      width: 586,
                      height: 826
                    },
                    {
                      width: 293,
                      height: 413
                    },
                    {
                      width: 146,
                      height: 206
                    },
                    {
                      width: 73,
                      height: 103
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16, 32]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.0025,
                    physicalUnits: 'in'
                  }
                },
                height: 3304,
                width: 2344
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0074'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0075',
          '@type': 'sc:Canvas',
          label: '75',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0075/full/72,0/0/native.jpg',
          height: 3272,
          width: 2336,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/' +
                'annotation/URN:NBN:no-nb_digibok_2008020404020_0075',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_0075',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0075',
                  protocol: 'http://iiif.io/api/image',
                  width: 2336,
                  height: 3272,
                  sizes: [
                    {
                      width: 1168,
                      height: 1636
                    },
                    {
                      width: 584,
                      height: 818
                    },
                    {
                      width: 292,
                      height: 409
                    },
                    {
                      width: 146,
                      height: 204
                    },
                    {
                      width: 73,
                      height: 102
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16, 32]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.0025,
                    physicalUnits: 'in'
                  }
                },
                height: 3272,
                width: 2336
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0075'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0076',
          '@type': 'sc:Canvas',
          label: '76',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0076/full/72,0/0/native.jpg',
          height: 3304,
          width: 2336,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/' +
                'annotation/URN:NBN:no-nb_digibok_2008020404020_0076',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_0076',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0076',
                  protocol: 'http://iiif.io/api/image',
                  width: 2336,
                  height: 3304,
                  sizes: [
                    {
                      width: 1168,
                      height: 1652
                    },
                    {
                      width: 584,
                      height: 826
                    },
                    {
                      width: 292,
                      height: 413
                    },
                    {
                      width: 146,
                      height: 206
                    },
                    {
                      width: 73,
                      height: 103
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16, 32]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.0025,
                    physicalUnits: 'in'
                  }
                },
                height: 3304,
                width: 2336
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0076'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0077',
          '@type': 'sc:Canvas',
          label: '77',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0077/full/72,0/0/native.jpg',
          height: 3272,
          width: 2328,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/' +
                'annotation/URN:NBN:no-nb_digibok_2008020404020_0077',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_0077',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0077',
                  protocol: 'http://iiif.io/api/image',
                  width: 2328,
                  height: 3272,
                  sizes: [
                    {
                      width: 1164,
                      height: 1636
                    },
                    {
                      width: 582,
                      height: 818
                    },
                    {
                      width: 291,
                      height: 409
                    },
                    {
                      width: 145,
                      height: 204
                    },
                    {
                      width: 72,
                      height: 102
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16, 32]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.0025,
                    physicalUnits: 'in'
                  }
                },
                height: 3272,
                width: 2328
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0077'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0078',
          '@type': 'sc:Canvas',
          label: '78',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0078/full/72,0/0/native.jpg',
          height: 3304,
          width: 2328,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/' +
                'annotation/URN:NBN:no-nb_digibok_2008020404020_0078',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_0078',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0078',
                  protocol: 'http://iiif.io/api/image',
                  width: 2328,
                  height: 3304,
                  sizes: [
                    {
                      width: 1164,
                      height: 1652
                    },
                    {
                      width: 582,
                      height: 826
                    },
                    {
                      width: 291,
                      height: 413
                    },
                    {
                      width: 145,
                      height: 206
                    },
                    {
                      width: 72,
                      height: 103
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16, 32]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.0025,
                    physicalUnits: 'in'
                  }
                },
                height: 3304,
                width: 2328
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0078'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0079',
          '@type': 'sc:Canvas',
          label: '79',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0079/full/72,0/0/native.jpg',
          height: 3272,
          width: 2328,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/' +
                'annotation/URN:NBN:no-nb_digibok_2008020404020_0079',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_0079',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0079',
                  protocol: 'http://iiif.io/api/image',
                  width: 2328,
                  height: 3272,
                  sizes: [
                    {
                      width: 1164,
                      height: 1636
                    },
                    {
                      width: 582,
                      height: 818
                    },
                    {
                      width: 291,
                      height: 409
                    },
                    {
                      width: 145,
                      height: 204
                    },
                    {
                      width: 72,
                      height: 102
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16, 32]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.0025,
                    physicalUnits: 'in'
                  }
                },
                height: 3272,
                width: 2328
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0079'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0080',
          '@type': 'sc:Canvas',
          label: '80',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0080/full/72,0/0/native.jpg',
          height: 3304,
          width: 2328,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/' +
                'annotation/URN:NBN:no-nb_digibok_2008020404020_0080',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_0080',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_0080',
                  protocol: 'http://iiif.io/api/image',
                  width: 2328,
                  height: 3304,
                  sizes: [
                    {
                      width: 1164,
                      height: 1652
                    },
                    {
                      width: 582,
                      height: 826
                    },
                    {
                      width: 291,
                      height: 413
                    },
                    {
                      width: 145,
                      height: 206
                    },
                    {
                      width: 72,
                      height: 103
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16, 32]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.0025,
                    physicalUnits: 'in'
                  }
                },
                height: 3304,
                width: 2328
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0080'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_I3',
          '@type': 'sc:Canvas',
          label: '85',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_I3/full/72,0/0/native.jpg',
          height: 2592,
          width: 1859,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/' +
                'annotation/URN:NBN:no-nb_digibok_2008020404020_I3',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_I3',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_I3',
                  protocol: 'http://iiif.io/api/image',
                  width: 1859,
                  height: 2592,
                  sizes: [
                    {
                      width: 929,
                      height: 1296
                    },
                    {
                      width: 464,
                      height: 648
                    },
                    {
                      width: 232,
                      height: 324
                    },
                    {
                      width: 116,
                      height: 162
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.003333333333333333,
                    physicalUnits: 'in'
                  }
                },
                height: 2592,
                width: 1859
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_I3'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_C3',
          '@type': 'sc:Canvas',
          label: '83',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_C3/full/72,0/0/native.jpg',
          height: 2564,
          width: 1845,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/' +
                'annotation/URN:NBN:no-nb_digibok_2008020404020_C3',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_C3',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_C3',
                  protocol: 'http://iiif.io/api/image',
                  width: 1845,
                  height: 2564,
                  sizes: [
                    {
                      width: 922,
                      height: 1282
                    },
                    {
                      width: 461,
                      height: 641
                    },
                    {
                      width: 230,
                      height: 320
                    },
                    {
                      width: 115,
                      height: 160
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.0033333333333333335,
                    physicalUnits: 'in'
                  }
                },
                height: 2564,
                width: 1845
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_C3'
            }
          ]
        },
        {
          '@id':
            'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_C2',
          '@type': 'sc:Canvas',
          label: '82',
          thumbnail:
            'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_C2/full/72,0/0/native.jpg',
          height: 2564,
          width: 163,
          images: [
            {
              '@id':
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/' +
                'annotation/URN:NBN:no-nb_digibok_2008020404020_C2',
              '@type': 'oa:Annotation',
              motivation: 'sc:painting',
              resource: {
                '@id': 'URN:NBN:no-nb_digibok_2008020404020_C2',
                '@type': 'dctypes:Image',
                format: 'image/jpeg',
                service: {
                  '@context': 'http://iiif.io/api/image/2/context.json',
                  '@id':
                    'https://www.nb.no/services/image/resolver/URN:NBN:no-nb_digibok_2008020404020_C2',
                  protocol: 'http://iiif.io/api/image',
                  width: 163,
                  height: 2564,
                  sizes: [
                    {
                      width: 81,
                      height: 1282
                    },
                    {
                      width: 40,
                      height: 641
                    },
                    {
                      width: 20,
                      height: 320
                    },
                    {
                      width: 10,
                      height: 160
                    }
                  ],
                  tiles: [
                    {
                      width: 1024,
                      scaleFactors: [1, 2, 4, 8, 16]
                    }
                  ],
                  profile: 'http://iiif.io/api/image/2/level1.json',
                  service: {
                    '@context':
                      'http://iiif.io/api/annex/service/physdim/1/context.json',
                    profile: 'http://iiif.io/api/annex/service/physdim',
                    physicalScale: 0.0033333333333333335,
                    physicalUnits: 'in'
                  }
                },
                height: 2564,
                width: 163
              },
              on:
                'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_C2'
            }
          ]
        }
      ]
    }
  ],
  structures: [
    {
      '@id':
        'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/range/r-0',
      '@type': 'sc:Range',
      label: 'Framside',
      canvases: [
        'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_C1'
      ]
    },
    {
      '@id':
        'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/range/r-1',
      '@type': 'sc:Range',
      label: 'Tittelside',
      canvases: [
        'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_0003'
      ]
    },
    {
      '@id':
        'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/range/r-2',
      '@type': 'sc:Range',
      label: 'Bakside',
      canvases: [
        'https://api.nb.no/catalog/v1/iiif/0266d0da8f0d064a7725048aacf19872/canvas/URN:NBN:no-nb_digibok_2008020404020_C3'
      ]
    }
  ]
};
