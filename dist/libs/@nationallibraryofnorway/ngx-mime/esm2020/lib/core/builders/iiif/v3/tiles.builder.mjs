import { Tile } from '../../../models/manifest';
export class TilesBuilder {
    constructor(tiles) {
        this.tiles = tiles;
    }
    build() {
        const tiles = [];
        if (this.tiles) {
            for (let i = 0; i < this.tiles.length; i++) {
                const tile = this.tiles[i];
                tiles.push(new Tile({
                    width: tile.width,
                    scaleFactors: tile.scaleFactors,
                }));
            }
        }
        return tiles;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGlsZXMuYnVpbGRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjL2xpYi9jb3JlL2J1aWxkZXJzL2lpaWYvdjMvdGlsZXMuYnVpbGRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFaEQsTUFBTSxPQUFPLFlBQVk7SUFDdkIsWUFBb0IsS0FBWTtRQUFaLFVBQUssR0FBTCxLQUFLLENBQU87SUFBRyxDQUFDO0lBRXBDLEtBQUs7UUFDSCxNQUFNLEtBQUssR0FBVyxFQUFFLENBQUM7UUFDekIsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ2QsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUMxQyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixLQUFLLENBQUMsSUFBSSxDQUNSLElBQUksSUFBSSxDQUFDO29CQUNQLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztvQkFDakIsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZO2lCQUNoQyxDQUFDLENBQ0gsQ0FBQzthQUNIO1NBQ0Y7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRpbGUgfSBmcm9tICcuLi8uLi8uLi9tb2RlbHMvbWFuaWZlc3QnO1xuXG5leHBvcnQgY2xhc3MgVGlsZXNCdWlsZGVyIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSB0aWxlczogYW55W10pIHt9XG5cbiAgYnVpbGQoKTogVGlsZVtdIHtcbiAgICBjb25zdCB0aWxlczogVGlsZVtdID0gW107XG4gICAgaWYgKHRoaXMudGlsZXMpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50aWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCB0aWxlID0gdGhpcy50aWxlc1tpXTtcbiAgICAgICAgdGlsZXMucHVzaChcbiAgICAgICAgICBuZXcgVGlsZSh7XG4gICAgICAgICAgICB3aWR0aDogdGlsZS53aWR0aCxcbiAgICAgICAgICAgIHNjYWxlRmFjdG9yczogdGlsZS5zY2FsZUZhY3RvcnMsXG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRpbGVzO1xuICB9XG59XG4iXX0=