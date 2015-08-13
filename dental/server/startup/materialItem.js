Meteor.startup(function () {
    if (Dental.Collection.MaterialCostItem.find().count() == 0) {
        var data = [
            {
                "_id" : "000001",
                "materialCostCategoryId" : "001",
                "name" : "Lava",
                "price" : 56,
                "unit" : "K/b",
                "_materialCostCategory" : {
                    "name" : "Jn-0001"
                },
                "createdAt" : ISODate("2015-08-13T01:41:54.827Z")
            },
            {
                "_id" : "000002",
                "materialCostCategoryId" : "002",
                "name" : "Gomi",
                "price" : 39,
                "unit" : "M",
                "_materialCostCategory" : {
                    "name" : "K-0002"
                },
                "createdAt" : ISODate("2015-08-13T03:28:48.753Z")
            }
        ];

        _.each(data, function (obj) {
            Dental.Collection.MaterialCostItem.insert(obj);
        });
    }
});