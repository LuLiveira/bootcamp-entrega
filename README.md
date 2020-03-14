<p align="center">
  <img width="350" height="auto" src="https://raw.githubusercontent.com/Rocketseat/bootcamp-gostack-desafio-02/master/.github/logo.png">
</p>

# FastFeet - Delivery de Encomendas

> Desafio Final do GoStack da Rocketseat


## Instalação e utilização

### Backend - Node.js

1.  Acesse a pasta server e siga os passos abaixos:
2.  Rodar o comando 'yarn' no terminal para instalar as dependências
3.  Instalar, criar e subir um banco de dados Postgres (No projeto foi criado com Docker utilizando o comando abaixo):
```
docker run --name postgresfastfeet -e POSTGRES_PASSWORD=fastfeet -p 5432:5432 -d postgres:11
```
4.  Instalar, criar e subir um banco de dados Redis (No projeto foi criado com Docker utilizando o comando abaixo):
```
docker run --name redisfastfeet -p 6379:6379 -d -t redis:alpine
```

5.  Acesse o banco postgres com algum gerenciador como por exemplo o postbird ou dbeaver community, crie o banco com nome de fastfeet.
6. Alterar o arquivo .env.example para .env e alterar as informações.
7. Rodar o comando 'yarn sequelize db:migrate' para executar as migrates.
8. Rodar o comando 'yarn sequelize db:seed:all' para executar os seeds.
9. Rodar o comando 'yarn dev' para iniciar o servidor back-end.
10. Rodar 'yarn queue' para iniciar o servidor back-end de e-mails.

### Frontend WEB - REACTJS

1.  Acessar a pasta web
2.  Rodar o comando 'yarn' para instalar as dependências.
3.  Rodar o comando 'yarn start' para iniciar a aplicação front-end.

### Mobile APP - React Native

1.  Acessar a pasta app
2.  Rodar o comando 'yarn' para instalar as dependências.
3.  Alterar o arquivo .env.example para .env e alterar as informações.
4.  Com o emulador conectado, rodar o comando 'react-native run-android ou run-ios.
5.  Se precisar parar e conectar de novo, rodar o comando 'react-native start
6.  Obs: para emular no celular físico, rodar os comandos:
``` 
adb reverse tcp:8081 tcp:8081 // Aplicação
adb reverse tcp:3333 tcp:3333 // Api
adb reverse tcp:9090 tcp:9090 // Reactotron
```

Obs: O Projeto foi testado apenas em Android
