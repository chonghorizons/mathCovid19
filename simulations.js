console.log(PopulationInitial);

GLOBALquarantineCompliance=0.0;
PodQuarantine=false;
ContactTraceBack=false;
ContactTraceForward=false;


var Storage1= [];
InitializeEverything0({
				  	atRisk: false,
					exposuresPerWeek: 80,
					distancingCompliance: 0.5, 
					quarantineCompliance: 0.0,
					podIntegrity: 0.0,
					noHandwash: 1.0,
				});
// Run 30 rounds
for (var i=0; i<30; i++) {
	t(Storage1);
}




//////////
//////////
//////// #2
var Storage2= [];
InitializeEverything0({
				  	atRisk: false,
					exposuresPerWeek: 20,
					distancingCompliance: 0.5, 
					quarantineCompliance: 0.0,
					podIntegrity: 1.0,
					noHandwash: 1.0,
				});
// Run 20 rounds
for (var i=0; i<20; i++) {
	t(Storage2);
}



GLOBALquarantineCompliance=0.0;
PodQuarantine=false;
ContactTraceBack=false;
ContactTraceForward=false;
var Storage3= [];
InitializeEverything0({
				  	atRisk: false,
					exposuresPerWeek: 20,
					distancingCompliance: 0.5, 
					quarantineCompliance: 0.0,
					podIntegrity: 0.8,
					noHandwash: 1.0,
				});
// Run 20 rounds
for (var i=0; i<20; i++) {
	t(Storage3);
}




GLOBALquarantineCompliance=1.0;
PodQuarantine=true;
ContactTraceBack=true;
ContactTraceForward=true;
var Storage4= [];
InitializeEverything0({
				  	atRisk: false,
					exposuresPerWeek: 20,
					distancingCompliance: 0.5, 
					quarantineCompliance: 1.0,
					podIntegrity: 0.8,
					noHandwash: 1.0,
				});
// Run 20 rounds
for (var i=0; i<20; i++) {
	t(Storage4);
}





GLOBALquarantineCompliance=0.5;
PodQuarantine=true;
ContactTraceBack=true;
ContactTraceForward=true;
var Storage5= [];
InitializeEverything0({
				  	atRisk: false,
					exposuresPerWeek: 20,
					distancingCompliance: 0.5, 
					quarantineCompliance: 0.5,
					podIntegrity: 0.8,
					noHandwash: 1.0,
				});
// Run 20 rounds
for (var i=0; i<20; i++) {
	t(Storage5);
}

