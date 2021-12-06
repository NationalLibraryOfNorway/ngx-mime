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
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC1pbnRsLm5vX25iLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL2NvcmUvaW50bC9oZWxwLWludGwubm9fbmIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUV2QyxNQUFNLE9BQU8sWUFBYSxTQUFRLFFBQVE7SUFBMUM7O1FBQ0UsY0FBUyxHQUFHLE9BQU8sQ0FBQztRQUNwQixVQUFLLEdBQUcsa0ZBQWtGLENBQUM7UUFDM0YsVUFBSyxHQUFHLGdGQUFnRixDQUFDO1FBQ3pGLFVBQUssR0FBRywyQ0FBMkMsQ0FBQztRQUNwRCxVQUFLLEdBQUcseUNBQXlDLENBQUM7UUFDbEQsVUFBSyxHQUFHLG1JQUFtSSxDQUFDO1FBQzVJLFVBQUssR0FBRyxrR0FBa0csQ0FBQztRQUMzRyxVQUFLLEdBQUcsb0RBQW9ELENBQUM7UUFDN0QsVUFBSyxHQUFHLHNEQUFzRCxDQUFDO1FBQy9ELFVBQUssR0FBRywwR0FBMEcsQ0FBQztRQUNuSCxXQUFNLEdBQUcsK0JBQStCLENBQUM7UUFDekMsV0FBTSxHQUFHLG1GQUFtRixDQUFDO0lBQy9GLENBQUM7Q0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEhlbHBJbnRsIH0gZnJvbSAnLi9oZWxwLWludGwnO1xuXG5leHBvcnQgY2xhc3MgSGVscEludGxOb05iIGV4dGVuZHMgSGVscEludGwge1xuICBoZWxwTGFiZWwgPSAnSGplbHAnO1xuICBsaW5lMSA9ICc8c3Ryb25nPlBJTCBWRU5TVFJFPC9zdHJvbmc+IGVsbGVyIDxzdHJvbmc+UEFHRSBVUDwvc3Ryb25nPjogR8OlIHRpbCBmb3JyaWdlIHNpZGUnO1xuICBsaW5lMiA9ICc8c3Ryb25nPlBJTCBIw5hZUkU8L3N0cm9uZz4gZWxsZXIgPHN0cm9uZz5QQUdFIERPV048L3N0cm9uZz46IEfDpSB0aWwgbmVzdGUgc2lkZSc7XG4gIGxpbmUzID0gJzxzdHJvbmc+SE9NRTwvc3Ryb25nPjogR8OlIHRpbCBmw7hyc3RlIHNpZGUnO1xuICBsaW5lNCA9ICc8c3Ryb25nPkVORDwvc3Ryb25nPjogR8OlIHRpbCBzaXN0ZSBzaWRlJztcbiAgbGluZTUgPSAnPHN0cm9uZz5DPC9zdHJvbmc+OiBTbMOlciBpbm5ob2xkc2ZhbmVuIHDDpSwgb2cgdmlzZXIgbWVyIGluZm9ybWFzam9uL21ldGFkYXRhIG9tIG9iamVrdGV0LiAoTHVrayBtZWQgPHN0cm9uZz5FU0M8L3N0cm9uZz4tdGFzdGVuLiknO1xuICBsaW5lNiA9ICc8c3Ryb25nPlM8L3N0cm9uZz46IMOFcG5lciBzw7hrZWZlbHRldCBmb3Igc8O4ayBpIG9iamVrdGV0LiAoTHVrayBtZWQgPHN0cm9uZz5FU0M8L3N0cm9uZz4tdGFzdGVuLiknO1xuICBsaW5lNyA9ICc8c3Ryb25nPk48L3N0cm9uZz46IEfDpXIgdGlsIG5lc3RlIHRyZWZmIGkgb2JqZWt0ZXQnO1xuICBsaW5lOCA9ICc8c3Ryb25nPlA8L3N0cm9uZz46IEfDpXIgdGlsIGZvcnJpZ2UgdHJlZmYgaSBvYmpla3RldCc7XG4gIGxpbmU5ID0gJzxzdHJvbmc+Rjwvc3Ryb25nPjogRnVsbHNramVybSBhdiBvZyBww6UgKEx1a2sgbWVkIDxzdHJvbmc+Rjwvc3Ryb25nPiBlbGxlciA8c3Ryb25nPkVTQzwvc3Ryb25nPi10YXN0ZW4uKSc7XG4gIGxpbmUxMCA9ICc8c3Ryb25nPlI8L3N0cm9uZz46IFJvdMOpciA5MMKwJztcbiAgbGluZTExID0gJzxzdHJvbmc+VDwvc3Ryb25nPjogVmlzL3NranVsIG9wdGlzayBnamVua2plbnQgdGVrc3QgKGZvciBpbm5ob2xkIHNvbSBrYW4gdmlzZXMpLic7XG59XG5cbiJdfQ==