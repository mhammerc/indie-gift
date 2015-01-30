var incrementRegistersTo = function (contestId) {
	Contests.update({
		_id: contestId
	}, {
		$inc: {
			totalRegistrations: 1
		}
	});

	Stats.update({
		_id: Stats.findOne()._id
	}, {
		$inc: {
			totalRegistrations: 1
		}
	});
};

var incrementUserTotalParticipation = function () {
	if (!Meteor.user())
		return;

	Meteor.users.update({
		_id: Meteor.userId()
	}, {
		$inc: {
			totalParticipations: 1
		}
	});
};

Meteor.methods({
	addOneHearts: function () {
		Hearts.update({
			_id: Hearts.findOne()._id
		}, {
			$inc: {
				number: 1
			}
		});
	},
	incrementTotalPageView: function () {
		Stats.update({
			_id: Stats.findOne()._id
		}, {
			$inc: {
				totalPageView: 1
			}
		})
	},
	registerUserToContest: function (id) {
		check(id, String); //The Id of the contest

		contest = Contests.findOne(id);

		if (!contest.isActive)
			return;

		if (Meteor.isServer) { //First, be sure that the user is not already registered
			registration = Registrations.findOne({
				$or: [{
					ip: this.connection.clientAddress,
				}, {
					user_id: Meteor.userId()
				}],
				contest_id: id
			});


			if (!!registration) //User not already registered
				return;
		}
		if (Meteor.isClient) { //simulation needed
			this.connection = {};
			this.connection.clientAddress = "simulationNeed";
		}

		Registrations.insert({
			ip: this.connection.clientAddress,
			contest_id: id,
			user_id: Meteor.userId(),
			date: Date.now()
		});

		incrementRegistersTo(id);
		incrementUserTotalParticipation();
	}
});

