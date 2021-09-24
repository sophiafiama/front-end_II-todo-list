# Front-end II

## Checkpoint 02

### Integrantes:

- [Leonardo Martins](https://github.com/leodsmartins/)
- [Silvano Araujo](https://github.com/Silvanoeng)
- [Sophia Fiama](https://github.com/sophiafiama)
- [Thays Gama](https://github.com/thaysgama)
- [Vitor Galbier](https://github.com/VitorGalbier)

## Projeto to-do Parte I e II:

### Objetivo

Olá Houser, tudo bem com você? Esta atividade tem como objetivo servir como segundo instrumento avaliativo da disciplina.
Se atente às instruções e bom trabalho. O entregável é uma aplicação de to-do (lista de coisas a fazer). O projeto terá 2 páginas. O projeto é individual.

## Instruções e requisitos do entregável

#### 1. A primeira página deve ter um formulário com os inputs: 
- a - Data de criação: o usuário não poderá alterar esse input, mas ele deve ser exibido.
- b - Data limite da tarefa: data que o usuário deseja terminar aquela tarefa.
- c - Descrição: texto da tarefa.
- d - Botão de submit.

#### 2.Validações:
- a - Nenhum campo pode ser vazio.
- b - A descrição deve ter mais que 10 caracteres.
- c - IMPORTANTE: Quando o usuário não preencher corretamente deve ser exibido um alerta indicando que existem erros na criação da tarefa.
- d - OPCIONAL: a data limite da tarefa deve ser hoje ou no futuro.

#### 3.Funcionalidades:
- a - Quando o usuário clicar em submit, se ele passar pela validação, a anotação deve ser exibida na tela por meio de um card.
- b - No card da anotação deve ter um botão para excluir a anotação. Quando ele for clicado deverá ser exibido um aviso confirmando a intenção de excluir
a anotação. Se o usuário confirmar a intenção de excluir, o card desta nota deve desaparecer.
- c - Ainda no card da anotação deverá existir um checkbox que ao ser clicado faz o texto daquela anotação ficar tachado. Tarefa concluida.
- d - Opcional: Escolher cor do fundo do card - (versão dark)

#### 4.Agora nós vamos criar uma outra página, onde iremos consumir uma api de lista de tarefas.
- a - O end-point “https://jsonplaceholder.typicode.com/todos/” responde com um JSON com 200 tarefas. Essas 200 tarefas devem ser consumidas pelo JS e renderizadas 
também como cards na página.
- b - Nas tarefas onde o atributo “completed": true” o texto do atributo title deve estar tachado. Pois significa que a tarefa ja foi completada.
- c - Nas tarefas onde o atributo “completed": false” o texto do atributo title deve estar em negrito. Pois significa que a tarefa está a fazer. 
- d - Exiba também o conteúdo do atributo “id”.

#### 5.ENTREGA:
- a - Devem ser entregues os arquivos HTML5, CSS3 e Javascript do projeto via Git/Github. Você deverá enviar o link do repositório por este formulário: https://forms.gle/CFCEmSgYeFBKXyL16 
	Até o dia 28/09/2021 às 23h59.



