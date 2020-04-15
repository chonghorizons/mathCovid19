var probability=0.01 // 1%
var initialsize=500 //
var waves=[50,5,2,1]

// var probability=0.10 // 10%
// var initialsize=50 //
// var waves=[2,1]




function processWaves(startvalue,endvalue,waveindex,waves, arrayOfInfection, display) {
  if (display) {
    console.log("processing " + startvalue + "start " + endvalue + "end " + waveindex +  "waveindex");
  }
  let localTestCount=0;
  // debugger;
  if (startvalue==endvalue) {
    // the batch size is 1
    // console.log("size1");
    return 1;
  }

  //check for any true
  var someTrue= arrayOfInfection.slice(startvalue,endvalue+1).some((x)=> x==true);

  if (someTrue) {
    localTestCount++
    // console.log("some true")
    // debugger;
    var waveSize=waves[waveindex];
    var currentvalue=startvalue;
    while( currentvalue<=endvalue ) {
      localTestCount=localTestCount+processWaves(currentvalue,Math.min(currentvalue+waveSize-1),waveindex+1,waves, arrayOfInfection);
      currentvalue=currentvalue+waveSize;
    }
    return localTestCount;
  } else {
    // console.log("all negative")
    return 1; // localTestCount
  }
}

// var arrayOfResults=[];
// var repetitions=500;
//
// for (let i=0; i<repetitions; i++) {
//   console.log("iteration " + i );
//   var arrayOfRandom = Array.from({length: initialsize}, () => Math.random());
//   var arrayOfInfection = arrayOfRandom.map( (x) => (x<probability) );
//
//   var MyResult= processWaves(0,initialsize-1,0);
//   console.log("MAIN RESULT");
//   console.log(MyResult);
//   arrayOfResults.push(MyResult);
// }
// console.log("Average over repititions " + repetitions);
// var Average= arrayOfResults.reduce((a,b) => a + b, 0) / arrayOfResults.length
// console.log(Average)


function runSimulation( probability, initialsize, waves, repetitions, display) {
  var arrayOfResults=[];
  for (let i=0; i<repetitions; i++) {
    if (display) console.log("iteration " + i );
    var arrayOfRandom = Array.from({length: initialsize}, () => Math.random());
    var arrayOfInfection = arrayOfRandom.map( (x) => (x<probability) );

    var MyResult= processWaves(0,initialsize-1,0,waves,arrayOfInfection, display);
    if (display) console.log("MAIN RESULT");
    if (display) console.log(MyResult);
    arrayOfResults.push(MyResult);
  }
  console.log("Average over repititions " + repetitions);
  var Average= (arrayOfResults.reduce((a,b) => a + b, 0) / arrayOfResults.length ) - 1 //the minus 1 is that the code automatically checks the whole group. See runSimulation( 1, 50, [1], 10);
  console.log(Average)
  console.log("probability " + probability + "initialsize " + initialsize + "waves " + waves);
}

runSimulation( 0.01, 500, [40,5,1], 10000, false); // 70.7458
runSimulation( 0.01, 500, [80,16,4,1], 10000, false); // 62.7949
