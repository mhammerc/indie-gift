Accounts.onCreateUser(function (options, user)
{
    user.totalParticipations = 0;
    if (options.profile)
        user.profile = options.profile;

    if (user.services.twitter.id === "384235565" || user.services.twitter.id === "2277672294")
    { //@_MartinH_ & @IndieGift 
        var role = ['admin'];
        user.roles = role
    }

    return user;
});