Meteor.startup(function () {
    if (Cpanel.Collection.Exchange.find().count() == 0) {
        var data = [
            {
                "_id" : "a3gB588LrZYuiv6GF",
                "dateTime" : "2015-07-20 16:02:37",
                "base" : "USD",
                "rates" : {
                    "KHR" : 4000,
                    "USD" : 1,
                    "THB" : 0.0012000000000000
                }
            }
        ];

        _.each(data, function (obj) {
            Cpanel.Collection.Exchange.insert(obj);
        });
    }
});