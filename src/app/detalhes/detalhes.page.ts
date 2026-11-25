import { SlicePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ResumirPipe } from '../pipes/resumir.pipe';
import { LivrosService, Livro } from '../services/livros.service';
import { FavoritosService } from '../services/favoritos.service';
import { CapaAlternativaDirective } from '../diretivas/capa-alternativa.directive';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton,
  IonChip, IonButton,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  imports: [
    SlicePipe, ResumirPipe, CapaAlternativaDirective,
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton,
    IonChip, IonButton,
  ],
})
export class DetalhesPage implements OnInit, OnDestroy {
  // lê os parâmetros da rota (o :id do endereço)
  private route = inject(ActivatedRoute);
  // usar o serviço de consumo da API por ID
  private livrosApi = inject(LivrosService);
  private salvos = inject(FavoritosService);
  // detectar mudanças nas variáveis
  private cdr = inject(ChangeDetectorRef);

  id = '';
  // guarda o livro
  livro: Livro | null = null;
  favorito = false;
  carregando = true;
  erro = false;
  erroFavoritos = '';
  expandido = false;
  private consulta?: Subscription;

  ngOnInit(): void {
    this.route.params.subscribe((param: any) => {
      console.log(param.id);
      this.id = param.id ?? '';
      this.expandido = false;
      this.atualizarFavorito();
      this.carregar();
    });
  }

  ionViewWillEnter() {
    // ao voltar para a página, confere se o favorito mudou
    this.atualizarFavorito();
  }

  carregar() {
    this.consulta?.unsubscribe();
    this.carregando = true;
    this.erro = false;
    this.livro = null;
    this.consulta = this.livrosApi.detalhes(this.id).subscribe({
      next: (livro: any) => {
        console.log(livro);
        this.livro = livro;
        this.carregando = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.erro = true;
        this.carregando = false;
        this.cdr.detectChanges();
      },
    });
  }

  ngOnDestroy() { this.consulta?.unsubscribe(); }

  private atualizarFavorito() {
    try {
      this.favorito = this.salvos.contem('/works/' + this.id);
      this.erroFavoritos = '';
    } catch { this.erroFavoritos = 'Não foi possível ler os favoritos deste navegador.'; }
  }

  alternarFavorito() {
    if (!this.livro) return;
    try {
      if (this.salvos.contem(this.livro.key)) this.salvos.remover(this.livro.key);
      else this.salvos.adicionar(this.livro);
      this.favorito = this.salvos.contem(this.livro.key);
      this.erroFavoritos = '';
    } catch { this.erroFavoritos = 'Não foi possível salvar a alteração nos favoritos deste navegador.'; }
  }
}
