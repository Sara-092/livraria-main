# Alterações e explicação para a apresentação

## Base utilizada

A conclusão parte do commit `1e4d2d3` do projeto de Sara-092. Essa versão já tinha quatro telas, cinco categorias e o estilo roxo. O fork mantém o histórico e a referência ao repositório original.

## Requisito 3 — pipes

Um pipe transforma um valor para exibição no HTML.

- `uppercase`, do Angular, aparece no autor dos cartões da Home.
- `slice`, do Angular, restringe a lista de assuntos a oito itens na página Detalhes.
- `resumir`, personalizado, recebe um texto e um limite. Se o texto ultrapassar o limite, corta o excedente e acrescenta reticências. Em Detalhes, o limite é 180 caracteres. O botão “Ler mais” permite consultar a primeira frase completa.
- `anoPublicacao`, personalizado, recebe o ano e devolve “Publicado em 1865”, por exemplo. Quando o ano está ausente, devolve “Ano não informado”.

Os pipes são importados no componente standalone que os utiliza e aplicados no HTML com `|`. Os arquivos personalizados ficam em `src/app/pipes/`.

## Requisito 4 — serviços

`LivrosService` centraliza a comunicação com a Open Library usando HttpClient. As páginas chamam os métodos de categoria, busca e detalhes. Os três métodos (`porCategoria`, `buscar` e `detalhes`) fazem cada um o seu `http.get`, e a função `converter()` transforma os campos da API em um objeto Livro usado pelas quatro telas.

`FavoritosService` centraliza listar, verificar, adicionar e remover favoritos. A inclusão evita duplicatas. Ele também converte favoritos da primeira versão, que usava `id` e `titulo`, para o formato atual, com `key` e `title`. Se o navegador não conseguir ler ou gravar, as páginas exibem uma mensagem.

## Requisito 5 — diretivas

`appDestaqueFavorito` recebe um valor booleano e aplica uma classe CSS ao cartão. Na página Favoritos, essa classe produz a borda roxa.

`appCapaAlternativa` escuta o evento de erro da imagem. Se a capa falhar, coloca uma ilustração local com “Sem capa”. A verificação do endereço evita substituir repetidamente a mesma imagem.

As páginas usam `@if` para estados condicionais e `@for` para listas. Os estados de carregamento, erro e lista vazia possuem mensagens próprias.

## Ajustes de funcionamento

- A Home mantém cinco categorias e mostra erro e nova tentativa para cada categoria.
- A Lista consulta o catálogo diretamente. Na base anterior, dependia de dados gravados ao visitar a Home.
- Detalhes pode carregar uma obra pelo ID após abrir o endereço diretamente ou recarregar a página.
- A busca envia parâmetros codificados, preservando caracteres especiais.
- Uma busca nova cancela a anterior para impedir que uma resposta antiga substitua a pesquisa atual.
- Favoritos são atualizados quando a página volta a aparecer.
- Foi adicionado `provideHttpClient()` no ponto de entrada para disponibilizar HttpClient aos serviços.

## Como apresentar

Para cada parte, siga três passos. Explique a finalidade, mostre o arquivo e demonstre o efeito na tela.

| Parte | Arquivo principal | Demonstração |
| --- | --- | --- |
| Páginas e rota | `src/app/app.routes.ts` | Navegar entre as quatro telas e abrir um ID de livro. |
| Consultas HTTP | `src/app/services/livros.service.ts` | Carregar categorias, buscar um autor e recarregar Detalhes. |
| Pipes | `src/app/pipes/` e HTML das páginas | Autor maiúsculo, ano formatado, primeira frase resumida e oito assuntos. |
| Favoritos | `src/app/services/favoritos.service.ts` | Adicionar, recarregar a página e remover. |
| Diretivas | `src/app/diretivas/` | Borda roxa e imagem substituta quando a capa falha. |

O README contém os comandos para executar, a tabela dos requisitos e o roteiro de conferência.


## Requisito 6 — parâmetro na rota (padrão do professor)

- `app.routes.ts`: todas as rotas usam `loadComponent` e a rota de detalhes é `detalhes/:id`.
- `home.page.html`: `<ion-content [fullscreen]="true">` e cartões com `[routerLink]="['/detalhes', id]"`.
- `home.page.ts`: `inject(LivrosService)` e `inject(ChangeDetectorRef)`; após o `subscribe`, `cdr.detectChanges()`.
- `detalhes.page.ts`: `this.route.params.subscribe(param => ...)` lê o `id`, `detalhes(param.id)` consulta a Open Library, o resultado vai para `livro` e `cdr.detectChanges()` atualiza a tela. Há `console.log` do id e do livro, como na aula.
- `livros.service.ts`: o método `detalhes(id)` é o GET que busca o livro pelo ID recebido na rota.
