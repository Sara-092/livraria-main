import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

export interface Livro {
  key: string;
  title: string;
  authors?: { name: string }[];
  cover_id?: number;
  first_publish_year?: number;
  subject?: string[];
  edition_count?: number;
  pages?: number;
  rating?: number;
  language?: string[];
  first_sentence?: string;
}
interface Resultado {
  key: string; title: string; author_name?: string[]; cover_i?: number;
  first_publish_year?: number; subject?: string[]; edition_count?: number;
  number_of_pages_median?: number; ratings_average?: number;
  language?: string[]; first_sentence?: string[];
}
export const CATEGORIAS = [
  { id: 'fantasia', nome: 'Fantasia', consulta: 'subject:fantasy' },
  { id: 'romance', nome: 'Romance', consulta: 'subject:romance' },
  { id: 'ficcao', nome: 'Ficção científica', consulta: 'subject:"science fiction"' },
  { id: 'distopia', nome: 'Distopia', consulta: 'subject:dystopia OR subject:dystopian' },
  { id: 'terror', nome: 'Terror', consulta: 'subject:horror' },
];
// API retirada do link que marlon mandou no teams

@Injectable({ providedIn: 'root' })
export class LivrosService {
  private http = inject(HttpClient);
  private url = 'https://openlibrary.org/search.json';
  private campos = 'key,title,author_name,cover_i,first_publish_year,subject,edition_count,number_of_pages_median,ratings_average,language,first_sentence';

  // transforma o resultado da API em um objeto Livro usado pelas telas
  private converter(d: Resultado): Livro {
    return {
      key: d.key, title: d.title, authors: [{ name: d.author_name?.[0] ?? 'Autor desconhecido' }],
      cover_id: d.cover_i, first_publish_year: d.first_publish_year, subject: d.subject,
      edition_count: d.edition_count, pages: d.number_of_pages_median,
      rating: d.ratings_average, language: d.language, first_sentence: d.first_sentence?.[0],
    };
  }

  // GET 1
  porCategoria(consulta: string) {
    return this.http
      .get<{ docs: Resultado[] }>(this.url, { params: { q: consulta, sort: 'editions', limit: 20, fields: this.campos } })
      .pipe(map(res => res.docs.filter(d => d.cover_i).slice(0, 6).map(d => this.converter(d))));
  }

  // GET 2
  buscar(termo: string) {
    return this.http
      .get<{ docs: Resultado[] }>(this.url, { params: { q: termo.trim() || 'subject:fiction', limit: 30, fields: this.campos } })
      .pipe(map(res => res.docs.map(d => this.converter(d))));
  }

  // GET 3
  detalhes(id: string) {
    return this.http
      .get<{ docs: Resultado[] }>(this.url, { params: { q: 'key:/works/' + id, limit: 1, fields: this.campos } })
      .pipe(map(res => (res.docs[0] ? this.converter(res.docs[0]) : null)));
  }
}
