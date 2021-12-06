export class TileSourceBuilder {
    constructor(sequences) {
        this.sequences = sequences;
    }
    build() {
        const tilesources = [];
        if (this.sequences && this.sequences.length > 0) {
            const canvases = this.sequences[0].canvases;
            for (let i = 0; canvases && i < canvases.length; i++) {
                const canvas = canvases[i];
                if (canvas) {
                    if (canvas.images && canvas.images.length >= 0) {
                        const resource = canvas.images[0].resource;
                        if (resource) {
                            tilesources.push(resource);
                        }
                    }
                }
            }
        }
        return tilesources;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGlsZS1zb3VyY2UuYnVpbGRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjL2xpYi9jb3JlL2J1aWxkZXJzL3RpbGUtc291cmNlLmJ1aWxkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsTUFBTSxPQUFPLGlCQUFpQjtJQUM1QixZQUFvQixTQUFxQjtRQUFyQixjQUFTLEdBQVQsU0FBUyxDQUFZO0lBQUcsQ0FBQztJQUU3QyxLQUFLO1FBQ0gsTUFBTSxXQUFXLEdBQWUsRUFBRSxDQUFDO1FBQ25DLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDL0MsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7WUFDNUMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsUUFBUSxJQUFJLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNwRCxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLElBQUksTUFBTSxFQUFFO29CQUNWLElBQUksTUFBTSxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7d0JBQzlDLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO3dCQUMzQyxJQUFJLFFBQVEsRUFBRTs0QkFDWixXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO3lCQUM1QjtxQkFDRjtpQkFDRjthQUNGO1NBQ0Y7UUFDRCxPQUFPLFdBQVcsQ0FBQztJQUNyQixDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZXNvdXJjZSwgU2VxdWVuY2UgfSBmcm9tICcuLi9tb2RlbHMvbWFuaWZlc3QnO1xuXG5leHBvcnQgY2xhc3MgVGlsZVNvdXJjZUJ1aWxkZXIge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNlcXVlbmNlczogU2VxdWVuY2VbXSkge31cblxuICBidWlsZCgpOiBSZXNvdXJjZVtdIHtcbiAgICBjb25zdCB0aWxlc291cmNlczogUmVzb3VyY2VbXSA9IFtdO1xuICAgIGlmICh0aGlzLnNlcXVlbmNlcyAmJiB0aGlzLnNlcXVlbmNlcy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBjYW52YXNlcyA9IHRoaXMuc2VxdWVuY2VzWzBdLmNhbnZhc2VzO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGNhbnZhc2VzICYmIGkgPCBjYW52YXNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBjYW52YXMgPSBjYW52YXNlc1tpXTtcbiAgICAgICAgaWYgKGNhbnZhcykge1xuICAgICAgICAgIGlmIChjYW52YXMuaW1hZ2VzICYmIGNhbnZhcy5pbWFnZXMubGVuZ3RoID49IDApIHtcbiAgICAgICAgICAgIGNvbnN0IHJlc291cmNlID0gY2FudmFzLmltYWdlc1swXS5yZXNvdXJjZTtcbiAgICAgICAgICAgIGlmIChyZXNvdXJjZSkge1xuICAgICAgICAgICAgICB0aWxlc291cmNlcy5wdXNoKHJlc291cmNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRpbGVzb3VyY2VzO1xuICB9XG59XG4iXX0=