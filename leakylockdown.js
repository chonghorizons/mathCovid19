// *** This is to implement an agent-based modeling of the "leaky Lockdown" model of R0 heterogeneity.
// * See https://docs.google.com/spreadsheets/d/1RRq9oYJDfI7dCq5NTdQbp4TGUHRlzBLi2EGZ6JlBijE/edit#gid=807073296

// The key addition is a "detection pod" analogy.
// There should also be three sectors:  unexposed sector, hospital sector, and recovered sector (herd immunity)

const PopulationInitial = {
	"main" : 1e6,
	"infected": 50,  // randomly distributed amongst all people.
	"hospital" :  0,  // The Bureau of Labor Statistics estimates that there were 5.15M people employed in the Hospitals Industry Group in 2018.  Scale to US population
	"recovered" : 0, // these have herd immunity
	"dead" : 0,
}

const PodSize=20; // the initial unexposed group is partitioned into mutually exclusive sets of this size.
var numberPods = PopulationInitial.main/PodSize;
console.log(numberPods);

const ExposureDistribution = [
 { "percent": 10, "exposuresPerWeek": 10, "name": "lowContact"},
 { "percent": 75, "exposuresPerWeek": 50, "name": "mediumContact"},
 { "percent": 14, "exposuresPerWeek": 100, "name": "highContact"},
 { "percent": 1, "exposuresPerWeek": 1000, "name": "superhighContact"}
];

var populationAverageExposure= ExposureDistribution.reduce((acc,current)=>acc+(current.percent*current.exposuresPerWeek),0)/100;
console.log(populationAverageExposure);

const asymptomaticProportion= 0.25;

// const TransmissionPerExposureNoCompliance=0.05;
const TransmissionPerExposureNoCompliance=0.05;

const DistancingComplianceLevels= {
	none: 0, 
	lax: 0.5,
	strict: 0.9,
	veryStrict: 0.99,
	perfect: 1.00
}

const noHandwashLevels= {
	none: 1, 
	lax: 0.5,
	strict: 0.1,
	veryStrict: 0.01,
	perfect: 0
}

const DistancingComplianceDistributionConditionalOnExposure = {
   lowContact : [ {none: 0}, {lax: 0.5}, {strict: 0.5}, {veryStrict: 0}, {perfect: 0} ],
   mediumContact : [ {none: 0}, {lax: 0.5}, {strict: 0.5}, {veryStrict: 0}, {perfect: 0} ],
   highContact: [ {none: 0}, {lax: 0.5}, {strict: 0.5}, {veryStrict: 0}, {perfect: 0} ],
   superhighContact : [ {none: 0}, {lax: 0.5}, {strict: 0.5}, {veryStrict: 0}, {perfect: 0} ],
}


const PodIntegrityDistribution= [
 { "percent": 0, "inPodProportion": 0.0, "name": "none"},
 { "percent": 10, "inPodProportion": 0.5, "name": "externalInterfacer"},
 { "percent": 75, "inPodProportion": 0.8, "name": "podLoose"},
 { "percent": 14, "inPodProportion": 0.9, "name": "podTight"},
 { "percent": 1, "inPodProportion": 1.0, "name": "podOnly"}
]


const QuarantineComplianceLevels= {
	none: 0, 
	lax: 0.5,
	strict: 0.9,
	veryStrict: 0.99,
	perfect: 1.00
}

const AtRiskPercentage = 0.1; // 10%
const AtRiskDistancingComplianceOverride = "strict";  // none means don't override.
const AtRiskPodIntegrityOverride =  "none"
  // "none" means AtRisk have podIntegrity from the same distribution. Don't override. If a name is given, then they have that
  // inPodProportion.

const FatalityRates= {
	atRisk: 0.10, 
	normal: 0.01
}


// *** PSEUDOCODE
// Step 0: Initialization: All pods are created. Within each pod, each person has drawn for them:
//   atRisk?
//   ExposuresPerWeek
//   DistancingCompliance | Exposure
//   PodIntegrity (temporary)
//   AtRisk
//    	override: AtRiskDistancingComplianceOverride
//		override: AtRiskPodIntegrityOverride
//	 infected: randomly distribute.
//   
//   infected should include the week of infection.





const PodArray= Array.from(
	{length: numberPods},
	() => Array.from(
			{length: PodSize},
			() => "temporary" // 
		)
	);

var NewInfectionsArray=[];
var Week1InfectionsArray=[];
var Week2InfectionsArray=[];
var RecoveredArray=[];
var DeadArray=[];
var QuarantinesArray=[];
var currentWeek=0;


