//Salvando informações
let imageInput = document.querySelector('.imageInput');
let validaImage = false;

let idUsuario = 0;

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
                idUsuario = json.id
                validaNome = true;
            } else {
                
            }
        }))
        
    }
})


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
        senhaTexto2.innerHTML = "Senha: *Digite novamente a senha."
        senhaInput2.setAttribute('style', "border: 2px solid red");
        validaSenha2 = false;
    } else {
        senhaTexto2.innerHTML = "Senha:"
        senhaInput2.setAttribute('style', "border: 2px solid blue");
        validaSenha2 = true;
    }
})

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

const imagemPrevia = document.querySelector('.imagemPrevia');
const imagemInput = document.querySelector('.imagemInput');
const imagemBotao = document.querySelector('.imagemBotao');

imagemBotao.onclick = () => imagemInput.click();

imagemInput.onchange = e => {
    const fileToUpload = e.target.files.item(0);
    const reader = new FileReader();
    reader.onload = e => {
        imagemPrevia.src = e.target.result;
        localStorage.setItem('img', e.target.result)}
    reader.readAsDataURL(fileToUpload);
    
};




bntCriar.addEventListener('click', (event) => {
    event.preventDefault();
    if (validaNome && validaSenha && validaSenha2 && validaEmail) {
       
        
       
        //Insere os dados ao array listaDeCadastros
        listaLocal.push(
            {
                id: idUsuario,
                image: imagemInput.value,
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
        let image = document.querySelector('.imagemPrevia')
        image.setAttribute('src', json.message)
        localStorage.setItem('img', image)
    })
}
