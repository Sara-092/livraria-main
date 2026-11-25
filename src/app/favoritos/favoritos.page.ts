import { Livro } from '../services/livros.service';
import { FavoritosService } from '../services/favoritos.service';
import { DestaqueFavoritoDirective } from '../diretivas/destaque-favorito.directive';
import { CapaAlternativaDirective } from '../diretivas/capa-alternativa.directive';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton,
  IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  imports: [
    DestaqueFavoritoDirective, CapaAlternativaDirective,
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton,
    IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
    RouterLink,
  ],
})
export class FavoritosPage {
  favoritos: Livro[] = [];
  erro = '';
  constructor(private salvos: FavoritosService) {}
  ionViewWillEnter() {
    try { this.favoritos = this.salvos.listar(); this.erro = ''; }
    catch { this.erro = 'Não foi possível ler os favoritos deste navegador.'; }
  }
  remover(key: string) {
    try { this.salvos.remover(key); this.ionViewWillEnter(); }
    catch { this.erro = 'Não foi possível remover o favorito. Tente novamente.'; }
  }
}
