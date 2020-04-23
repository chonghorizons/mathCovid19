// From Codepen
// From Codepen
// https://codepen.io/CraneWing/pen/egaBze

// HC edited codepen:  https://codepen.io/chonghorizons/pen/JjYbydv

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let demoEvent = document.getElementById('demo-event');
let demoName = document.getElementById('demo-name');

let fps, totalFrames, spriteSize, 
 animRequest, cats, birds, ellipses,
 balls;

let MyCanvasObj;

let states = {
	run1: false,
	run2: false,
	run3: false,
	run4: false,
	run5: false
};

demoEvent.innerHTML = '';


$('#colorSquares').on('click', function() {
	demoName.innerHTML = '';
	demoName.innerHTML = 'ColorSuqares';

	demoEvent.innerHTML = '';
	demoEvent.innerHTML = '<strong>Description:</strong> Non-animated and not too exciting. Produces a simple pattern of randomly colored squares. Every time "Color Squares" button is clicked, you get a new grid of colors.';

	MyCanvasObj =  new colorSquares();

	states.colorSquares = true;
	
	MyCanvasObj.init();
});

$('#run1').on('click', function() {
	demoName.innerHTML = '';
	demoName.innerHTML = 'Run';

	demoEvent.innerHTML = '';
	let weekNumber=Number($('#week')[0].value)
	let summaryObj=Storage5[weekNumber];


	demoEvent.innerHTML = `<h5>Week ${summaryObj.week}</h5> \
		<h5>newInfections ${summaryObj.newInfections}</h5>       \
		<h5>week1Infections ${summaryObj.week1Infections}</h5>       \
		<h5>week2Infections ${summaryObj.week2Infections}</h5>       \
		<h5>r0 ${summaryObj.r0}</h5>       \
		<h5>Recovered ${summaryObj.Recovered}</h5>       \
		<h5>Quarantined ${summaryObj.Quarantined}</h5>       \
		<h5>Week ${summaryObj.week}</h5>       \
	`;

	MyCanvasObj = new run1();

	states.run1 = true;
	
	MyCanvasObj.init();
});


function getRandom(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}




function run1() {

	this.init = function() {
		this.draw();
		console.log('done');
	};

	this.draw = function() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		

		for (var i = 0; i < PodArray.length; i ++) {
		  for (var j = 0; j < PodArray[i].length; j++) {
		  	this.drawRect(i, j);
		  }
		}
	};
 
 	// hard coded to podsize 20. So this will be 5 wide and 4 tall.
 	// So 200 pods wide, 250 pods tall.
	this.drawRect = function(pod, podIndex) {
		let weekNumber=Number($('#week')[0].value)

 		let viewport_wide=1000;
 		let viewport_tall=1000;
 		let pod_wide=5;
 		let pod_tall=4;
 		let pods_per_row=viewport_wide/pod_wide; //200
 		let pods_per_column=viewport_tall/pod_tall; //250
 		let cell_width=1;
 		let cell_height=1;

		let red = 0;
		let green = (Storage5[weekNumber].PodArray[pod][podIndex].infection.status=="infected") ? 256 : 0;
		// let blue = this.myHue(x,y);
		//let red = this.randomHue();
		//let green = this.randomHue();
		let blue = Storage5[weekNumber].PodArray[pod][podIndex].infection.status=="recovered"  ? 256 : 0;
		
	// var quotient = Math.floor(y/x);
	// var remainder = y % x;

		let podx= (pod % 200)*5;
		let pody= Math.floor(pod/200)*4;

		let relative_x=podIndex % 5
		let relative_y=Math.floor(podIndex/5)

		ctx.beginPath();
		ctx.rect(podx+relative_x, pody+relative_y , 1, 1);
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




MyNum=3;

function colorSquares() {
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