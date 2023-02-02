import { Injectable } from '@angular/core';
import { AltoService } from '../core/alto-service/alto.service';

@Injectable()
export class AltoServiceStub extends AltoService {
  override initialize() {}
  override destroy() {}
}
