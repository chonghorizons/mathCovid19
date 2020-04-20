# mathCovid19

I'm lazy, so I just interactively load up a devtools console and run everything in the browser console.

Projects:

## math_batchtest.js
WRITEUP OF IDEA: Secret #1 on http://tinyurl.com/batchPods

It simulates the expected number of runs needed to identify all covid-positive patients if the probability of each one is set to a small number, like 1%.

Also, see https://www.pcr-pooling.com/

* How to run:  Just copy the code into javascript console. Or `node ./math_batchtest.js`

## Leaky Locakdown
Two files:

- leakylockdown.js // simulation engine
- simulation.js // separate file with some simulations I've run.

Sorry, there isn't a ton of documentation about all the parameters. The best way to learn about the parameters is to change one and re-run the simulation.

* How to run: just copy the code of leakylockdown.js into your browser JS console. Then, run the SampleRun code that is commented at the end.

```
 // SAMPLE CODE 
// * Copy the above code into node.js, and then run the code below.
// NOTE: This simulation takes about 60 seconds to run.

//  console.log(PopulationInitial);

// GLOBALquarantineCompliance=0.0;
// PodQuarantine=false;
// ContactTraceBack=false;
// ContactTraceForward=false;
// var Storage1= [];
// InitializeEverything0({
// 				  	atRisk: false,
// 					exposuresPerWeek: 80,
// 					distancingCompliance: 0.5, 
// 					quarantineCompliance: 0.0,
// 					podIntegrity: 0.0,
// 					noHandwash: 1.0,
// 				});
// // Run 30 rounds
// for (var i=0; i<30; i++) {
// 	t(Storage1);
// }

// var Run1PodArray=PodArray;

// // sample person
// PodArray[0][0];
```


