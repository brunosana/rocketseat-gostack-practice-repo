## NODEjs

NodeJS permite utilizar JavaScript no BackEnd

É ele que gerencia as Rotas e Integrações.

**NodeJS é uma plataforma e não uma linguagem. Foi construído em cima da V8 (Engine que interpreta o JavaScript). Podemos comparar o NodeJS como PhP, Ruby ou qualquer outra linguagem que se aplique ao Back End.**

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

* 1XX : Informational
* 2XX : Success
  * 200 : Success
  * 201 : Created
* 3XX : Redirection
  * 301 : Moved Permanently
  * 302 : Moved
* 4XX : Client Error
  * 400 : Bad Request
  * 401 : Unauthorized
  * 404 : Not Found
* 5XX : Server Error
  * 500 : Internal Server Error

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

**Normalmente chamamos o path ou rota que vem depois da barra ('/') de *resource* ou *recurso*.**

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

### Criando a primeira API

Antes de mais nada, para tratar cada objeto como único, precisamos de uma chave única, e para aumentar a performance nessa criação usaremos a biblioteca *uuidv4*:

```
yarn add uuidv4
```

**O código responsável por esse tópico estará no arquivo src/index no corpo do commit.**

## Middleware

O que é middleware?

Funciona como um interceptador de requisições, que pode:
- Interromper a requisição
- Alterar dados da requisição

Todas as rotas são consideradas middlewares, pois cumprem os requisitos acima (interrompe e altera dados da requisição).
O middleware captura os mesmos dados que uma rota convencional.

É usado quando queremos que seja disparado de forma automática. Pode ser em todas ou em pré selecionadas. Um middleware recebe além do request e response, o parâmetro *next*. É nesse parâmetro que sabemos qual será a próxima função a ser chamada.

Ex: Toda vez que uma requisição for feita, uma mensagem informando qual requisição foi irá ser impressa no terminal.

Para isso, criamos um middleware logRequests:

```javascript
function logRequests(request, response, next){
    const { method, url } = request;
    const label = `[${method.toUpperCase()}] - ${url}`;
    console.log(label);
    next();
}

//A linha a seguir garante que em TODA requisição, o logRequests será executado.
app.use(logRequests);
```

Porém, como é um interceptador, ele interrompeu totalmente a requisição e precisa ser informado que é para prosseguir para a próxima função, para isso, usamos o parâmetro declarado *next*. Caso não seja chamado, a rota não será disparada.

**OBS: NodeJS é uma aplicação linear, então a função que ele encontrar primeiro será executada, portanto, as funções a serem executadas primeiro precisam ser declaradas antes.**

Para usar um ou mais middlewares em uma rota específica, incluímos antes da arrow function com o request e response:

```javascript
app.post('/projects', logRequests, Middleware2, Mid3 (request, response) => {
    const {name, desc} = request.body;
    const project = {id: uuid(), name, desc};
    projects.push(project);
    return response.json(project);
});
```

Pode colocar quantos middlewares forem necessários. Ele irá executar em ordem, conforme for declarado primeiro.

### Aplicabilidade do middleware

Autenticação, Verificação de Dados, GErar Logs etc


## ReactJS

Biblioteca para Construção de Interfaces. o React usamos para Web, Mobile, Realidade Virtual etc. É usado na construção de SPA (Single-Page Application), que é uma forma de consumir aplicações no front-end.
Antigamente, para cada rota, o backend retornava um html, agora o backend retorna apenas o JSON e o front-end faz o resto.
A página não recarrega, ela executa em tempo real.

O React é um framework, embora o ecossistema (Mobile, Web etc) seja gigante, é um conjunto de ferramentas que facilita o desenvolvimento da interface.

Em React tudo fica dentro do JavaScript, seja CSS ou HTML

### React, ReactJS e ReactNative

React:

Biblioteca de construção de interfaces e componentização. É usada tanto no reactJS quanto no ReactNative

