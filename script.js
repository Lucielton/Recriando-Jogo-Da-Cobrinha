const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const box = 32;
const snake = [];
snake[0] = {
  posX: 8 * box,
  posY: 8 * box
}
let direction = 'right';
let food = {
  posX: Math.floor((Math.random() * 15) + 1) * box,
  posY: Math.floor((Math.random() * 15) + 1) * box
}
function criarBackground() {
  context.fillStyle = 'lightgreen';
  context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarCobrinha() {
  for (let i = 0; i < snake.length; i++) {
    context.fillStyle = 'green';
    context.fillRect(snake[i].posX, snake[i].posY, box, box);
  }
}

function criarComida() {
  context.fillStyle = 'red';
  context.fillRect(food.posX, food.posY, box, box);
}

document.addEventListener('keydown', update);

function update(event) {

  if(event.keyCode == 37 && direction != 'right') direction = 'left';
  if(event.keyCode == 38 && direction != 'down') direction = 'up';
  if(event.keyCode == 39 && direction != 'left') direction = 'right';
  if(event.keyCode == 40 && direction != 'up') direction = 'down';
}

function iniciarJogo() {
  if(snake[0].posX > 15 * box && direction == 'right') snake[0].posX = 0;
  if(snake[0].posX < 0 * box && direction == 'left') snake[0].posX = 15 * box;
  if(snake[0].posY < 0 * box && direction == 'up') snake[0].posY = 15 * box;
  if(snake[0].posY > 15 * box && direction == 'down') snake[0].posY = 0;

  for(let i=1; i<snake.length; i++){
    if(snake[0].posX == snake[i].posX && snake[0].posY == snake[i].posY){
      clearInterval(jogo);
      alert('Game Over :c');
    }
  }

  criarBackground();
  criarComida();
  criarCobrinha();

  let snakeX = snake[0].posX;
  let snakeY = snake[0].posY;

  switch(direction){
    case 'right':
      snakeX += box;
      break;
    case 'left':
      snakeX -= box;
      break;
    case 'up':
      snakeY -= box;
      break;
    case 'down':
      snakeY += box;
      break;
  }

  if(snakeX != food.posX || snakeY != food.posY){
    snake.pop();
  }else{
    food.posX = Math.floor(Math.random() * 15 + 1) * box;
    food.posY = Math.floor(Math.random() * 15 + 1) * box;
  }

  let newHead = {
    posX: snakeX,
    posY: snakeY
  }

  snake.unshift(newHead);
}

const jogo = setInterval(iniciarJogo, 100);
