const usuario = localStorage.getItem('usuario');
const nomeUsuario = document.getElementById('nome-usuario');
const tarefasPendentes = document.querySelector('.tarefas-pendentes');
const tarefasConcluidas = document.querySelector('.tarefas-concluidas');
const btnAddTarefa = document.getElementById('adicionar-tarefa');
const validar = document.getElementById('validar');


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
                let texto = `${json[i].id} - ${json[i].title}`
                if(json[i].completed == false){
                    createCard(tarefasPendentes, texto)
                } else{
                    createCard(tarefasConcluidas, texto)
                }
            }
    })
}


let contador = 1;
// função para criar novas tarefas - createCard(tarefasPendentes) - como o texto está undefined, ele vai puxar o value do input 
// função para criar tarefas a partir da API(novas e concluidas) - createCard(tarefasPendentes, textoAPI) || createCard(tarefasConcluidas, textoAPI)
let createCard = (elementoPai, textoTarefa) =>{
    
    let novaTarefa;
    if (textoTarefa == undefined){
        novaTarefa = `${contador} - ${document.getElementById('nova-tarefa').value.trim()}`;
    } else{
        novaTarefa=textoTarefa;
    }

    contador++;
    //função para pegar a data do dia formatada
    let dataDia = function(){
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth()+1; //Janeiro é 0.
        //formata ano para pegar apenas os dois últimos dígitos
        let yy = today.getFullYear().toString().substr(-2);
        //adiciona zero se o mês tiver apenas um dígito
        if(dd<10) dd='0'+dd;
        if(mm<10) mm='0'+mm;
        return (dd+'/'+mm+'/'+yy);
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
    let tarefa = document.getElementById('nova-tarefa');
    if (tarefa.value.trim().length >=10){
        createCard(tarefasPendentes)
        validar.innerHTML = "";
        tarefa.style.cssText="border-bottom: 1px solid lightgrey;"
    } else{
        tarefa.style.cssText="border-bottom: 1px solid var(--secondary);"
        validar.innerHTML = `<i class="fas fa-exclamation-circle"></i> Insira no mínimo 10 caracteres`
    }
});

// evento para remover elemento de uma div e inserir em outra 
tarefasPendentes.addEventListener('click', function (event){
    //se alvo do evento for elemento de classe 'not-done'
    if (event.target.classList.contains('not-done')) {
        //seleciona e armazena o elemento pai (div tarefa) para que possamos realoca-la
        let tarefa = event.target.parentNode;
        //remove a div tarefa 
        tarefa.parentNode.removeChild(tarefa);
        //realoca de acordo com o novo pai selecionado
        tarefasConcluidas.appendChild(tarefa)
    }
})

// evento para remover elemento de uma div e inserir em outra
tarefasConcluidas.addEventListener('click', function (event){
    //se alvo do evento for elemento de classe 'not-done'
    if (event.target.classList.contains('not-done')) {
        //seleciona e armazena o elemento pai (div tarefa) para que possamos realoca-la
        let tarefa = event.target.parentNode;
        //remove a div tarefa 
        tarefa.parentNode.removeChild(tarefa);
        //realoca de acordo com o novo pai selecionado
        tarefasPendentes.appendChild(tarefa)
    }
})

// insere o loading antes da pagina
document.onreadystatechange = function() {
    document.querySelector("body").style.visibility = "hidden";
    document.querySelector(".loading-mask").style.visibility = "visible";
    setTimeout(function (){
        document.querySelector(".loading-mask").style.display = "none";
        document.querySelector("body").style.visibility = "visible";
    },1000)
};