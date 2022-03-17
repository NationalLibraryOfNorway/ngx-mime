import { Images } from '../../../models/manifest';
import { BuilderUtils } from './builder-utils';
import { ResourceBuilder } from './resource.builder';
export class ImagesBuilder {
    constructor(images) {
        this.images = images;
    }
    build() {
        const images = [];
        if (this.images) {
            for (let i = 0; i < this.images.length; i++) {
                const image = this.images[i];
                images.push(new Images({
                    id: BuilderUtils.extractId(image),
                    type: BuilderUtils.extracType(image),
                    motivation: image.motivation,
                    resource: new ResourceBuilder(image.resource).build(),
                    on: image.on,
                }));
            }
        }
        return images;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2VzLmJ1aWxkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvY29yZS9idWlsZGVycy9paWlmL3YyL2ltYWdlcy5idWlsZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRXJELE1BQU0sT0FBTyxhQUFhO0lBQ3hCLFlBQW9CLE1BQWE7UUFBYixXQUFNLEdBQU4sTUFBTSxDQUFPO0lBQUcsQ0FBQztJQUVyQyxLQUFLO1FBQ0gsTUFBTSxNQUFNLEdBQWEsRUFBRSxDQUFDO1FBQzVCLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNmLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDM0MsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDN0IsTUFBTSxDQUFDLElBQUksQ0FDVCxJQUFJLE1BQU0sQ0FBQztvQkFDVCxFQUFFLEVBQUUsWUFBWSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7b0JBQ2pDLElBQUksRUFBRSxZQUFZLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQztvQkFDcEMsVUFBVSxFQUFFLEtBQUssQ0FBQyxVQUFVO29CQUM1QixRQUFRLEVBQUUsSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssRUFBRTtvQkFDckQsRUFBRSxFQUFFLEtBQUssQ0FBQyxFQUFFO2lCQUNiLENBQUMsQ0FDSCxDQUFDO2FBQ0g7U0FDRjtRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEltYWdlcyB9IGZyb20gJy4uLy4uLy4uL21vZGVscy9tYW5pZmVzdCc7XG5pbXBvcnQgeyBCdWlsZGVyVXRpbHMgfSBmcm9tICcuL2J1aWxkZXItdXRpbHMnO1xuaW1wb3J0IHsgUmVzb3VyY2VCdWlsZGVyIH0gZnJvbSAnLi9yZXNvdXJjZS5idWlsZGVyJztcblxuZXhwb3J0IGNsYXNzIEltYWdlc0J1aWxkZXIge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGltYWdlczogYW55W10pIHt9XG5cbiAgYnVpbGQoKTogSW1hZ2VzW10ge1xuICAgIGNvbnN0IGltYWdlczogSW1hZ2VzW10gPSBbXTtcbiAgICBpZiAodGhpcy5pbWFnZXMpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5pbWFnZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgaW1hZ2UgPSB0aGlzLmltYWdlc1tpXTtcbiAgICAgICAgaW1hZ2VzLnB1c2goXG4gICAgICAgICAgbmV3IEltYWdlcyh7XG4gICAgICAgICAgICBpZDogQnVpbGRlclV0aWxzLmV4dHJhY3RJZChpbWFnZSksXG4gICAgICAgICAgICB0eXBlOiBCdWlsZGVyVXRpbHMuZXh0cmFjVHlwZShpbWFnZSksXG4gICAgICAgICAgICBtb3RpdmF0aW9uOiBpbWFnZS5tb3RpdmF0aW9uLFxuICAgICAgICAgICAgcmVzb3VyY2U6IG5ldyBSZXNvdXJjZUJ1aWxkZXIoaW1hZ2UucmVzb3VyY2UpLmJ1aWxkKCksXG4gICAgICAgICAgICBvbjogaW1hZ2Uub24sXG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGltYWdlcztcbiAgfVxufVxuIl19