import { UpperCasePipe } from '@angular/common';
import { CATEGORIAS, LivrosService, Livro } from '../services/livros.service';
import { CapaAlternativaDirective } from '../diretivas/capa-alternativa.directive';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonChip,
  IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  imports: [
    UpperCasePipe, CapaAlternativaDirective,
    IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonChip,
    IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, RouterLink,
  ],
})
export class HomePage implements OnInit {
  categoria = 'fantasia';
  categorias = CATEGORIAS;
  livrosPorCategoria: Record<string, Livro[]> = {};
  carregando: Record<string, boolean> = {};
  erros: Record<string, boolean> = {};
  // usar o serviço de consumo da API
  private api = inject(LivrosService);
  // detectar mudanças nas variáveis
  private cdr = inject(ChangeDetectorRef);
  ngOnInit(): void { this.categorias.forEach(cat => this.carregar(cat.id)); }
  carregar(id: string) {
    const cat = this.categorias.find(item => item.id === id)!;
    this.carregando[id] = true;
    this.erros[id] = false;
    this.api.porCategoria(cat.consulta).subscribe({
      next: livros => {
        console.log(livros);
        this.livrosPorCategoria[id] = livros;
        this.carregando[id] = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.erros[id] = true;
        this.carregando[id] = false;
        this.cdr.detectChanges();
      },
    });
  }
}
