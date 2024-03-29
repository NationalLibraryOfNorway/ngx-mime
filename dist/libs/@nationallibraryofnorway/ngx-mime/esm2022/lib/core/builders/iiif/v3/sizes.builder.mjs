import { Size } from '../../../models/manifest';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2l6ZXMuYnVpbGRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjL2xpYi9jb3JlL2J1aWxkZXJzL2lpaWYvdjMvc2l6ZXMuYnVpbGRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFaEQsTUFBTSxPQUFPLFlBQVk7SUFDdkIsWUFBb0IsS0FBWTtRQUFaLFVBQUssR0FBTCxLQUFLLENBQU87SUFBRyxDQUFDO0lBRXBDLEtBQUs7UUFDSCxNQUFNLEtBQUssR0FBVyxFQUFFLENBQUM7UUFDekIsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDZixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDM0MsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDM0IsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2hELENBQUM7UUFDSCxDQUFDO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTaXplIH0gZnJvbSAnLi4vLi4vLi4vbW9kZWxzL21hbmlmZXN0JztcblxuZXhwb3J0IGNsYXNzIFNpemVzQnVpbGRlciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2l6ZXM6IGFueVtdKSB7fVxuXG4gIGJ1aWxkKCk6IFNpemVbXSB7XG4gICAgY29uc3Qgc2l6ZXM6IFNpemVbXSA9IFtdO1xuICAgIGlmICh0aGlzLnNpemVzKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2l6ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3Qgc2l6ZSA9IHRoaXMuc2l6ZXNbaV07XG4gICAgICAgIHNpemVzLnB1c2gobmV3IFNpemUoc2l6ZS53aWR0aCwgc2l6ZS5oZWlnaHQpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHNpemVzO1xuICB9XG59XG4iXX0=