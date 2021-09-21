const usuario = localStorage.getItem('usuario');
const nomeUsuario = document.getElementById('nome-usuario');

window.onload =  function(){
    nomeUsuario.innerHTML = usuario;
}