Contests = new Mongo.Collection('contests');

findMainContest = function () {
	return Contests.findOne({
		isMain: true
	});
};

var Schemas = {}
Schemas.Contests = new SimpleSchema({
	name: {
		type: String,
		label: "Nom du concours",
	},
	shortName: {
		type: String,
		label: "Nom court (dans l'url)"
	},
	description: {
		type: String,
		label: "Description",
	},
	note: {
		type: String,
		label: "En tête"
	},
	endDate: {
		type: Date,
		label: "Date de fin"
	},
	twitter: {
		type: String,
		label: "Texte à tweeter",
	},
	imageLink: {
		type: String,
		label: "Lien de l'image"
	},
	isActive: {
		type: Boolean,
		defaultValue: false
	},
	isMain: {
		type: Boolean,
		defaultValue: false
	},
	totalRegistrations: {
		type: Number,
		defaultValue: 0
	}
});

Contests.attachSchema(Schemas.Contests);

