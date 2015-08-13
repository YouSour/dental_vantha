Meteor.startup(function () {
    if (Dental.Collection.MaterialCostCategory.find().count() == 0) {
        var data = [
            {
                "_id" : "002",
                "name" : "K-0002",
                "des" : "testing2",
                "createdAt" : ISODate("2015-08-13T01:41:07.937Z"),
                "updatedAt" : ISODate("2015-08-13T01:41:19.571Z")
            },
            {
                "_id" : "001",
                "name" : "Jn-0001",
                "des" : "testing1",
                "createdAt" : ISODate("2015-08-13T01:41:02.172Z"),
                "updatedAt" : ISODate("2015-08-13T01:41:24.906Z"),
                "_materialCostItemCount" : 1
            }
        ];

        _.each(data, function (obj) {
            Dental.Collection.MaterialCostCategory.insert(obj);
        });
    }
});