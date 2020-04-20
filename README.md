# mathCovid19


2 epidemiological modeling Projects for coronavirus, Covid19, covid-19:

## math_batchtest.js
WRITEUP OF IDEA: Secret #1 on http://tinyurl.com/batchPods

It simulates the expected number of runs needed to identify all covid-positive patients if the probability of each one is set to a small number, like 1%.

Also, see https://www.pcr-pooling.com/

* How to run:  Just copy the code into javascript console. Or `node ./math_batchtest.js`

## Leaky Lockdown
WRITEUP OF IDEA: Secret #2 on http://tinyurl.com/batchPods

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

### Sample LeakyLockdown model run:

```
{main: 1000000, infected: 500, hospital: 0, recovered: 0, dead: 0}
VM124:399 SUMMARY WEEK: 1
VM124:400 new  :986
VM124:401 week1: 500
VM124:402 week2: 0
VM124:403 ThisWeek R0: 1.972
VM124:404 Quarantined (wk1+wk2): 0
VM124:405 QuarantineRatio: 0
VM124:406 recoverd:0
VM124:407 ===========
VM124:399 SUMMARY WEEK: 2
VM124:400 new  :2907
VM124:401 week1: 986
VM124:402 week2: 500
VM124:403 ThisWeek R0: 1.9562584118438762
VM124:404 Quarantined (wk1+wk2): 0
VM124:405 QuarantineRatio: 0
VM124:406 recoverd:0
VM124:407 ===========
VM124:399 SUMMARY WEEK: 3
VM124:400 new  :7770
VM124:401 week1: 2907
VM124:402 week2: 986
VM124:403 ThisWeek R0: 1.9958900590804007
VM124:404 Quarantined (wk1+wk2): 0
VM124:405 QuarantineRatio: 0
VM124:406 recoverd:500
VM124:407 ===========
VM124:399 SUMMARY WEEK: 4
VM124:400 new  :20917
VM124:401 week1: 7770
VM124:402 week2: 2907
VM124:403 ThisWeek R0: 1.9590709000655615
VM124:404 Quarantined (wk1+wk2): 0
VM124:405 QuarantineRatio: 0
VM124:406 recoverd:1486
VM124:407 ===========
VM124:399 SUMMARY WEEK: 5
VM124:400 new  :54120
VM124:401 week1: 20917
VM124:402 week2: 7770
VM124:403 ThisWeek R0: 1.8865688290863458
VM124:404 Quarantined (wk1+wk2): 0
VM124:405 QuarantineRatio: 0
VM124:406 recoverd:4393
VM124:407 ===========
VM124:399 SUMMARY WEEK: 6
VM124:400 new  :127099
VM124:401 week1: 54120
VM124:402 week2: 20917
VM124:403 ThisWeek R0: 1.6938177165931474
VM124:404 Quarantined (wk1+wk2): 0
VM124:405 QuarantineRatio: 0
VM124:406 recoverd:12163
VM124:407 ===========
VM124:399 SUMMARY WEEK: 7
VM124:400 new  :239148
VM124:401 week1: 127099
VM124:402 week2: 54120
VM124:403 ThisWeek R0: 1.3196629492492509
VM124:404 Quarantined (wk1+wk2): 0
VM124:405 QuarantineRatio: 0
VM124:406 recoverd:33080
VM124:407 ===========
VM124:399 SUMMARY WEEK: 8
VM124:400 new  :284195
VM124:401 week1: 239148
VM124:402 week2: 127099
VM124:403 ThisWeek R0: 0.7759654003991842
VM124:404 Quarantined (wk1+wk2): 0
VM124:405 QuarantineRatio: 0
VM124:406 recoverd:87200
VM124:407 ===========
VM124:399 SUMMARY WEEK: 9
VM124:400 new  :170081
VM124:401 week1: 284195
VM124:402 week2: 239148
VM124:403 ThisWeek R0: 0.32498953840980005
VM124:404 Quarantined (wk1+wk2): 0
VM124:405 QuarantineRatio: 0
VM124:406 recoverd:214299
VM124:407 ===========
VM124:399 SUMMARY WEEK: 10
VM124:400 new  :55027
VM124:401 week1: 170081
VM124:402 week2: 284195
VM124:403 ThisWeek R0: 0.12113120657926019
VM124:404 Quarantined (wk1+wk2): 0
VM124:405 QuarantineRatio: 0
VM124:406 recoverd:453447
VM124:407 ===========
VM124:399 SUMMARY WEEK: 11
VM124:400 new  :13240
VM124:401 week1: 55027
VM124:402 week2: 170081
VM124:403 ThisWeek R0: 0.05881621266236651
VM124:404 Quarantined (wk1+wk2): 0
VM124:405 QuarantineRatio: 0
VM124:406 recoverd:737642
VM124:407 ===========
VM124:399 SUMMARY WEEK: 12
VM124:400 new  :3106
VM124:401 week1: 13240
VM124:402 week2: 55027
VM124:403 ThisWeek R0: 0.04549782471765275
VM124:404 Quarantined (wk1+wk2): 0
VM124:405 QuarantineRatio: 0
VM124:406 recoverd:907723
VM124:407 ===========
VM124:399 SUMMARY WEEK: 13
VM124:400 new  :678
VM124:401 week1: 3106
VM124:402 week2: 13240
VM124:403 ThisWeek R0: 0.04147803744035238
VM124:404 Quarantined (wk1+wk2): 0
VM124:405 QuarantineRatio: 0
VM124:406 recoverd:962750
VM124:407 ===========
VM124:399 SUMMARY WEEK: 14
VM124:400 new  :145
VM124:401 week1: 678
VM124:402 week2: 3106
VM124:403 ThisWeek R0: 0.038319238900634246
VM124:404 Quarantined (wk1+wk2): 0
VM124:405 QuarantineRatio: 0
VM124:406 recoverd:975990
VM124:407 ===========
VM124:399 SUMMARY WEEK: 15
VM124:400 new  :37
VM124:401 week1: 145
VM124:402 week2: 678
VM124:403 ThisWeek R0: 0.04495747266099635
VM124:404 Quarantined (wk1+wk2): 0
VM124:405 QuarantineRatio: 0
VM124:406 recoverd:979096
VM124:407 ===========
VM124:399 SUMMARY WEEK: 16
VM124:400 new  :10
VM124:401 week1: 37
VM124:402 week2: 145
VM124:403 ThisWeek R0: 0.054945054945054944
VM124:404 Quarantined (wk1+wk2): 0
VM124:405 QuarantineRatio: 0
VM124:406 recoverd:979774
VM124:407 ===========
VM124:399 SUMMARY WEEK: 17
VM124:400 new  :2
VM124:401 week1: 10
VM124:402 week2: 37
VM124:403 ThisWeek R0: 0.0425531914893617
VM124:404 Quarantined (wk1+wk2): 0
VM124:405 QuarantineRatio: 0
VM124:406 recoverd:979919
VM124:407 ===========
VM124:399 SUMMARY WEEK: 18
VM124:400 new  :1
VM124:401 week1: 2
VM124:402 week2: 10
VM124:403 ThisWeek R0: 0.08333333333333333
VM124:404 Quarantined (wk1+wk2): 0
VM124:405 QuarantineRatio: 0
VM124:406 recoverd:979956
VM124:407 ===========
VM124:399 SUMMARY WEEK: 19
VM124:400 new  :1
VM124:401 week1: 1
VM124:402 week2: 2
VM124:403 ThisWeek R0: 0.3333333333333333
VM124:404 Quarantined (wk1+wk2): 0
VM124:405 QuarantineRatio: 0
VM124:406 recoverd:979966
VM124:407 ===========
VM124:399 SUMMARY WEEK: 20
VM124:400 new  :0
VM124:401 week1: 1
VM124:402 week2: 1
VM124:403 ThisWeek R0: 0
VM124:404 Quarantined (wk1+wk2): 0
VM124:405 QuarantineRatio: 0
VM124:406 recoverd:979968
VM124:407 ===========
VM124:399 SUMMARY WEEK: 21
VM124:400 new  :0
VM124:401 week1: 0
VM124:402 week2: 1
VM124:403 ThisWeek R0: 0
VM124:404 Quarantined (wk1+wk2): 0
VM124:405 QuarantineRatio: 0
VM124:406 recoverd:979969
VM124:407 ===========
VM124:399 SUMMARY WEEK: 22
VM124:400 new  :0
VM124:401 week1: 0
VM124:402 week2: 0
VM124:403 ThisWeek R0: NaN
VM124:404 Quarantined (wk1+wk2): 0
VM124:405 QuarantineRatio: NaN
VM124:406 recoverd:979970
VM124:407 ===========
VM124:399 SUMMARY WEEK: 23
VM124:400 new  :0
VM124:401 week1: 0
VM124:402 week2: 0
VM124:403 ThisWeek R0: NaN
VM124:404 Quarantined (wk1+wk2): 0
VM124:405 QuarantineRatio: NaN
VM124:406 recoverd:979970
VM124:407 ===========
VM124:399 SUMMARY WEEK: 24
VM124:400 new  :0
VM124:401 week1: 0
VM124:402 week2: 0
VM124:403 ThisWeek R0: NaN
VM124:404 Quarantined (wk1+wk2): 0
VM124:405 QuarantineRatio: NaN
VM124:406 recoverd:979970
VM124:407 ===========
VM124:399 SUMMARY WEEK: 25
VM124:400 new  :0
VM124:401 week1: 0
VM124:402 week2: 0
VM124:403 ThisWeek R0: NaN
VM124:404 Quarantined (wk1+wk2): 0
VM124:405 QuarantineRatio: NaN
VM124:406 recoverd:979970
VM124:407 ===========
VM124:399 SUMMARY WEEK: 26
VM124:400 new  :0
VM124:401 week1: 0
VM124:402 week2: 0
VM124:403 ThisWeek R0: NaN
VM124:404 Quarantined (wk1+wk2): 0
VM124:405 QuarantineRatio: NaN
VM124:406 recoverd:979970
VM124:407 ===========
VM124:399 SUMMARY WEEK: 27
VM124:400 new  :0
VM124:401 week1: 0
VM124:402 week2: 0
VM124:403 ThisWeek R0: NaN
VM124:404 Quarantined (wk1+wk2): 0
VM124:405 QuarantineRatio: NaN
VM124:406 recoverd:979970
VM124:407 ===========
VM124:399 SUMMARY WEEK: 28
VM124:400 new  :0
VM124:401 week1: 0
VM124:402 week2: 0
VM124:403 ThisWeek R0: NaN
VM124:404 Quarantined (wk1+wk2): 0
VM124:405 QuarantineRatio: NaN
VM124:406 recoverd:979970
VM124:407 ===========
VM124:399 SUMMARY WEEK: 29
VM124:400 new  :0
VM124:401 week1: 0
VM124:402 week2: 0
VM124:403 ThisWeek R0: NaN
VM124:404 Quarantined (wk1+wk2): 0
VM124:405 QuarantineRatio: NaN
VM124:406 recoverd:979970
VM124:407 ===========
VM124:399 SUMMARY WEEK: 30
VM124:400 new  :0
VM124:401 week1: 0
VM124:402 week2: 0
VM124:403 ThisWeek R0: NaN
VM124:404 Quarantined (wk1+wk2): 0
VM124:405 QuarantineRatio: NaN
VM124:406 recoverd:979970
VM124:407 ===========
undefined
```


#### Notes
I'm lazy so I just run everything in the chrome console so I can interactively interact. You can fork and modify so everything is imported and modular.

Next steps:

- [ ] Simple visualization, maybe 1,000,000 dots on a screen of a 1000x1000 png image.
- [ ] make code more modular.
- [ ] better documentation
- [ ] Implement discrete distribution of parameters and also non iid (correlation between parameters)


