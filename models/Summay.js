// // Example 1: Creating a new class (declaration-form)
// // ===============================================================

// // A base class is defined using the new reserved 'class' keyword
// class Polygon {
//   // ..and an (optional) custom class constructor. If one is
//   // not supplied, a default constructor is used instead:
//   // constructor() { }
//   constructor(height, width) {
//     this.name = 'Polygon';
//     this.height = height;
//     this.width = width;
//   }

//   // Simple class instance methods using short-hand method
//   // declaration
//   sayName() {
//     ChromeSamples.log('Hi, I am a ', this.name + '.');
//   }

//   sayHistory() {
//     ChromeSamples.log('"Polygon" is derived from the Greek polus (many) ' +
//       'and gonia (angle).');
//   }

//   // We will look at static and subclassed methods shortly
// }


class Summary {
  constructor(podArray) {
    summaryStorageArray=[]; // blank.
    podArray= podArray; // often empty. This is a link to the reference, so this is automatically updated by the timeStep function.
  }

  checkWeekIntegrityAndReportMaximumWeek() {
    // find the highest week of infection in the podArray
    // compare to the highest week in summaryArray
    let integrity = false;
    let highestWeek  = 0;

    return ({
      integrity,
      highestWeek,
    })
  }

    addSummaryWeek() {
      // TO:DO. stick these variables into the weekly summary. However, don't include PodArray
    if (summaryStorageArray !== undefined) {
      summaryStorageArray.push( {
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


  snapshot(person, week) {
    // return what that person's infection would be that week.
    // called by the visualization

    console.log("not implemented")

    // mock data
    return ({
      thisWeekSnapshot: {
         status: "clean", // clean, infected, dead, recovered
         infectionWeek: week,
         symptomatic: null,
         quarantine: null,
      },
      allInfo: {
        personInfection: person.infection,
      }  
    });
  }


}