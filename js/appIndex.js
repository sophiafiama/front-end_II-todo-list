//Salvando informações

let nomeTexto = document.querySelector('.nomeTexto');
let nomeInput = document.querySelector('.nomeInput');
let validaNome = false;

let senhaTexto = document.querySelector('.senhaTexto');
let senhaInput = document.querySelector('.senhaInput');
let validaSenha = false;

let senhaTexto2 = document.querySelector('.senhaTexto2');
let senhaInput2 = document.querySelector('.senhaInput2');
let validaSenha2 = false;

let emailTexto = document.querySelector('.emailTexto');
let emailInput = document.querySelector('.emailInput');
let validaEmail = false;

const bntCriar = document.getElementById("bntCriar");

//se liver valores no localStorage com a ket 'listaDeCadastro' ele pega os valores, mas caso não tenha ele cria um array vazio.
let listaLocal = JSON.parse(localStorage.getItem('listaLS') || '[]');

//Estrutura de Cadastro

nomeInput.addEventListener('keyup', () => {
    if (nomeInput.value.length <= 2) {
        nomeTexto.innerHTML = "Nome: *Deve ter no mínimo 3 letras."
        nomeTexto.setAttribute('style', "color: red");
        nomeInput.setAttribute('style', "border: 1px solid red");
        validaNome = false;
    } else {
        nomeTexto.innerHTML = "Nome:"
        nomeTexto.setAttribute('style', "color: green");
        nomeInput.setAttribute('style', "border: 1px solid var(--bordaInput-grey)");
        validaNome = true;
    }
})


senhaInput.addEventListener('keyup', () => {
    if (senhaInput.value.length <= 3) {
        senhaTexto.innerHTML = "Senha: *Deve ter no mínimo 4 digitos."
        senhaTexto.setAttribute('style', "color: red");
        senhaInput.setAttribute('style', "border: 1px solid red");
        validaSenha = false;
    } else {
        senhaTexto.innerHTML = "Senha:"
        senhaTexto.setAttribute('style', "color: green");
        senhaInput.setAttribute('style', "border: 1px solid var(--bordaInput-grey)");
        validaSenha = true;
    }
})

senhaInput2.addEventListener('keyup', () => {
    if (senhaInput2.value != senhaInput.value) {
        senhaTexto2.innerHTML = "Senha: *Deve ter no mínimo 4 digitos."
        senhaTexto2.setAttribute('style', "color: red");
        senhaInput2.setAttribute('style', "border: 1px solid red");
        validaSenha2 = false;
    } else {
        senhaTexto2.innerHTML = "Senha:"
        senhaTexto2.setAttribute('style', "color: green");
        senhaInput2.setAttribute('style', "border: 1px solid var(--bordaInput-grey)");
        validaSenha2 = true;
    }
})

emailInput.addEventListener('keyup', () => {
    if (!emailInput.checkValidity()) {
        emailTexto.innerHTML = "E-mail: *Não é valido."
        emailTexto.setAttribute('style', "color: red");
        emailInput.setAttribute('style', "border: 1px solid red");
        validaEmail = false;
    } else {
        emailTexto.innerHTML = "E-mail:"
        emailTexto.setAttribute('style', "color: green");
        emailInput.setAttribute('style', "border: 1px solid var(--bordaInput-grey)");
        validaEmail = true;
    }
})


bntCriar.addEventListener('click', (event) => {
    event.preventDefault();
    if (validaNome && validaSenha && validaSenha2 && validaEmail) {
        //Insere os dados ao array listaDeCadastros
        listaLocal.push(
            {
                nome: nomeInput.value,
                senha: senhaInput.value,
                email: emailInput.value
            }
        );
        //Insere os dados de listaDeCadastros no localStorage
        localStorage.setItem('listaLS', JSON.stringify(listaLocal));

        window.location = "lista-tarefas.html";
        
    } else {
        if (!validaNome) {
            nomeInput.focus()
        } else if (!validaSenha) {
            senhaInput.focus()
        } else if (!validaSenha2) {
            senhaInput2.focus()
        } else { emailInput.focus() }
    }
});

window.onload = function (){
    fetch('https://dog.ceo/api/breeds/image/random')
    .then((response)=> response.json())
    .then((json) => {
        let image = document.querySelector('.image')
        image.style.cssText = `background: url(${json.message});
                                background-size: cover;`
        localStorage.setItem('img', json.message)
    })
}


//Pegar todos os usuários na base de dados


// let button = document.querySelector('button')
// button.addEventListener('click', function (event) {
//     event.preventDefault()
//     let usuario = document.getElementById('username').value.trim()
//     let senha = document.getElementById('password').value
//     let senha2 = document.getElementById('password-2').value

//     let validaCampos = () => {
//         if (!usuario) {
//             alert('Usuario precisa ser preenchido')
//         } else if (!senha) {
//             alert('Senha precisa ser preenchida')
//         } else if (senha != senha2) {
//             alert('As senhas precisam ser iguais')
//         }
//     }

//     validaCampos()

//     fetch('https://jsonplaceholder.typicode.com/users')
//         .then((response) => response.json())
//         .then((json) => json.map(json => {
//             if (json.username == usuario) {
//                 alert("Usuário encontrado.")
//                 localStorage.setItem('usuario', usuario)
//                 document.location.href = '/lista-tarefas.html'
//             } else {
//                 console.log("Usuário não encontrado.")
//             }
//         }))
// })



