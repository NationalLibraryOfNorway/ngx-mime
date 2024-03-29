import { Structure } from '../../../models/manifest';
import { BuilderUtils } from './builder-utils';
export class StructureBuilder {
    constructor(structures, sequences) {
        this.structures = structures;
        this.sequences = sequences;
    }
    build() {
        const structures = [];
        if (this.structures) {
            for (let i = 0; i < this.structures.length; i++) {
                const structure = this.structures[i];
                structures.push(new Structure({
                    id: BuilderUtils.extractId(structure),
                    type: BuilderUtils.extracType(structure),
                    label: structure.label,
                    canvases: structure.canvases,
                    canvasIndex: BuilderUtils.findCanvasIndex(structure.canvases, this.sequences),
                }));
            }
        }
        return structures;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RydWN0dXJlLmJ1aWxkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvY29yZS9idWlsZGVycy9paWlmL3YyL3N0cnVjdHVyZS5idWlsZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBWSxTQUFTLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsTUFBTSxPQUFPLGdCQUFnQjtJQUMzQixZQUFvQixVQUFpQixFQUFVLFNBQXFCO1FBQWhELGVBQVUsR0FBVixVQUFVLENBQU87UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFZO0lBQUcsQ0FBQztJQUV4RSxLQUFLO1FBQ0gsTUFBTSxVQUFVLEdBQWdCLEVBQUUsQ0FBQztRQUNuQyxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUNwQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDaEQsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDckMsVUFBVSxDQUFDLElBQUksQ0FDYixJQUFJLFNBQVMsQ0FBQztvQkFDWixFQUFFLEVBQUUsWUFBWSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUM7b0JBQ3JDLElBQUksRUFBRSxZQUFZLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQztvQkFDeEMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxLQUFLO29CQUN0QixRQUFRLEVBQUUsU0FBUyxDQUFDLFFBQVE7b0JBQzVCLFdBQVcsRUFBRSxZQUFZLENBQUMsZUFBZSxDQUN2QyxTQUFTLENBQUMsUUFBUSxFQUNsQixJQUFJLENBQUMsU0FBUyxDQUNmO2lCQUNGLENBQUMsQ0FDSCxDQUFDO1lBQ0osQ0FBQztRQUNILENBQUM7UUFDRCxPQUFPLFVBQVUsQ0FBQztJQUNwQixDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTZXF1ZW5jZSwgU3RydWN0dXJlIH0gZnJvbSAnLi4vLi4vLi4vbW9kZWxzL21hbmlmZXN0JztcbmltcG9ydCB7IEJ1aWxkZXJVdGlscyB9IGZyb20gJy4vYnVpbGRlci11dGlscyc7XG5cbmV4cG9ydCBjbGFzcyBTdHJ1Y3R1cmVCdWlsZGVyIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzdHJ1Y3R1cmVzOiBhbnlbXSwgcHJpdmF0ZSBzZXF1ZW5jZXM6IFNlcXVlbmNlW10pIHt9XG5cbiAgYnVpbGQoKTogU3RydWN0dXJlW10ge1xuICAgIGNvbnN0IHN0cnVjdHVyZXM6IFN0cnVjdHVyZVtdID0gW107XG4gICAgaWYgKHRoaXMuc3RydWN0dXJlcykge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnN0cnVjdHVyZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3Qgc3RydWN0dXJlID0gdGhpcy5zdHJ1Y3R1cmVzW2ldO1xuICAgICAgICBzdHJ1Y3R1cmVzLnB1c2goXG4gICAgICAgICAgbmV3IFN0cnVjdHVyZSh7XG4gICAgICAgICAgICBpZDogQnVpbGRlclV0aWxzLmV4dHJhY3RJZChzdHJ1Y3R1cmUpLFxuICAgICAgICAgICAgdHlwZTogQnVpbGRlclV0aWxzLmV4dHJhY1R5cGUoc3RydWN0dXJlKSxcbiAgICAgICAgICAgIGxhYmVsOiBzdHJ1Y3R1cmUubGFiZWwsXG4gICAgICAgICAgICBjYW52YXNlczogc3RydWN0dXJlLmNhbnZhc2VzLFxuICAgICAgICAgICAgY2FudmFzSW5kZXg6IEJ1aWxkZXJVdGlscy5maW5kQ2FudmFzSW5kZXgoXG4gICAgICAgICAgICAgIHN0cnVjdHVyZS5jYW52YXNlcyxcbiAgICAgICAgICAgICAgdGhpcy5zZXF1ZW5jZXNcbiAgICAgICAgICAgICksXG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHN0cnVjdHVyZXM7XG4gIH1cbn1cbiJdfQ==