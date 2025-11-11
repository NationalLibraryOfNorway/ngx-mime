import { Injectable } from '@angular/core';
import { AltoService } from '../core/alto-service/alto.service';

@Injectable({ providedIn: 'root' })
export class AltoServiceStub extends AltoService {
  override initialize() {}
  override destroy() {}
}
