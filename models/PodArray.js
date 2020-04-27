// PodArray model

/*
A pod array is an array of pod. Each pod has a set amount of people.

Example:
400 people could be in 8 pods, each with 50 people.
*/

class PodArray {
  constructor(totalPopulation, podSize, numberOfPods) {
  	if (totalPopulation != podSize * numberOfPods) {
  		throw "totalPopulation != podSize * numberOfPods";
  	}

  	// make 2 diensional array.
	var tempPodArray= Array.from(
		{length: numberOfPods},
		() => Array.from(
				{length: podSize},
				() => {
					var aPerson=new Person();
					return aPerson;
				} // 
			)
	);

	this.podArray=	tempPodArray;
  }

  getPersonByPodAndIndex(podNumber, indexInPod) {
  	return this.podArray[podNumber][indexInPod];
  }
}