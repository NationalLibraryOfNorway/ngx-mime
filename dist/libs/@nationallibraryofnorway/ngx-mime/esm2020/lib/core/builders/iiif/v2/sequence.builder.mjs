import { Sequence } from '../../../models/manifest';
import { BuilderUtils } from './builder-utils';
import { CanvasBuilder } from './canvas.builder';
export class SequenceBuilder {
    constructor(sequences) {
        this.sequences = sequences;
    }
    build() {
        const sequences = [];
        if (this.sequences) {
            for (let i = 0; i < this.sequences.length; i++) {
                const seq = this.sequences[i];
                sequences.push(new Sequence({
                    id: BuilderUtils.extractId(seq),
                    type: BuilderUtils.extracType(seq),
                    label: seq.label,
                    viewingHint: seq.viewingHint,
                    canvases: new CanvasBuilder(seq.canvases).build(),
                }));
            }
        }
        return sequences;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VxdWVuY2UuYnVpbGRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjL2xpYi9jb3JlL2J1aWxkZXJzL2lpaWYvdjIvc2VxdWVuY2UuYnVpbGRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDcEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUVqRCxNQUFNLE9BQU8sZUFBZTtJQUMxQixZQUFvQixTQUFnQjtRQUFoQixjQUFTLEdBQVQsU0FBUyxDQUFPO0lBQUcsQ0FBQztJQUV4QyxLQUFLO1FBQ0gsTUFBTSxTQUFTLEdBQWUsRUFBRSxDQUFDO1FBQ2pDLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNsQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQzlDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzlCLFNBQVMsQ0FBQyxJQUFJLENBQ1osSUFBSSxRQUFRLENBQUM7b0JBQ1gsRUFBRSxFQUFFLFlBQVksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDO29CQUMvQixJQUFJLEVBQUUsWUFBWSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUM7b0JBQ2xDLEtBQUssRUFBRSxHQUFHLENBQUMsS0FBSztvQkFDaEIsV0FBVyxFQUFFLEdBQUcsQ0FBQyxXQUFXO29CQUM1QixRQUFRLEVBQUUsSUFBSSxhQUFhLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssRUFBRTtpQkFDbEQsQ0FBQyxDQUNILENBQUM7YUFDSDtTQUNGO1FBQ0QsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2VxdWVuY2UgfSBmcm9tICcuLi8uLi8uLi9tb2RlbHMvbWFuaWZlc3QnO1xuaW1wb3J0IHsgQnVpbGRlclV0aWxzIH0gZnJvbSAnLi9idWlsZGVyLXV0aWxzJztcbmltcG9ydCB7IENhbnZhc0J1aWxkZXIgfSBmcm9tICcuL2NhbnZhcy5idWlsZGVyJztcblxuZXhwb3J0IGNsYXNzIFNlcXVlbmNlQnVpbGRlciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2VxdWVuY2VzOiBhbnlbXSkge31cblxuICBidWlsZCgpOiBTZXF1ZW5jZVtdIHtcbiAgICBjb25zdCBzZXF1ZW5jZXM6IFNlcXVlbmNlW10gPSBbXTtcbiAgICBpZiAodGhpcy5zZXF1ZW5jZXMpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zZXF1ZW5jZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3Qgc2VxID0gdGhpcy5zZXF1ZW5jZXNbaV07XG4gICAgICAgIHNlcXVlbmNlcy5wdXNoKFxuICAgICAgICAgIG5ldyBTZXF1ZW5jZSh7XG4gICAgICAgICAgICBpZDogQnVpbGRlclV0aWxzLmV4dHJhY3RJZChzZXEpLFxuICAgICAgICAgICAgdHlwZTogQnVpbGRlclV0aWxzLmV4dHJhY1R5cGUoc2VxKSxcbiAgICAgICAgICAgIGxhYmVsOiBzZXEubGFiZWwsXG4gICAgICAgICAgICB2aWV3aW5nSGludDogc2VxLnZpZXdpbmdIaW50LFxuICAgICAgICAgICAgY2FudmFzZXM6IG5ldyBDYW52YXNCdWlsZGVyKHNlcS5jYW52YXNlcykuYnVpbGQoKSxcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc2VxdWVuY2VzO1xuICB9XG59XG4iXX0=