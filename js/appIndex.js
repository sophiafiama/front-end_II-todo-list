//Salvando informações
let imageInput = document.querySelector('.imageInput');
let validaImage = false;

let idUsuario = 0;

let nomeTexto = document.querySelector('.nomeTexto');
let nomeInput = document.querySelector('.nomeInput');
let nomeVerificador
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


//Estrutura de Cadastro

//Validação do nome
nomeInput.addEventListener('keyup', () => {
    if (nomeInput.value.trim().length < 3) {
        nomeTexto.innerHTML = "Nome: *Deve ter no mínimo 3 letras."
        nomeInput.setAttribute('style', "border: 2px solid red");
        validaNome = false;
    } else {
        nomeTexto.innerHTML = "Nome:"
        
        fetch('https://jsonplaceholder.typicode.com/users')
            .then((response) => response.json())
            .then((json) => json.map(json => {
                if (json.username == nomeInput.value) {
                    nomeInput.setAttribute('style', "border: 2px solid blue");
                    nomeTexto.innerHTML = "Nome:"
                    idUsuario = json.id
                    validaNome = true;
                    nomeVerificador = json.username
                }
            }))
        
    }
    //Quando é feito o map pela api é guardado o nome que está no cadastro, pois caso a pessoa edite o nome apos digitar um nome valido, seja novamente apresentado que o nome não está na lista de cadastro. 
    if (nomeInput.value != nomeVerificador && nomeInput.value.trim().length > 2) {
        nomeInput.setAttribute('style', "border: 2px solid red"); 
        nomeTexto.innerHTML = "Nome: *Não consta no "+`<a href="https://jsonplaceholder.typicode.com/users">Cadastro.</a>`
        validaNome = false;
    }
})

//Validação da senha
senhaInput.addEventListener('keyup', () => {
    if (senhaInput.value.length < 4) {
        senhaTexto.innerHTML = "Senha: *Deve ter no mínimo 4 digitos."
        senhaInput.setAttribute('style', "border: 2px solid red");
        validaSenha = false;
    } else {
        senhaTexto.innerHTML = "Senha:"
        senhaInput.setAttribute('style', "border: 2px solid blue");
        validaSenha = true;
    }
})

senhaInput2.addEventListener('keyup', () => {
    if (senhaInput2.value != senhaInput.value) {
        senhaTexto2.innerHTML = "Senha: *Confirme a senha."
        senhaInput2.setAttribute('style', "border: 2px solid red");
        validaSenha2 = false;
    } else {
        senhaTexto2.innerHTML = "Repetir senha:"
        senhaInput2.setAttribute('style', "border: 2px solid blue");
        validaSenha2 = true;
    }
})

//Validação do email
emailInput.addEventListener('keyup', () => {
    if (!emailInput.checkValidity()) {
        emailTexto.innerHTML = "E-mail: *Não é valido."
        emailInput.setAttribute('style', "border: 2px solid red");
        validaEmail = false;
    } else {
        emailTexto.innerHTML = "E-mail:"
        emailInput.setAttribute('style', "border: 2px solid blue");
        validaEmail = true;
    }
})


//Estrutura para transformar uma imagem local(file) em uma URL codificada em base64 do arquivo.
const imagemPrevia = document.querySelector('.imagemPrevia');
const imagemInput = document.querySelector('.imagemInput');
const imagemBotao = document.querySelector('.imagemBotao');

imagemBotao.onclick = () => imagemInput.click();

imagemInput.onchange = e => {
    const fileToUpload = e.target.files.item(0);
    const reader = new FileReader();
    reader.onload = e => {
        imagemPrevia.src = e.target.result;
        localStorage.setItem('img', e.target.result)
    }
    reader.readAsDataURL(fileToUpload);
};


//Evento quando o usuario clica me Criar conta.
bntCriar.addEventListener('click', (event) => {
    event.preventDefault();
    
    //Faz a validação, caso algum do itens estejá como false, é feito o foco no input
    if (validaNome && validaSenha && validaSenha2 && validaEmail) {

        localStorage.setItem('userId', JSON.stringify(idUsuario));
        localStorage.setItem('usuario', JSON.stringify(nomeInput.value));
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

//Consumindo a api dos dog, para gerar a primeira foto de perfil.
window.onload = function () {
    fetch('https://dog.ceo/api/breeds/image/random')
        .then((response) => response.json())
        .then((json) => {
            let image = document.querySelector('.imagemPrevia')
            image.setAttribute('src', json.message)
            localStorage.setItem('img', json.message)
        })
}
