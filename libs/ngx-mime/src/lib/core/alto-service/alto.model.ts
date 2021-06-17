export interface Alto {
  layout: Layout;
}

export interface Layout {
  page: Page;
}

export interface Page {
  printSpace: PrintSpace;
}

export interface PrintSpace {
  textBlocks: TextBlock[];
}

export interface TextBlock {
  textLines: TextLine[];
}

export interface TextLine {
  strings: String[];
}

export interface String {
  content: string
}
