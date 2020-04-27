// helperFunctions.js



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
		let notMyPod= RandomInt(myNumber)
		parameters.requester.pod;

		// find a random person not in this pod
		// find random person
		//  verify not in the same pod
		//   maybe check if they are alive.
		let person= zzz;
		return person
	}
}
