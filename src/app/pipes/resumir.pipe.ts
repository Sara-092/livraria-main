import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'resumir' })
export class ResumirPipe implements PipeTransform {
  transform(texto: string, limite = 240): string {
    return texto.length > limite ? texto.slice(0, limite).trimEnd() + '…' : texto;
  }
}
