Registrations = new Mongo.Collection('registrations');

/* Shema :

	ip : ip of the user
	user_id (_id of meteor user) : the id of the user. 'null' if it was not registered
	contest_id (_id of appropriate contest) : the id of the contest the user participate to
	date (date) : the date of registration
*/