import * as d3 from 'd3';
import * as OpenSeadragon from 'openseadragon';
import { Subscription } from 'rxjs';
import { Rect } from '../models/rect';
import { ViewerOptions } from '../models/viewer-options';
export class CanvasGroupMask {
    constructor(viewer, styleService) {
        this.styleService = styleService;
        this.canvasGroupRect = new Rect();
        this.disableResize = false;
        this.animationHandler = () => {
            this.resize();
        };
        this.resizeHandler = () => {
            this.setCenter();
            this.resize();
        };
        this.canvasGroupPinchHandler = () => {
            this.disableResize = false;
        };
        this.canvasGroupDragHandler = (e) => {
            if ((e.delta.x || e.delta.y) && e.speed > 0 && e.direction !== 0) {
                this.disableResize = true;
            }
        };
        this.canvasGroupDragEndHandler = () => {
            this.disableResize = false;
            this.resize();
        };
        this.viewer = viewer;
    }
    initialize(pageBounds, visible) {
        this.unsubscribe();
        this.subscriptions = new Subscription();
        this.subscriptions.add(this.styleService.onChange.subscribe((color) => {
            if (color) {
                this.backgroundColor = color;
                if (this.leftMask) {
                    this.leftMask.style('fill', this.backgroundColor);
                }
                if (this.rightMask) {
                    this.rightMask.style('fill', this.backgroundColor);
                }
            }
        }));
        this.canvasGroupRect = pageBounds;
        this.addCanvasGroupMask();
        this.setCenter();
        this.resize();
        if (visible) {
            this.show();
        }
        else {
            this.hide();
        }
    }
    destroy() {
        this.unsubscribe();
    }
    changeCanvasGroup(pageBounds) {
        this.canvasGroupRect = pageBounds;
        this.resize();
    }
    show() {
        this.addHandlers();
        if (!this.leftMask || !this.rightMask) {
            return;
        }
        this.setCenter();
        this.resize();
        this.leftMask.attr('height', '100%');
        this.rightMask.attr('height', '100%');
    }
    hide() {
        this.removeHandlers();
        if (!this.leftMask || !this.rightMask) {
            return;
        }
        this.leftMask.attr('height', '0');
        this.rightMask.attr('height', '0');
    }
    addHandlers() {
        this.viewer.addHandler('animation', this.animationHandler);
        this.viewer.addHandler('resize', this.resizeHandler);
        this.viewer.addHandler('canvas-pinch', this.canvasGroupPinchHandler);
        this.viewer.addHandler('canvas-drag', this.canvasGroupDragHandler);
        this.viewer.addHandler('canvas-drag-end', this.canvasGroupDragEndHandler);
    }
    removeHandlers() {
        this.viewer.removeHandler('animation', this.animationHandler);
        this.viewer.removeHandler('resize', this.resizeHandler);
        this.viewer.removeHandler('canvas-pinch', this.canvasGroupPinchHandler);
        this.viewer.removeHandler('canvas-drag', this.canvasGroupDragHandler);
        this.viewer.removeHandler('canvas-drag-end', this.canvasGroupDragEndHandler);
    }
    addCanvasGroupMask() {
        const overlays = d3.select(this.viewer.svgOverlay().node().parentNode);
        const mask = overlays.append('g').attr('data-testid', 'page-mask');
        this.leftMask = mask
            .append('rect')
            .attr('data-testid', 'mime-left-page-mask')
            .attr('height', '100%')
            .attr('y', 0)
            .style('fill', this.backgroundColor);
        this.rightMask = mask
            .append('rect')
            .attr('data-testid', 'mime-right-page-mask')
            .attr('height', '100%')
            .attr('y', 0)
            .style('fill', this.backgroundColor);
    }
    setCenter() {
        this.center = new OpenSeadragon.Point(this.viewer.viewport._containerInnerSize.x / 2, this.viewer.viewport._containerInnerSize.y / 2);
    }
    resize() {
        if (this.disableResize || !this.leftMask || !this.rightMask) {
            return;
        }
        const leftMaskRect = this.getLeftMaskRect();
        const rightMaskRect = this.getRightMaskRect();
        this.leftMask.attr('width', leftMaskRect.width).attr('x', leftMaskRect.x);
        this.rightMask
            .attr('width', rightMaskRect.width)
            .attr('x', Math.round(rightMaskRect.x));
    }
    getLeftMaskRect() {
        const imgBounds = new OpenSeadragon.Rect(this.canvasGroupRect.x, this.canvasGroupRect.y, this.canvasGroupRect.width, this.canvasGroupRect.height);
        const topLeft = this.viewer.viewport.viewportToViewerElementCoordinates(imgBounds.getTopLeft());
        let width = topLeft.x - ViewerOptions.overlays.canvasGroupMarginInPageView;
        if (width < 0) {
            width = 0;
        }
        return new Rect({
            x: 0,
            width: width,
        });
    }
    getRightMaskRect() {
        const imgBounds = new OpenSeadragon.Rect(this.canvasGroupRect.x, this.canvasGroupRect.y, this.canvasGroupRect.width, this.canvasGroupRect.height);
        const topRight = this.viewer.viewport.viewportToViewerElementCoordinates(imgBounds.getTopRight());
        let width = this.viewer.viewport._containerInnerSize.x - topRight.x;
        const x = this.viewer.viewport._containerInnerSize.x -
            width +
            ViewerOptions.overlays.canvasGroupMarginInPageView;
        if (width < 0) {
            width = 0;
        }
        return new Rect({
            x: x,
            width: width,
        });
    }
    unsubscribe() {
        if (this.subscriptions) {
            this.subscriptions.unsubscribe();
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FudmFzLWdyb3VwLW1hc2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvY29yZS92aWV3ZXItc2VydmljZS9jYW52YXMtZ3JvdXAtbWFzay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssRUFBRSxNQUFNLElBQUksQ0FBQztBQUN6QixPQUFPLEtBQUssYUFBYSxNQUFNLGVBQWUsQ0FBQztBQUMvQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXBDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFHekQsTUFBTSxPQUFPLGVBQWU7SUFhMUIsWUFBWSxNQUFXLEVBQVUsWUFBMEI7UUFBMUIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFYM0Qsb0JBQWUsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBSzdCLGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBMEZkLHFCQUFnQixHQUFHLEdBQUcsRUFBRTtZQUM5QixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDaEIsQ0FBQyxDQUFDO1FBRU0sa0JBQWEsR0FBRyxHQUFHLEVBQUU7WUFDM0IsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ2pCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNoQixDQUFDLENBQUM7UUFFTSw0QkFBdUIsR0FBRyxHQUFHLEVBQUU7WUFDckMsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFDN0IsQ0FBQyxDQUFDO1FBRU0sMkJBQXNCLEdBQUcsQ0FBQyxDQUFNLEVBQUUsRUFBRTtZQUMxQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFD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LGVBQWUsQ0FBQyxDQUFDLEVBQ3RCLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxFQUN0QixJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssRUFDMUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQzVCLENBQUM7UUFDRixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxrQ0FBa0MsQ0FDdEUsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUN4QixDQUFDO1FBQ0YsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDcEUsTUFBTSxDQUFDLEdBQ0wsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUMxQyxLQUFLO1lBQ0wsYUFBYSxDQUFDLFFBQVEsQ0FBQywyQkFBMkIsQ0FBQztRQUVyRCxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUNkLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDWixDQUFDO1FBRUQsT0FBTyxJQUFJLElBQUksQ0FBQztZQUNkLENBQUMsRUFBRSxDQUFDO1lBQ0osS0FBSyxFQUFFLEtBQUs7U0FDYixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU8sV0FBVztRQUNqQixJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUN2QixJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25DLENBQUM7SUFDSCxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBkMyBmcm9tICdkMyc7XG5pbXBvcnQgKiBhcyBPcGVuU2VhZHJhZ29uIGZyb20gJ29wZW5zZWFkcmFnb24nO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBQb2ludCB9IGZyb20gJy4uL21vZGVscy9wb2ludCc7XG5pbXBvcnQgeyBSZWN0IH0gZnJvbSAnLi4vbW9kZWxzL3JlY3QnO1xuaW1wb3J0IHsgVmlld2VyT3B0aW9ucyB9IGZyb20gJy4uL21vZGVscy92aWV3ZXItb3B0aW9ucyc7XG5pbXBvcnQgeyBTdHlsZVNlcnZpY2UgfSBmcm9tICcuLi9zdHlsZS1zZXJ2aWNlL3N0eWxlLnNlcnZpY2UnO1xuXG5leHBvcnQgY2xhc3MgQ2FudmFzR3JvdXBNYXNrIHtcbiAgdmlld2VyOiBhbnk7XG4gIGNhbnZhc0dyb3VwUmVjdCA9IG5ldyBSZWN0KCk7XG5cbiAgbGVmdE1hc2s6IGFueTtcbiAgcmlnaHRNYXNrOiBhbnk7XG5cbiAgZGlzYWJsZVJlc2l6ZSA9IGZhbHNlO1xuICBjZW50ZXIhOiBQb2ludDtcblxuICBiYWNrZ3JvdW5kQ29sb3IhOiBzdHJpbmc7XG4gIHByaXZhdGUgc3Vic2NyaXB0aW9ucyE6IFN1YnNjcmlwdGlvbjtcblxuICBjb25zdHJ1Y3Rvcih2aWV3ZXI6IGFueSwgcHJpdmF0ZSBzdHlsZVNlcnZpY2U6IFN0eWxlU2VydmljZSkge1xuICAgIHRoaXMudmlld2VyID0gdmlld2VyO1xuICB9XG5cbiAgcHVibGljIGluaXRpYWxpemUocGFnZUJvdW5kczogUmVjdCwgdmlzaWJsZTogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5zdHlsZVNlcnZpY2Uub25DaGFuZ2Uuc3Vic2NyaWJlKChjb2xvcjogc3RyaW5nIHwgdW5kZWZpbmVkKSA9PiB7XG4gICAgICAgIGlmIChjb2xvcikge1xuICAgICAgICAgIHRoaXMuYmFja2dyb3VuZENvbG9yID0gY29sb3I7XG4gICAgICAgICAgaWYgKHRoaXMubGVmdE1hc2spIHtcbiAgICAgICAgICAgIHRoaXMubGVmdE1hc2suc3R5bGUoJ2ZpbGwnLCB0aGlzLmJhY2tncm91bmRDb2xvcik7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh0aGlzLnJpZ2h0TWFzaykge1xuICAgICAgICAgICAgdGhpcy5yaWdodE1hc2suc3R5bGUoJ2ZpbGwnLCB0aGlzLmJhY2tncm91bmRDb2xvcik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG5cbiAgICB0aGlzLmNhbnZhc0dyb3VwUmVjdCA9IHBhZ2VCb3VuZHM7XG5cbiAgICB0aGlzLmFkZENhbnZhc0dyb3VwTWFzaygpO1xuXG4gICAgdGhpcy5zZXRDZW50ZXIoKTtcbiAgICB0aGlzLnJlc2l6ZSgpO1xuXG4gICAgaWYgKHZpc2libGUpIHtcbiAgICAgIHRoaXMuc2hvdygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmhpZGUoKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZGVzdHJveSgpIHtcbiAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBwdWJsaWMgY2hhbmdlQ2FudmFzR3JvdXAocGFnZUJvdW5kczogUmVjdCkge1xuICAgIHRoaXMuY2FudmFzR3JvdXBSZWN0ID0gcGFnZUJvdW5kcztcbiAgICB0aGlzLnJlc2l6ZSgpO1xuICB9XG5cbiAgcHVibGljIHNob3coKTogdm9pZCB7XG4gICAgdGhpcy5hZGRIYW5kbGVycygpO1xuICAgIGlmICghdGhpcy5sZWZ0TWFzayB8fCAhdGhpcy5yaWdodE1hc2spIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5zZXRDZW50ZXIoKTtcbiAgICB0aGlzLnJlc2l6ZSgpO1xuICAgIHRoaXMubGVmdE1hc2suYXR0cignaGVpZ2h0JywgJzEwMCUnKTtcbiAgICB0aGlzLnJpZ2h0TWFzay5hdHRyKCdoZWlnaHQnLCAnMTAwJScpO1xuICB9XG5cbiAgcHVibGljIGhpZGUoKTogdm9pZCB7XG4gICAgdGhpcy5yZW1vdmVIYW5kbGVycygpO1xuICAgIGlmICghdGhpcy5sZWZ0TWFzayB8fCAhdGhpcy5yaWdodE1hc2spIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5sZWZ0TWFzay5hdHRyKCdoZWlnaHQnLCAnMCcpO1xuICAgIHRoaXMucmlnaHRNYXNrLmF0dHIoJ2hlaWdodCcsICcwJyk7XG4gIH1cblxuICBwcml2YXRlIGFkZEhhbmRsZXJzKCkge1xuICAgIHRoaXMudmlld2VyLmFkZEhhbmRsZXIoJ2FuaW1hdGlvbicsIHRoaXMuYW5pbWF0aW9uSGFuZGxlcik7XG4gICAgdGhpcy52aWV3ZXIuYWRkSGFuZGxlcigncmVzaXplJywgdGhpcy5yZXNpemVIYW5kbGVyKTtcbiAgICB0aGlzLnZpZXdlci5hZGRIYW5kbGVyKCdjYW52YXMtcGluY2gnLCB0aGlzLmNhbnZhc0dyb3VwUGluY2hIYW5kbGVyKTtcbiAgICB0aGlzLnZpZXdlci5hZGRIYW5kbGVyKCdjYW52YXMtZHJhZycsIHRoaXMuY2FudmFzR3JvdXBEcmFnSGFuZGxlcik7XG4gICAgdGhpcy52aWV3ZXIuYWRkSGFuZGxlcignY2FudmFzLWRyYWctZW5kJywgdGhpcy5jYW52YXNHcm91cERyYWdFbmRIYW5kbGVyKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVtb3ZlSGFuZGxlcnMoKSB7XG4gICAgdGhpcy52aWV3ZXIucmVtb3ZlSGFuZGxlcignYW5pbWF0aW9uJywgdGhpcy5hbmltYXRpb25IYW5kbGVyKTtcbiAgICB0aGlzLnZpZXdlci5yZW1vdmVIYW5kbGVyKCdyZXNpemUnLCB0aGlzLnJlc2l6ZUhhbmRsZXIpO1xuICAgIHRoaXMudmlld2VyLnJlbW92ZUhhbmRsZXIoJ2NhbnZhcy1waW5jaCcsIHRoaXMuY2FudmFzR3JvdXBQaW5jaEhhbmRsZXIpO1xuICAgIHRoaXMudmlld2VyLnJlbW92ZUhhbmRsZXIoJ2NhbnZhcy1kcmFnJywgdGhpcy5jYW52YXNHcm91cERyYWdIYW5kbGVyKTtcbiAgICB0aGlzLnZpZXdlci5yZW1vdmVIYW5kbGVyKFxuICAgICAgJ2NhbnZhcy1kcmFnLWVuZCcsXG4gICAgICB0aGlzLmNhbnZhc0dyb3VwRHJhZ0VuZEhhbmRsZXJcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBhbmltYXRpb25IYW5kbGVyID0gKCkgPT4ge1xuICAgIHRoaXMucmVzaXplKCk7XG4gIH07XG5cbiAgcHJpdmF0ZSByZXNpemVIYW5kbGVyID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0Q2VudGVyKCk7XG4gICAgdGhpcy5yZXNpemUoKTtcbiAgfTtcblxuICBwcml2YXRlIGNhbnZhc0dyb3VwUGluY2hIYW5kbGVyID0gKCkgPT4ge1xuICAgIHRoaXMuZGlzYWJsZVJlc2l6ZSA9IGZhbHNlO1xuICB9O1xuXG4gIHByaXZhdGUgY2FudmFzR3JvdXBEcmFnSGFuZGxlciA9IChlOiBhbnkpID0+IHtcbiAgICBpZiAoKGUuZGVsdGEueCB8fCBlLmRlbHRhLnkpICYmIGUuc3BlZWQgPiAwICYmIGUuZGlyZWN0aW9uICE9PSAwKSB7XG4gICAgICB0aGlzLmRpc2FibGVSZXNpemUgPSB0cnVlO1xuICAgIH1cbiAgfTtcblxuICBwcml2YXRlIGNhbnZhc0dyb3VwRHJhZ0VuZEhhbmRsZXIgPSAoKSA9PiB7XG4gICAgdGhpcy5kaXNhYmxlUmVzaXplID0gZmFsc2U7XG4gICAgdGhpcy5yZXNpemUoKTtcbiAgfTtcblxuICBwcml2YXRlIGFkZENhbnZhc0dyb3VwTWFzaygpIHtcbiAgICBjb25zdCBvdmVybGF5cyA9IGQzLnNlbGVjdCh0aGlzLnZpZXdlci5zdmdPdmVybGF5KCkubm9kZSgpLnBhcmVudE5vZGUpO1xuXG4gICAgY29uc3QgbWFzayA9IG92ZXJsYXlzLmFwcGVuZCgnZycpLmF0dHIoJ2RhdGEtdGVzdGlkJywgJ3BhZ2UtbWFzaycpO1xuXG4gICAgdGhpcy5sZWZ0TWFzayA9IG1hc2tcbiAgICAgIC5hcHBlbmQoJ3JlY3QnKVxuICAgICAgLmF0dHIoJ2RhdGEtdGVzdGlkJywgJ21pbWUtbGVmdC1wYWdlLW1hc2snKVxuICAgICAgLmF0dHIoJ2hlaWdodCcsICcxMDAlJylcbiAgICAgIC5hdHRyKCd5JywgMClcbiAgICAgIC5zdHlsZSgnZmlsbCcsIHRoaXMuYmFja2dyb3VuZENvbG9yKTtcblxuICAgIHRoaXMucmlnaHRNYXNrID0gbWFza1xuICAgICAgLmFwcGVuZCgncmVjdCcpXG4gICAgICAuYXR0cignZGF0YS10ZXN0aWQnLCAnbWltZS1yaWdodC1wYWdlLW1hc2snKVxuICAgICAgLmF0dHIoJ2hlaWdodCcsICcxMDAlJylcbiAgICAgIC5hdHRyKCd5JywgMClcbiAgICAgIC5zdHlsZSgnZmlsbCcsIHRoaXMuYmFja2dyb3VuZENvbG9yKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0Q2VudGVyKCk6IHZvaWQge1xuICAgIHRoaXMuY2VudGVyID0gbmV3IE9wZW5TZWFkcmFnb24uUG9pbnQoXG4gICAgICB0aGlzLnZpZXdlci52aWV3cG9ydC5fY29udGFpbmVySW5uZXJTaXplLnggLyAyLFxuICAgICAgdGhpcy52aWV3ZXIudmlld3BvcnQuX2NvbnRhaW5lcklubmVyU2l6ZS55IC8gMlxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIHJlc2l6ZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlUmVzaXplIHx8ICF0aGlzLmxlZnRNYXNrIHx8ICF0aGlzLnJpZ2h0TWFzaykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGxlZnRNYXNrUmVjdCA9IHRoaXMuZ2V0TGVmdE1hc2tSZWN0KCk7XG4gICAgY29uc3QgcmlnaHRNYXNrUmVjdCA9IHRoaXMuZ2V0UmlnaHRNYXNrUmVjdCgpO1xuICAgIHRoaXMubGVmdE1hc2suYXR0cignd2lkdGgnLCBsZWZ0TWFza1JlY3Qud2lkdGgpLmF0dHIoJ3gnLCBsZWZ0TWFza1JlY3QueCk7XG4gICAgdGhpcy5yaWdodE1hc2tcbiAgICAgIC5hdHRyKCd3aWR0aCcsIHJpZ2h0TWFza1JlY3Qud2lkdGgpXG4gICAgICAuYXR0cigneCcsIE1hdGgucm91bmQocmlnaHRNYXNrUmVjdC54KSk7XG4gIH1cblxuICBwcml2YXRlIGdldExlZnRNYXNrUmVjdCgpOiBSZWN0IHtcbiAgICBjb25zdCBpbWdCb3VuZHMgPSBuZXcgT3BlblNlYWRyYWdvbi5SZWN0KFxuICAgICAgdGhpcy5jYW52YXNHcm91cFJlY3QueCxcbiAgICAgIHRoaXMuY2FudmFzR3JvdXBSZWN0LnksXG4gICAgICB0aGlzLmNhbnZhc0dyb3VwUmVjdC53aWR0aCxcbiAgICAgIHRoaXMuY2FudmFzR3JvdXBSZWN0LmhlaWdodFxuICAgICk7XG4gICAgY29uc3QgdG9wTGVmdCA9IHRoaXMudmlld2VyLnZpZXdwb3J0LnZpZXdwb3J0VG9WaWV3ZXJFbGVtZW50Q29vcmRpbmF0ZXMoXG4gICAgICBpbWdCb3VuZHMuZ2V0VG9wTGVmdCgpXG4gICAgKTtcbiAgICBsZXQgd2lkdGggPSB0b3BMZWZ0LnggLSBWaWV3ZXJPcHRpb25zLm92ZXJsYXlzLmNhbnZhc0dyb3VwTWFyZ2luSW5QYWdlVmlldztcblxuICAgIGlmICh3aWR0aCA8IDApIHtcbiAgICAgIHdpZHRoID0gMDtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFJlY3Qoe1xuICAgICAgeDogMCxcbiAgICAgIHdpZHRoOiB3aWR0aCxcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0UmlnaHRNYXNrUmVjdCgpOiBSZWN0IHtcbiAgICBjb25zdCBpbWdCb3VuZHMgPSBuZXcgT3BlblNlYWRyYWdvbi5SZWN0KFxuICAgICAgdGhpcy5jYW52YXNHcm91cFJlY3QueCxcbiAgICAgIHRoaXMuY2FudmFzR3JvdXBSZWN0LnksXG4gICAgICB0aGlzLmNhbnZhc0dyb3VwUmVjdC53aWR0aCxcbiAgICAgIHRoaXMuY2FudmFzR3JvdXBSZWN0LmhlaWdodFxuICAgICk7XG4gICAgY29uc3QgdG9wUmlnaHQgPSB0aGlzLnZpZXdlci52aWV3cG9ydC52aWV3cG9ydFRvVmlld2VyRWxlbWVudENvb3JkaW5hdGVzKFxuICAgICAgaW1nQm91bmRzLmdldFRvcFJpZ2h0KClcbiAgICApO1xuICAgIGxldCB3aWR0aCA9IHRoaXMudmlld2VyLnZpZXdwb3J0Ll9jb250YWluZXJJbm5lclNpemUueCAtIHRvcFJpZ2h0Lng7XG4gICAgY29uc3QgeCA9XG4gICAgICB0aGlzLnZpZXdlci52aWV3cG9ydC5fY29udGFpbmVySW5uZXJTaXplLnggLVxuICAgICAgd2lkdGggK1xuICAgICAgVmlld2VyT3B0aW9ucy5vdmVybGF5cy5jYW52YXNHcm91cE1hcmdpbkluUGFnZVZpZXc7XG5cbiAgICBpZiAod2lkdGggPCAwKSB7XG4gICAgICB3aWR0aCA9IDA7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBSZWN0KHtcbiAgICAgIHg6IHgsXG4gICAgICB3aWR0aDogd2lkdGgsXG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHVuc3Vic2NyaWJlKCkge1xuICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbnMpIHtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxufVxuIl19