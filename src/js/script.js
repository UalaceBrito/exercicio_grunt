document.addEventListener('DOMContentLoaded', function () {
  var botao = document.querySelector('[data-action="saudacao"]');

  if (botao) {
    botao.addEventListener('click', function () {
      var nome = document.getElementById('nome-usuario');
      var mensagem = nome && nome.value ? nome.value : 'aluno';
      alert('Olá, ' + mensagem + '! Este projeto foi compilado com Grunt.');
    });
  }
});
