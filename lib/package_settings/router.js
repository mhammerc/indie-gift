var adminFilter = function () {
	if (Meteor.loggingIn()) {
		this.render('loading');
		this.stop();
	}

	if (!Meteor.user() || !Roles.userIsInRole(Meteor.userId(), 'admin')) {
		this.render('notFound');
		this.stop();
		return;
	}

	this.render();
};

Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound',
	waitOn: function () {
		return Meteor.subscribe('contests') && Meteor.subscribe('stats') && Meteor.subscribe('userRegistrations') && Meteor.subscribe('userData') && Meteor.subscribe('hearts');
	}
});

Router.route('/', function () {
	this.render('Contest', {
		data: function () {
			return findMainContest();
		}
	});
}, {
	name: 'Home'
});

Router.route('/about', {
	name: 'AboutUs'
});

Router.route('/thanks', {
	name: 'Thanks'
});

Router.route('/mentions', {
	name: 'Mentions'
});

Router.route('/cgu', {
	name: 'CGU'
});

Router.route('/admin', {
	name: 'AdminPanel',
	before: adminFilter
});

Router.route('/admin/edit/:id', {
	name: 'EditContest',
	before: adminFilter
});

Router.route('/admin/create', {
	name: 'CreateContest',
	before: adminFilter
});

Router.route('/:contest', {
	name: 'Contest',
	data: function () {
		contest = Contests.findOne({
			shortName: this.params.contest
		});
		if (!contest)
			return findMainContest();
		return contest;
	}
});

if (Meteor.isServer) {
	Meteor.publish('contests', function () {
		return Contests.find();
	});

	Meteor.publish('stats', function () {
		return Stats.find({}, {
			limit: 1
		});
	});

	Meteor.publish('userRegistrations', function () { //The registration of the user inside all contests
		return Registrations.find({
			$or: [{
				ip: this.connection.clientAddress
			}, {
				user_id: this.userId
			}]
		});
	});

	Meteor.publish('userData', function () {
		if (this.userId)
			return Meteor.users.find({
				_id: this.userId
			}, {
				fields: {
					'totalParticipations': 1
				}
			});
		else
			this.ready();
	});

	Meteor.publish('hearts', function () {
		return Hearts.find({}, {
			limit: 1
		});
	})
}

