Template.AdminPanel.events(
{
	'click .switch-inscriptions': function (e)
	{
		Meteor.call('switchRegistrationAccessTo', e.target.id);
	},
	'click .delete-all-registrations': function (e)
	{
		Meteor.call('deleteAllRegistrationsTo', e.target.id);
	},
	'click .make-main-contest': function (e)
	{
		Meteor.call('makeMainContestTo', e.target.id);
	},
	'click .delete-contest': function (e)
	{
		Meteor.call('deleteContest', e.target.id);
	},
	'click #resetHearts': function ()
	{
		Meteor.call('resetHearts');
	}
});

Template.AdminPanel.helpers(
{
	mainContest: function ()
	{
		return findMainContest();
	},
	contests: function ()
	{
		var contest = Contests.find(
		{ //just except the main contest
			isMain: false
		});

		if (contest.count() == 0)
			return false;
		return contest;
	}
});
