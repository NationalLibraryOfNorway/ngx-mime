import { PageService } from "./page-service";

describe("PageService", () => {
  let service: PageService;

  beforeEach(() => {
    service = new PageService();
  });

  it("should save currentPage", () => {
    service.currentPage = 0;
    expect(service.currentPage).toBe(0);
    service.currentPage = 500;
    expect(service.currentPage).toBe(500);
  });

  it("should save numberOfPages", () => {
    service.numberOfPages = 0;
    expect(service.numberOfPages).toBe(0);
    service.numberOfPages = 500;
    expect(service.numberOfPages).toBe(500);
  });

  it("#getNextPage should get next page", () => {
    service.numberOfPages = 10;
    let currentPage = service.currentPage = 0;
    expect(service.getNextPage()).toBe(currentPage + 1);
  });

  it("#getPrevPage should get previous page", () => {
    service.numberOfPages = 10;
    let currentPage = service.currentPage = 2;
    expect(service.getPrevPage()).toBe(currentPage - 1);
  });

  it("#getNextPage should return -1 when going out of bounds", () => {
    service.numberOfPages = 10;
    service.currentPage = 10;
    expect(service.getNextPage()).toBe(-1);
  });

  it("#getPrevPage should return -1 when oing out of bounds", () => {
    service.numberOfPages = 10;
    service.currentPage = 0;
    expect(service.getPrevPage()).toBe(-1);
  });

});
