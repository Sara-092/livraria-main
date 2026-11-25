import { Injectable } from '@angular/core';
import { Livro } from './livros.service';

@Injectable({ providedIn: 'root' })
export class FavoritosService {
  listar(): Livro[] {
    const dados: unknown = JSON.parse(localStorage.getItem('favoritos') || '[]');
    if (!Array.isArray(dados)) throw new Error('Lista de favoritos inválida.');
    return dados.flatMap(item => {
      if (!item || typeof item !== 'object') return [];
      if (typeof item.key === 'string' && typeof item.title === 'string') return [item as Livro];
      // Compatibilidade com a primeira versão do projeto.
      if (typeof item.id === 'string' && typeof item.titulo === 'string') {
        const capa = /\/b\/id\/(\d+)/.exec(item.capa ?? '');
        return [{ key: '/works/' + item.id, title: item.titulo, cover_id: capa ? Number(capa[1]) : undefined }];
      }
      return [];
    });
  }

  contem(key: string) { return this.listar().some(livro => livro.key === key); }

  adicionar(livro: Livro) {
    const lista = this.listar();
    if (!lista.some(item => item.key === livro.key)) {
      localStorage.setItem('favoritos', JSON.stringify([...lista, livro]));
    }
  }

  remover(key: string) {
    localStorage.setItem('favoritos', JSON.stringify(this.listar().filter(livro => livro.key !== key)));
  }
}
