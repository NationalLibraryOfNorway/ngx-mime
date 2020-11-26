import { Size } from '../models/manifest';
export class SizesBuilder {
    constructor(sizes) {
        this.sizes = sizes;
    }
    build() {
        const sizes = [];
        if (this.sizes) {
            for (let i = 0; i < this.sizes.length; i++) {
                const size = this.sizes[i];
                sizes.push(new Size(size.width, size.height));
            }
        }
        return sizes;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2l6ZXMuYnVpbGRlci5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9yb25ueW0vVGVtcC9uZ3gtbWltZS9saWJzL25neC1taW1lL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9jb3JlL2J1aWxkZXJzL3NpemVzLmJ1aWxkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRTFDLE1BQU0sT0FBTyxZQUFZO0lBQ3ZCLFlBQW9CLEtBQVk7UUFBWixVQUFLLEdBQUwsS0FBSyxDQUFPO0lBQUcsQ0FBQztJQUVwQyxLQUFLO1FBQ0gsTUFBTSxLQUFLLEdBQVcsRUFBRSxDQUFDO1FBQ3pCLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNkLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDMUMsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDM0IsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2FBQy9DO1NBQ0Y7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNpemUgfSBmcm9tICcuLi9tb2RlbHMvbWFuaWZlc3QnO1xuXG5leHBvcnQgY2xhc3MgU2l6ZXNCdWlsZGVyIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzaXplczogYW55W10pIHt9XG5cbiAgYnVpbGQoKTogU2l6ZVtdIHtcbiAgICBjb25zdCBzaXplczogU2l6ZVtdID0gW107XG4gICAgaWYgKHRoaXMuc2l6ZXMpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zaXplcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBzaXplID0gdGhpcy5zaXplc1tpXTtcbiAgICAgICAgc2l6ZXMucHVzaChuZXcgU2l6ZShzaXplLndpZHRoLCBzaXplLmhlaWdodCkpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc2l6ZXM7XG4gIH1cbn1cbiJdfQ==