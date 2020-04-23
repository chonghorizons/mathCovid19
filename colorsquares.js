// From Codepen
// https://codepen.io/CraneWing/pen/egaBze

// HC edited codepen:  https://codepen.io/chonghorizons/pen/JjYbydv

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let demoEvent = document.getElementById('demo-event');
let demoName = document.getElementById('demo-name');

let fps, totalFrames, spriteSize, 
 animRequest, cats, birds, ellipses,
 balls, squares;

let states = {
	birds: false,
	cats: false,
	ellipses: false,
	balls: false,
	squares: false
};

demoEvent.innerHTML = '';

$('#birds').on('click', function() {
	demoName.innerHTML = '';
	demoName.innerHTML = 'Flying Birds';

	demoEvent.innerHTML = '';
	demoEvent.innerHTML =
 '<strong>Description:</strong> Random number of birds flying, animated with sprite sheet. Randomly selected colors and speeds. If a bird hits a right or left boundary, it switches flying direction and angle.';
	
	birds = new Birds();
	
	states.birds = true;
	states.cats = false;
	states.ellipses = false;
	states.balls = false;
	states.squares = false;
	
	birds.init();
});

$('#cats').on('click', function() {
	demoName.innerHTML = '';
	demoName.innerHTML = 'Walking Cats';

	demoEvent.innerHTML = '';
	demoEvent.innerHTML = '<strong>Description:</strong> Random number of walking cats, animated with a spritesheet. Also random is each cat\'s color, speed and direction. When a cat bumps a boundary wall, it changes to sprite animation in the opposite direction.'

	cats = new Cats();

	states.cats = true;
	states.birds = false;
	states.ellipses = false;
	states.balls = false;
	states.squares = false;
	
	cats.init();
});

$('#ellipses').on('click', function() {
	demoName.innerHTML = '';
	demoName.innerHTML = 'Rotating Elllipses';

	demoEvent.innerHTML = '';
	demoEvent.innerHTML = '<strong>Description:</strong> A rotating design of colorful ellipses using the canvas ellipse method.';

	ellipses = new Ellipses();

	states.ellipses = true;
	states.cats = false;
	states.birds = false;
	states.balls = false;
	states.squares = false;
	
	ellipses.init();
});

$('#balls').on('click', function() {
	demoName.innerHTML = '';
	demoName.innerHTML = 'Bouncing Balls';

	demoEvent.innerHTML = '';
	demoEvent.innerHTML = '<strong>Description:</strong> Random number of balls in random colors that bounce around the canvas and rebound when they hit a border.';

	balls = new Balls();

	states.balls = true;
	states.cats = false;
	states.birds = false;
	states.ellipses = false;
	states.squares = false;

	balls.init();
});

$('#color-squares').on('click', function() {
	demoName.innerHTML = '';
	demoName.innerHTML = 'Color Squares';

	demoEvent.innerHTML = '';
	demoEvent.innerHTML = '<strong>Description:</strong> Non-animated and not too exciting. Produces a simple pattern of randomly colored squares. Every time "Color Squares" button is clicked, you get a new grid of colors.';

	colorSquares = new ColorSquares();

	states.squares = true;
	states.balls = false;
	states.cats = false;
	states.birds = false;
	states.ellipses = false;
	
	colorSquares.init();
});


function startAnimation() {
	//console.log('startAnimation called!');

	if (!animRequest) {
		loop();
	}
}

function stopAnimation() {
	if (animRequest) {
		window.cancelAnimationFrame(animRequest);
		animRequest = undefined;
	}
}