ReactJS:

Comportamento do React diretamente no browser. Que une a lib React com a ReactDOM (do facebook).

React Native:

Lib React com a lib que lida com elementos nativos, é usado pra mobile.


Mesmo usando tudo no JavaScript. O Babel transforma toda a mistura em CSS, JavaScript e HTML separados.

#### Vantagens:

- Organização do código

**Componentização**

Didivir partes do código onde sozinhos tem funcionalidades específicas. A divisão é feita de acordo com o isolamento de um componente sem que ele interfira na aplicação como um todo.

- Divisão de responsabilidades

**BackEnd: Regra de negócio**

**FrontEnd: Interface**

FrontEnd não tem responsabilidade em regra de negócio.

- Uma API para múltiplos clientes:

**Com apenas uma API podemos estruturar com o frontEnd uma aplicação Mobile e Web. Dois clientes com a mesma API.**

- Programação declarativa



#### JSX

JavaScript + XML no mesmo arquivo. E com o React criamos nossas próprias tags em HTML. Assim podemos usar Tags dentro do javascript sem problemas.


## OBS

- **O browser não entende o código, pois as 3 linguagens juntas o bowser não é preparado**
- **O Babel converte o código JS em um arquivo legível ao browser**
- **Live Reaload com Webpack Dev Server. Independente da quantidade de arquivos, o Webpack cria um único arquivo dos arquivos que o Babel criou.**

---

## Estrutura de um projeto React

Criando do zero, primeiro usamos os comandos `yarn init -y` para iniciar e `yarn add react react-dom`. O diretório principal com duas pastas, a *src* e *public*. Lá em cima já vimos que o react com o react-dom (framework para manipular elementos da página) é para trabalharmos com web.

### Código legível ao browser


Para que o código react consiga ser interpretado pelo browser, criamos um arquivo *index.html* na pasta *public*. O código deverá conter uma div com o id app:

```html
<div id="app"></div>
```

Usamos o Babel para converter o código do React para que o browser consiga entender. E junto com o *Babel* usamos o *Webpack*

- Babel: Transpila (converte) o código
- Webpack: Para cada tipo de arquivo ele converte o código de uma determinada maneira. Existe uma forma ainda de importar imagens, html, css no react, então para conseguirmos converter essas importações usamos *loaders*
- Loaders: babel-loader, css-loader, image-loader, file-loader etc.

Então primeiro adicionamos os pacotes:

- @babel/code: `yarn add @babel/core`
- @babel/preset-env: `yarn add @babel/perset-env`
- @babel/preset-react: `yarn add @babel/preset-react`
- webpack: `yarn add webpack`
- webpack-cli: `yarn add webpack-cli`

É possível instalar todos eles com apenas uma linha usando `yarn add @babel/core @babel/preset-env @babel/preset-react webpack webpack-cli`.

Agora precisamos criar na raiz do projeto o arquivo **babel.config.js**, é com ele que informamos as configurações que conversão entre react e um formato legível ao browser.

Por hora usamos a configuração *presets* que são configurações criadas por terceiros, que são os que instalamos, o `@babel/preset-env` e `@babel/preset-react`:

```javascript
module.exports = {
    presets: [
        '@babel/preset-env',
        '@babel/preset-react'
    ]
};
```
- @babel/preset-env: pega todos os arquivos javascript do projeto e converte em um JS mais antigo, com funções que podem ser executadas no browser, pode converter para o node, que já roda no navegador e torna possível a execução do site. Ele entende o ambiente da aplicação que está sendo executada e faz a conversão de acordo com ela.

- @babel/preset-react: adiciona as funcionalidades do react na conversão. É esse preset que consegue ler os arquivos react e faz a conversão.

Ex:
Um código com *arrow function* não é interpretado pelo navegador, pois ele não reconhece. Então na pasta *src* criamos o arquivo **index.js** com uma arrow function para calcular a área de um retângulo.

