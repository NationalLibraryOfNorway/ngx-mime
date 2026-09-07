import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ManifestService } from '../manifest-service/manifest.service';
import { SidenavComponent } from './sidenav.component';

describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;
  let router: Router;

  beforeEach(() => {
    const queryParamMap = new BehaviorSubject(
      convertToParamMap({
        manifestUri: 'assets/fixtures/presentation/3/simple-ltr-manifest.json',
        v: '3',
      }),
    );
    TestBed.configureTestingModule({
      imports: [SidenavComponent],
      providers: [
        ManifestService,
        { provide: ActivatedRoute, useValue: { queryParamMap } },
        {
          provide: Router,
          useValue: { navigate: jest.fn().mockResolvedValue(true) },
        },
      ],
    });

    fixture = TestBed.createComponent(SidenavComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('should load the equivalent manifest when the IIIF version changes', () => {
    component.selectIiifVersion('2');

    expect(router.navigate).toHaveBeenCalledWith(['demo'], {
      queryParams: {
        manifestUri: [
          'assets/fixtures/presentation/2/simple-ltr-manifest.json',
        ],
        v: '2',
      },
    });
  });
});
