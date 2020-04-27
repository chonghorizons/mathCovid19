// From Codepen
// From Codepen
// https://codepen.io/CraneWing/pen/egaBze

// HC edited codepen:  https://codepen.io/chonghorizons/pen/JjYbydv

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let canvas2 = document.getElementById('canvas2');
let ctx2 = canvas2.getContext('2d');
let demoEvent = document.getElementById('demo-event');
let demoName = document.getElementById('demo-name');
let legend= document.getElementById('legend');

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
	let summaryObj=Storage21[weekNumber];


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






//draw legend.. hard coded (need to refactor, low priority)
let rgbArray = [
 			[180,50,0], 
 			[0,150,150],
 			[256,10,0],
 			[0,256,0],
			[60,60,150],
			[140,140,140]
			]

	index=0;
	rgbArray.forEach((rgb) => {
		let red=rgb[0];
		let green=rgb[1];
		let blue=rgb[2];

		ctx2.beginPath();
		ctx2.rect(index*30, 0 , 20, 20);
		ctx2.fillStyle = `rgb(${red},${green},${blue})`;
		ctx2.fill();

		index++;
	})


	legend.innerHTML = 'INFECTED qurantined aaysmptomatic , qs.   a,   s,   NOTINFECTED    quar.    RECOVERED '
	

	states.run1 = true;
	MyCanvasObj.init();



});


$('#next').on('click', function() {
	demoName.innerHTML = '';
	demoName.innerHTML = 'Run';

	demoEvent.innerHTML = '';
	$('#week')[0].value++;
	let weekNumber=Number($('#week')[0].value)
	let summaryObj=Storage21[weekNumber];


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
		let weekNumber=Number($('#week')[0].value)
		console.log('done for week: ' + weekNumber );
	};

	this.draw = function() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		let weekNumber=Number($('#week')[0].value)
		

		for (var i = 0; i < Storage21[weekNumber].PodArray.length; i ++) {
		  for (var j = 0; j < Storage21[weekNumber].PodArray[i].length; j++) {
		  	this.drawRect(i, j);
		  }
		}
	};
 

	this.drawRect = function(pod, podIndex) {
		let weekNumber=Number($('#week')[0].value)


		// hard coded to podsize 2000. population 100000 
 		// viewport is 500 wide, 200 tall
 		// Each pod is this will be 50 wide and 40 tall.
 		// So 10 pods wide, 5 pods tall.
 		let viewport_wide=500;
 		let viewport_tall=200;
 		let pod_wide=50;
 		let pod_tall=40;
 		let pods_per_row=500/50;
 		let pods_per_column=200/40;
 		let cell_width=2;
 		let cell_height=3;

 		let person=Storage21[weekNumber].PodArray[pod][podIndex];
 		let infected = person.infection.status==="infected";
 		let asymptomatic= person.infection.symptomatic===false;
 		let recovered = person.infection.status==="recovered";
 		let quarantined = person.infection.quarantine===true;

 		let rgb=[0,0,0];

 		if (infected) {
 			if (quarantined) {
 				 if (asymptomatic) {
 					rgb = [180,50,0];
 				} else {
 					rgb=  [0,150,150];
 				}
 				
 			} else {
 				if (asymptomatic) {
 					rgb = [256,10,0];
 				} else {
 					rgb = [0,256,0];
 				}
 			}

 		} else {
 			//not infected
 			if (quarantined) {
 				rgb=  [60,60,150];
 			} 
 			if (recovered) {
 				rgb=  [140,140,140];
 			} 
 		}



		let red=rgb[0];
		let green=rgb[1];
		let blue=rgb[2];

		let podx= (pod % pods_per_row)*pod_wide;
		let pody= Math.floor(pod/pods_per_row)*pod_tall;

		let relative_x=podIndex % pod_wide
		let relative_y=Math.floor(podIndex/pod_wide)

		ctx.beginPath();
		ctx.rect((podx+relative_x)*cell_width, (pody+relative_y)*cell_height , cell_width, cell_height);  //void ctx.rect(x, y, width, height);
		ctx.fillStyle = `rgb(${red},${green},${blue})`;
		ctx.fill();
	};

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