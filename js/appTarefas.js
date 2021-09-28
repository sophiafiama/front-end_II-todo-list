const usuario = JSON.parse(localStorage.getItem('usuario'));
const userId = JSON.parse(localStorage.getItem('userId'));
const nomeUsuario = document.getElementById('nome-usuario');
const img = localStorage.getItem('img');
const usuarioImg = document.querySelector('.user-image');
const tarefasPendentes = document.querySelector('.tarefas-pendentes');
const tarefasConcluidas = document.querySelector('.tarefas-concluidas');
const btnAddTarefa = document.getElementById('adicionar-tarefa');
const validar = document.getElementById('validar');
const calendar = document.getElementById('prazo');
let contador = 1;

window.onload = function () {
    //inclui o nome do usuário logado para nova pagina
    nomeUsuario.innerHTML = usuario;


    let today = new Date()

    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();


    //Adiciona 0 na frente de numeros menores que 10/
    day < 10 ? day = '0' + day : null;
    month < 10 ? month = '0' + month : null;

    //Definindo valor do input do calendario para a data atual /
    today = `${year}-${month}-${day}`;
    calendar.setAttribute("min", today);

    usuarioImg.src = img;


    //pega dados da api de tarefas
    fetch('https://jsonplaceholder.typicode.com/todos')
        //recebe a respota da API em JSON e tranforma em um objeto javascript
        .then((response) => response.json())
        //recebe o objeto e percorre os 20 primeiros elementos pegando suas informações e transformando em cards
        
        .then((json) => (json.forEach(json => {
            if (json.userId == userId) {
                let texto = `${json.id} - ${json.title}`
                if (json.completed == false) {
                    createCard(tarefasPendentes, texto)
                } else {
                    createCard(tarefasConcluidas, texto)
                }
                contador=json.id +1
            } else {
                // let num= num+1
                // console.log(num)
            }
        })))


}


// função para criar novas tarefas - createCard(tarefasPendentes) - como o texto está undefined, ele vai puxar o value do input 
// função para criar tarefas a partir da API(novas e concluidas) - createCard(tarefasPendentes, textoAPI) || createCard(tarefasConcluidas, textoAPI)
let createCard = (elementoPai, textoTarefa) => {

    let novaTarefa;
    if (textoTarefa == undefined) {
        novaTarefa = `${contador} - ${document.getElementById('nova-tarefa').value.trim()}`;
    } else {
        novaTarefa = textoTarefa;
    }

    contador++;

    //função para pegar a data do dia formatada
    let dataDia = function () {
        let meses = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth().toString(); //Janeiro é 0.
        //formata ano para pegar apenas os dois últimos dígitos
        let yy = today.getFullYear().toString().substr(-2);
        //adiciona zero se o mês tiver apenas um dígito
        // if(dd<10) dd='0'+dd;
        // if(mm<10) mm='0'+mm;
        return (dd + '-' + meses[mm] + '-' + yy);
    };


    let definirPrazo = function () {

        var dataPrazo = document.getElementById('prazo').valueAsDate;
        if (dataPrazo == null) {
            dataPrazo = dataDia();
            return dataPrazo;

        } else {
            let meses = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
            let dia = dataPrazo.getDate() + 1;
            let mes = dataPrazo.getMonth().toString();
            let ano = dataPrazo.getFullYear().toString().substr(-2);
            return dia + "-" + meses[mes] + "-" + ano;
        }

    }


    elementoPai.innerHTML += `<li class="tarefa">
                                        <div class="not-done"></div>
                                        <div class="descripcion">
                                            <p class="nome">${novaTarefa}</p>
                                            <div><p class="timestamp">Criada: ${dataDia()}</p>
                                            <p class="timestamp">Prazo: ${definirPrazo()}</p></div>
                                         </div>
                                         <div class="excluir"><i class="fas fa-trash icon"></i></div>
                                    </li>`;
}

//adiciona a função de criar o card ao botão '+'
btnAddTarefa.addEventListener('click', function () {
    //impede de atualizar a página
    event.preventDefault();
    let tarefa = document.getElementById('nova-tarefa');
    if (tarefa.value.trim().length >= 10) {
        createCard(tarefasPendentes)
        tarefa.value = "";
        validar.innerHTML = "";
        tarefa.style.cssText = "border-bottom: 1px solid lightgrey;"
    } else {
        tarefa.style.cssText = "border-bottom: 1px solid var(--secondary);"
        validar.innerHTML = `<i class="fas fa-exclamation-circle"></i> Insira no mínimo 10 caracteres`
    }
});

// evento para remover elemento de uma div e inserir em outra 
tarefasPendentes.addEventListener('click', function (event) {
    //seleciona e armazena o elemento pai (div tarefa) para que possamos realoca-la
    let tarefa = event.target.parentNode;
    //se alvo do evento for elemento de classe 'not-done'
    if (event.target.classList.contains('not-done')) {
        //remove a div tarefa 
        tarefa.parentNode.removeChild(tarefa);
        //realoca de acordo com o novo pai selecionado
        tarefasConcluidas.appendChild(tarefa)
    }
    if (event.target.classList.contains('excluir')) {
        let confirma = confirm('Deseja excluir a tarefa?')
        if (confirma) {
            tarefa.parentNode.removeChild(tarefa);
        }
    }
    if (event.target.classList.contains('icon')) {
        let confirma = confirm('Deseja excluir a tarefa?')
        if (confirma) {
            tarefa = tarefa.parentNode;
            tarefa.parentNode.removeChild(tarefa);
        }
    }
})


// evento para remover elemento de uma div e inserir em outra
tarefasConcluidas.addEventListener('click', function (event) {
    //seleciona e armazena o elemento pai (div tarefa) para que possamos realoca-la
    let tarefa = event.target.parentNode;
    //se alvo do evento for elemento de classe 'not-done'
    if (event.target.classList.contains('not-done')) {
        //remove a div tarefa 
        tarefa.parentNode.removeChild(tarefa);
        //realoca de acordo com o novo pai selecionado
        tarefasPendentes.appendChild(tarefa)
    }
    if (event.target.classList.contains('excluir')) {
        let confirma = confirm('Deseja excluir a tarefa?')
        if (confirma) {
            tarefa.parentNode.removeChild(tarefa);
        }
    }
    if (event.target.classList.contains('icon')) {
        let confirma = confirm('Deseja excluir a tarefa?')
        if (confirma) {
            tarefa = tarefa.parentNode;
            tarefa.parentNode.removeChild(tarefa);
        }
    }
})

// insere o loading antes da pagina
document.onreadystatechange = function () {
    document.querySelector("body").style.visibility = "hidden";
    document.querySelector(".loading-mask").style.visibility = "visible";
    setTimeout(function () {
        document.querySelector(".loading-mask").style.display = "none";
        document.querySelector("body").style.visibility = "visible";
    }, 1000)
};