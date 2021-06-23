export interface Alto {
  layout: Layout;
}

export interface Layout {
  page: Page;
}

export interface Page {
  topMargin: PrintSpace;
  leftMargin: PrintSpace;
  rightMargin: PrintSpace;
  bottomMargin: PrintSpace;
  printSpace: PrintSpace;
}

export interface PrintSpace {
  textBlocks: TextBlock[];
}

export interface TextBlock {
  textLines: TextLine[];
  textStyle?: TextStyle;
}

export interface TextLine {
  strings: String[];
}

export interface String {
  content: string;
}

export interface TextStyle {
  fontSize?: string;
  fontStyle?: string;
}
