// Enemies our player must avoid
var Enemy = function (x, y, velocidade,player) {
    // Variáveis ​​aplicadas a cada uma das nossas instâncias aqui,
    // nós fornecemos um para você começar

    // A imagem / sprite dos nossos inimigos, isso usa
    // um ajudante que fornecemos para carregar facilmente imagens
    this.player = player;
    this.x = x;
    this.y = y;
    this.velocidade = velocidade;
    this.sprite = 'images/enemy-bug.png';

};

// Atualiza a posição do inimigo, método obrigatório para o jogo
// Parâmetro: dt, um delta de tempo entre carrapatos
Enemy.prototype.update = function (dt) {

    // Você deve multiplicar qualquer movimento pelo parâmetro dt
    // que garantirá que o jogo seja executado na mesma velocidade
    // todos os computadores.

    this.screenOutX = 550;
    this.startX = -100;
    this.x += this.velocidade * dt;

    //reseta a posicao do inimigo quando fora do canvas
    this.resetEnemies();
    this.checkCollision();

};

Enemy.prototype.resetEnemies = function (){

    if (this.x > this.screenOutX) {
        this.x = this.startX;
        this.velocidade = 100 + Math.floor(Math.random() * 512);
    }

};

Enemy.prototype.checkCollision = function(){

    // Verifica colisao:
    // fonte: https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
    var player_p = {x: this.player.x, y: this.player.y, width: 50, height: 40};
    var enemy_e = {x: this.x, y: this.y, width: 60, height: 70};

    if (player_p.x < enemy_e.x + enemy_e.width &&
        player_p.x + player_p.width > enemy_e.x &&
        player_p.y < enemy_e.y + enemy_e.height &&
        player_p.height + player_p.y > enemy_e.y) {
        this.player.playerReset();

    }

};

// Desenhe o inimigo na tela, método obrigatório para o jogo
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Agora escreva sua própria classe de jogador
// Esta classe requer uma atualização (), render () e
// um método handleInput ().

var Player = function (x, y, velocidade) {

    this.startX = 200;
    this.startY = 380;
    this.x = this.startX;
    this.y = this.startY;
    this.velocidade = velocidade;
    this.sprite = 'images/char-boy.png';

};
Player.prototype.playerReset = function () {

    this.startX = 200;
    this.starty = 380;
    this.x = this.startX;
    this.y = this.starty;
}

Player.prototype.update = function () {


};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (keyPress) {
    switch (keyPress) {
        case 'left':
            this.x -= this.velocidade + 50;
            // nao deixa o player passar do canvas a esquerda
            if (this.x < 0) {
                this.x = 0;
            }
            break;
        case 'up':
            this.y -= this.velocidade + 30;
            // nao deixa o player mover para cima do canvas
            if (this.y < 0) {
                this.playerReset();
            }
            break;
        case 'right':
            this.x += this.velocidade + 50;
            // nao deixa o player passar do canvas a direita
            if (this.x > 400) {
                this.x = 400;
            }
            break;
        case 'down':
            this.y += this.velocidade + 30;
            //nao deixa o player mover para baixo do canvas
            if (this.y > 380) {
                this.y = 380;
            }
            break;
    }
};

// Agora instancie seus objetos.
// Coloque todos os objetos inimigos em uma matriz chamada allEnemies
// Coloque o objeto jogador em uma variável chamada jogador

let allEnemies = [];
let enemyMove = [60, 140, 220];
let player = new Player(200, 380, 50);
let enemy;

enemyMove.forEach(function (value) {
    enemy = new Enemy(0, value, 100 + Math.floor(Math.random() * 512),player);
    allEnemies.push(enemy);
});


// Método Player.handleInput (). Você não precisa modificar isso.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
