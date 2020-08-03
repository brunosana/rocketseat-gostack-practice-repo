## NODEjs

NodeJS permite utilizar JavaScript no BackEnd

É ele que gerencia as Rotas e Integrações.

**NodeJS é uma plataforma e não uma linguagem. Foi construído em cima da V8 (Engine que interpreta o JavaScript). Podemos comparar o NodeJS como PhP, Ruby ou qualquer outra linguagem que se aplique ao Back End**

### NodeJS, NPM e YARN

NPM ou YARN são ferramentas que permitem que consigamos instalar bibliotecas de terceiros para facilitar o desenvolvimento. Eles também fazem com que seja possível você fornecer bibliotecas para oturas pessoas usarem também.

Yarn é mais rápido e está avançando mais que o NPM, com mais funcionalidades e ferramentas, por isso hoje é mais vantagem utilizar o Yarn.

Comparamos o Yarn com o Composer do PhP, Gems do Ruby e PIP do Python.

### NodeJS e arquitetura Event-Loop

É baseada em eventos, um Thread principal fica rodando infinito e no nosso processador. Independente dos cores do processador, ele usa apenas um para o seu thread, alocando as requisições em pilha. O Node usa uma lib do C++ chamada libuv que permite ultilizar multithreads do processamento.

NodeJS possui uma arquitetura Non-blocking I/O (Input e Output não bloqueante). Quando o NodeJS recebe uma requisição de listagem, ele não retorna todos os dados de uma só vez, retorna em partes e a conexão não é perdida (como em php por exemplo). Então as aplicações são executadas em tempo real (como uma conexão de chat).

#### NodeJS e a CallStack

CallStack é uma pilha. Quando uma função é chamada ela entra na call stack, o event-loop pega função por função as executa em multithreads em forma de pilhas.
Por ser uma pilha, a última função que enrtar é a primeira que sai (FIFO- First In First Out)

### Principais Frameworks

- ExpressJS (Não possui estrutura fechada, é um microframeweork [poucas funcionalidades] e é muito usado em microserviços, arquitetura que vem ganhando força.)
- AdonisJS (Mais produtivo, mais prático. Um dos melhores frameworks em seu segmento)

## API REST

Application Programming Interface 

1. Cliente faz uma requisição (Cliente = Navegador)
2. Uma estrutura de dados é retornada após o Node processar a requisição (Ex. busca usuários, aloca em um array e retorna)
3. Cliente recebe a estrutura e processa (Captura o array e exibe na tela). O contrário do PHP ou Ruy, que retorna o HTML pronto, o FrontEnd que se responsabiliza pela montagem

As rotas utilizam métodos HTTP (GET, POST, PUT, DELETE).

Ex. Metodo GET com a Rota users:

GET http://exemplo.com/users

#### Vantagens

- Múltiplos FrontEnds com o mesmo BackEnd
- Protocolo de comunicação padronizado (Web, Mobile e Desktop)
- Facilidade de interpretação para serviços externos (Uma API pública por exemplo)

**Toda linguagem que usa REST usa o JSON como padrão de envio e resposta. Toda aplicação que consome uma API REST consegue manipular o objeto.**


#### Recursos

- Route
- RouteParams
- Query Params | Filtros e paginação

Ex.

GET http://exemplo.com/city/1/users?male=true

city/users -> Route
1 -> Route Params
male=true ->Query Params

Para métodos como o POST ou PUT, enviamos o conteúdo no corpo (Body) da requisição, pois são informações detalhadas. Os arquivos serão enviados em JSON.
A vantagem é que o objeto não fica visível na url dando mais segurança (apesar de visível internamente).

Existe outro campo que se chama **Header**, que usamos para enviar Localização, Autenticação

### HTTP Codes

Toda resposta retornada para o frontEnd vem junto com o HTTP code, que informa o status daquela requisição (caso de erro ou não). Geralmente o código tem 3 dígitos

Tipos de códigos:

