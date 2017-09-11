/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

declare var window: Window;
interface Window {
  openSeadragonViewer: any; // for testing convenience
}
