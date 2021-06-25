export class IiifTileSourceStrategy {
    getTileSource(resource) {
        var _a;
        let tileSource;
        if ((_a = resource === null || resource === void 0 ? void 0 : resource.service) === null || _a === void 0 ? void 0 : _a.service) {
            tileSource = resource.service;
            tileSource.tileOverlap = 0.1; // Workaround for https://github.com/openseadragon/openseadragon/issues/1722
        }
        else {
            tileSource = resource.service['@id'];
            if (!tileSource) {
                tileSource = resource['@id'];
            }
            tileSource =
                tileSource && tileSource.startsWith('//')
                    ? `${location.protocol}${tileSource}`
                    : tileSource;
            tileSource =
                tileSource && !tileSource.endsWith('/info.json')
                    ? `${tileSource}/info.json`
                    : tileSource;
        }
        return tileSource;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWlpZi10aWxlLXNvdXJjZS1zdHJhdGVneS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjL2xpYi9jb3JlL3ZpZXdlci1zZXJ2aWNlL2lpaWYtdGlsZS1zb3VyY2Utc3RyYXRlZ3kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0EsTUFBTSxPQUFPLHNCQUFzQjtJQUMxQixhQUFhLENBQUMsUUFBa0I7O1FBQ3JDLElBQUksVUFBZSxDQUFDO1FBQ3BCLElBQUksTUFBQSxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUUsT0FBTywwQ0FBRSxPQUFPLEVBQUU7WUFDOUIsVUFBVSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUM7WUFDOUIsVUFBVSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUMsQ0FBQyw0RUFBNEU7U0FDM0c7YUFBTTtZQUNMLFVBQVUsR0FBUyxRQUFRLENBQUMsT0FBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzVDLElBQUksQ0FBQyxVQUFVLEVBQUU7Z0JBQ2YsVUFBVSxHQUFTLFFBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNyQztZQUVELFVBQVU7Z0JBQ1IsVUFBVSxJQUFJLFVBQVUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO29CQUN2QyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsUUFBUSxHQUFHLFVBQVUsRUFBRTtvQkFDckMsQ0FBQyxDQUFDLFVBQVUsQ0FBQztZQUNqQixVQUFVO2dCQUNSLFVBQVUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDO29CQUM5QyxDQUFDLENBQUMsR0FBRyxVQUFVLFlBQVk7b0JBQzNCLENBQUMsQ0FBQyxVQUFVLENBQUM7U0FDbEI7UUFDRCxPQUFPLFVBQVUsQ0FBQztJQUNwQixDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZXNvdXJjZSB9IGZyb20gJy4uL21vZGVscy9tYW5pZmVzdCc7XG5pbXBvcnQgeyBUaWxlU291cmNlU3RyYXRlZ3kgfSBmcm9tICcuL3RpbGUtc291cmNlLXN0cmF0ZWd5JztcblxuZXhwb3J0IGNsYXNzIElpaWZUaWxlU291cmNlU3RyYXRlZ3kgaW1wbGVtZW50cyBUaWxlU291cmNlU3RyYXRlZ3kge1xuICBwdWJsaWMgZ2V0VGlsZVNvdXJjZShyZXNvdXJjZTogUmVzb3VyY2UpOiBhbnkge1xuICAgIGxldCB0aWxlU291cmNlOiBhbnk7XG4gICAgaWYgKHJlc291cmNlPy5zZXJ2aWNlPy5zZXJ2aWNlKSB7XG4gICAgICB0aWxlU291cmNlID0gcmVzb3VyY2Uuc2VydmljZTtcbiAgICAgIHRpbGVTb3VyY2UudGlsZU92ZXJsYXAgPSAwLjE7IC8vIFdvcmthcm91bmQgZm9yIGh0dHBzOi8vZ2l0aHViLmNvbS9vcGVuc2VhZHJhZ29uL29wZW5zZWFkcmFnb24vaXNzdWVzLzE3MjJcbiAgICB9IGVsc2Uge1xuICAgICAgdGlsZVNvdXJjZSA9ICg8YW55PnJlc291cmNlLnNlcnZpY2UpWydAaWQnXTtcbiAgICAgIGlmICghdGlsZVNvdXJjZSkge1xuICAgICAgICB0aWxlU291cmNlID0gKDxhbnk+cmVzb3VyY2UpWydAaWQnXTtcbiAgICAgIH1cblxuICAgICAgdGlsZVNvdXJjZSA9XG4gICAgICAgIHRpbGVTb3VyY2UgJiYgdGlsZVNvdXJjZS5zdGFydHNXaXRoKCcvLycpXG4gICAgICAgICAgPyBgJHtsb2NhdGlvbi5wcm90b2NvbH0ke3RpbGVTb3VyY2V9YFxuICAgICAgICAgIDogdGlsZVNvdXJjZTtcbiAgICAgIHRpbGVTb3VyY2UgPVxuICAgICAgICB0aWxlU291cmNlICYmICF0aWxlU291cmNlLmVuZHNXaXRoKCcvaW5mby5qc29uJylcbiAgICAgICAgICA/IGAke3RpbGVTb3VyY2V9L2luZm8uanNvbmBcbiAgICAgICAgICA6IHRpbGVTb3VyY2U7XG4gICAgfVxuICAgIHJldHVybiB0aWxlU291cmNlO1xuICB9XG59XG4iXX0=