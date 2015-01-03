/*Hearts.permit('update').apply();
Hearts.permit(['insert', 'remove']).never().apply();

Stats.permit(['remove', 'insert']).never().apply();
Stats.permit('update').onlyProps('totalPageView').apply();
Stats.permit('update').ifLoggedIn().onlyProps('totalRegistrations').apply();
Stats.permit('update').ifLoggedIn().ifHasRole('admin').onlyProps(['numberOfKeys', 'numberOfGames']).apply();

Registrations.permit(['remove', 'update']).never().apply();
Registrations.permit('insert').ifLoggedIn().apply();

Contests.permit(['insert', 'remove', 'update']).never().apply();
Contests.permit('update').ifLoggedIn().onlyProps('totalRegistrations').apply();*/

Contests.permit(['update', 'insert', 'remove']).ifLoggedIn().ifHasRole('admin').apply();