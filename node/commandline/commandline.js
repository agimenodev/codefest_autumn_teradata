// Get a handle on the readline module
var readline = require('readline');
var say = require('say');
var chalk = require('chalk');

var questions = {
	name: 'What is your name?\t',
	company: 'What company do you work in?\t',
};

var answers = {
	name: '',
	company: ''
}

// Initialize the reading interface
var prompts = readline.createInterface({
	  input: process.stdin,
	  output: process.stdout
	});

var Talk = {
	say: function(message, next) {
		say.speak('Alex', message, next);
	}
};

var Handlers = {
	name: function(name) {
		answers.name = name;
		console.log('Hello, ' + chalk.blue(name) + '!');
		console.log(chalk.cyan('Could you please be kind to provide us with more info about yourself?'));
		console.log('\n');
	    prompts.question(chalk.yellow(questions.company), Handlers.company);
	},

	company: function(companyName){
		answers.company = companyName;
    	if (companyName === 'Teradata') {
    		Talk.say('Ups, ' + answers.name +' U really did not saw it comming?', function () {
    			console.log("Press Ctrl+C to end the program");
	    	});
    	}
    }
};

// INTRO
console.log('Wellcome to the PROBABILITY CALCULATOR, your way for peeking into the future.');
console.log('Let\'s get started!');
console.log('\n');

// Start W the questions
prompts.question(chalk.yellow(questions.name), Handlers.name);