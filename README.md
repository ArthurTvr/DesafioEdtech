# Teste Técnico – Desenvolvedor Frontend (EdTech)

Projeto desenvolvido como teste técnico para vaga de Desenvolvedor Frontend, com foco em HTML, CSS e JavaScript Vanilla, seguindo os requisitos de layout, interações, estados e responsividade.

## Acesso ao projeto

O projeto está publicado no GitHub Pages e pode ser acessado pelo link:

https://arthurtvr.github.io/DesafioDOTEdTech/

## Como rodar

Como o projeto é estático, não é necessário instalar dependências ou executar comandos.

### Opção 1 — Acessar online
Basta abrir o link publicado no GitHub Pages.

### Opção 2 — Rodar localmente
1. Baixe ou clone este repositório
2. Abra o arquivo `index.html` no navegador

## Decisões técnicas

O projeto foi desenvolvido utilizando apenas:

- HTML5
- CSS3
- JavaScript Vanilla

### Principais decisões

- O layout foi construído com HTML semântico e CSS puro, sem uso de frameworks (como Bootstrap ou Tailwind), conforme as restrições do teste.
- A responsividade foi implementada utilizando `flexbox`, `media queries` e ajustes específicos para dispositivos móveis.
- O slider de imagens foi implementado com a biblioteca Swiper, conforme permitido no desafio.
- O player de vídeo foi implementado utilizando embed do YouTube.
- O player de áudio foi totalmente customizado com JavaScript, incluindo:
  - controle de play/pause
  - barra de progresso interativa
  - controle de volume
- Os cards interativos foram desenvolvidos com JavaScript puro, controlando estados de abertura e fechamento.
- A atividade discursiva e a atividade objetiva foram implementadas do zero, sem uso de bibliotecas externas.
- O estado das atividades é persistido com `sessionStorage`, permitindo restaurar:
  - respostas do usuário
  - opção selecionada
  - visibilidade do feedback
  - estado dos botões
- O FAQ foi implementado com elementos nativos (`details` e `summary`), com JavaScript apenas para controlar a abertura de um item por vez.
- Animações suaves foram aplicadas utilizando CSS (`transition`, `grid`, `opacity`), sem dependência de bibliotecas.

## Estrutura do projeto

```bash
├── index.html
├── style.css
├── scripts
│   └── main.js
├── assets
│   ├── audio
│   ├── images
│   │   ├── atividades
│   │   ├── card
│   │   ├── faq
│   │   ├── hero
│   │   ├── logo
│   │   └── swiper
