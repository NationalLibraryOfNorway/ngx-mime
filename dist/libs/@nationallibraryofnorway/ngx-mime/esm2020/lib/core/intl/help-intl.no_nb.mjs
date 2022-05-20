import { HelpIntl } from './help-intl';
export class HelpIntlNoNb extends HelpIntl {
    constructor() {
        super(...arguments);
        this.helpLabel = 'Hjelp';
        this.line1 = '<strong>PIL VENSTRE</strong> eller <strong>PAGE UP</strong>: Gå til forrige side';
        this.line2 = '<strong>PIL HØYRE</strong> eller <strong>PAGE DOWN</strong>: Gå til neste side';
        this.line3 = '<strong>HOME</strong>: Gå til første side';
        this.line4 = '<strong>END</strong>: Gå til siste side';
        this.line5 = '<strong>C</strong>: Slår innholdsfanen på, og viser mer informasjon/metadata om objektet. (Lukk med <strong>ESC</strong>-tasten.)';
        this.line6 = '<strong>S</strong>: Åpner søkefeltet for søk i objektet. (Lukk med <strong>ESC</strong>-tasten.)';
        this.line7 = '<strong>N</strong>: Går til neste treff i objektet';
        this.line8 = '<strong>P</strong>: Går til forrige treff i objektet';
        this.line9 = '<strong>F</strong>: Fullskjerm av og på (Lukk med <strong>F</strong> eller <strong>ESC</strong>-tasten.)';
        this.line10 = '<strong>R</strong>: Rotér 90°';
        this.line11 = '<strong>T</strong>: Vis/skjul optisk gjenkjent tekst (for innhold som kan vises).';
        this.line12 = '<strong>Shift-S</strong>: Tøm søk i tekst';
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC1pbnRsLm5vX25iLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL2NvcmUvaW50bC9oZWxwLWludGwubm9fbmIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUV2QyxNQUFNLE9BQU8sWUFBYSxTQUFRLFFBQVE7SUFBMUM7O1FBQ0UsY0FBUyxHQUFHLE9BQU8sQ0FBQztRQUNwQixVQUFLLEdBQ0gsa0ZBQWtGLENBQUM7UUFDckYsVUFBSyxHQUNILGdGQUFnRixDQUFDO1FBQ25GLFVBQUssR0FBRywyQ0FBMkMsQ0FBQztRQUNwRCxVQUFLLEdBQUcseUNBQXlDLENBQUM7UUFDbEQsVUFBSyxHQUNILG1JQUFtSSxDQUFDO1FBQ3RJLFVBQUssR0FDSCxrR0FBa0csQ0FBQztRQUNyRyxVQUFLLEdBQUcsb0RBQW9ELENBQUM7UUFDN0QsVUFBSyxHQUFHLHNEQUFzRCxDQUFDO1FBQy9ELFVBQUssR0FDSCwwR0FBMEcsQ0FBQztRQUM3RyxXQUFNLEdBQUcsK0JBQStCLENBQUM7UUFDekMsV0FBTSxHQUNKLG1GQUFtRixDQUFDO1FBQ3RGLFdBQU0sR0FBRywyQ0FBMkMsQ0FBQztJQUN2RCxDQUFDO0NBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIZWxwSW50bCB9IGZyb20gJy4vaGVscC1pbnRsJztcblxuZXhwb3J0IGNsYXNzIEhlbHBJbnRsTm9OYiBleHRlbmRzIEhlbHBJbnRsIHtcbiAgaGVscExhYmVsID0gJ0hqZWxwJztcbiAgbGluZTEgPVxuICAgICc8c3Ryb25nPlBJTCBWRU5TVFJFPC9zdHJvbmc+IGVsbGVyIDxzdHJvbmc+UEFHRSBVUDwvc3Ryb25nPjogR8OlIHRpbCBmb3JyaWdlIHNpZGUnO1xuICBsaW5lMiA9XG4gICAgJzxzdHJvbmc+UElMIEjDmFlSRTwvc3Ryb25nPiBlbGxlciA8c3Ryb25nPlBBR0UgRE9XTjwvc3Ryb25nPjogR8OlIHRpbCBuZXN0ZSBzaWRlJztcbiAgbGluZTMgPSAnPHN0cm9uZz5IT01FPC9zdHJvbmc+OiBHw6UgdGlsIGbDuHJzdGUgc2lkZSc7XG4gIGxpbmU0ID0gJzxzdHJvbmc+RU5EPC9zdHJvbmc+OiBHw6UgdGlsIHNpc3RlIHNpZGUnO1xuICBsaW5lNSA9XG4gICAgJzxzdHJvbmc+Qzwvc3Ryb25nPjogU2zDpXIgaW5uaG9sZHNmYW5lbiBww6UsIG9nIHZpc2VyIG1lciBpbmZvcm1hc2pvbi9tZXRhZGF0YSBvbSBvYmpla3RldC4gKEx1a2sgbWVkIDxzdHJvbmc+RVNDPC9zdHJvbmc+LXRhc3Rlbi4pJztcbiAgbGluZTYgPVxuICAgICc8c3Ryb25nPlM8L3N0cm9uZz46IMOFcG5lciBzw7hrZWZlbHRldCBmb3Igc8O4ayBpIG9iamVrdGV0LiAoTHVrayBtZWQgPHN0cm9uZz5FU0M8L3N0cm9uZz4tdGFzdGVuLiknO1xuICBsaW5lNyA9ICc8c3Ryb25nPk48L3N0cm9uZz46IEfDpXIgdGlsIG5lc3RlIHRyZWZmIGkgb2JqZWt0ZXQnO1xuICBsaW5lOCA9ICc8c3Ryb25nPlA8L3N0cm9uZz46IEfDpXIgdGlsIGZvcnJpZ2UgdHJlZmYgaSBvYmpla3RldCc7XG4gIGxpbmU5ID1cbiAgICAnPHN0cm9uZz5GPC9zdHJvbmc+OiBGdWxsc2tqZXJtIGF2IG9nIHDDpSAoTHVrayBtZWQgPHN0cm9uZz5GPC9zdHJvbmc+IGVsbGVyIDxzdHJvbmc+RVNDPC9zdHJvbmc+LXRhc3Rlbi4pJztcbiAgbGluZTEwID0gJzxzdHJvbmc+Ujwvc3Ryb25nPjogUm90w6lyIDkwwrAnO1xuICBsaW5lMTEgPVxuICAgICc8c3Ryb25nPlQ8L3N0cm9uZz46IFZpcy9za2p1bCBvcHRpc2sgZ2plbmtqZW50IHRla3N0IChmb3IgaW5uaG9sZCBzb20ga2FuIHZpc2VzKS4nO1xuICBsaW5lMTIgPSAnPHN0cm9uZz5TaGlmdC1TPC9zdHJvbmc+OiBUw7htIHPDuGsgaSB0ZWtzdCc7XG59XG4iXX0=