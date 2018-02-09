//定义常量,包括canvas边界,每一格的大小
const LEFT_BOUNDARY=2,RIGHT_BOUNDARY=404,TOP_BOUNDARY=-23,BOTTOM_BOUNDARY=392,ROW=101,COLUNM=83,OFFSET=60,RADIUS=30;
var Enemy = function(x, y, speed) {
  this.x = x*ROW;
  this.y = y*COLUNM+OFFSET;
  this.speed = speed;
  this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.update = function(dt) {
  //虫子横向移动
  this.x += dt * this.speed;

  //碰撞检测
  if (this.y == player.y) {
    //同一行时检测x坐标
    if (Math.abs(this.x - player.x) < RADIUS) {
      player.restart();
    }
  }

  //胜利检测
  if (player.y == TOP_BOUNDARY) {
    player.restart();
  }

  //生成随机速度,随机位置的虫子
  if(this.x>500){
    //最慢的速度为70
    this.speed=Math.random()*500+70;
    this.x=-Math.random()*1000;
    //生成随机生成0 1 2 三个整数
    this.y=Math.floor(Math.random()*3)*COLUNM+OFFSET;
  }
};

Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function(x, y) {
  this.x = x*ROW;
  this.y = y*COLUNM+OFFSET;
  this.sprite = 'images/char-boy.png';
};
Player.prototype.update = function(dt) {
};

Player.prototype.moveLeft= function(){
  if(this.x>LEFT_BOUNDARY){
    this.x-=ROW;
  }
}
Player.prototype.moveRight= function(){
  if(this.x<RIGHT_BOUNDARY){
    this.x+=ROW;
  }
}
Player.prototype.moveUp= function(){
  if(this.y>TOP_BOUNDARY){
    this.y-=COLUNM;
  }
}
Player.prototype.moveDown= function(){
  if(this.y<BOTTOM_BOUNDARY){
    this.y+=COLUNM;
  }
}
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//根据按键决定移动方向
Player.prototype.handleInput = function(movement) {
  switch (movement) {
    case 'left':
      player.moveLeft();
      break;
    case 'right':
    player.moveRight();
      break;
    case 'up':
      player.moveUp();
      break;
    case 'down':
      player.moveDown();
      break;
  }
};
Player.prototype.restart = function() {
  this.x = ROW * 2;
  this.y = OFFSET + COLUNM * 4;
}

var allEnemies = [
  new Enemy(3,1,100),
  new Enemy(0,1,200),
  new Enemy(1,2,300),
  new Enemy(2,2,200),
  new Enemy(4,2,200),
  new Enemy(4,0,200),
  new Enemy(2,0,400)
];

var player = new Player(2,4);

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Player.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
  player.handleInput(allowedKeys[e.keyCode]);
});
