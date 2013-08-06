if (! process.env.NODE_ENV) process.env.NODE_ENV = 'production';

var AuthClient = require('crp-auth-client');
var TaskClient = require('crp-task-client');
var TaskProducerClient = require('crp-task-producer-client');

var fs = require('fs');

//Authentication using your CrowdProcess login information
AuthClient.login('email', 'password', function(err, credential) {
	if (err) throw err;

	//Options for creating task and dataunit stream
  	var options = {
	   bid: 1,
	   program: fs.readFileSync('./lib/program.min.js', 'utf8'), //Reads source code for Run(data) function from file
	   credential: credential
	};

	createTask(options);
});

function createTask(options) {

	var taskClient = TaskClient({
    	credential: options.credential
    });

	//Create CrowdProcess task
	taskClient.tasks.create({
    	bid: options.bid,
    	program: options.program
    }, afterTaskCreated);

	function afterTaskCreated(err, task) {
	    if (err) throw err;

	    //Create dataunit stream to send dataunits directly to CrowdProcess
	    var stream = TaskProducerClient({
	      credential: options.credential,
	      taskId: task._id
	    });

	    //Catch faults or errors emited by CrowdProcess
	    stream.on('error', error);
	    stream.on('fault', error);

	    //Counter for sent and received dataunits
	    var sent = 0;
	    var received = 0;

	    //Counter for results
	    var subjectDies = [0, 0];

	    //Run 10 computations à 1.000.000 trials
	    var computations = 10;
	    var trials = 1000000;

	    for (sent = 0; sent < computations; sent++) {
	    	stream.write(trials);
	    }

	    //Receive results from CrowdProcess
	    stream.on('result', function(data) {

	    	//Sum up results
	    	subjectDies[0] += data[0];
	    	subjectDies[1] += data[1];

	    	received++;
	    });

	    //Result stream from CrowdProcess ended
	    stream.once('end', function() {

	    	//Did not receive all dataunits
	    	if (sent != received) console.error('Only received %d of the %d dataunits sent.', received, sent);
	    	
	    	//Calculate average percentage of all received computations
	    	subjectDiesNotSpinning = subjectDies[0] / (received * trials) * 100;
	    	subjectDiesSpinning = subjectDies[1] / (received * trials) * 100;

	    	console.log("Results for Monte Carlo Simulation with %d received computations à %d trials", received, trials);
    		console.log("Subject died in %d % of the trials when choosing NOT to spin the chamber", subjectDiesNotSpinning.toFixed(2));
    		console.log("Subject died in %d % of the trials when choosing to spin the chamber", subjectDiesSpinning.toFixed(2));
    		console.log("Subject should %s in order to have a higher possibility to stay alive", subjectDiesNotSpinning < subjectDiesSpinning ? 'NOT spin' : 'spin');

	    });

	}

}

function error(err) {
  if (typeof err != 'string')
    err = err.message;

  console.error(err);
}