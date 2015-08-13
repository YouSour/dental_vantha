Meteor.startup(function () {
    if (Dental.Collection.Laboratory.find().count() == 0) {
        var data = [
            {
                "_id" : "001",
                "name" : "L-0001",
                "price" : 25,
                "branchId" : "001"
            },
            {
                "_id" : "002",
                "name" : "L-0002",
                "price" : 35,
                "branchId" : "001"
            },
            {
                "_id" : "003",
                "name" : "L-0003",
                "price" : 45,
                "branchId" : "001"
            }
        ];

        _.each(data, function (obj) {
            Dental.Collection.Laboratory.insert(obj);
        });
    }
});