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
            this.images.forEach((i) => {
                if (i.items) {
                    i.items.forEach((image) => {
                        images.push(new Images({
                            id: BuilderUtils.extractId(image),
                            type: BuilderUtils.extracType(image),
                            resource: new ResourceBuilder(image.body).build(),
                            motivation: image.motivation,
                            on: image.target,
                        }));
                    });
                }
            });
        }
        return images;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2VzLmJ1aWxkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvY29yZS9idWlsZGVycy9paWlmL3YzL2ltYWdlcy5idWlsZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRXJELE1BQU0sT0FBTyxhQUFhO0lBQ3hCLFlBQW9CLE1BQWE7UUFBYixXQUFNLEdBQU4sTUFBTSxDQUFPO0lBQUcsQ0FBQztJQUVyQyxLQUFLO1FBQ0gsTUFBTSxNQUFNLEdBQWEsRUFBRSxDQUFDO1FBRTVCLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3hCLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRTtvQkFDWCxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQVUsRUFBRSxFQUFFO3dCQUM3QixNQUFNLENBQUMsSUFBSSxDQUNULElBQUksTUFBTSxDQUFDOzRCQUNULEVBQUUsRUFBRSxZQUFZLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQzs0QkFDakMsSUFBSSxFQUFFLFlBQVksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDOzRCQUNwQyxRQUFRLEVBQUUsSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRTs0QkFDakQsVUFBVSxFQUFFLEtBQUssQ0FBQyxVQUFVOzRCQUM1QixFQUFFLEVBQUUsS0FBSyxDQUFDLE1BQU07eUJBQ2pCLENBQUMsQ0FDSCxDQUFDO29CQUNKLENBQUMsQ0FBQyxDQUFDO2lCQUNKO1lBQ0gsQ0FBQyxDQUFDLENBQUM7U0FDSjtRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEltYWdlcyB9IGZyb20gJy4uLy4uLy4uL21vZGVscy9tYW5pZmVzdCc7XG5pbXBvcnQgeyBCdWlsZGVyVXRpbHMgfSBmcm9tICcuL2J1aWxkZXItdXRpbHMnO1xuaW1wb3J0IHsgUmVzb3VyY2VCdWlsZGVyIH0gZnJvbSAnLi9yZXNvdXJjZS5idWlsZGVyJztcblxuZXhwb3J0IGNsYXNzIEltYWdlc0J1aWxkZXIge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGltYWdlczogYW55W10pIHt9XG5cbiAgYnVpbGQoKTogSW1hZ2VzW10ge1xuICAgIGNvbnN0IGltYWdlczogSW1hZ2VzW10gPSBbXTtcblxuICAgIGlmICh0aGlzLmltYWdlcykge1xuICAgICAgdGhpcy5pbWFnZXMuZm9yRWFjaCgoaSkgPT4ge1xuICAgICAgICBpZiAoaS5pdGVtcykge1xuICAgICAgICAgIGkuaXRlbXMuZm9yRWFjaCgoaW1hZ2U6IGFueSkgPT4ge1xuICAgICAgICAgICAgaW1hZ2VzLnB1c2goXG4gICAgICAgICAgICAgIG5ldyBJbWFnZXMoe1xuICAgICAgICAgICAgICAgIGlkOiBCdWlsZGVyVXRpbHMuZXh0cmFjdElkKGltYWdlKSxcbiAgICAgICAgICAgICAgICB0eXBlOiBCdWlsZGVyVXRpbHMuZXh0cmFjVHlwZShpbWFnZSksXG4gICAgICAgICAgICAgICAgcmVzb3VyY2U6IG5ldyBSZXNvdXJjZUJ1aWxkZXIoaW1hZ2UuYm9keSkuYnVpbGQoKSxcbiAgICAgICAgICAgICAgICBtb3RpdmF0aW9uOiBpbWFnZS5tb3RpdmF0aW9uLFxuICAgICAgICAgICAgICAgIG9uOiBpbWFnZS50YXJnZXQsXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGltYWdlcztcbiAgfVxufVxuIl19