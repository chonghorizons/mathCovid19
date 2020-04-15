// *** This is to implement an agent-based modeling of the "leaky Lockdown" model of R0 heterogeneity.
// * See https://docs.google.com/spreadsheets/d/1RRq9oYJDfI7dCq5NTdQbp4TGUHRlzBLi2EGZ6JlBijE/edit#gid=807073296

// The key addition is a "detection pod" analogy.
// There should also be three sectors:  unexposed sector, hospital sector, and recovered sector (herd immunity)

const PopulationInitial = {
	"main" : 1e4,
	"infected": 100  // randomly distributed amongst all people.
	"hospital" :  140,  // The Bureau of Labor Statistics estimates that there were 5.15M people employed in the Hospitals Industry Group in 2018.  Scale to US population
	"recovered" : 50, // these have herd immunity
	"dead" : 0,
}

const PodSize=20; // the initial unexposed group is partitioned into mutually exclusive sets of this size.
var numberPods = PopulationInitial.unexposed/PodSize;
console.log(numberPods);

const ExposureDistribution = [
 { "percent": 10, "exposuresPerWeek": 10, "name": "lowContact"},
 { "percent": 75, "exposuresPerWeek": 50, "name": "mediumContact"},
 { "percent": 14, "exposuresPerWeek": 100, "name": "highContact"},
 { "percent": 1, "exposuresPerWeek": 1000, "name": "superhighContact"}
];

var populationAverageExposure= ExposureDistribution.reduce((acc,current)=>acc+(current.percent*current.exposuresPerWeek),0)/100;
console.log(populationAverageExposure);

const TransmissionPerExposureNoCompliance=0.05;

const DistancingComplianceLevels= {
	none: 0, 
	lax: 0.5,
	strict: 0.9,
	veryStrict: 0.99,
	perfect: 1.00
}

const DistancingComplianceDistributionConditionalOnExposure = {
   lowContact : [ {none: 0}, {lax: 0.5}, {strict: 0.5}, {veryStrict: 0}, {perfect: 0} ],
   mediumContact : [ {none: 0}, {lax: 0.5}, {strict: 0.5}, {veryStrict: 0}, {perfect: 0} ],
   highContact: [ {none: 0}, {lax: 0.5}, {strict: 0.5}, {veryStrict: 0}, {perfect: 0} ],
   superhighContact : [ {none: 0}, {lax: 0.5}, {strict: 0.5}, {veryStrict: 0}, {perfect: 0} ],
}


const PodIntegrityDistribution= [
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
			() => makePerson()
		)
	);


function makePerson() {
/// makes a person according to the parameters above. 

}

function distributeInitialInfections(numberOfInfections) {
	/// distributes, randomly, those infections. 
}

function getRandomPerson(parameters) {
	if (parameters.Spec == "none") {
		// find a random pod
		// find a random person
		//   maybe check if they are alive.
	}
}


    // var arrayOfRandom = Array.from({length: initialsize}, () => Math.random());
    // var arrayOfInfection = arrayOfRandom.map( (x) => (x<probability) );


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
// 
// Step 2: Now we have all the infected people this week. 
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


