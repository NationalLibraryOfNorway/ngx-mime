import { Rect } from '../models/rect';
import { Utils } from '../utils';
export const canvasRectFromCriteria = (rotation, criteria, x, ignorePhysicalScale) => {
    let rect = {};
    const scale = Utils.getScaleFactor(criteria.canvasSource.service?.service?.physicalScale, ignorePhysicalScale);
    if (rotation === 90 || rotation === 270) {
        rect = {
            height: Math.trunc(criteria.canvasSource.width * scale),
            width: Math.trunc(criteria.canvasSource.height * scale),
            x: x,
            y: Math.trunc((criteria.canvasSource.width * scale) / 2) * -1,
        };
    }
    else {
        rect = {
            height: Math.trunc(criteria.canvasSource.height * scale),
            width: Math.trunc(criteria.canvasSource.width * scale),
            x: x,
            y: Math.trunc((criteria.canvasSource.height * scale) / 2) * -1,
        };
    }
    return new Rect(rect);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsY3VsYXRlLWNhbnZhcy1ncm91cC1wb3NpdGlvbi11dGlscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjL2xpYi9jb3JlL2NhbnZhcy1ncm91cC1wb3NpdGlvbi9jYWxjdWxhdGUtY2FudmFzLWdyb3VwLXBvc2l0aW9uLXV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0QyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBR2pDLE1BQU0sQ0FBQyxNQUFNLHNCQUFzQixHQUFHLENBQ3BDLFFBQWdCLEVBQ2hCLFFBQXFDLEVBQ3JDLENBQVMsRUFDVCxtQkFBNEIsRUFDNUIsRUFBRTtJQUNGLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztJQUNkLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxjQUFjLENBQ2hDLFFBQVEsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQ3JELG1CQUFtQixDQUNwQixDQUFDO0lBQ0YsSUFBSSxRQUFRLEtBQUssRUFBRSxJQUFJLFFBQVEsS0FBSyxHQUFHLEVBQUU7UUFDdkMsSUFBSSxHQUFHO1lBQ0wsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQ3ZELEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUN2RCxDQUFDLEVBQUUsQ0FBQztZQUNKLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQzlELENBQUM7S0FDSDtTQUFNO1FBQ0wsSUFBSSxHQUFHO1lBQ0wsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ3hELEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUN0RCxDQUFDLEVBQUUsQ0FBQztZQUNKLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQy9ELENBQUM7S0FDSDtJQUNELE9BQU8sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDeEIsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVjdCB9IGZyb20gJy4uL21vZGVscy9yZWN0JztcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHsgQ2FudmFzR3JvdXBQb3NpdGlvbkNyaXRlcmlhIH0gZnJvbSAnLi9jYWxjdWxhdGUtY2FudmFzLWdyb3VwLXBvc2l0aW9uLXN0cmF0ZWd5JztcblxuZXhwb3J0IGNvbnN0IGNhbnZhc1JlY3RGcm9tQ3JpdGVyaWEgPSAoXG4gIHJvdGF0aW9uOiBudW1iZXIsXG4gIGNyaXRlcmlhOiBDYW52YXNHcm91cFBvc2l0aW9uQ3JpdGVyaWEsXG4gIHg6IG51bWJlcixcbiAgaWdub3JlUGh5c2ljYWxTY2FsZTogYm9vbGVhblxuKSA9PiB7XG4gIGxldCByZWN0ID0ge307XG4gIGNvbnN0IHNjYWxlID0gVXRpbHMuZ2V0U2NhbGVGYWN0b3IoXG4gICAgY3JpdGVyaWEuY2FudmFzU291cmNlLnNlcnZpY2U/LnNlcnZpY2U/LnBoeXNpY2FsU2NhbGUsXG4gICAgaWdub3JlUGh5c2ljYWxTY2FsZVxuICApO1xuICBpZiAocm90YXRpb24gPT09IDkwIHx8IHJvdGF0aW9uID09PSAyNzApIHtcbiAgICByZWN0ID0ge1xuICAgICAgaGVpZ2h0OiBNYXRoLnRydW5jKGNyaXRlcmlhLmNhbnZhc1NvdXJjZS53aWR0aCAqIHNjYWxlKSxcbiAgICAgIHdpZHRoOiBNYXRoLnRydW5jKGNyaXRlcmlhLmNhbnZhc1NvdXJjZS5oZWlnaHQgKiBzY2FsZSksXG4gICAgICB4OiB4LFxuICAgICAgeTogTWF0aC50cnVuYygoY3JpdGVyaWEuY2FudmFzU291cmNlLndpZHRoICogc2NhbGUpIC8gMikgKiAtMSxcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIHJlY3QgPSB7XG4gICAgICBoZWlnaHQ6IE1hdGgudHJ1bmMoY3JpdGVyaWEuY2FudmFzU291cmNlLmhlaWdodCAqIHNjYWxlKSxcbiAgICAgIHdpZHRoOiBNYXRoLnRydW5jKGNyaXRlcmlhLmNhbnZhc1NvdXJjZS53aWR0aCAqIHNjYWxlKSxcbiAgICAgIHg6IHgsXG4gICAgICB5OiBNYXRoLnRydW5jKChjcml0ZXJpYS5jYW52YXNTb3VyY2UuaGVpZ2h0ICogc2NhbGUpIC8gMikgKiAtMSxcbiAgICB9O1xuICB9XG4gIHJldHVybiBuZXcgUmVjdChyZWN0KTtcbn07XG4iXX0=