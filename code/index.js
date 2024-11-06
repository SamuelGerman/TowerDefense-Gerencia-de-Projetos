// Seleciona o elemento canvas e obtém o contexto 2D para desenhar
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

// Define as dimensões do canvas
canvas.width = 1280;
canvas.height = 768;

// Define a cor de preenchimento do contexto
context.fillStyle = 'white';

// Constantes para o tamanho do mapa e dos tiles
const MAP_TILE_COUNT_X = 20; // Número de tiles na horizontal
const MAP_TILE_COUNT_Y = 12;  // Número de tiles na vertical
const TILE_SIZE = 64;         // Tamanho de cada tile em pixels
const IS_BUILDING_TILE = 14;  // Valor que representa um tile de construção

// Preenche o fundo do canvas com a cor branca
context.fillRect(0, 0, canvas.width, canvas.height);

// Cria uma matriz para armazenar os dados dos tiles
const placementTilesDataMatrix = [];

// Converte o array de dados dos tiles em uma matriz 2D
for (let i = 0; i < placementTilesData.length; i += MAP_TILE_COUNT_X) {
    placementTilesDataMatrix.push(placementTilesData.slice(i, i + MAP_TILE_COUNT_X));
}

// Array para armazenar os tiles de colocação
const placementTiles = [];

// Itera sobre a matriz de dados dos tiles
placementTilesDataMatrix.forEach((row, y) => {
    row.forEach((symbol, x) => {
        // Se o símbolo representa um tile de construção, cria um novo PlacementTile
        if (symbol === IS_BUILDING_TILE) {
            placementTiles.push(new PlacementTile({ position: { x: x * TILE_SIZE, y: y * TILE_SIZE } }));
        }
    });
});

// Carrega a imagem do mapa para a página web
const img = new Image();
img.onload = () => {
    animate(); // Inicia a animação quando a imagem estiver carregada
};
img.src = 'MapaTD.png'; // Caminho da imagem do mapa

// Array para armazenar os inimigos
const enemies = [];
for (let i = 1; i <= 10; i++) {
    const xOffset = i * 150; // Calcula um deslocamento para a posição inicial dos inimigos
    enemies.push(
        new Enemy({ position: { x: waypoints[1].x - xOffset, y: waypoints[1].y } }) // Cria novos inimigos na posição inicial
    );
}

// Função de animação que atualiza o canvas
function animate() {
    requestAnimationFrame(animate); // Solicita a próxima animação
    context.drawImage(img, 0, 0); // Desenha a imagem do mapa no canvas

    // Atualiza e desenha todos os inimigos
    enemies.forEach(enemy => {
        enemy.update();
    });

    // Atualiza e desenha todos os tiles de colocação
    placementTiles.forEach(tile => {
        tile.update(mouse);
    });
}

// Objeto para armazenar a posição do mouse
const mouse = {
    x: undefined,
    y: undefined
};

// Adiciona um evento para capturar a posição do mouse quando ele se move
window.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX; // Atualiza a posição X do mouse
    mouse.y = event.clientY; // Atualiza a posição Y do mouse
});