Para conseguir acessar o babel por linha de comando, adicionamos o package *@babel/cli* pela linha `yarn add @babel/cli`.

Podemos usar então a conversão:

```
yarn babel src/index.js --out-file public.bundle.js
```

o primeiro parâmetro é o arquivo, e a flag `--out-file` é pra explicitar onde o arquivo final irá ser gerado.

Então a conversão funciona assim:

**Código não convertido: (src/index.js)**

```javascript
const area = (base, altura) => {
    return base*altura;
}
```

**Código convertido: (public/bundle.js)**

```javascript
const area = function(base, altura){
  return base * altura;
};
```

Assim conseguimos importar o script *bundle.js* no *index.html* e ele executará normalmente.

Para **configurar o webpack** criamos na raiz do projeto o arquivo *webpack.config.js*. O Babel converte o javascript, mas para importações de imagens, html, e outros arquivos usamos o webpack.

Com uma estrutura bem semelhante, usamos dentro do `module.exports = {}` o parâmetro **entry** para adicionar o arquivo de entrada, que seria o **src/index.js**. Usamos o módulo *path* para garantir que em todos os sistemas operacionais sejam funcionais a aplicação. O próximo é o parâmetro **output**, que será o arquivo convertido, que no caso será o **bundle.js**.

O próximo parâmetro é o **module** onde dentro dele definiremos um vetor **rules**. Cara *rule* será um *loader*.

Para isso iremos instalar então o *babel-loader* usando `yarn add babel-loader`.

Dentro da rule, temos os parâmetros **test**, **exclude**, **use** e dentro do use temos o **loader**. Basicamente, toda vez que um arquivo javascript for necessário e ele não estiver na pasta node_modules, o babel irá converter.

Para testar, usamos o comando `yarn webpack --mode development` no terminal e conseguimos ver o arquivo *bundle.js* convertido, com vários arquivos.

E agora para continuarmos o desenvolvimento, usamos o webpack-dev-server para conseguir monitorar as mudanças que fazemos no código, usando `yarn add webpack-dev-server -D`.

Com o pacote instalado, adicionamos antes do module a propriedade **devServer: {}**, com a propriedade *contentBase*, o arquivo ficará:

```javascript
const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'src', 'index.js'),
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'public')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
};
```

Agora, executando o servidor com `yarn webpack-dev-server --mode development` e podemos ver o servidor com live reloading.

## Componentização

Como o primeiro arquivo react, no index.js na pasta src, importamos o *React* do **react** e a função *render* fo **react-dom**.

A estrutura do arquivo ficará assim:

```javascript
import React from 'react';
import { render } from 'react-dom';
render(<h1>Hello World</h1>, document.getElementById('app'));
```
Com o método *render* podemos enviar código html diretamente para uma DIV, no caso, a *div#app* criada no index.html, e já é possível observar no servidor.

**Para criar o primeiro componente, criamos o arquivo *App.js* (Todo componente inicia com letra maiúscula).**

Dentro de todo componente React, precisamos importar o mesmo, então usamos o `import React from 'react';`.

Agora criamos a função *app* que contém apenas um `return <h1>Hello App</h1>;` e no final do arquivo, exportamos a função com `export default App;`.

Já no *index.js*, podemos importar o componente usando `import App from './App'` (já que está na mesma pasta podemos usar assim). Com o componente importado, podemos usá-lo como uma Tag, dessa forma:

```javascript
import App from './App';
render(<App />, document.getElementById('app'));
```

Convencionalmente criamos todos os componentes na pasta *src/components*.

**FRAGMENT**

**OBS: o método return aceita apenas uma tag como retorno (no caso de mais de uma, normalmente usamos uma <div> para exportar). Para evitar código longo desncessário (como todo componente precisar ser exportado como uma div sempre que tiver mais de uma tag) usamos o conceito de FRAGMENT, onde ao invés de uma tag *div* criamos uma tag vazia (<>CONTENT</>).**

