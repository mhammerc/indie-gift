var TwitterConsumerKey = "GemiLvJUcVtKh3C5USBIMV122";
var TwitterSecretKey = "Kv3sC3UuXiPttjxr6i9LvTz2gF2nIXoRqK7zjG5rNZRXuiqMwn";

Meteor.startup(function ()
{
	ServiceConfiguration.configurations.remove(
	{
		service: "twitter"
	});
	ServiceConfiguration.configurations.insert(
	{
		service: "twitter",
		consumerKey: TwitterConsumerKey,
		secret: TwitterSecretKey
	});
});

var updateTwitterUser = function (textToUpdate, accessToken, accessTokenSecret)
{ // update : Make new tweet
	check(textToUpdate, String);
	check(accessToken, String);
	check(accessTokenSecret, String);

	Tweeter = new TwitMaker(
	{
		consumer_key: TwitterConsumerKey,
		consumer_secret: TwitterSecretKey,
		access_token: accessToken,
		access_token_secret: accessTokenSecret
	});

	Tweeter.post('statuses/update',
		{
			status: textToUpdate
		},
		function (err, a, b) {});
};

Meteor.methods(
{
	makeNewTweet: function (textToTweet)
	{
		check(textToTweet, String);

		if (!Meteor.user())
			return false;

		updateTwitterUser(textToTweet, Meteor.user().services.twitter.accessToken, Meteor.user().services.twitter.accessTokenSecret);
	}
});