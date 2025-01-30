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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VxdWVuY2UuYnVpbGRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjL2xpYi9jb3JlL2J1aWxkZXJzL2lpaWYvdjIvc2VxdWVuY2UuYnVpbGRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDcEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUVqRCxNQUFNLE9BQU8sZUFBZTtJQUMxQixZQUFvQixTQUFnQjtRQUFoQixjQUFTLEdBQVQsU0FBUyxDQUFPO0lBQUcsQ0FBQztJQUV4QyxLQUFLO1FBQ0gsTUFBTSxTQUFTLEdBQWUsRUFBRSxDQUFDO1FBQ2pDLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ25CLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUMvQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM5QixTQUFTLENBQUMsSUFBSSxDQUNaLElBQUksUUFBUSxDQUFDO29CQUNYLEVBQUUsRUFBRSxZQUFZLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQztvQkFDL0IsSUFBSSxFQUFFLFlBQVksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDO29CQUNsQyxLQUFLLEVBQUUsR0FBRyxDQUFDLEtBQUs7b0JBQ2hCLFdBQVcsRUFBRSxHQUFHLENBQUMsV0FBVztvQkFDNUIsUUFBUSxFQUFFLElBQUksYUFBYSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLEVBQUU7aUJBQ2xELENBQUMsQ0FDSCxDQUFDO1lBQ0osQ0FBQztRQUNILENBQUM7UUFDRCxPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTZXF1ZW5jZSB9IGZyb20gJy4uLy4uLy4uL21vZGVscy9tYW5pZmVzdCc7XG5pbXBvcnQgeyBCdWlsZGVyVXRpbHMgfSBmcm9tICcuL2J1aWxkZXItdXRpbHMnO1xuaW1wb3J0IHsgQ2FudmFzQnVpbGRlciB9IGZyb20gJy4vY2FudmFzLmJ1aWxkZXInO1xuXG5leHBvcnQgY2xhc3MgU2VxdWVuY2VCdWlsZGVyIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzZXF1ZW5jZXM6IGFueVtdKSB7fVxuXG4gIGJ1aWxkKCk6IFNlcXVlbmNlW10ge1xuICAgIGNvbnN0IHNlcXVlbmNlczogU2VxdWVuY2VbXSA9IFtdO1xuICAgIGlmICh0aGlzLnNlcXVlbmNlcykge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNlcXVlbmNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBzZXEgPSB0aGlzLnNlcXVlbmNlc1tpXTtcbiAgICAgICAgc2VxdWVuY2VzLnB1c2goXG4gICAgICAgICAgbmV3IFNlcXVlbmNlKHtcbiAgICAgICAgICAgIGlkOiBCdWlsZGVyVXRpbHMuZXh0cmFjdElkKHNlcSksXG4gICAgICAgICAgICB0eXBlOiBCdWlsZGVyVXRpbHMuZXh0cmFjVHlwZShzZXEpLFxuICAgICAgICAgICAgbGFiZWw6IHNlcS5sYWJlbCxcbiAgICAgICAgICAgIHZpZXdpbmdIaW50OiBzZXEudmlld2luZ0hpbnQsXG4gICAgICAgICAgICBjYW52YXNlczogbmV3IENhbnZhc0J1aWxkZXIoc2VxLmNhbnZhc2VzKS5idWlsZCgpLFxuICAgICAgICAgIH0pLFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc2VxdWVuY2VzO1xuICB9XG59XG4iXX0=