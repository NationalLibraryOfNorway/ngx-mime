export class Hit {
    constructor(fields) {
        this.id = 0;
        this.index = 0;
        this.label = '';
        this.match = '';
        this.before = '';
        this.after = '';
        this.highlightRects = [];
        if (fields) {
            this.id = fields.id || this.id;
            this.index = fields.index || this.index;
            this.label = fields.label || this.label;
            this.match = fields.match || this.match;
            this.before = fields.before || this.before;
            this.after = fields.after || this.after;
            this.highlightRects = fields.highlightRects || this.highlightRects;
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGl0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL2NvcmUvbW9kZWxzL2hpdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxNQUFNLE9BQU8sR0FBRztJQVNkLFlBQVksTUFRWDtRQWhCTSxPQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ1AsVUFBSyxHQUFHLENBQUMsQ0FBQztRQUNWLFVBQUssR0FBRyxFQUFFLENBQUM7UUFDWCxVQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ1gsV0FBTSxHQUFHLEVBQUUsQ0FBQztRQUNaLFVBQUssR0FBRyxFQUFFLENBQUM7UUFDWCxtQkFBYyxHQUFvQixFQUFFLENBQUM7UUFXMUMsSUFBSSxNQUFNLEVBQUUsQ0FBQztZQUNYLElBQUksQ0FBQyxFQUFFLEdBQUcsTUFBTSxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQy9CLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ3hDLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ3hDLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ3hDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQzNDLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ3hDLElBQUksQ0FBQyxjQUFjLEdBQUcsTUFBTSxDQUFDLGNBQWMsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDO1FBQ3JFLENBQUM7SUFDSCxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIaWdobGlnaHRSZWN0IH0gZnJvbSAnLi9oaWdobGlnaHQtcmVjdCc7XG5cbmV4cG9ydCBjbGFzcyBIaXQge1xuICBwdWJsaWMgaWQgPSAwO1xuICBwdWJsaWMgaW5kZXggPSAwO1xuICBwdWJsaWMgbGFiZWwgPSAnJztcbiAgcHVibGljIG1hdGNoID0gJyc7XG4gIHB1YmxpYyBiZWZvcmUgPSAnJztcbiAgcHVibGljIGFmdGVyID0gJyc7XG4gIHB1YmxpYyBoaWdobGlnaHRSZWN0czogSGlnaGxpZ2h0UmVjdFtdID0gW107XG5cbiAgY29uc3RydWN0b3IoZmllbGRzPzoge1xuICAgIGlkPzogbnVtYmVyO1xuICAgIGluZGV4PzogbnVtYmVyO1xuICAgIGxhYmVsPzogc3RyaW5nO1xuICAgIG1hdGNoPzogc3RyaW5nO1xuICAgIGJlZm9yZT86IHN0cmluZztcbiAgICBhZnRlcj86IHN0cmluZztcbiAgICBoaWdobGlnaHRSZWN0cz86IEhpZ2hsaWdodFJlY3RbXTtcbiAgfSkge1xuICAgIGlmIChmaWVsZHMpIHtcbiAgICAgIHRoaXMuaWQgPSBmaWVsZHMuaWQgfHwgdGhpcy5pZDtcbiAgICAgIHRoaXMuaW5kZXggPSBmaWVsZHMuaW5kZXggfHwgdGhpcy5pbmRleDtcbiAgICAgIHRoaXMubGFiZWwgPSBmaWVsZHMubGFiZWwgfHwgdGhpcy5sYWJlbDtcbiAgICAgIHRoaXMubWF0Y2ggPSBmaWVsZHMubWF0Y2ggfHwgdGhpcy5tYXRjaDtcbiAgICAgIHRoaXMuYmVmb3JlID0gZmllbGRzLmJlZm9yZSB8fCB0aGlzLmJlZm9yZTtcbiAgICAgIHRoaXMuYWZ0ZXIgPSBmaWVsZHMuYWZ0ZXIgfHwgdGhpcy5hZnRlcjtcbiAgICAgIHRoaXMuaGlnaGxpZ2h0UmVjdHMgPSBmaWVsZHMuaGlnaGxpZ2h0UmVjdHMgfHwgdGhpcy5oaWdobGlnaHRSZWN0cztcbiAgICB9XG4gIH1cbn1cbiJdfQ==