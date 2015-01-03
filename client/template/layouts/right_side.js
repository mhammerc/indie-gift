Template.rightSide.helpers(
{
	contest: function ()
	{
		contest = Contests.findOne(
		{
			shortName: Router.current().params.contest
		});

		if (!contest)
			return findMainContest();
		return contest;
	},
	stats: function ()
	{
		return getStats();
	},
	userTotalParticipations: function ()
	{
		return Meteor.user().totalParticipations;
	},
	hasUserAlreadyParticipated: function ()
	{
		return (Meteor.user().totalParticipations !== 0);
	},
	getNumberOfHearts: function ()
	{
		if (!!getHearts())
			return getHearts().number;
	},
	cpm: function ()
	{ //coeur par minute
		if (!Session.get('cpm'))
			Session.set('cpm', 0);
		return Session.get('cpm');
	},
	cpmRecord: function ()
	{
		if (!Session.get('cpmRecord'))
			Session.set('cpmRecord', 0);
		return Session.get('cpmRecord');
	}
});

Template.rightSide.events(
{
	'click .login': function ()
	{
		Meteor.loginWithTwitter(
		{
			requestPermissions: ['basic'] // currently not supported
		}, function (error)
		{
			if (error)
			{
				console.log(error);
			}
		});
	},
	'click .deco': function ()
	{
		Meteor.logout();
	},
	'click .coeur a': function ()
	{
		Meteor.call('addOneHearts');

		var now = new Date().getTime() / 1000; //seconde
		var lastCoeur = Session.get('lastCoeur');
		Session.set('lastCoeur', now);

		var cpm = now - lastCoeur;
		cpm = Math.floor(60 / cpm);
		Session.set('cpm', cpm);

		if (Session.get('cpmRecord') < cpm)
			Session.set('cpmRecord', cpm);
	}
});