## Propriedades

Qualquer informação passada de um componente pai para componente filho.

Ex: Um Header com títulos diferentes.

- Criamos um componente *Head* em *Components/Head.js* e ele renderiza um H2 com um valor personalizado.
- Passamos um atributo na *TAG* do Head (Ex: <Head title="HomeSana" />)
- No componente *HEAD* inserimos o parâmetro *props* na função (ele é quem irá receber as propriedades e tornar possível usá-las). É possível fazer desestruturação também.
- Para usar a propriedade passada no HTML, usamos as chaves **{}** para inserir javascript no html.

Também é possível inserir HTML dentro das tags personalizadas, Ex:

```html
<Head title="Ola">
    <div>
        Ola Mundo
    </div>
</Head>
```
Para capturar o corpo da tag, **dentro do parâmetro props contém o parâmetro *children*, que pode ser acessado de dentro do component**.

## Estado e Imutabilidade

Usado para garantir performance com aplicações com muitos dados.

Suponha que você tenha um array *projects* e queira exibir na página, usamos:

```javascript
function App(){
    const projects = ['DoneList', 'SteamStoreBR'];
    return(
        <>
        <Head title="HomeSana"/>
        <ul>
            {projects.map(project => <li key={project}>{project}</li>)}
        </ul>
        </>
    );
}
export default App;
```

Mapeamos cada elemento para a tag *li* que criamos dentro da tag *ul*. Funciona perfeitamente. Usamos o parâmetro **key** como ID para o React, que é a chave de registro único de cada elemento toda vez que temos um laço de repetição gerando código HTML.

Porém, caso você tenha um botão *Add Projeto*, para adicionar um projeto ao array, precisamos de uma função que insira o dado. Como estamos usando React, a declaração da função na tag button é bem simples, confira:

```javascript
function App(){
    const projects = ['DoneList', 'SteamStoreBR'];
    function handleAddProject(){
        projects.push(`Projeto ${Date.now()}`);
        console.log(projects);
    }
    return(
        <>
        <Head title="HomeSana"/>
        <ul>
            {projects.map(project => <li key={project}>{project}</li>)}
        </ul>
        <button type="button" onClick={handleAddProject} >Add Projeto</button>
        </>
    );
}
export default App;
```

Dessa forma, com o *console.log(projects)* garantimos que o elemento está sendo adicionado, porém, não é atualizado na página. Para fazer a mudança em tempo real, usamos o conceito de **estado**.

### Como usar o estado e Imutabilidade:

Agora, após importar o React na primeira linha, importamos por desestruturação o *useState* (Prefixo 'use' diz respeito a uma api que o React implementou onde conseguimos criar estados, antigamente eram classes). `import React, { useState } from 'react';`

Agora precisamos transformar o array *projects* em um estado, declarando o array com a função *useState*:

```javascript
const projects = useState(['DoneList', 'SteamStoreBR']);
```

A função useState retorna um array com dois elementos:

1. Variável com o valor inicial (Retorna o próprio array passado)
2. Função para atualizar o valor

Então, para otimizar o trabalho, desestruturamos o seu retorno:

```javascript
const [projects, setProjects] = useState(['DoneList', 'SteamStoreBR']);
```

E para atualizar na página HTML, usamos a função *setProjects* por meio da **imutabilidade**.

**Imutabilidade - Não é possível alterar o formato da variável (alterar, excluir) de maneira direta, ou seja, o que precisamos fazer é recriar a variável com todos os seus elementos. O método push() não respeita a imutabilidade, pois altera o valor original do array. Sempre que um método altera o valor original de um objeto, no react ele deve ser evitado. Nós sempre criamos um novo array.**

Então, para recriar o projeto passamos o novo array com o *spread operator*:

```javascript
setProjects([...projects, `Projeto ${Date.now()}`]);
```
**A variável projects não é alterada, é feita a recriação do array, com os valores que já estão nele e o novo elemento.**