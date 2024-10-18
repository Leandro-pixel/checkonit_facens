// Lógica
// 1 - Selecionar elementos que devem ser animados
// 2 - Definir a classe que é adicionada durante a animação
// 3 - Criar função de animação
// 3.1 - Verificar a distância entre a barra de scroll e o topo do site
// 3.2 - Verificar se a distância do 3.1 + Offset é maior do que a distância entre o elemento e o Topo da Página.
// 3.3 - Se verdadeiro adicionar classe de animação, remover se for falso.
// 4 - Ativar a função de animação toda vez que o usuário utilizar o Scroll
// 5 - Otimizar ativação

/*este código é para otimizar o scroll que fica ativando trocentas vezes
sem necessidade, aí essa função deixa o site mais leve
para funções assim*/
const debounce = function(func, wait, immediate) {
    let timeout;
    return function(...args) {
      const context = this;
      const later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

const target = document.querySelectorAll('[data-anime]');
const animationClass = 'animate' //nome da classe criada no css

function animeScroll() {
 const windowTop = window.pageYOffset + ((window.innerHeight * 3) / 4); //esse pageYoffset a tag pega o eixo vertical da pagina/ esse calculo garante a funcionalidade em qualquer tela
 target.forEach(function(e) { //aqui ele ta pegando cada elemento(forEach) da pagina

    if((windowTop)>e.offsetTop) { //se o top do window for maior que os elementos
        e.classList.add(animationClass); 
    } else {
        e.classList.remove(animationClass); 
    }


    //console.log(e.offsetTop) //e.offsetTop ele pega a distancia de cada item com o top da página
 })
}

animeScroll(); //garantir que a função sempre esteja acionada

if(target.length) { //se caso não tiver nenhum elemento para animar ele não ativa
    window.addEventListener('scroll', debounce(function(){
        animeScroll();
        console.log('scrolling')
    }, 50)); //segundo argumento do debounce
}

