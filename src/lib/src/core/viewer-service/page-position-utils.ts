export class PagePositionUtils {

  static updatePagePositions(viewer: any, centerPageIndex: number, margin: number, overlays: any, centerPoints: any): void {
    let centerTiledImage = viewer.world.getItemAt(centerPageIndex);
    if (!centerTiledImage) {
      return;
    }

    //Update position of previous/next tiles
    let centerPageBounds = centerTiledImage.getBounds(true);
    this.positionPreviousPages(viewer, centerPageIndex, centerPageBounds, margin, overlays, centerPoints);
    this.positionNextPages(viewer, centerPageIndex, centerPageBounds, margin, overlays, centerPoints);
  }

  //Recursive function to iterate through previous pages and position them to the left of the current page
  private static positionPreviousPages(viewer: any, currentPageIndex: number, currentPageBounds: any, margin: number, overlays: any, centerPoints: any): void {
    let previousPageIndex = currentPageIndex - 1;
    let previousTiledImage = viewer.world.getItemAt(previousPageIndex);
    if (!previousTiledImage) {
      return;
    }

    let previousPageBounds = previousTiledImage.getBounds(true);
    previousPageBounds.x = currentPageBounds.x - previousPageBounds.width - margin;
    previousPageBounds.y = currentPageBounds.y;
    this.repositionPage(previousPageIndex, previousPageBounds, previousTiledImage, overlays, centerPoints);

    //Call function for previous tile
    this.positionPreviousPages(viewer, previousPageIndex, previousPageBounds, margin, overlays, centerPoints);
  }

  //Recursive function to iterate through next pages and position them to the right of the current page
  private static positionNextPages(viewer: any, currentPageIndex: number, currentPageBounds: any, margin: number, overlays: any, centerPoints: any): void {
    const nextPageIndex = currentPageIndex + 1;
    const nextTiledImage = viewer.world.getItemAt(nextPageIndex);
    if (!nextTiledImage) {
      return;
    }

    let nextPageBounds = nextTiledImage.getBounds(true);
    nextPageBounds.x = currentPageBounds.x + currentPageBounds.width + margin;
    nextPageBounds.y = currentPageBounds.y;
    this.repositionPage(nextPageIndex, nextPageBounds, nextTiledImage, overlays, centerPoints);

    //Call function for next tile
    this.positionNextPages(viewer, nextPageIndex, nextPageBounds, margin, overlays, centerPoints);
  }

  private static repositionPage(index: number, bounds: any, tiledImage: any, overlays: any, centerPoints: any) {

    //Position tiled image
    tiledImage.setPosition(new OpenSeadragon.Point(bounds.x, bounds.y), true);
    tiledImage.update();

    //Update center
    centerPoints.update(index, {
      x: bounds.x + (bounds.width / 2),
      y: bounds.y + (bounds.height / 2)
    });

    //Position overlay
    let overlay = overlays[index];
    let svgNode = d3.select(overlay);
    svgNode.attr('x', bounds.x)
      .attr('y', bounds.y);
  }
}
