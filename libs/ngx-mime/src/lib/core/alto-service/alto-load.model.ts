export interface AltoDocumentSource {
  canvasIndex: number;
  url: string;
}

export interface AltoGroupLoad {
  requestId: number;
  sources: AltoDocumentSource[];
}

export interface AltoLoadResult {
  requestId: number;
  canvasIndex: number;
  html: string;
}
