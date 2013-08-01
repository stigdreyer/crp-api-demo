function Run(trials) {

    //Count of how often subject dies in case 1) does NOT spin and 2) spins the chamber again
    var subjectDies = [0, 0];

    function runTrial() {

        //Position of first bullet in revolver (0 to 5) after first spin
        var positionInChamber = parseInt(Math.random()/(1/6));

        //Subject gets killed with first attempt
        if (positionInChamber === 0 || positionInChamber === 5) runTrial();
        else {
            
            //Subject gets killed because bullet is in the next slot
            if (positionInChamber === 1) subjectDies[0]++;

            //Position of first bullet in revolver (0 to 5) after second spin
            var positionInChamberAfterSpin = parseInt(Math.random()/(1/6));

            //Subject gets killed because bullet is in the next slot
            if (positionInChamberAfterSpin === 0 || positionInChamberAfterSpin === 5) subjectDies[1]++;

        }
        
    }

    //Repeat trial n times
    for (var i = 0; i < trials; i++) {
        runTrial();
    }

    //Calculate percentages
    var subjectDiesNotSpinning = subjectDies[0] / trials * 100;
    var subjectDiesSpinning = subjectDies[1] / trials * 100;

    //Return both percentages
    return [subjectDiesNotSpinning, subjectDiesSpinning];

}