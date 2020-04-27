//Run simulation

GLOBALquarantineCompliance=0.5;
PodQuarantineProbability=0.01;
ContactTraceBack=false;
ContactTraceForward=false;
var Storage21= [];
InitializeEverything0({
				  	atRisk: false,
					exposuresPerWeek: 30,
					distancingCompliance: 0, 
					quarantineCompliance: 0,
					podIntegrity: 0.9,
					noHandwash: 1.0,
				});
// Run 40 rounds
for (var i=0; i<100; i++) {
	t(Storage21);
}

// sample person
PodArray[0][0];
