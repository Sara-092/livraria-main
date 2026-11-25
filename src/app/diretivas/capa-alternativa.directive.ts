import { Directive, ElementRef, inject } from '@angular/core';

@Directive({ selector: 'img[appCapaAlternativa]', host: { '(error)': 'substituir()' } })
export class CapaAlternativaDirective {
  private imagem = inject(ElementRef<HTMLImageElement>);

  substituir() {
    const img = this.imagem.nativeElement;
    const fallback = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 160"><rect width="120" height="160" fill="#e4e7f1"/><text x="60" y="84" text-anchor="middle" font-family="sans-serif" font-size="16" fill="#27344b">Sem capa</text></svg>');
    if (img.src !== fallback) img.src = fallback;
  }
}
