import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { Pessoa } from '../Pessoa';

const httpOptions= {
  headers: new HttpHeaders ({
    'content-type' : 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class PessoasService {
  url = 'https://localhost:5001/api/pessoas'

  constructor(private http: HttpClient) {}

  //retorna todas as pessoas
  GetAll(): Observable<Pessoa[]>{
      return this.http.get<Pessoa[]>(this.url);
  }

  //retorna uma pessoa
  GetById(pessoaId: number): Observable<Pessoa>{
    const apiUrl = `${this.url}/${pessoaId}`;
    return this.http.get<Pessoa>(apiUrl);
  }

  //salva uma pessoa
  Save(pessoa: Pessoa) : Observable<any>{
    return this.http.post<Pessoa>(this.url, pessoa, httpOptions);
  }

  //atualiza uma pessoa
  Update(pessoa: Pessoa) : Observable<any>{
    return this.http.put<Pessoa>(this.url,pessoa,httpOptions);
  }
  //deleta uma pessoa
  Delete(pessoaId: number) : Observable<any>{
    const apiUrl = `${this.url}/${pessoaId}`;
      return this.http.delete<number>(apiUrl, httpOptions);
  }

  getTipoPessoa() : any[] {
    return [{
      fisica : 1,
      juridica : 0
    }]
  }

  getClassificacao() : any[] {
    return [{
      ativo : 1,
      inativo : 2,
      preferencial : 3
    }]
  }

}
