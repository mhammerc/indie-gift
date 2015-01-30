var contestRegistrationProcess = function (contest) {
	Meteor.call('makeNewTweet', contest.twitter);
	Meteor.call('registerUserToContest', contest._id);
}


Template.Contest.helpers({
	contest: function () {
		return this;
	},
	hasRegisteredToContest: function () {
		contest = this;
		registration = Registrations.findOne({
			contest_id: contest._id
		});

		if (!registration)
			return false;
		return true;
	},
	isContestActive: function () {
		return this.isActive;
	},
	contestLeftTime: function () {
		return this.endDate.valueOf() / 1000; //This is needed beacause valueOf() return timestamp in ms. We want timestamp in seconds.
	}
});

Template.Contest.events({
	'click #registerToContest': function () {

		var context = this;

		if (!Meteor.user()) {

			Meteor.loginWithTwitter({
				requestPermissions: ['basic'] // currently not supported
			}, function (error) {

				if (error)
					console.log(error);
				else
					contestRegistrationProcess(context);
			});
		}
		else
			contestRegistrationProcess(context);
	}
});

Template.Contest.rendered = function () {
	Meteor.call('incrementTotalPageView');

	$(".kkcountdown").kkcountdown({
		dayText: ' jour ',
		daysText: ' jours ',
		hoursText: ' heures ',
		minutesText: ' minutes et ',
		secondsText: ' secondes !',
		textAfterCount: '... Le concours est fini !',
		displayZeroDays: true
	});

};

