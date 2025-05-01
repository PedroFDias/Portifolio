var typed = new Typed(".text", {
    strings: ["Desenvolvedor de Software", "Estudande de Programação"],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});


window.addEventListener('scroll', function () {
    const header = document.getElementById('cabecalho');
    if (window.scrollY > 50) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }
});

document.addEventListener("DOMContentLoaded", () => {

    const projetos = document.getElementById('projetos');
    const modal = document.getElementById('modal');
    const titulo = document.getElementById('modal-title');
    const descricao = document.getElementById('modal-description');
    const tecno = document.getElementById('tecnologias');
    const participacao = document.getElementById('participacao');
    const btnClose = document.querySelector('.modal-close');
    const carroselHTML = document.querySelector('#carouselExampleSlidesOnly .carousel-inner');

    projetos.innerHTML = '';

    let jsonProjetos = [];

    fetch('./data/projetos.json')
        .then(res => res.json())
        .then(data => {
            jsonProjetos = data;

            let projTab = '';
            jsonProjetos.forEach(p => {
                projTab += `<div class="projeto" id="${p.id}">
                                <h4>${p.titulo}</h4>
                                <img class="casacidada" src="${p.images[0]}" alt="">
                                <div class="linkIcons">
                                    <a href="${p.link}"><i class="bi bi-github"></i></a>
                                    <a href="#!" class="saiba-mais"><span>Saiba-mais</span><i class="bi bi-info-circle"></i></a>
                                </div>
                            </div>`;
            })
            projetos.innerHTML = projTab;

            document.querySelectorAll('.saiba-mais').forEach(btn => {
                btn.addEventListener('click', e => {
                    e.preventDefault();

                    const idCard = parseInt(btn.closest('.projeto').id, 10);
                    const proj = jsonProjetos.find(p => p.id === idCard);

                    let carrosel = `<div class="carousel-item active">
                                    <img src="${proj.images[0]}" class="d-block w-100" alt="...">
                                </div>`;
                    for (let i = 1; i < proj.images.length; i++) {
                        carrosel += `<div class="carousel-item">
                                    <img src="${proj.images[i]}" class="d-block w-100" alt="...">
                                </div>`;
                    }

                    carroselHTML.innerHTML = carrosel;
                    titulo.textContent = proj.titulo;
                    descricao.textContent = proj.descricao;
                    tecno.textContent = proj.tecnologias;
                    participacao.textContent = proj.participacao;
                    modal.style.display = "flex";
                })
            })

            btnClose.addEventListener("click", () => {
                modal.style.display = "none";  // Esconde o modal
            });

            // Fecha o modal ao clicar fora do conteúdo
            modal.addEventListener("click", e => {
                if (e.target === modal) {
                    modal.style.display = "none";  // Esconde o modal
                }
            });
        })
        .catch(err => console.error('Erro carregando projects.json:', err));


})