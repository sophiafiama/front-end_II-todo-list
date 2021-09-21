//Salvando informações
//Estrutura de Login


//Pegar todos os usuários na base de dados
let button = document.querySelector('button')
button.addEventListener('click', function(event) {
    // event.preventDefault()
    let usuario = document.getElementById('username').value
    let senha = document.getElementById('password').value
    let senha2 = document.getElementById('password-2').value

    let validaCampos = () => {
        if (!usuario.trim()){
            alert('Usuario precisa ser preenchido')
        } else if (!senha.trim()){
            alert('Senha precisa ser preenchida')
        } else if (senha != senha2) {
            alert('As senhas precisam ser iguais')
        }
    }

    validaCampos()

    fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => response.json())
        .then((json) => json.map(json => {
            if (json.username == usuario) {
                alert("Usuário encontrado.")
                document.location.href = '/lista-tarefas.html'
            } else {
                console.log("Usuário não encontrado.")
        }
    }))
})

