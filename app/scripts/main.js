var myVm = null;

var vm = function () //Main viewModel
{
	var self = this;
	self.companyName = ko.observable(faker.company.companyName());
	self.startupProductName = ko.observable(faker.company.startupName());
	self.tagtoggle = ko.observable(true);
	self.employeeNum = ko.observable(3);
	self.employeeCards = ko.observableArray();

	self.numOfRows = ko.computed(function() {
		self.employeeNum();

		return self.employeeNum() / 2;
	});

	self.splitRow = function(index) {
		console.log(index);
		return (index < self.numOfRows()) ? true : false;
	};
	
	self.tagLine = ko.computed(function() {
		self.tagtoggle();

		return 'A ' + faker.company.startupTagPrefixesRandom() + ' ' + lowerCaseStartofString(faker.company.catchPhrase()) 
		+ ' ' + faker.company.startupNounsRandom() + '. ' 
		+ 'Not the ' + lowerCaseStartofString(faker.company.bsAdjective()) + ' startup idea you were looking for?';
		
	});

	self.generateTeam = function (num) 
	{
		var num = num ? num : 3; //***TODO In the future, make team size customizeable?

		self.employeeNum(num);

		for(var i = 0; i<num; i++) 
		{
			self.employeeCards.push(new Card());
		}
	};

	self.startOver = function () 
	{
		self.companyName(faker.company.companyName());
		self.startupProductName(faker.company.startupName());
		self.tagtoggle.valueHasMutated();

		self.employeeCards.removeAll();
		self.generateTeam(6);

		console.log('Starting over...');

	};

	self.generateTeam(6); //Entry Point

};

var Card = function (data)
{
	var self = this;
	self.name = faker.name.findName();
	self.email = faker.internet.email();
	self.title = ko.computed(function(){
		return upperCaseStartofString(faker.company.bsAdjective()) + " " + faker.company.bsNoun() + " " + faker.company.startupRolesRandom();	
	});
	self.currentTask = ko.computed(function() {
		return '[' + faker.random.number(8) + '] ' + faker.hacker.phrase();
	});

	self.avatar = ko.observable(faker.image.avatar());

	console.log(self.avatar());
	console.log(self.currentTask());
}

function lowerCaseStartofString (string) {
	return string.charAt(0).toLowerCase() + string.slice(1);
}

function upperCaseStartofString (string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

//***TODO move these nav listeners somewhere

$('.collapse').on('shown.bs.collapse', function (e) {
  $('.collapse').not(this).removeClass('in');
});

$('[data-toggle=collapse]').click(function (e) {
  $('[data-toggle=collapse]').parent('li').removeClass('active');
  $(this).parent('li').toggleClass('active');
});


myVm = new vm();
ko.applyBindings(myVm, $('html')[0]);
console.log('bindings applied');