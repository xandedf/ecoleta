![](https://img.shields.io/github/stars/xandedf/ecoleta) ![](https://img.shields.io/github/forks/xandedf/ecoleta) ![](https://img.shields.io/github/tag/xandedf/ecoleta) ![](https://img.shields.io/github/release/xandedf/ecoleta) ![](https://img.shields.io/github/issues/xandedf/ecoleta) ![](https://img.shields.io/github/repo-size/xandedf/ecoleta)
![GitHub](https://img.shields.io/github/license/xandedf/ecoleta)
![](https://img.shields.io/github/commit-activity/w/xandedf/ecoleta)

# Ecoleta
Projeto desenvolvido durante da Next Level Week #01 da RocketSeat (Node.js / React / React.native)

## Descrição
Esse projeto serviu para estudos de Node.JS / React e React Native durante a Next Level Week

### Tecnologias
Projeto Ecoleta utilizou-se das seguintes tecnologias

* [node.js] - Para construção do server (API)
* [react] - Para construção da parte web (Cadastro de pontos)
* [react.native] - Para construção do APP

### Allgumas das bibliotecas/componentes utilizados

* [knex.js] - Criação de queries para o banco de dados;
* [path] - Componente para se resolver paths no Node.js;
* [Express] - Para implementação Web
* [Expo] - Para implementação do APP
* entre outros...

### Rodando aplicação

- Server
```sh
$ cd server
$ npm run dev
$ npm run knex:migrate
$ npm run knex:seed
```

- Web
```sh
$ cd web
$ npm start
```

- Mobile
```sh
$ cd mobile
$ npm start
```

### TODOs

- Implementar restrições de campos no frontend;
- Criar um ambiente de admin CRUD de pontos de coleta;
- Criar a página de sucesso após o cadastro;
- Criar um sistema de Login;
- Melhorar o sistema de busca de pontos;
- Melhorar a visualização do mapa, deixando todos os pontos retornados na busca visíveis no mapa (tirar zoom conforme necessário);
- Implementar integração com APPs de rotas (Waze, Google Maps) para navegar até o ponto escolhido;
- Colocar o splash/ícone na aplicação
- Criar sistemas de configs no código
- Refatorar o código


