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
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC1pbnRsLm5vX25iLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL2NvcmUvaW50bC9oZWxwLWludGwubm9fbmIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUV2QyxNQUFNLE9BQU8sWUFBYSxTQUFRLFFBQVE7SUFBMUM7O1FBQ0UsY0FBUyxHQUFHLE9BQU8sQ0FBQztRQUNwQixVQUFLLEdBQUcsa0ZBQWtGLENBQUM7UUFDM0YsVUFBSyxHQUFHLGdGQUFnRixDQUFDO1FBQ3pGLFVBQUssR0FBRywyQ0FBMkMsQ0FBQztRQUNwRCxVQUFLLEdBQUcseUNBQXlDLENBQUM7UUFDbEQsVUFBSyxHQUFHLG1JQUFtSSxDQUFDO1FBQzVJLFVBQUssR0FBRyxrR0FBa0csQ0FBQztRQUMzRyxVQUFLLEdBQUcsb0RBQW9ELENBQUM7UUFDN0QsVUFBSyxHQUFHLHNEQUFzRCxDQUFDO1FBQy9ELFVBQUssR0FBRywwR0FBMEcsQ0FBQztRQUNuSCxXQUFNLEdBQUcsK0JBQStCLENBQUM7SUFDM0MsQ0FBQztDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSGVscEludGwgfSBmcm9tICcuL2hlbHAtaW50bCc7XG5cbmV4cG9ydCBjbGFzcyBIZWxwSW50bE5vTmIgZXh0ZW5kcyBIZWxwSW50bCB7XG4gIGhlbHBMYWJlbCA9ICdIamVscCc7XG4gIGxpbmUxID0gJzxzdHJvbmc+UElMIFZFTlNUUkU8L3N0cm9uZz4gZWxsZXIgPHN0cm9uZz5QQUdFIFVQPC9zdHJvbmc+OiBHw6UgdGlsIGZvcnJpZ2Ugc2lkZSc7XG4gIGxpbmUyID0gJzxzdHJvbmc+UElMIEjDmFlSRTwvc3Ryb25nPiBlbGxlciA8c3Ryb25nPlBBR0UgRE9XTjwvc3Ryb25nPjogR8OlIHRpbCBuZXN0ZSBzaWRlJztcbiAgbGluZTMgPSAnPHN0cm9uZz5IT01FPC9zdHJvbmc+OiBHw6UgdGlsIGbDuHJzdGUgc2lkZSc7XG4gIGxpbmU0ID0gJzxzdHJvbmc+RU5EPC9zdHJvbmc+OiBHw6UgdGlsIHNpc3RlIHNpZGUnO1xuICBsaW5lNSA9ICc8c3Ryb25nPkM8L3N0cm9uZz46IFNsw6VyIGlubmhvbGRzZmFuZW4gcMOlLCBvZyB2aXNlciBtZXIgaW5mb3JtYXNqb24vbWV0YWRhdGEgb20gb2JqZWt0ZXQuIChMdWtrIG1lZCA8c3Ryb25nPkVTQzwvc3Ryb25nPi10YXN0ZW4uKSc7XG4gIGxpbmU2ID0gJzxzdHJvbmc+Uzwvc3Ryb25nPjogw4VwbmVyIHPDuGtlZmVsdGV0IGZvciBzw7hrIGkgb2JqZWt0ZXQuIChMdWtrIG1lZCA8c3Ryb25nPkVTQzwvc3Ryb25nPi10YXN0ZW4uKSc7XG4gIGxpbmU3ID0gJzxzdHJvbmc+Tjwvc3Ryb25nPjogR8OlciB0aWwgbmVzdGUgdHJlZmYgaSBvYmpla3RldCc7XG4gIGxpbmU4ID0gJzxzdHJvbmc+UDwvc3Ryb25nPjogR8OlciB0aWwgZm9ycmlnZSB0cmVmZiBpIG9iamVrdGV0JztcbiAgbGluZTkgPSAnPHN0cm9uZz5GPC9zdHJvbmc+OiBGdWxsc2tqZXJtIGF2IG9nIHDDpSAoTHVrayBtZWQgPHN0cm9uZz5GPC9zdHJvbmc+IGVsbGVyIDxzdHJvbmc+RVNDPC9zdHJvbmc+LXRhc3Rlbi4pJztcbiAgbGluZTEwID0gJzxzdHJvbmc+Ujwvc3Ryb25nPjogUm90w6lyIDkwwrAnO1xufVxuXG4iXX0=