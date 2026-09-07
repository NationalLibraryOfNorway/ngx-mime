import { MimeViewerConfig } from './mime-viewer-config';

describe('MimeViewerConfig', () => {
  it('should preserve an attribution dialog hide timeout of zero', () => {
    const config = new MimeViewerConfig({
      attributionDialogHideTimeout: 0,
    });

    expect(config.attributionDialogHideTimeout).toBe(0);
  });
});
