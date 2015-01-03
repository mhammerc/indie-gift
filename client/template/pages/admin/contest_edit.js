Template.EditContest.helpers(
{
	contest: function ()
	{
		if (!!Router.current().params.id)
			return Contests.findOne(Router.current().params.id);

	}
});