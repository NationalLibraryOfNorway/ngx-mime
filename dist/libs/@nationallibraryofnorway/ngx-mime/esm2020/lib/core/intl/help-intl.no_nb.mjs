import { HelpIntl } from './help-intl';
export class HelpIntlNoNb extends HelpIntl {
    constructor() {
        super(...arguments);
        this.helpLabel = 'Hjelp';
        this.line1 = '<strong>PIL VENSTRE</strong> eller <strong>PAGE UP</strong>: Gå til forrige side';
        this.line2 = '<strong>PIL HØYRE</strong> eller <strong>PAGE DOWN</strong>: Gå til neste side';
        this.line3 = '<strong>HOME</strong>: Gå til første side';
        this.line4 = '<strong>END</strong>: Gå til siste side';
        this.line5 = '<strong>C</strong>: Vis flere opplysninger om materialet. (Lukk med <strong>ESC</strong>.)';
        this.line6 = '<strong>S</strong>: Åpner søkefeltet for søk i objektet. (Lukk med <strong>ESC</strong>.)';
        this.line7 = '<strong>N</strong>: Går til neste treff i objektet';
        this.line8 = '<strong>P</strong>: Går til forrige treff i objektet';
        this.line9 = '<strong>F</strong>: Fullskjerm av og på (Lukk med <strong>F</strong> eller <strong>ESC</strong>.)';
        this.line10 = '<strong>R</strong>: Rotér 90°';
        this.line11 = '<strong>T</strong>: Vis/skjul optisk gjenkjent tekst (for innhold som kan vises).';
        this.line12 = '<strong>Shift-S</strong>: Tøm søk i tekst';
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC1pbnRsLm5vX25iLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL2NvcmUvaW50bC9oZWxwLWludGwubm9fbmIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUV2QyxNQUFNLE9BQU8sWUFBYSxTQUFRLFFBQVE7SUFBMUM7O1FBQ1csY0FBUyxHQUFHLE9BQU8sQ0FBQztRQUNwQixVQUFLLEdBQ1osa0ZBQWtGLENBQUM7UUFDNUUsVUFBSyxHQUNaLGdGQUFnRixDQUFDO1FBQzFFLFVBQUssR0FBRywyQ0FBMkMsQ0FBQztRQUNwRCxVQUFLLEdBQUcseUNBQXlDLENBQUM7UUFDbEQsVUFBSyxHQUNaLDRGQUE0RixDQUFDO1FBQ3RGLFVBQUssR0FDWiwyRkFBMkYsQ0FBQztRQUNyRixVQUFLLEdBQUcsb0RBQW9ELENBQUM7UUFDN0QsVUFBSyxHQUFHLHNEQUFzRCxDQUFDO1FBQy9ELFVBQUssR0FDWixtR0FBbUcsQ0FBQztRQUM3RixXQUFNLEdBQUcsK0JBQStCLENBQUM7UUFDekMsV0FBTSxHQUNiLG1GQUFtRixDQUFDO1FBQzdFLFdBQU0sR0FBRywyQ0FBMkMsQ0FBQztJQUNoRSxDQUFDO0NBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIZWxwSW50bCB9IGZyb20gJy4vaGVscC1pbnRsJztcblxuZXhwb3J0IGNsYXNzIEhlbHBJbnRsTm9OYiBleHRlbmRzIEhlbHBJbnRsIHtcbiAgb3ZlcnJpZGUgaGVscExhYmVsID0gJ0hqZWxwJztcbiAgb3ZlcnJpZGUgbGluZTEgPVxuICAgICc8c3Ryb25nPlBJTCBWRU5TVFJFPC9zdHJvbmc+IGVsbGVyIDxzdHJvbmc+UEFHRSBVUDwvc3Ryb25nPjogR8OlIHRpbCBmb3JyaWdlIHNpZGUnO1xuICBvdmVycmlkZSBsaW5lMiA9XG4gICAgJzxzdHJvbmc+UElMIEjDmFlSRTwvc3Ryb25nPiBlbGxlciA8c3Ryb25nPlBBR0UgRE9XTjwvc3Ryb25nPjogR8OlIHRpbCBuZXN0ZSBzaWRlJztcbiAgb3ZlcnJpZGUgbGluZTMgPSAnPHN0cm9uZz5IT01FPC9zdHJvbmc+OiBHw6UgdGlsIGbDuHJzdGUgc2lkZSc7XG4gIG92ZXJyaWRlIGxpbmU0ID0gJzxzdHJvbmc+RU5EPC9zdHJvbmc+OiBHw6UgdGlsIHNpc3RlIHNpZGUnO1xuICBvdmVycmlkZSBsaW5lNSA9XG4gICAgJzxzdHJvbmc+Qzwvc3Ryb25nPjogVmlzIGZsZXJlIG9wcGx5c25pbmdlciBvbSBtYXRlcmlhbGV0LiAoTHVrayBtZWQgPHN0cm9uZz5FU0M8L3N0cm9uZz4uKSc7XG4gIG92ZXJyaWRlIGxpbmU2ID1cbiAgICAnPHN0cm9uZz5TPC9zdHJvbmc+OiDDhXBuZXIgc8O4a2VmZWx0ZXQgZm9yIHPDuGsgaSBvYmpla3RldC4gKEx1a2sgbWVkIDxzdHJvbmc+RVNDPC9zdHJvbmc+LiknO1xuICBvdmVycmlkZSBsaW5lNyA9ICc8c3Ryb25nPk48L3N0cm9uZz46IEfDpXIgdGlsIG5lc3RlIHRyZWZmIGkgb2JqZWt0ZXQnO1xuICBvdmVycmlkZSBsaW5lOCA9ICc8c3Ryb25nPlA8L3N0cm9uZz46IEfDpXIgdGlsIGZvcnJpZ2UgdHJlZmYgaSBvYmpla3RldCc7XG4gIG92ZXJyaWRlIGxpbmU5ID1cbiAgICAnPHN0cm9uZz5GPC9zdHJvbmc+OiBGdWxsc2tqZXJtIGF2IG9nIHDDpSAoTHVrayBtZWQgPHN0cm9uZz5GPC9zdHJvbmc+IGVsbGVyIDxzdHJvbmc+RVNDPC9zdHJvbmc+LiknO1xuICBvdmVycmlkZSBsaW5lMTAgPSAnPHN0cm9uZz5SPC9zdHJvbmc+OiBSb3TDqXIgOTDCsCc7XG4gIG92ZXJyaWRlIGxpbmUxMSA9XG4gICAgJzxzdHJvbmc+VDwvc3Ryb25nPjogVmlzL3NranVsIG9wdGlzayBnamVua2plbnQgdGVrc3QgKGZvciBpbm5ob2xkIHNvbSBrYW4gdmlzZXMpLic7XG4gIG92ZXJyaWRlIGxpbmUxMiA9ICc8c3Ryb25nPlNoaWZ0LVM8L3N0cm9uZz46IFTDuG0gc8O4ayBpIHRla3N0Jztcbn1cbiJdfQ==