function getRandom(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function loop() {
  let lastTime = 0;
  let now = Date.now();
  let	delta = now - lastTime;
  
  lastTime = now;

  if (states.birds) {
  	birds.update();
  	birds.draw(delta);
  }
  else if (states.cats) {
  	cats.move();
  	cats.draw(delta);
  }
  else if (states.ellipses) {
  	ellipses.draw();
  }
  else if (states.balls) {
  	balls.update();
  	balls.draw();
  }

  animRequest = window.requestAnimationFrame(loop);
}

function Birds() {
	this.totalSprites = getRandom(12, 20);
	this.sprites = [];
	this.spriteSize = 48;
	this.xLimit = canvas.width - 50;
  this.yLimit = canvas.height - 50;
  this.frameSeq = [0, 1, 2];
  this.totalFrames = this.frameSeq.length - 1;
  this.fps = 8;
  this.image = new Image();

  this.spriteStartFrame = {
		brown: 0,
		red: 3,
		blue: 6,
		white: 9
	};

	this.init = function() {
		var self = this;
		this.image.src = 'https://bit.ly/2lr52sa';

		this.image.onload = function() {	
			self.setUpSprites();
			startAnimation();
		};
	};

	this.setUpSprites = function() {
		for (var i = 0; i < this.totalSprites; i++) {
			let color = this.getRandomColor();
			let currentFrame = this.spriteStartFrame[color];

			let sprite = {
			  x: getRandom(100, this.xLimit),
			  y: getRandom(100, this.yLimit),
			  image: this.image,
			  imgWidth: this.spriteSize,
			  imgHeight: this.spriteSize,
			  drawY: 288,
			  radians: 0,
			  xUnits: 0,
			  yUnits: 0,
			  color: color,
			  speed: getRandom(1, 4),
			  currentFrame: currentFrame,
			  angle: getRandom(35, 60),
			};
			
			this.sprites.push(sprite);
		}
	};

	this.draw = function(delta) {
		ctx.save();
		
		ctx.clearRect(
			0, 0,
			canvas.width,
			canvas.height
		);

		ctx.restore();

		this.sprites.forEach((sprite) => {
			this.updateFrame(delta, sprite);	

			if (sprite.color === 'red')
				sprite.currentFrame += 3;
			else if (sprite.color === 'blue')
				sprite.currentFrame += 6;
			else if (sprite.color === 'white')
				sprite.currentFrame += 9;
		
			sprite.x += sprite.xUnits;
		  sprite.y += sprite.yUnits;

			ctx.drawImage(
				sprite.image,
				sprite.currentFrame * this.spriteSize,
				sprite.drawY,
				sprite.imgWidth,
				sprite.imgHeight,
				sprite.x,
				sprite.y,
				sprite.imgWidth,
				sprite.imgHeight
			);

			this.checkBorders(sprite);
		});
	};

	this.getRandomColor = function() {
		let num = getRandom(1, 4), color;

		if (num === 1) 
			color = 'brown';
		else if (num === 2)	
			color = 'red';
	  else if (num === 3) 
		  color = 'blue';
		else 
			color = 'white';
			
		return color;
	};

	this.checkBorders = function(sprite) {
		if (sprite.x < 0 || sprite.x + sprite.imgWidth > canvas.width) {
			sprite.angle = 180 - sprite.angle;
			sprite.drawY = (sprite.drawY === 240) ? 288 : 240;
			
			this.updateSprite(sprite);
		}

		if (sprite.y < 0 ||
		 sprite.y + sprite.imgHeight > canvas.height) {
			sprite.angle = 360 - sprite.angle;
			
			this.updateSprite(sprite);
		}
	};

	this.update = function() {
		var self = this;
		
		this.sprites.forEach(function(sprite) {
			self.updateSprite(sprite);
		});
	};

	this.updateSprite = function(sprite) {
		sprite.radians = sprite.angle * Math.PI/180;
		
		sprite.xUnits = Math.cos(sprite.radians) * sprite.speed;
		sprite.yUnits = Math.sin(sprite.radians) * sprite.speed;
	};

	this.updateFrame = function(delta, sprite) {
		sprite.currentFrame = Math.floor(delta * this.fps/1000) % this.totalFrames;

		if (sprite.currentFrame === this.totalFrames) {
			sprite.currentFrame = 0;
		}		
	};
}

function Cats() {
	this.numCats = getRandom(18, 25);
	this.cats = [];
	this.fps = 20;
	this.totalFrames = 3;
	this.xBound = 550;
	this.yBound = 550;

	this.catSpriteStartFrame = {
		gray: 0,
		white: 3,
		darkGray: 6,
		tan: 9
	};

	this.spriteSize = 48;
	this.image = new Image();

	this.init = function() {
		var self = this;
		this.image.src = 'https://bit.ly/2lT58tj';

		this.image.onload = function() {	
			self.setUpSprites();
			startAnimation();
		}
	};

	this.setUpSprites = function() {
		for (var i = 0; i < this.numCats; i++) {	
			let dirInfo = this.setDirection();
			let color = this.setColor();

			let cat = {
			  x: getRandom(50, this.xBound),
			  y: getRandom(50, this.yBound),
			  posY: dirInfo[1],
			  image: this.image,
			  color: color,
			  currentFrame: this.catSpriteStartFrame[color],
			  direction: dirInfo[0],
			  speed: getRandom(1, 5),
			  angle: getRandom(35, 90)
			};
			
			this.cats.push(cat);
		}
	};

	this.move = function() {
		this.cats.forEach((cat) => {
			this.checkBorders(cat);

			switch(cat.direction) {
				case 'up':
					cat.y -= cat.speed;
					break;
				case 'down':
					cat.y += cat.speed;
					break;
				case 'left':
					cat.x -= cat.speed;
					break;
				case 'right': 
					cat.x += cat.speed;
					break;
			}
		});
	};

	this.draw = function(delta) {
		ctx.clearRect(
			0, 0,
			canvas.width,
			canvas.height
		);

		this.cats.forEach((cat) => {
			this.updateFrame(delta, cat);
			var frame = 0;

			if (cat.color === 'white')
				cat.currentFrame += 3;
			else if (cat.color === 'darkGray')
				cat.currentFrame += 6;
			else if (cat.color === 'tan')
				cat.currentFrame += 9;

			ctx.drawImage(
				cat.image,
				cat.currentFrame * 48,
				cat.posY,
				this.spriteSize, 
				this.spriteSize,
				cat.x, cat.y,
				this.spriteSize,
				this.spriteSize
			);
		});
	};

	this.checkBorders = function(cat) {
		if (cat.x < 0 || cat.x + this.spriteSize > canvas.width) {
			cat.speed = -cat.speed;
			cat.posY = (cat.posY === 48) ? 96 : 48;
		}

		if (cat.y < 0 || cat.y + this.spriteSize > canvas.height) {
			cat.speed = -cat.speed;
			cat.posY = (cat.posY === 0) ? 144 : 0;
		}
	};

	this.updateFrame = function(delta, cat) {
	  cat.currentFrame = Math.floor(delta * this.fps/1000) % this.totalFrames;

	  if (cat.currentFrame === this.totalFrames) {
	  	cat.currentFrame = 0;
	  }
	};

	this.setColor = function() {
		let num = getRandom(1, 4), color;

		if (num === 1)
			color = 'gray';
		else if (num === 2)		
			color = 'white';
	  else if (num === 3)
		  color = 'darkGray';
		else 
			color = 'tan';

		return color;
	};

	this.setDirection = function() {
		var dir, yPos;
		var dirNum = getRandom(1, 4);

		if (dirNum === 1) {
			dir = 'up';
			yPos = 144;
		}
		else if (dirNum === 2) {
			dir = 'down';
			yPos = 0;
		}
		else if (dirNum === 3) {
			dir = 'left';
			yPos = 48;
		}
	  else if (dirNum === 4) {
	  	dir = 'right';
	  	yPos = 96;
	  }

	  return [dir, yPos];
	};
}

function Ellipses() {
	this.angle = 0;

	this.init = function() {
		startAnimation();
	};

	this.draw = function() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		var count = 0;

		for (var i = 0; i < 360; i += 6) {
			ctx.beginPath();

			ctx.ellipse(
				canvas.width/2,
				canvas.height/2,
				15, 235,
				(this.angle + i) * Math.PI/180,
				0, 2 * Math.PI
			);

			switch(count) {
				case 0:
					ctx.strokeStyle = '#008000';
					break;
				case 1:
					ctx.strokeStyle = '#0000ff';
					break;
			  case 2: 
			  	ctx.strokeStyle = '#ff0000';
			  	break;
			  case 3: 
			  	ctx.strokeStyle = '#800080';
			}

			ctx.stroke();
			ctx.closePath();

			if (count === 3) 
				count = 0;
			else 
				count++;
		}
		
		this.angle++;

		if (this.angle === 361) this.angle = 0;
	};
}

