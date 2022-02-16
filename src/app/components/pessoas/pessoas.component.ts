import { Component, OnInit, TemplateRef, Type } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Pessoa } from 'src/app/Pessoa';
import { PessoasService } from 'src/app/services/pessoas.service';
import { TipoPessoaEnum } from './enums/TipoPessoaEnum';


@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.component.html',
  styleUrls: ['./pessoas.component.css']
})
export class PessoasComponent implements OnInit {

  form : any;
  formTitle!: string;
  pessoas!: Pessoa[];
  pessoaId!: number;
  tipo_pessoaEnum!: string[];
  classificacaoEnum!: string[];
  tipoPessoaSelected!: boolean;


    showTable : boolean = true;
    showForm : boolean = false

  modalRef! : BsModalRef;

  constructor( private pessoasService : PessoasService, private modalService : BsModalService,) {
    this.tipo_pessoaEnum = this.pessoasService.getTipoPessoa();
    this.classificacaoEnum = this.pessoasService.getClassificacao();
  }


  ngOnInit(): void {

    this.pessoasService.GetAll().subscribe(resultado =>{
      this.pessoas = resultado;
    });


    this.formTitle = 'Adicionar Cliente';
    this.form = new FormGroup({
      nome: new FormControl(null),
      tipo_pessoa: new FormControl(null),
      cnpj: new FormControl(null),
      razaoSocial: new FormControl(null),
      cep: new FormControl(null),
      email: new FormControl(null),
      classificacao: new FormControl(null),
      telefone: new FormControl(null),
    });

  }

   ShowFormAdd() : void {
    this.formTitle = 'Adicionar Cliente';
    this.showTable = false;
    this.showForm = true;

    this.form = new FormGroup({
      nome: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      tipo_pessoa : new FormControl(null,[ Validators.required ]),
      cnpj: new FormControl(null,[ Validators.required, Validators.pattern("([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})") ]),
      razaoSocial: new FormControl(null,[Validators.maxLength(100)]),
      cep: new FormControl(null,[ Validators.required, Validators.pattern("^[0-9]{8}") ]),
      email: new FormControl(null,[ Validators.required, Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$") ]),
      classificacao: new FormControl(null,[ Validators.required ]),
      telefone: new FormControl(null,[ Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{11}$") ]),

    });

   }

   ShowFormUpdate(pessoaId: number): void{
    this.showTable = false;
    this.showForm = true;

    this.pessoasService.GetById(pessoaId).subscribe(result => {
      this.formTitle = `Editar Cliente ${result.pessoaId}`;
      this.form = new FormGroup({
        pessoaId: new FormControl(result.pessoaId),
        nome: new FormControl(result.nome, Validators.required),
        tipo_pessoa : new FormControl(result.tipo_pessoa? 1 : 0,[ Validators.required ]),
        cnpj: new FormControl(result.cnpj,[ Validators.required, Validators.pattern("([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})") ]),
        razaoSocial: new FormControl(result.razaoSocial,[Validators.maxLength(100)]),
        cep: new FormControl(result.cep,[ Validators.required, Validators.pattern("^[0-9]{8}") ]),
        email: new FormControl(result.email,[ Validators.required,Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$") ]),
        classificacao: new FormControl(result.classificacao,[ Validators.required]),
        telefone: new FormControl(result.telefone,[ Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{11}$") ]),
      });


    });
   }

  ///para submissao do form
  Submit(): void {
    if (this.form.invalid) {
      return;
    }

    const pessoa : Pessoa = this.form.value;

    pessoa.tipo_pessoa = pessoa.tipo_pessoa ? true : false;

    if(pessoa.pessoaId>0){
      this.pessoasService.Update(pessoa).subscribe(result =>{
        this.showForm=false;
        this.showTable=true;
        alert('Registro Atualizado!');
        this.pessoasService.GetAll().subscribe(r =>{
          this.pessoas = r;
        });
      });
    }
    else{
        this.pessoasService.Save(pessoa).subscribe((result) => {
          this.showForm=false;
          this.showTable=true;
          alert('Registro Adicionado!');
          this.pessoasService.GetAll().subscribe(r =>{
            this.pessoas = r;
          });
        });
      }

  }

  Back(): void{
    this.showTable=true;
    this.showForm=false;
  }

  ConfirmRemove(pessoaId : number, modal : TemplateRef<any>): void{
      this.modalRef = this.modalService.show(modal);
      this.pessoaId = pessoaId;
  }

  Remove(pessoaId: number){
    this.pessoasService.Delete(pessoaId).subscribe(result =>{
      this.modalRef.hide();
      this.pessoasService.GetAll().subscribe(result =>{
        this.pessoas = result;
      });
    });
  }


}
