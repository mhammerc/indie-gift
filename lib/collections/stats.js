Stats = new Mongo.Collection('stats');

getStats = function ()
{
	return Stats.findOne();
}

/*	Shema:
 	
 	totalRegistrations (int) : total number of registrations
 	totalPageView (int) : total view of the home
 	numberOfKeys (int) : number of keys distributed
 	numberOfGames (int) : number of games distributed
 */