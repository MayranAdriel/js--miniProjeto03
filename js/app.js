let paginaAtual = 1;
let limiteAtual = 10;

document.getElementById('botaoBuscar').addEventListener('click', function () {
    const titulo = document.getElementById('campoBusca').value;
    paginaAtual = 1;
    buscarSeries(titulo, paginaAtual, limiteAtual);
});

document.getElementById('seletorLimite').addEventListener('change', function () {
    limiteAtual = this.value;
    const titulo = document.getElementById('campoBusca').value;
    buscarSeries(titulo, paginaAtual, limiteAtual);
});

document.getElementById('botaoPaginaAnterior').addEventListener('click', function () {
    if (paginaAtual > 1) {
        paginaAtual--;
        const titulo = document.getElementById('campoBusca').value;
        buscarSeries(titulo, paginaAtual, limiteAtual);
    }
});

document.getElementById('botaoProximaPagina').addEventListener('click', function () {
    paginaAtual++;
    const titulo = document.getElementById('campoBusca').value;
    buscarSeries(titulo, paginaAtual, limiteAtual);
});

function buscarSeries(titulo, pagina, limite) {
    fetch(`http://localhost:3000/series?titulo=${titulo}&pagina=${pagina}&limite=${limite}`)
        .then(response => response.json())
        .then(dados => {
            exibirSeries(dados.series);
            document.getElementById('paginaAtual').innerText = paginaAtual;
        })
        .catch(erro => {
            console.error('Erro ao buscar séries:', erro);
        });
}

function exibirSeries(series) {
    const container = document.getElementById('containerSeries');
    container.innerHTML = ''; // Limpar a exibição anterior

    series.forEach(serie => {
        const seriesCard = `
            <div class="col-md-3 series-card">
                <div class="card">
                    <img src="${serie.poster}" class="card-img-top series-img" alt="${serie.titulo}">
                    <div class="card-body">
                        <h5 class="card-title">${serie.titulo}</h5>
                        <p class="card-text">Ano: ${serie.ano}</p>
                        <p class="card-text">Gênero: ${serie.genero}</p>
                    </div>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', seriesCard);
    });
}
