// initialize.js



var defaultConfigObject = 
{
	population_parameters: {
		PopulationInitial: {
			main : 1e5,
			infected: 5,  // randomly distributed amongst all people.
			hospital :  0,  // The Bureau of Labor Statistics estimates that there were 5.15M people employed in the Hospitals Industry Group in 2018.  Scale to US population
			recovered : 0, // these have herd immunity
			dead : 0,
		}, 
		PodSize: 2000,
	},

	transmission_parameters {
		asymptomaticProportion: 0.25,
		TransmissionPerExposureNoCompliance: 0.05,

	},

	run_parameters: {
		number_of_weeks: 100,

	}
}

var configObject = {
	population_parameters: {
		PopulationInitial: {
			main : 1e5,
			infected: 5,  // randomly distributed amongst all people.
			hospital :  0,  // The Bureau of Labor Statistics estimates that there were 5.15M people employed in the Hospitals Industry Group in 2018.  Scale to US population
			recovered : 0, // these have herd immunity
			dead : 0,
		}, 
		PodSize: 2000,
	},

	transmission_parameters {
		asymptomaticProportion: 0.25,
	},

	run_parameters: {
		number_of_weeks: 100,

	}
}

// Set global variables
var numberPods


// TODO: implement hospital infectionr ate as separate. However, for right now (Apr2020),
//  can just treat a hospitalized person as quarantined
// later, hospitalized should interact with number of beds in each pod.

function InitializeEverything0(optionalConfigObject) {
	// these are global variables in the DOM `window` object. May put in own object later.`
	currentWeek=0;
	NewInfectionsArray=[];
	Week1InfectionsArray=[];
	Week2InfectionsArray=[];
	RecoveredArray=[];
	DeadArray=[];
	QuarantinesArray=[];
	NewQArray=[];
	Week1QArray=[];
	Week2QArray=[];

    //Todo, update with Person Class

	numberPods = PopulationInitial.main/PodSize;

	var p;
	for (p = 0; p < numberPods; p++) {
		var i;
		for (i = 0; i < PodSize; i++) {
			PodArray[p][i] = {
				pod: p,
				indexInPod: i,
				infection: {
					status: "clean", // clean, infected, dead, recovered
					infectionWeek: null,
					symptomatic: null,
					quarantine: null,
				}
			}
			if (fixedCharacteristics) {
				PodArray[p][i].fixedCharacteristics= fixedCharacteristics
			} else {
				PodArray[p][i].fixedCharacteristics= {
				  	atRisk: false,
					exposuresPerWeek: 80,
					distancingCompliance: 0.5, 
					quarantineCompliance: 0.9,
					podIntegrity: 0.8,
					noHandwash: 1.0,
				};
			}
			if (PodArray[p][i].fixedCharacteristics.atRisk) {
				if (AtRiskDistancingComplianceOverride !== "none") {
					PodArray[p][i].fixedCharacteristics.distancingCompliance=DistancingComplianceLevels[AtRiskDistancingComplianceOverride];
				}
				if (AtRiskPodIntegrityOverride !== "none") {
					PodArray[p][i].fixedCharacteristics.podIntegrity=9999;  //   have to write function to get the inPodProportion from the name.

	// 				const PodIntegrityDistribution= [
	//  { "percent": 0, "inPodProportion": 0.0, "name": "none"},
	//  { "percent": 10, "inPodProportion": 0.5, "name": "externalInterfacer"},
	//  { "percent": 75, "inPodProportion": 0.8, "name": "podLoose"},
	//  { "percent": 14, "inPodProportion": 0.9, "name": "podTight"},
	//  { "percent": 1, "inPodProportion": 1.0, "name": "podOnly"}
	// ]
				}
			}
		}
	}

	
	/// distributeInitialInfections
	var j=0;
	while (j<PopulationInitial.infected) {
		let person=getRandomPerson({Spec: "none"});
		if (person.infection.status!= "infected" && person.infection.status!= "dead") {
			person.infection.status= "infected";
			person.infection.infectionWeek= 0;
			person.infection.symptomatic=false;
			person.infection.from= {pod: -1 , indexInPod: -1 };
			person.infection.quarantine= false;
			NewInfectionsArray.push(person)
			j++
		}
	}
}
}


