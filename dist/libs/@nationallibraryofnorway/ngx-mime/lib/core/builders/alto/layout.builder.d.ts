import { Layout, TextStyle } from '../../alto-service/alto.model';
export declare class LayoutBuilder {
    private pageBuilder;
    withLayoutXml(layoutXml: any): LayoutBuilder;
    withTextStyles(textStyles: Map<string, TextStyle> | undefined): LayoutBuilder;
    build(): Layout;
}
//# sourceMappingURL=layout.builder.d.ts.map