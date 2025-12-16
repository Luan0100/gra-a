// Banco de dados simulado dos jogos
const games = [
    {
        id: 1,
        title: "The Legend of Zelda: Ocarina of Time",
        genre: "rpg",
        desc: "Uma obra-prima atemporal da Nintendo. Controle Link em sua jornada através do tempo para impedir Ganondorf de obter a Triforce. Revolucionou os jogos 3D com seu sistema de mira Z-targeting.",
        year: 1998,
        dev: "Nintendo EAD",
        img: "https://placehold.co/600x400/1a4a1a/FFF?text=Zelda+Ocarina"
    },
    {
        id: 2,
        title: "The Witcher 3: Wild Hunt",
        genre: "rpg",
        desc: "Geralt de Rívia procura sua filha adotiva em um mundo aberto vasto e perigoso. Conhecido por sua narrativa profunda, escolhas morais complexas e gráficos impressionantes.",
        year: 2015,
        dev: "CD Projekt Red",
        img: "https://placehold.co/600x400/5a1a1a/FFF?text=The+Witcher+3"
    },
    {
        id: 3,
        title: "Grand Theft Auto V",
        genre: "acao",
        desc: "Um mundo aberto satírico e detalhado. Acompanhe a história de três criminosos muito diferentes — Michael, Franklin e Trevor — enquanto eles arriscam tudo em uma série de assaltos ousados.",
        year: 2013,
        dev: "Rockstar North",
        img: "aa.jpeg.png"
    },
    {
        id: 4,
        title: "Minecraft",
        genre: "sandbox",
        desc: "O jogo mais vendido de todos os tempos. Um mundo de blocos infinito onde o único limite é sua imaginação. Construa castelos, explore cavernas e sobreviva à noite.",
        year: 2011,
        dev: "Mojang",
        img: "https://placehold.co/600x400/2a5a2a/FFF?text=Minecraft"
    },
    {
        id: 5,
        title: "Elden Ring",
        genre: "rpg",
        desc: "A colaboração entre George R.R. Martin e Hidetaka Miyazaki. Um RPG de ação punitivo e recompensador situado nas Terras Intermédias, cheio de mistérios e chefes épicos.",
        year: 2022,
        dev: "FromSoftware",
        img: "https://placehold.co/600x400/4a4a1a/FFF?text=Elden+Ring"
    },
    {
        id: 6,
        title: "Super Mario World",
        genre: "acao",
        desc: "O clássico do SNES que definiu o gênero plataforma 2D. Mario e Luigi viajam pela Dinosaur Land para salvar a Princesa Toadstool de Bowser, introduzindo o Yoshi pela primeira vez.",
        year: 1990,
        dev: "Nintendo",
        img: "https://placehold.co/600x400/5a5a1a/FFF?text=Mario+World"
    }
];

// Seletores do DOM
const grid = document.getElementById('game-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const modal = document.getElementById('game-modal');
const closeBtn = document.querySelector('.close-btn');

// Elementos do Modal
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalGenre = document.getElementById('modal-genre');
const modalYear = document.getElementById('modal-year');
const modalDev = document.getElementById('modal-dev');

// Função para renderizar os cards
function renderGames(filter = 'all') {
    grid.innerHTML = ''; // Limpa o grid

    const filteredGames = filter === 'all' 
        ? games 
        : games.filter(game => game.genre === filter);

    filteredGames.forEach(game => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-id', game.id);
        
        card.innerHTML = `
            <img src="${game.img}" alt="${game.title}">
            <div class="card-content">
                <h3>${game.title}</h3>
                <p>Clique para ver detalhes</p>
            </div>
        `;

        // Adiciona evento de clique para abrir o modal
        card.addEventListener('click', () => openModal(game));
        grid.appendChild(card);
    });
}

// Lógica do Modal
function openModal(game) {
    modalImg.src = game.img;
    modalTitle.textContent = game.title;
    modalDesc.textContent = game.desc;
    modalGenre.textContent = game.genre.toUpperCase();
    modalYear.textContent = game.year;
    modalDev.textContent = game.dev;
    
    modal.classList.add('show');
}

closeBtn.addEventListener('click', () => {
    modal.classList.remove('show');
});

// Fechar modal clicando fora dele
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('show');
    }
});

// Lógica de Filtros
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove classe active de todos e adiciona no clicado
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Filtra os jogos
        const category = btn.getAttribute('data-filter');
        renderGames(category);
    });
});

// Inicialização
renderGames();