function Balls() {
	this.totalBalls = getRandom(18, 26);
	this.balls = [];

	this.init = function() {
		this.setUpBalls();
		startAnimation();
	}

	this.setUpBalls = function() {
		for (var i = 0; i < this.totalBalls; i++) {
			let red = getRandom(0, 255);
			let green = getRandom(0, 255);
			let blue = getRandom(0, 255);
			let color = `rgb(${red},${green},${blue})`;
			let radius = (getRandom(8, 30));
			let speed = this.setBallSpeed(radius);

			let ball = {
			  x: getRandom(50, 550),
			  y: getRandom(50, 550),
			  radius,
			  radians: 0,
			  color,
			  xUnits: 0,
			  yUnits: 0,
			  speed,
			  angle: getRandom(35, 60)
			};
			
			this.balls.push(ball);
		}
	};

	this.draw = function() {
		ctx.clearRect(
			0, 0,
			canvas.width,
			canvas.height
		);

		this.balls.forEach((ball) => {
			ball.x += ball.xUnits;
		  ball.y += ball.yUnits;

			ctx.fillStyle = ball.color;
			ctx.beginPath();
			
			ctx.arc(
				ball.x, ball.y,
				ball.radius, 0, 
				2 * Math.PI, false
			);

			ctx.closePath();
			ctx.fill();

			this.checkBorders(ball);
		});
	};

	this.checkBorders = function(ball) {
		if (ball.x < 0 || ball.x > canvas.width) {
			ball.angle = 180 - ball.angle;
			
			this.updateBall(ball);
		}

		if (ball.y < 0 || ball.y > canvas.height) {
			ball.angle = 360 - ball.angle;
			
			this.updateBall(ball);
		}
	}

	this.update = function() {
		this.balls.forEach(function(ball) {
			//updateBall(ball);
			ball.radians = ball.angle * Math.PI/180;
		
			ball.xUnits = Math.cos(ball.radians) * ball.speed;
			ball.yUnits = Math.sin(ball.radians) * ball.speed;
		});
	};

	this.updateBall = function(ball) {
		
	}

	this.setBallSpeed = function(radius) {
		let speed = 0;

		if (radius >= 8 && radius <= 13) {
			speed = getRandom(10, 12);
		}
		else if (radius >= 14 && radius <= 18) {
			speed = getRandom(7, 9);
		}
		else if (radius >= 19 && radius <= 24) {
			speed = getRandom(4, 6);
		}
		else if (radius >= 25 && radius <= 30) {
		 	speed = getRandom(1, 3);
		}

		return speed;
	};
}

MyNum=3;


function ColorSquares() {
	this.init = function() {
		this.draw();
	};

	this.draw = function() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		
		for (var i = 0; i < 600/MyNum; i ++) {
		  for (var j = 0; j < 600/MyNum; j++) {
		  	this.drawRect(i, j);
		  }
		}
	};

	this.drawRect = function(x, y) {
		let red = Math.floor(x/(600/MyNum)*256);
		let green = Math.floor(y/(600/MyNum)*256);
		// let blue = this.myHue(x,y);
		//let red = this.randomHue();
		//let green = this.randomHue();
		let blue = 256-this.myHue(x,y);
		
		ctx.beginPath();
		ctx.rect(x*MyNum, (y*MyNum) , MyNum, MyNum);
		ctx.fillStyle = `rgb(${red},${green},${blue})`;
		ctx.fill();
	};

	this.myHue = function(x,y) {
	  // 	let num = 0 ;
	  let num = Math.floor((x+y)/(600+600)*256) ;
		return num;
	}


	this.randomHue = function() {
		let num = Math.floor(Math.random() * 256) + 1;
		return num;
	};
}