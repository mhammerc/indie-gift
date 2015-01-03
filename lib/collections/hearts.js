Hearts = new Mongo.Collection('hearts');

getHearts = function ()
{
	return Hearts.findOne();
}

/* This database store the number of heart left by users
	number (int) : the number of hearts left
*/