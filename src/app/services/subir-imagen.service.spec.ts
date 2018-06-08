import { TestBed, inject } from '@angular/core/testing';

import { SubirImagenService } from './subir-imagen.service';

describe('SubirImagenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubirImagenService]
    });
  });

  it('should be created', inject([SubirImagenService], (service: SubirImagenService) => {
    expect(service).toBeTruthy();
  }));
});
