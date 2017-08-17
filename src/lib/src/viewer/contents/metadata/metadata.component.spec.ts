import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetadataComponent } from './metadata.component';
import { MimeMaterialModule } from './../../../mime-material.module';

describe('MetadataComponent', () => {
  let component: MetadataComponent;
  let fixture: ComponentFixture<MetadataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MimeMaterialModule
      ],
      declarations: [ MetadataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetadataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