- 1XX : Informational
- 2XX : Success
⋅⋅* 200 : Success
⋅⋅* 201 : Created
- 3XX : Redirection
⋅⋅* 301 : Moved Permanently
⋅⋅* 302 : Moved
- 4XX : Client Error
⋅⋅* 400 : Bad Request
⋅⋅* 401 : Unauthorized
⋅⋅* 404 : Not Found
- 5XX : Server Error
⋅⋅* 500 : Internal Server Error


### Começando no NodeJS

No terminal

```
yarn init -y //Inicia o Package.json
yarn add express //Framework

```

Criar um arquivo em src/index.js

```javascript
const express = require('express'); //Importa o Express
const app = express(); //Executa o express
app.listen(3333); //Seta a porta da aplicação
```

Assim ainda não conseguimos ver nada. Para isso, usamos o express para gerenciar as Rotas. Usando a rota GET:

```javascript
//get recebe dois parâmetros, a url e um arrow function com um request e um response
app.get('/projects', (request, response) => {
    //Todo retorno usa a response
    response.send('Hello World') //método send retorna um texto
})
```
Para retornar informações da API o correto é retornar um json com o código `response.json({})`

#### Dependência de desenvolvimento

Toda vez que você faz uma modificação no código, você precisa reiniciar o servidor, e esse processo fica bem chato quando feito várias vezes. Para isso, usamos uma dependência chamada nodemon. Porém, quando o projeto estiver finalizado não precisaremos mais dela, por isso utilizamos a flag -D para instalar a dependência apenas para o desenvolvimento.

```
yarn add nodemon -D
```

Para executarmos o nodemon podemos usar o `nodemon src/index.js`, mas o correto a se fazer é criar uma variável *scripts* no package.json, com o parâmetro *dev*.

```json
"scripts": {
    "dev": "nodemon src/index.js"
  }
```

Ou pode mudar o parâmetro *main* de **index.js** para **src/index.js** e alterar o trech `nodemon src/index` para apenas `nodemon`.

```json
"main": "src/index.js",
"scripts": {
"dev": "nodemon"
}
```

O método *listen* pode receber um segundo parâmetro quando o servidor for colocado no ar, então podemos imprimir uma mensagem no console:

```javascript
app.listen(3333, ()=>{
    console.log('server started')
});
```

### Métodos HTTP com Express

Até agora usamos o método GET com Express, mais precisamente:

- GET: Buscar informações do BackEnd
- POST: Criar informação no BackEnd
- PUT/PATCH: Altera informação no BackEnd (PUT é usado normalmente para alterar todo o objeto, PATCH é para alguma informação específica (como alteração de imagem por exemplo)
- DELETE: Deleta uma informação no BackEnd

**Normalmente chamamos o path ou rota que vem depois da barra ('/') de *resource* ou *recurso***

Para urls que precisam de parâmetros usamos os *:* (dois pontos):

```javascript
app.get('/projects/:id', (request, response) => {
    response.send('Projects com ID') //método send retorna um texto
})
```

Para capturar esses valores passados pela URL usamos a variável *request*

```javascript
//O que está na query:
const query = request.query;
//Desestruturando
const {title, owner} = request.query;

//Quando está no corpo da url (param)

const params = request.params;
```
#### Capturar valores no Request Body

Nativamente o Express não é feito para trabalhar apenas com JSON, então não podemos capturar os elementos do body apenas com ele. Precisamos informar que o body da requisição irá receber JSON usamos o `app.use()`

`app.use()` é quando queremos adicionar um tipo de função que todas as rotas passarão por ela, então, para ativar o JSON, no começo do código (pelo express ser linear) inserimos o trecho:

```javascript
app.use(express.json())
```
E após isso, podemos usar o request body normalmente

```javascript
app.post('/projects', (request, response) => {
    const body = request.body;
    return response.json({
        name: body.name,
        desc: body.desc
    });
});
```

### Testar métodos HTTP

O navegador nativamente não faz requisições do tipo PUT, PATCH, POST e DELETE. Para isso, facilitamos o desenvolvimento com o software *insomnia*.

### Criando a primeira API (com DB_fake)

z