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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2l6ZXMuYnVpbGRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjL2xpYi9jb3JlL2J1aWxkZXJzL2lpaWYvdjMvc2l6ZXMuYnVpbGRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFaEQsTUFBTSxPQUFPLFlBQVk7SUFDdkIsWUFBb0IsS0FBWTtRQUFaLFVBQUssR0FBTCxLQUFLLENBQU87SUFBRyxDQUFDO0lBRXBDLEtBQUs7UUFDSCxNQUFNLEtBQUssR0FBVyxFQUFFLENBQUM7UUFDekIsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ2QsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUMxQyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7YUFDL0M7U0FDRjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2l6ZSB9IGZyb20gJy4uLy4uLy4uL21vZGVscy9tYW5pZmVzdCc7XG5cbmV4cG9ydCBjbGFzcyBTaXplc0J1aWxkZXIge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNpemVzOiBhbnlbXSkge31cblxuICBidWlsZCgpOiBTaXplW10ge1xuICAgIGNvbnN0IHNpemVzOiBTaXplW10gPSBbXTtcbiAgICBpZiAodGhpcy5zaXplcykge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNpemVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHNpemUgPSB0aGlzLnNpemVzW2ldO1xuICAgICAgICBzaXplcy5wdXNoKG5ldyBTaXplKHNpemUud2lkdGgsIHNpemUuaGVpZ2h0KSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzaXplcztcbiAgfVxufVxuIl19