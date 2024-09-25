
let input = document.querySelector("input");
let select = document.querySelector("#opcoesPaginacao");
let series = document.querySelector(".series");
let botaoProximo = document.querySelector(".botoes #botaoProximo");
let botaoAnterior = document.querySelector(".botoes #botaoAnterior");
let numeroPaginaHtml = document.querySelector(".botoes p");
let limitePagina = 10;
let numeroPagina = 1;

addEventListener("DOMContentLoaded", imprimeSeries);

botaoProximo.addEventListener("click", aumentaPagina);
botaoAnterior.addEventListener("click", diminuiPagina);
select.addEventListener("change", trocaLimitePagina)

function trocaLimitePagina() {
  let opcao = select.value;
  if (opcao.includes('10')){
    limitePagina = 10;
    imprimeSeries();
  } else if(opcao.includes('15')){
    limitePagina = 15;
    imprimeSeries();
  } else if(opcao.includes('20')){
    limitePagina = 20;
    imprimeSeries();
  }
  console.log(opcao);
}

function rolaProComeco() {
  window.scrollTo({
    behavior: "smooth",
    top: 0
  })
}


function aumentaPagina() {
  numeroPagina++;
  numeroPaginaHtml.textContent = numeroPagina;
  imprimeSeries(numeroPagina, limitePagina);
  rolaProComeco();
}

function diminuiPagina() {
  if(numeroPagina > 1){
    numeroPagina--;
    numeroPaginaHtml.textContent = numeroPagina;
    imprimeSeries(numeroPagina, limitePagina);
    rolaProComeco();
  }
}


async function imprimeSeries() {
  let dados = await buscarObjetoPaginaLimite(numeroPagina, limitePagina);
  let dadosHTML = '';
  dados.forEach((dadoAtual) => {
    dadosHTML += `
    <div class="serie-box">
            <h3>${dadoAtual.titulo}</h3>
            <div class="img-box">
              <img src="${dadoAtual.imagem}" alt="${dadoAtual.titulo}">
            </div>
            <div class="conteudo">
              <div class="descricao">
              ${dadoAtual.resumo}
              </div>
              <div class="generos">

              </div>
            </div>
          </div>`
    series.innerHTML = dadosHTML;
  })
}


async function buscarObjetoPaginaLimite(pagina, limite) {
  let resposta = await fetch(`http://localhost:3000/series?pagina=${pagina}&limite=${limite}`);
  let json = await resposta.json();
  return json.data;
}

async function buscarObjetoTitulo(titulo) {
  let resposta = await fetch(`http://localhost:3000/series?titulo=${titulo}`);
  let json = await resposta.json();
  return json.data;
}
