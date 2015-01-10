if (Contests.find().count() === 0)
{
	Contests.insert(
	{
		name: "Garry's Mod",
		shortName: 'gmod',
		totalRegistrations: 0,
		isActive: true,
		isMain: true,
		note: 'Ce concours vous est gentiment proposé par Indie-Gift !!!',
		imageLink: 'http://indie-gift.fr/img/ConcoursTheFallOverTheMoon-Indie-Gift.png',
		description: "Garry's mod est un jeu développé par Garry. Originalement basé sur des cordes, il évolua petit à petit jusque proposer un truc de trop BG wesh trop cool comme maintenant :-D !",
		twitter: "Ok ça c'est Twitter :-D !",
		endDate: new Date()
	});

	Stats.insert(
	{
		totalRegistrations: 6121,
		totalPageView: 96564,
		numberOfKeys: 84,
		numberOfGames: 64
	});

	Hearts.insert(
	{
		number: 0
	});

	Roles.createRole('admin');
}
