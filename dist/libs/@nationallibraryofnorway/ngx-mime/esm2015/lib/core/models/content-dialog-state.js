export class ContentDialogState {
    constructor(fields) {
        this.isOpen = false;
        this.selectedIndex = 0;
        if (fields) {
            this.isOpen = fields.isOpen !== undefined ? fields.isOpen : this.isOpen;
            this.selectedIndex =
                fields.selectedIndex !== undefined
                    ? fields.selectedIndex
                    : this.selectedIndex;
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC1kaWFsb2ctc3RhdGUuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvIiwic291cmNlcyI6WyJsaWIvY29yZS9tb2RlbHMvY29udGVudC1kaWFsb2ctc3RhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxPQUFPLGtCQUFrQjtJQUk3QixZQUFZLE1BQXFEO1FBSDFELFdBQU0sR0FBRyxLQUFLLENBQUM7UUFDZixrQkFBYSxHQUFHLENBQUMsQ0FBQztRQUd2QixJQUFJLE1BQU0sRUFBRTtZQUNWLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDeEUsSUFBSSxDQUFDLGFBQWE7Z0JBQ2hCLE1BQU0sQ0FBQyxhQUFhLEtBQUssU0FBUztvQkFDaEMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxhQUFhO29CQUN0QixDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztTQUMxQjtJQUNILENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBDb250ZW50RGlhbG9nU3RhdGUge1xuICBwdWJsaWMgaXNPcGVuID0gZmFsc2U7XG4gIHB1YmxpYyBzZWxlY3RlZEluZGV4ID0gMDtcblxuICBjb25zdHJ1Y3RvcihmaWVsZHM/OiB7IGlzT3Blbj86IGJvb2xlYW47IHNlbGVjdGVkSW5kZXg/OiBudW1iZXIgfSkge1xuICAgIGlmIChmaWVsZHMpIHtcbiAgICAgIHRoaXMuaXNPcGVuID0gZmllbGRzLmlzT3BlbiAhPT0gdW5kZWZpbmVkID8gZmllbGRzLmlzT3BlbiA6IHRoaXMuaXNPcGVuO1xuICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ID1cbiAgICAgICAgZmllbGRzLnNlbGVjdGVkSW5kZXggIT09IHVuZGVmaW5lZFxuICAgICAgICAgID8gZmllbGRzLnNlbGVjdGVkSW5kZXhcbiAgICAgICAgICA6IHRoaXMuc2VsZWN0ZWRJbmRleDtcbiAgICB9XG4gIH1cbn1cbiJdfQ==