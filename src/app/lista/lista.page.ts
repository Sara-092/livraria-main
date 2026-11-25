import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LivrosService, Livro } from '../services/livros.service';
import { AnoPublicacaoPipe } from '../pipes/ano-publicacao.pipe';
import { IonButton } from '@ionic/angular/standalone';
import { CapaAlternativaDirective } from '../diretivas/capa-alternativa.directive';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton,
  IonSearchbar, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  imports: [
    FormsModule, AnoPublicacaoPipe, IonButton, CapaAlternativaDirective,
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton,
    IonSearchbar, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
    RouterLink,
  ],
})
export class ListaPage {
  termo = '';
  livros: Livro[] = [];
  carregando = false;
  erro = false;
  private consulta?: Subscription;
  constructor(private api: LivrosService) {}
  ngOnInit() { this.buscar(); }
  ngOnDestroy() { this.consulta?.unsubscribe(); }
  buscar() {
    this.consulta?.unsubscribe();
    this.carregando = true;
    this.erro = false;
    this.livros = [];
    this.consulta = this.api.buscar(this.termo).subscribe({
      next: livros => { this.livros = livros; this.carregando = false; },
      error: () => { this.erro = true; this.carregando = false; },
    });
  }
}
