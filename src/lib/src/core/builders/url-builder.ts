export class UrlBuilder {
  public static getManifestUrl(id: string): string {
    return `https://api.nb.no/catalog/v1/iiif/${id}/manifest`;
  }
}
