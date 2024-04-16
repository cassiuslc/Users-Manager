
# CRUD de Usuários com Vuetify

Este repositório apresenta a solução para um teste de Desenvolvedor Full Stack (Vue.js + Laravel).

## Requisitos do Teste

#### Front-end (Vue.js + Vuetify):

- Crie uma interface para realizar operações CRUD (Create, Read, Update, Delete) de usuários.
- Utilize os componentes do Vuetify para construir a interface do usuário de forma esteticamente agradável e responsiva.
- A interface deve incluir formulários para adicionar, visualizar, editar e excluir usuários.
- Os campos obrigatórios para adicionar/editar um usuário são: Nome, CPF, Email e Senha.
- Implemente a funcionalidade de enviar os dados do usuário para o back-end Laravel para persistência.

#### Back-end (PHP com Laravel):

- Crie rotas para lidar com as operações CRUD de usuários.
- Implemente a lógica para criar, ler, atualizar e excluir usuários no banco de dados.
- Adicione validação nos campos de entrada do usuário (por exemplo, CPF válido, e-mail válido).
- Retorne respostas JSON adequadas para cada operação CRUD indicando sucesso ou falha.

## Principais Tecnologias Utilizadas
- **Laravel**
- **Vuetify**
- **Axios**
- **PHP**
- **Vue.js**
- **Tailwind CSS**
- **PostgreSQL**
- **Docker**


## Demonstração

https://github.com/cassiuslc/Users-Manager/assets/51304545/174bf1f6-0e97-4bac-95b3-11cb27168018

## Teste Automatizados com Cypress

https://github.com/cassiuslc/Users-Manager/assets/51304545/7a0e65e4-9854-4c88-873e-0e640587ca64

1. Acesse a pasta web do projeto
2. Execulte o cyspress
Teste não visual:
```bash
npx cypress run
```
Teste visual:
```bash
npx cypress open
```
## Instalação

Siga os passos abaixo para configurar e executar o projeto:

1. Garanta que você possui um ambiente Docker Composer com WSL perfeitamente funcional.

2. Clone o projeto para uma pasta com o seguinte comando:
```bash
git clone https://github.com/cassiuslc/Users-Manager.git
```
3. Crie a rede docker do projeto
```bash
docker network create app-network
```
3. Acesse a pasta do projeto
```bash
cd Users-Manager
```
4. Acesse a pasta da seção do laravel (API)
```bash
cd api
```
4. Construa o conteiner docker do laravel e banco de dados
```bash
docker-compose up -d --build
```
5. Acesse o console do Docker PHP e instale as dependências e permissões.
```bash
docker-compose exec php bash
composer setup
chown -R www-data:www-data /var/www
exit
```
Neste momento você deve conseguir acessar o swagger da aplicação em http://localhost/api/documentation

6. Retorne a raiz do projeto e acesse a pasta web
```bash
cd ..
cd web
```
7. Inicie o conteiner docker da seção web do projeto
```bash
docker-compose up -d --build
```
Você deve ver o projeto na porta 8080 em http://localhost:8080/

Caso o banco apresente algum problema de permissão com docker tente reiniciar ele
```bash
docker restart api-db-1
```
### Para Iniciar o projeto outras vezes
Use o comando a baixo em cada pasta api e web
```bash
docker-compose up -d
```
## 🚀 Sobre mim

- [@cassiuslc](https://www.github.com/cassiuslc)


## Links

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/cassiuslc)

## Licença

[MIT](https://choosealicense.com/licenses/mit/)
