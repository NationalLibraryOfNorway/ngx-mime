import { PageService } from './page-service';

describe('PageService', () => {
  let service: PageService;

  beforeEach(() => {
    service = new PageService();
    service.numberOfPages = 100;
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
    service.currentPage = 0;
    expect(service.currentPage).toBe(0);
    service.currentPage = 99;
    expect(service.currentPage).toBe(99);
  });

  it('should not set currentPage if outside bounds', () => {
    service.currentPage = 76;

    service.currentPage = -2;
    expect(service.currentPage).toBe(76);

    service.currentPage = 100;
    expect(service.currentPage).toBe(76);

    service.currentPage = 101;
    expect(service.currentPage).toBe(76);

    service.currentPage = 176;
    expect(service.currentPage).toBe(76);
  });

  it('#getNextPage should get next page', () => {
    let currentPage = service.currentPage = 0;
    expect(service.getNextPage()).toBe(currentPage + 1);

    currentPage = service.currentPage = 98;
    expect(service.getNextPage()).toBe(currentPage + 1);
  });

  it('#getPrevPage should get previous page', () => {
    let currentPage = service.currentPage = 2;
    expect(service.getPrevPage()).toBe(currentPage - 1);

    currentPage = service.currentPage = 1;
    expect(service.getPrevPage()).toBe(currentPage - 1);
  });

  it('#getNextPage should return -1 when going out of bounds', () => {
    service.currentPage = 99;
    expect(service.getNextPage()).toBe(-1);
  });

  it('#getPrevPage should return -1 when going out of bounds', () => {
    service.currentPage = 0;
    expect(service.getPrevPage()).toBe(-1);
  });

  it('should return maxPage when next page is larger than maxPage', () => {

    let newPage = service.constrainToRange(101);
    expect(newPage).toBe(100);

    newPage = service.constrainToRange(110);
    expect(newPage).toBe(100);

  });

  it('should not return index lower than 0', () => {
    let newPage = service.constrainToRange(0);
    expect(newPage).toBe(0);

    newPage = service.constrainToRange(-1);
    expect(newPage).toBe(0);

    newPage = service.constrainToRange(-10);
    expect(newPage).toBe(0);
  });

});
