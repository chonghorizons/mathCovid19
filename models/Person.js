
class Person() {
	constructor() {
		this.pod= null;
		this.indexInPod= null;
		this.infection = {
			status: "clean", // clean, infected, dead, recovered
			infectionWeek: null,
			symptomatic: null,
			quarantine: null,
		}
		this.fixedCharacteristics = {
			default: true
		  	atRisk: false,
			exposuresPerWeek: 80,
			distancingCompliance: 0.5, 
			likelihoodToQuarantine: 0.9, // NEW v2.
			quarantineCompliance: 0.9,
			podIntegrity: 0.8,
			noHandwash: 1.0,
		}
		// ZZZ TODO, redo as 
	}

	getFixedCharacteristicsReference() {
		return this.fixedCharacteristics;
	}
	//to set the fixed characteristics, violate abstraction and directly edit the 
	// returned object, this.fixedCharacteristics


	getInfectionReference() {
		return this.infection
	}

}