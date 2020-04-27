/*
Logic:

<h1>Leaky Lockdown Demo</h1>
<p>100,000 people, with 5 infected people to start. They are organized in 50 "pods" which can be thought of as states/cities. Each pod is 2000 people.</p>

<ol>
	<li>The sickness lasts for 2 weeks. </li>
	<li>Each day, each infected person (who isn't quarantined) is in contact with
	 30 people <div style="display:none;">(exposures per week)</div>. </li>
	<li> However, depending on the distancing compliance (rec?) and handwashing
	 (infector?), the contact may not result in an "exposure". In this scenario,
	  there is noHandwash=1.0 and distancingCompliance=0.</li>
	<li> If exposed, there is a 5% change of getting infected.	If infected, there 
	is a 25% asymptomatic rate.</li>

	<li> When they are infected, if they are SYMPTOMATIC, there is a 50% chance
	 they are quarantined. </li>

	<li> There is also "pod quarantining" at 1%. What this means is that each
	 person who is symptomatic in a pod has 1% chance of causing the </i>whole</i>
	  pod to go into pod quarantining. If there are 50 symptomatic people, this
	   will be a 50% chance of pod quarantine. </li>
	<li>If one is quarantined, there is no chance of infection.</li> <br>

	<li> A person can infect others in week 1 and week 2.
	<li> Everyone who is "recovered" after week 2 cannot be re-infected.
	<li> There are no deaths in this model run, simply because you can just randomly pick 2 or 3% who die.	

</ol>
<code>
GLOBALquarantineCompliance=0.5; \n
PodQuarantineProbability=0.01; \n
ContactTraceBack=false; \n
ContactTraceForward=false; \n
var Storage21= []; \n
InitializeEverything0({ \n
				  	atRisk: false, \n
					exposuresPerWeek: 30, \n
					distancingCompliance: 0, \n
					quarantineCompliance: 0, \n
					podIntegrity: 0.9, \n
					noHandwash: 1.0, \n
				}); \n
// Run 40 rounds \n
</code>


Infected
-> if quarantined, do nothing, check quarantine compiance.
	-> If comply, no infection.
	-> if not comply, run normal exposure
-> regular exposures per week
-> reduced by distancing compliance
-> for (n=0; n<exposuresWithDistancing; n++)
	-> PodIntegrity -> find a person in/out the pod to infect
	-> maybe infect

Maybe Infect
-> check if the other person is quarantine. if so, no infection.
// ZZZZZZ TODO: add quarantine compliance to this step.
-> infection is a function of handWashing.
(Math.random() < TransmissionPerExposureNoCompliance*person.fixedCharacteristics.noHandwash)



*/


function TimeStep() {
	currentWeek=currentWeek+1;

	// rotate people between weeks
	Week2InfectionsArray.forEach((person) => {
		person.infection.status = "recovered"; // or dead, do dead later.
	})
	RecoveredArray=RecoveredArray.concat(Week2InfectionsArray);
	Week2InfectionsArray=Week1InfectionsArray;
	Week1InfectionsArray=NewInfectionsArray;

	// expose infections
	NewInfectionsArray=[];
	Week1InfectionsArray.forEach(exposuresInfections);
	Week2InfectionsArray.forEach(exposuresInfections);

	// quarantine steps
	Week2QArray.forEach((person) => {
		person.infection.quarantine = null; // or dead, do dead later.
	})
	Week2QArray=Week1QArray;
	Week1QArray=NewQArray;
	NewQArray=[];
	quarantineFlags({
		proportion: GLOBALquarantineCompliance,
		symptomatic: true,
		contactTraceBack: ContactTraceBack,
		contactTraceForward: ContactTraceForward,
		podQuarantineProbability: PodQuarantineProbability,
	});

}



function exposuresInfections(infectorPerson) {
	// console.log("exposing for " + infectorPerson.pod + "---" + infectorPerson.indexInPod );
	if (infectorPerson.infection.status === "infected" && infectorPerson.infection.quarantine!==true ) {
		let n;
		let exposuresWithDistancing= Math.floor(infectorPerson.fixedCharacteristics.exposuresPerWeek*(1-infectorPerson.fixedCharacteristics.distancingCompliance)); 
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
		// ZZZZZZ TODO: add quarantine compliance to this step above.
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
					NewQArray.push(x);
				}
				if ((options.podQuarantineProbability > Math.random()) && initiateQuarantine) {
					PodArray[x.pod].forEach((person) =>{
						person.infection.quarantine = true;
						QuarantinesArray.push(person);
						NewQArray.push(person)
					})
				}
			}
			if (options.contactTraceBack===true) {
				let infectorPod= x.infection.from.pod ;
				let infectorIndexInPod = x.infection.from.indexInPod ;
				personTraced = PodArray[infectorPod][infectorIndexInPod]
				personTraced.infection.quarantine = true;
				QuarantinesArray.push(personTraced);
				NewQArray.push(personTraced)
			}
		});
		// contactTraceForward is ignored because if you are quarantined, then you don't infect anyone forward.
	}
};


function s() {
	console.log('SUMMARY WEEK: '+ currentWeek);
	console.log('new  :' + NewInfectionsArray.length); 
	console.log('week1: ' + Week1InfectionsArray.length); 
	console.log('week2: ' + Week2InfectionsArray.length); 
	console.log('ThisWeek R0: ' + NewInfectionsArray.length/(Week1InfectionsArray.length + Week2InfectionsArray.length))
	console.log('Quarantined (wk1+wk2): ' + Number(Week2QArray.length +  Week1QArray.length));
	console.log('QuarantineRatio: '+ (Week2QArray.length + Week1QArray.length) /(Week1InfectionsArray.length + Week2InfectionsArray.length))
	console.log('recoverd:' + RecoveredArray.length);
	console.log('===========');
}


// eventually move tomethod for model/Summary; currently in timeStep
function t(Storage) {
	TimeStep();
    s();
    if (Storage !== undefined) {
    	Storage.push( {
	    	week: currentWeek,
			newInfections: NewInfectionsArray.length,
			week1Infections: Week1InfectionsArray.length,
			week2Infections: Week2InfectionsArray.length,
			r0: Math.round(NewInfectionsArray.length/(Week1InfectionsArray.length + Week2InfectionsArray.length) *100)/100 ,
	 		Recovered: RecoveredArray.length,
	 		Quarantined:  QuarantinesArray.length,
	 		PodArray: _.cloneDeep(PodArray),  // TODO: 
  	  })
    }
}

