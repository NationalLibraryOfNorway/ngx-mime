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
                    label: BuilderUtils.extractLanguageValue(structure.label),
                    canvases: structure.items,
                    canvasIndex: BuilderUtils.findCanvasIndex(structure.items, this.sequences),
                }));
            }
        }
        return structures;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RydWN0dXJlLmJ1aWxkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvY29yZS9idWlsZGVycy9paWlmL3YzL3N0cnVjdHVyZS5idWlsZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBWSxTQUFTLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsTUFBTSxPQUFPLGdCQUFnQjtJQUMzQixZQUFvQixVQUFpQixFQUFVLFNBQXFCO1FBQWhELGVBQVUsR0FBVixVQUFVLENBQU87UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFZO0lBQUcsQ0FBQztJQUV4RSxLQUFLO1FBQ0gsTUFBTSxVQUFVLEdBQWdCLEVBQUUsQ0FBQztRQUNuQyxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbkIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUMvQyxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNyQyxVQUFVLENBQUMsSUFBSSxDQUNiLElBQUksU0FBUyxDQUFDO29CQUNaLEVBQUUsRUFBRSxZQUFZLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQztvQkFDckMsSUFBSSxFQUFFLFlBQVksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDO29CQUN4QyxLQUFLLEVBQUUsWUFBWSxDQUFDLG9CQUFvQixDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7b0JBQ3pELFFBQVEsRUFBRSxTQUFTLENBQUMsS0FBSztvQkFDekIsV0FBVyxFQUFFLFlBQVksQ0FBQyxlQUFlLENBQ3ZDLFNBQVMsQ0FBQyxLQUFLLEVBQ2YsSUFBSSxDQUFDLFNBQVMsQ0FDZjtpQkFDRixDQUFDLENBQ0gsQ0FBQzthQUNIO1NBQ0Y7UUFDRCxPQUFPLFVBQVUsQ0FBQztJQUNwQixDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTZXF1ZW5jZSwgU3RydWN0dXJlIH0gZnJvbSAnLi4vLi4vLi4vbW9kZWxzL21hbmlmZXN0JztcbmltcG9ydCB7IEJ1aWxkZXJVdGlscyB9IGZyb20gJy4vYnVpbGRlci11dGlscyc7XG5cbmV4cG9ydCBjbGFzcyBTdHJ1Y3R1cmVCdWlsZGVyIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzdHJ1Y3R1cmVzOiBhbnlbXSwgcHJpdmF0ZSBzZXF1ZW5jZXM6IFNlcXVlbmNlW10pIHt9XG5cbiAgYnVpbGQoKTogU3RydWN0dXJlW10ge1xuICAgIGNvbnN0IHN0cnVjdHVyZXM6IFN0cnVjdHVyZVtdID0gW107XG4gICAgaWYgKHRoaXMuc3RydWN0dXJlcykge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnN0cnVjdHVyZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3Qgc3RydWN0dXJlID0gdGhpcy5zdHJ1Y3R1cmVzW2ldO1xuICAgICAgICBzdHJ1Y3R1cmVzLnB1c2goXG4gICAgICAgICAgbmV3IFN0cnVjdHVyZSh7XG4gICAgICAgICAgICBpZDogQnVpbGRlclV0aWxzLmV4dHJhY3RJZChzdHJ1Y3R1cmUpLFxuICAgICAgICAgICAgdHlwZTogQnVpbGRlclV0aWxzLmV4dHJhY1R5cGUoc3RydWN0dXJlKSxcbiAgICAgICAgICAgIGxhYmVsOiBCdWlsZGVyVXRpbHMuZXh0cmFjdExhbmd1YWdlVmFsdWUoc3RydWN0dXJlLmxhYmVsKSxcbiAgICAgICAgICAgIGNhbnZhc2VzOiBzdHJ1Y3R1cmUuaXRlbXMsXG4gICAgICAgICAgICBjYW52YXNJbmRleDogQnVpbGRlclV0aWxzLmZpbmRDYW52YXNJbmRleChcbiAgICAgICAgICAgICAgc3RydWN0dXJlLml0ZW1zLFxuICAgICAgICAgICAgICB0aGlzLnNlcXVlbmNlc1xuICAgICAgICAgICAgKSxcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc3RydWN0dXJlcztcbiAgfVxufVxuIl19