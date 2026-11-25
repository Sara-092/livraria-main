import { Directive, Input } from '@angular/core';

@Directive({ selector: '[appDestaqueFavorito]', host: { '[class.livro-favorito]': 'ativo' } })
export class DestaqueFavoritoDirective {
  @Input('appDestaqueFavorito') ativo = false;
}
