# Gerenciador de Estoque

Online em <a href='http://i.pablofsc.me'>i.pablofsc.me</a><br>
Simples projeto de implementação de um sistema de gerenciamento de estoque.<br>
A página, hospedada no GitHub Pages, envia solicitações a uma API hospedada no Heroku, que possui acesso a um banco de dados PostgreSQL e realiza as solitações recebidas por este front.

## Principais tecnologias utilizadas
- React com Typescript
- Material UI
- Favicon de <a href='https://favicon.io/emoji-favicons/'>favicon.io</a>, sob <a href='https://creativecommons.org/licenses/by/4.0/'>CC BY 4.0</a>

## Executar 
- `npm i` para instalar as dependências; <br>
- `npm run dev` ou `vite` para executar no modo desenvolvimento; <br>
- `npm run build` ou `tsc && vite build` para compilar a página. <br>

## Requisitos
O projeto espera encontrar, em `https://pablofsc-inventory-db.herokuapp.com/`, uma <a href='https://github.com/pablofsc/inventory-db-node'>API que lide com suas solicitações<a>. <br>
Este endereço é indicado em `/src/utilities/database.ts`, na constante `databaseURL`.
