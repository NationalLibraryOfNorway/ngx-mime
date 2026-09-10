export interface AltoDocumentSource {
  index: number;
  url: string;
}

export interface AltoGroupLoad {
  id: number;
  sources: AltoDocumentSource[];
}

export interface AltoLoadResult {
  requestId: number;
  index: number;
  html: string;
}
