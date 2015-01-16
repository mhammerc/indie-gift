var isGranted = function ()
{
	if (!Meteor.user() || !Roles.userIsInRole(Meteor.userId(), 'admin'))
		return false;
	return true;
};

Meteor.methods(
{ //Admin methods
	switchRegistrationAccessTo: function (id)
	{
		if (!isGranted())
			return;

		var currentState = Contests.findOne(id).isActive;
		Contests.update(id,
		{
			$set:
			{
				isActive: !currentState
			}
		});
	},
	deleteAllRegistrationsTo: function (id)
	{
		if (!isGranted())
			return;

		Registrations.remove(
		{
			contest_id: id
		});
		Contests.update(id,
		{
			$set:
			{
				totalRegistrations: 0
			}
		});
	},
	makeMainContestTo: function (id)
	{
		if (!isGranted())
			return;

		oldMainContest = findMainContest();

		Contests.update(id,
		{
			$set:
			{
				isMain: true
			}
		});

		Contests.update(oldMainContest._id,
		{
			$set:
			{
				isMain: false
			}
		});
	},
	deleteContest: function (id)
	{
		if (!isGranted())
			return;

		Contests.remove(id);
	},
	resetHearts: function ()
	{
		if (!isGranted())
			return;

		Hearts.update(getHearts()._id,
		{
			$set:
			{
				number: 0
			}
		});
	}
});
