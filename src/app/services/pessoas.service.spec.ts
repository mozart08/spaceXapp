import { TestBed } from '@angular/core/testing';
import { PessoasService } from '../services/pessoas.service';


describe('PessoasService', () => {
  let service: PessoasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PessoasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
