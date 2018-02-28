import { CanvasService } from './canvas-service';
import { Rect } from '../models/rect';
import { ViewerLayout } from '../models/viewer-layout';

describe('PageService', () => {
  let service: CanvasService;

  beforeEach(() => {
    service = new CanvasService();

    const pages: Rect[] = [];
    for (let i = 0; i < 100; i++) {
      pages.push(new Rect());
    }
    service.addAll(pages, ViewerLayout.ONE_PAGE);
  });

  it('#isWithinBounds should return true when requested page is within bounds', () => {
    expect(service.isWithinBounds(0)).toBe(true);
    expect(service.isWithinBounds(10)).toBe(true);
    expect(service.isWithinBounds(99)).toBe(true);
  });

  it('#isWithinBounds should return false when requested page is outside bounds', () => {
    expect(service.isWithinBounds(-1)).toBe(false);
    expect(service.isWithinBounds(100)).toBe(false);
    expect(service.isWithinBounds(101)).toBe(false);
    expect(service.isWithinBounds(1000)).toBe(false);
  });

  it('should set currentPage', () => {
    service.currentCanvasGroupIndex = 0;
    expect(service.currentCanvasGroupIndex).toBe(0);
    service.currentCanvasGroupIndex = 99;
    expect(service.currentCanvasGroupIndex).toBe(99);
  });

  it('should not set currentPage if outside bounds', () => {
    service.currentCanvasGroupIndex = 76;

    service.currentCanvasGroupIndex = -2;
    expect(service.currentCanvasGroupIndex).toBe(76);

    service.currentCanvasGroupIndex = 100;
    expect(service.currentCanvasGroupIndex).toBe(76);

    service.currentCanvasGroupIndex = 101;
    expect(service.currentCanvasGroupIndex).toBe(76);

    service.currentCanvasGroupIndex = 176;
    expect(service.currentCanvasGroupIndex).toBe(76);
  });

  it('#getNextPage should get next page', () => {
    let currentPage = (service.currentCanvasGroupIndex = 0);
    expect(service.getNextCanvasGroupIndex()).toBe(currentPage + 1);

    currentPage = service.currentCanvasGroupIndex = 98;
    expect(service.getNextCanvasGroupIndex()).toBe(currentPage + 1);
  });

  it('#getPrevPage should get previous page', () => {
    let currentPage = (service.currentCanvasGroupIndex = 2);
    expect(service.getPrevCanvasGroupIndex()).toBe(currentPage - 1);

    currentPage = service.currentCanvasGroupIndex = 1;
    expect(service.getPrevCanvasGroupIndex()).toBe(currentPage - 1);
  });

  it('#getNextPage should return -1 when going out of bounds', () => {
    service.currentCanvasGroupIndex = 99;
    expect(service.getNextCanvasGroupIndex()).toBe(-1);
  });

  it('#getPrevPage should return -1 when going out of bounds', () => {
    service.currentCanvasGroupIndex = 0;
    expect(service.getPrevCanvasGroupIndex()).toBe(-1);
  });

  it('should return maxPage when next page is larger than maxPage', () => {
    let newPage = service.constrainToRange(101);
    expect(newPage).toBe(99);

    newPage = service.constrainToRange(110);
    expect(newPage).toBe(99);
  });

  it('should not return index lower than 0', () => {
    let newPage = service.constrainToRange(0);
    expect(newPage).toBe(0);

    newPage = service.constrainToRange(-1);
    expect(newPage).toBe(0);

    newPage = service.constrainToRange(-10);
    expect(newPage).toBe(0);
  });

  it('should return 1 if tileIndicesPerPage is empty', () => {
    const page = service.getCanvasGroupLabel(0);
    expect(page).toBe('1');
  });
});
