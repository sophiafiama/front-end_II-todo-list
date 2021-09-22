const usuario = localStorage.getItem('usuario');
const nomeUsuario = document.getElementById('nome-usuario');
const tarefasPendentes = document.querySelector('.tarefas-pendentes');
const tarefasConcluidas = document.querySelector('.tarefas-concluidas');
const btnAddTarefa = document.getElementById('adicionar-tarefa')


window.onload =  function(){
    //inclui o nome do usuário logado para nova pagina
    nomeUsuario.innerHTML = usuario;

    //pega dados da api de tarefas
    fetch('https://jsonplaceholder.typicode.com/todos')
        //recebe a respota da API em JSON e tranforma em um objeto javascript
        .then((response) => response.json())
        //recebe o objeto e percorre os 20 primeiros elementos pegando suas informações e transformando em cards
        .then((json)=> {
            for (let i = 0; i < 20; i++) {
                if(json[i].completed == false){
                    createCard(tarefasPendentes, json[i].title)
                } else{
                    createCard(tarefasConcluidas, json[i].title)
                }
            }
    })
}



// função para criar novas tarefas - createCard(tarefasPendentes) - como o texto está undefined, ele vai puxar o value do input 
// função para criar tarefas a partir da API(novas e concluidas) - createCard(tarefasPendentes, textoAPI) || createCard(tarefasConcluidas, textoAPI)
let createCard = (elementoPai, textoTarefa) =>{
    
    let novaTarefa;
    if (textoTarefa == undefined){
        novaTarefa = document.getElementById('nova-tarefa').value;
    } else{
        novaTarefa=textoTarefa;
    }

    //função para pegar a data do dia formatada
    let dataDia = function(){
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth()+1; //Janeiro é 0.
        //formata ano para pegar apenas os dois últimos dígitos
        let yyyy = today.getFullYear().toString().substr(-2);
        //adiciona zero se o mês tiver apenas um dígito
        if(dd<10) dd='0'+dd;
        if(mm<10) mm='0'+mm;
        return (dd+'/'+mm+'/'+yyyy);
        };

    elementoPai.innerHTML += `<li class="tarefa">
                                        <div class="not-done"></div>
                                        <div class="descripcion">
                                            <p class="nome">${novaTarefa}</p>
                                            <p class="timestamp">Criada: ${dataDia()}</p>
                                         </div>
                                    </li>`;
}

//adiciona a função de criar o card ao botão '+'
btnAddTarefa.addEventListener('click', function (){
    //impede de atualizar a página
    event.preventDefault();
    createCard(tarefasPendentes)
});