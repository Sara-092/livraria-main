import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'anoPublicacao' })
export class AnoPublicacaoPipe implements PipeTransform {
  transform(ano?: number): string {
    return ano == null ? 'Ano não informado' : 'Publicado em ' + ano;
  }
}
