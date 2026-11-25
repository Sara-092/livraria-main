# Livraria Online

Aplicativo acadêmico desenvolvido com Ionic 8, Angular 19 standalone e TypeScript. Permite navegar por cinco categorias, pesquisar títulos e autores, consultar detalhes e guardar favoritos no navegador.

Este repositório é uma cópia do [projeto original de Sara-092](https://github.com/Sara-092/livraria). A conclusão dos requisitos foi integrada à versão de 14/11/2026, incluindo as categorias e o estilo roxo.

# Participantes
-> Rayana Barbosa de Oliveira Lima - 01811793

-> Sara Kaylanne da Silva Cavalcanti - 01810269

-> Manuella Vitória Nascimento de Andrade Morais - 01649495

-> Maria Clara Damásio Nascimento Silva - 01791642

-> Maria Beatriz Vieira Varela Braga - 01809610

## Instalação e execução

Use Node.js 22 e npm. No terminal:

```sh
git clone https://github.com/Maria-progm/livraria.git
cd livraria
npm ci
npm start
```

O aplicativo abre em http://localhost:4200. Para encerrar, pressione Ctrl+C. Para gerar a versão de produção:

```sh
npm run build
```

O resultado fica em `www/browser/`. O catálogo precisa de internet e consulta a API pública da Open Library, sem chave de acesso.

## Telas

| Página | Rota | Funcionalidade |
| --- | --- | --- |
| Home | `/home` | Fantasia, romance, ficção científica, distopia e terror, com até seis livros por categoria. |
| Lista | `/lista` | Busca por título ou autor, com até trinta resultados. |
| Detalhes | `/detalhes/:id` | Autor, publicação, edições, páginas, nota, idiomas, primeira frase e assuntos quando disponíveis. |
| Favoritos | `/favoritos` | Lista persistente com acesso aos detalhes e remoção. |

Os favoritos ficam no `localStorage`, na chave `favoritos`. Recarregar a página mantém os dados no mesmo navegador e endereço. Limpar os dados do site apaga os favoritos.

## Requisitos do trabalho

| Requisito | Implementação e demonstração |
| --- | --- |
| Home + três páginas | Home, Lista, Detalhes e Favoritos, ligadas pelas [rotas](src/app/app.routes.ts). |
| API e pelo menos três métodos GET | [LivrosService](src/app/services/livros.service.ts) expõe `porCategoria()`, `buscar()` e `detalhes()`. Cada um faz seu próprio `http.get`. |
| Dois pipes prontos | `uppercase` transforma os autores na Home. `slice:0:8` limita os assuntos em Detalhes. |
| Dois pipes personalizados | [ResumirPipe](src/app/pipes/resumir.pipe.ts) limita a primeira frase a 180 caracteres. [AnoPublicacaoPipe](src/app/pipes/ano-publicacao.pipe.ts) mostra o ano na Lista ou “Ano não informado”. |
| Dois serviços | LivrosService cuida da API. [FavoritosService](src/app/services/favoritos.service.ts) cuida dos favoritos no navegador. |
| Duas diretivas personalizadas | [CapaAlternativaDirective](src/app/diretivas/capa-alternativa.directive.ts) substitui imagens com erro. [DestaqueFavoritoDirective](src/app/diretivas/destaque-favorito.directive.ts) aplica a borda roxa aos cartões favoritos. |
| Blocos `@if` e `@for` | As páginas alternam estados e repetem os cartões com esses blocos. `@empty` informa quando uma lista fica vazia. |
| Requisito 6: parâmetro na rota | A rota `detalhes/:id` (carregada com `loadComponent`) recebe o ID. A Home envia o ID em `[routerLink]`. [DetalhesPage](src/app/detalhes/detalhes.page.ts) lê `this.route.params.subscribe(...)`, chama `detalhes(param.id)`, guarda o resultado em `livro` e usa `ChangeDetectorRef.detectChanges()`. |

### Consultas à API

As três operações usam GET em `https://openlibrary.org/search.json`, com parâmetros diferentes. Cada método chama `http.get` diretamente e usa `converter()` para transformar a resposta em `Livro`.

- `porCategoria(consulta)` envia o assunto em `q`, ordena por edições e seleciona até seis obras com capa.
- `buscar(termo)` envia o texto em `q`. Sem texto, apresenta uma seleção de ficção. HttpClient codifica os parâmetros, incluindo caracteres como `&`.
- `detalhes(id)` busca `key:/works/ID` pelo ID recebido na rota. Isso permite abrir ou recarregar a rota diretamente.

As capas vêm de `https://covers.openlibrary.org/b/id/`. Os dados são fornecidos pela comunidade Open Library e podem estar incompletos. A preferência de categoria não garante livros em português.

## Organização

```text
src/app/
  home/         Página inicial e categorias
  lista/        Busca de livros
  detalhes/     Informações e ação de favoritar
  favoritos/    Lista de favoritos
  services/     Consultas HTTP e armazenamento
  pipes/        Resumo de texto e ano de publicação
  diretivas/    Capa alternativa e destaque visual
  app.routes.ts Rotas do aplicativo
src/main.ts     Configuração standalone, Ionic e HttpClient
src/global.scss Estilos compartilhados
docs/ALTERACOES.md Explicação das mudanças e roteiro de apresentação
```

## Conferência antes da apresentação

1. Abra a Home e alterne as categorias. Confira os nomes dos autores em maiúsculas.
2. Clique em “Ver todos os livros”, procure um autor e confira o texto do ano nos cartões.
3. Abra uma obra e mostre o ID no endereço. Em Alice's Adventures in Wonderland, a primeira frase permite demonstrar “Ler mais” e “Ler menos”.
4. Confira o limite de oito assuntos em Detalhes.
5. Adicione um livro aos favoritos, abra Favoritos e observe a borda roxa. Recarregue e depois remova o item.
6. Abra diretamente a rota de detalhes e confirme o carregamento pela API.
7. Para demonstrar a capa alternativa, bloqueie uma imagem nas ferramentas do navegador e recarregue.
8. Simule indisponibilidade da API e confira as mensagens e opções de nova tentativa.

## Validação

A compilação de produção passou. O fluxo com a API real foi conferido no navegador durante a preparação. A disponibilidade da Open Library e das capas depende do serviço externo.

## Entrega e equipe

Conforme o enunciado, um integrante envia o ZIP no Teams e disponibiliza o repositório no GitHub. O grupo deve ter cinco ou seis pessoas e cada pessoa precisa explicar sua parte, mostrando o comportamento na tela e o trecho de código correspondente.

Os nomes dos integrantes e a distribuição das responsabilidades devem ser preenchidos pelo grupo antes da apresentação.

