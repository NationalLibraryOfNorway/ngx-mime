import { ViewingDirection } from '../../../models/viewing-direction';
export class BuilderUtils {
    static extractId(value) {
        return value['@id'];
    }
    static extracType(value) {
        return value['@type'];
    }
    static extractContext(value) {
        return value['@context'];
    }
    static extractViewingDirection(value) {
        if (value['viewingDirection'] === 'right-to-left') {
            return ViewingDirection.RTL;
        }
        else {
            return ViewingDirection.LTR;
        }
    }
    static findCanvasIndex(canvases, sequences) {
        let index = -1;
        if (sequences[0] && sequences[0].canvases && canvases[0]) {
            index = sequences[0].canvases.findIndex((canvas) => canvas.id === canvases[0]);
        }
        return index;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGRlci11dGlscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjL2xpYi9jb3JlL2J1aWxkZXJzL2lpaWYvdjIvYnVpbGRlci11dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUVyRSxNQUFNLE9BQU8sWUFBWTtJQUN2QixNQUFNLENBQUMsU0FBUyxDQUFDLEtBQVU7UUFDekIsT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUVELE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBVTtRQUMxQixPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN4QixDQUFDO0lBRUQsTUFBTSxDQUFDLGNBQWMsQ0FBQyxLQUFVO1FBQzlCLE9BQU8sS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFRCxNQUFNLENBQUMsdUJBQXVCLENBQUMsS0FBVTtRQUN2QyxJQUFJLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLGVBQWUsRUFBRSxDQUFDO1lBQ2xELE9BQU8sZ0JBQWdCLENBQUMsR0FBRyxDQUFDO1FBQzlCLENBQUM7YUFBTSxDQUFDO1lBQ04sT0FBTyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUM7UUFDOUIsQ0FBQztJQUNILENBQUM7SUFFRCxNQUFNLENBQUMsZUFBZSxDQUFDLFFBQWtCLEVBQUUsU0FBcUI7UUFDOUQsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDZixJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQ3pELEtBQUssR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FDckMsQ0FBQyxNQUFjLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUM5QyxDQUFDO1FBQ0osQ0FBQztRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2FudmFzLCBTZXF1ZW5jZSB9IGZyb20gJy4uLy4uLy4uL21vZGVscy9tYW5pZmVzdCc7XG5pbXBvcnQgeyBWaWV3aW5nRGlyZWN0aW9uIH0gZnJvbSAnLi4vLi4vLi4vbW9kZWxzL3ZpZXdpbmctZGlyZWN0aW9uJztcblxuZXhwb3J0IGNsYXNzIEJ1aWxkZXJVdGlscyB7XG4gIHN0YXRpYyBleHRyYWN0SWQodmFsdWU6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHZhbHVlWydAaWQnXTtcbiAgfVxuXG4gIHN0YXRpYyBleHRyYWNUeXBlKHZhbHVlOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiB2YWx1ZVsnQHR5cGUnXTtcbiAgfVxuXG4gIHN0YXRpYyBleHRyYWN0Q29udGV4dCh2YWx1ZTogYW55KTogYW55IHtcbiAgICByZXR1cm4gdmFsdWVbJ0Bjb250ZXh0J107XG4gIH1cblxuICBzdGF0aWMgZXh0cmFjdFZpZXdpbmdEaXJlY3Rpb24odmFsdWU6IGFueSk6IFZpZXdpbmdEaXJlY3Rpb24ge1xuICAgIGlmICh2YWx1ZVsndmlld2luZ0RpcmVjdGlvbiddID09PSAncmlnaHQtdG8tbGVmdCcpIHtcbiAgICAgIHJldHVybiBWaWV3aW5nRGlyZWN0aW9uLlJUTDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFZpZXdpbmdEaXJlY3Rpb24uTFRSO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBmaW5kQ2FudmFzSW5kZXgoY2FudmFzZXM6IHN0cmluZ1tdLCBzZXF1ZW5jZXM6IFNlcXVlbmNlW10pOiBudW1iZXIge1xuICAgIGxldCBpbmRleCA9IC0xO1xuICAgIGlmIChzZXF1ZW5jZXNbMF0gJiYgc2VxdWVuY2VzWzBdLmNhbnZhc2VzICYmIGNhbnZhc2VzWzBdKSB7XG4gICAgICBpbmRleCA9IHNlcXVlbmNlc1swXS5jYW52YXNlcy5maW5kSW5kZXgoXG4gICAgICAgIChjYW52YXM6IENhbnZhcykgPT4gY2FudmFzLmlkID09PSBjYW52YXNlc1swXSxcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBpbmRleDtcbiAgfVxufVxuIl19