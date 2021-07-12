import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AltoService } from '../core/alto-service/alto.service';

@Injectable()
export class AltoServiceStub extends AltoService {
  add(index: number, url: string): Observable<void> {
    return of();
  }
}