function InitializeEverything0(fixedCharacteristics) {
	currentWeek=0;
	NewInfectionsArray=[];
	Week1InfectionsArray=[];
	Week2InfectionsArray=[];
	RecoveredArray=[];
	DeadArray=[];
	QuarantinesArray=[];
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



// function makeEmptyPerson() {
// /// makes a person according to the parameters above. 
// 	var person = {};
//   person.pod = //index of the pod they are in.
//   person.indexInPod = // their index in the pod array
//   person.fixedCharacteristics = {
//   	atRisk?
//   ExposuresPerWeek
//   DistancingCompliance | Exposure
//   PodIntegrity (temporary)
//   AtRisk
//    	override: AtRiskDistancingComplianceOverride
// 		override: AtRiskPodIntegrityOverride
//   }
//   person.infection = {
//   	currentStatus =  // clean, infected, dead, recovered
//   	infectionWeek =   // week of infection 0 means they were infected in the initialization phase.
//   }
// }


function RandomInt(myNumber) {
	// returns int between 0 and myNumber-1
	return Math.floor(Math.random()*myNumber)
}

function getRandomPerson(parameters) {
	if (parameters.Spec == "none") {
		// find a random pod
		// find a random person

		let person= PodArray[RandomInt(numberPods)][RandomInt(PodSize)];
		return person;
	}
	if (parameters.Spec == "inPod") {
		let person= PodArray[parameters.requester.pod][RandomInt(PodSize)];
		// does not exclude drawing oneself
		return person
	}
	if (parameters.Spec == "outOfPod") {
		// Get the requesters pod
		parameters.requester.pod;

		// find a random person not in this pod
		// find random person
		//  verify not in the same pod
		//   maybe check if they are alive.
		let person= zzz;
		return person
	}
}




// 
//
// Step 1: Iterate through all the exposures of the infected people. Exposures here are 1 way to avoid double counting. 1 ways means they possibly sneeze on them.
//  	to generate an exposure: 
//  	draw if inPod or out-of pod.
//		then look at the distancing compliance and exposure of everyone in that group. Draw a person
//			from that distribution.  Operationally, pick one random person. And then see if that person 
//			should be a match by their relative exposure. Pick a random number between 1 and 1000. If it's
//			below exposuresPerWeek*(1-QuarnatineComplianceLevels), then it's an exposure.
//				if exposuresPerWeek is low (like 10), then that exposure is unlikely.
//				if quarantine level is high, then they won't be exposed.
//						maximum of 500 tries for exposure
//			Whether they are infected or not is determined by a random variable between [0,1] on the distancingCOmpliance
//			If compliance is perfect, they don't get infected. If it's none, they get infected. In between, roll the random dice.
//			Store this in the variable NewInfectionsArray

// Step 1: Iterate through all the exposures of the infected people. Exposures here are 1 way to avoid double counting. 1 ways means they possibly sneeze on them.
//  	to generate an exposure: 


function exposuresInfections(infectorPerson) {
	// console.log("exposing for " + infectorPerson.pod + "---" + infectorPerson.indexInPod );
	if (infectorPerson.infection.status === "infected" && infectorPerson.infection.quarantine!==true ) {
		let n;
		let exposuresWithDistancing= Math.floor(infectorPerson.fixedCharacteristics.exposuresPerWeek*infectorPerson.fixedCharacteristics.distancingCompliance); 
		for (n=0; n<exposuresWithDistancing; n++) {
			// console.log("n is " + n  + " for " + infectorPerson.pod + "---" + infectorPerson.indexInPod);
//  			draw if inPod or out-of pod.
			let inPodBoolean=Math.random()<infectorPerson.fixedCharacteristics.podIntegrity;
			if (inPodBoolean) {
				let exposurePerson = getRandomPerson({Spec: "inPod", requester: infectorPerson});
				maybeInfect(exposurePerson, infectorPerson);
			} else {
				let exposurePerson = getRandomPerson({Spec: "none", requester: infectorPerson});
				maybeInfect(exposurePerson, infectorPerson);
			}
		}				
	}
}

function maybeInfect(person, infector) {
	// console.log("maybe infect" + + person.pod + "---" + person.indexInPod);
	if (person.infection.status== "clean" && person.infection.quarantine != true ) {
		if (Math.random() < TransmissionPerExposureNoCompliance*person.fixedCharacteristics.noHandwash) {
			person.infection.status= "infected";
			person.infection.infectionWeek= currentWeek;
			person.infection.symptomatic=Math.random()>asymptomaticProportion ;
			person.infection.from= {pod: infector.pod , indexInPod: infector.indexInPod };
			person.infection.quarantine= false;  // maybe overwritten in quarantineFlags
			NewInfectionsArray.push(person)
		}
	}
}




//		then look at the distancing compliance and exposure of everyone in that group. Draw a person
//			from that distribution.  Operationally, pick one random person. And then see if that person 
//			should be a match by their relative exposure. Pick a random number between 1 and 1000. If it's
//			below exposuresPerWeek*(1-QuarnatineComplianceLevels), then it's an exposure.
//				if exposuresPerWeek is low (like 10), then that exposure is unlikely.
//				if quarantine level is high, then they won't be exposed.
//						maximum of 500 tries for exposure
//			Whether they are infected or not is determined by a random variable between [0,1] on the distancingCOmpliance
//			If compliance is perfect, they don't get infected. If it's none, they get infected. In between, roll the random dice.
//			Store this in the variable NewInfectionsArray



// Step 2: Now we have all the infected people this week. 

function quarantineFlags(options) {
	// search who everyone who is NewlyInfected
	if (options.proportion==0) {
		"do nothing";
	} else {
		NewInfectionsArray.forEach((x) =>  {
			if ( options.symptomatic ===true && x.infection.symptomatic===true) {
				let initiateQuarantine = (Math.random() < options.proportion);
				if (initiateQuarantine) {
					x.infection.quarantine = true
					QuarantinesArray.push(x);
				}
				if (options.podQuarantine && initiateQuarantine) {
					PodArray[x.pod].forEach((person) =>{
						person.infection.quarantine = true;
						QuarantinesArray.push(person);
					})
				}
			}
			if (options.contactTraceBack===true) {
				let infectorPod= x.infection.from.pod ;
				let infectorIndexInPod = x.infection.from.indexInPod ;
				personTraced = PodArray[infectorPod][infectorIndexInPod]
				personTraced.infection.quarantine = true;
				QuarantinesArray.push(personTraced);
			}
		});
		// contactTraceForward is ignored because if you are quarantined, then you don't infect anyone forward.
	}
};

function TimeStep() {
	currentWeek=currentWeek+1;
	Week2InfectionsArray.forEach((person) => {
		person.infection.status = "recovered"; // or dead, do dead later.
	})
	RecoveredArray=RecoveredArray.concat(Week2InfectionsArray);
	Week2InfectionsArray=Week1InfectionsArray;
	Week1InfectionsArray=NewInfectionsArray;
	NewInfectionsArray=[];
	Week1InfectionsArray.forEach(exposuresInfections);
	Week2InfectionsArray.forEach(exposuresInfections);
	quarantineFlags({
		proportion: GLOBALquarantineCompliance,
		symptomatic: true,
		contactTraceBack: ContactTraceBack,
		contactTraceForward: ContactTraceForward,
		podQuarantine: PodQuarantine,
	});
}
//    Iterate the weekly time step.
//		NEW INFECTIONS
//			mark them as infected. Include their index in a list of Week1 infected people to iterate through.
//		WEEK1 INFECTIONS
//			move the week1 infected to week2 infected.
//		WEEK2 INFECTIONS			
// 	  		check if they are at risk or normal, and apply the death rate at the end of the second week.
//			at the end of second week, they are recovered or dead.
//
//  Repeat Step 1 and Step 2 for the number of weeks we are interested in. 



function s() {
	console.log('SUMMARY WEEK: '+ currentWeek);
	console.log('new  :' + NewInfectionsArray.length); 
	console.log('week1: ' + Week1InfectionsArray.length); 
	console.log('week2: ' + Week2InfectionsArray.length); 
	console.log('ThisWeek R0: ' + NewInfectionsArray.length/(Week1InfectionsArray.length + Week2InfectionsArray.length))
	console.log('Quarantined': QuarantinesArray.length)
	console.log('recoverd:' + RecoveredArray.length);
	console.log('===========');
}



var ContactTraceBack;
var ContactTraceForward;
var PodQuarantine;

function t(Storage) {
	TimeStep();
    s();
    if (Storage !== undefined) {
    	Storage.push( {
	    	week: currentWeek,
			newInfections: NewInfectionsArray.length,
			week1Infections: Week1InfectionsArray.length,
			week2Infections: Week2InfectionsArray.length,
			r0: NewInfectionsArray.length/(Week1InfectionsArray.length + Week2InfectionsArray.length),
	 		Recovered: RecoveredArray.length,
	 		Quarantined:  QuarantinesArray.length,
  	  })
    }
}




