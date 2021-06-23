import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { testAlto } from './../../test/testAltos';
import { AltoService } from './alto.service';

describe('AltoService', () => {
  let service: AltoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AltoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add alto xml to service', () => {
    service.add(0, 'dummyUrl');
    httpMock.expectOne(`dummyUrl`).flush(testAlto);

    const alto = service.getHtml(0);

    expect(alto).toBeTruthy();
    expect(alto?.layout.page.printSpace.textBlocks.length).toBe(1);
    expect(alto?.layout.page.printSpace.textBlocks[0].textLines.length).toBe(8);
    expect(alto?.layout.page.printSpace.textBlocks[0].textLines[0].strings.length).toBe(12);
    expect(alto?.layout.page.printSpace.textBlocks[0].textLines[0].strings[0].content).toBe('jeg');
  });
});
