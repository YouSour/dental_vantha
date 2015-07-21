Meteor.startup(function () {
    if (Dental.Collection.Supplier.find().count() == 0) {
        var data = [
            {
                "_id" : "001",
                "name" : "Lucky",
                "telephone" : "097899976",
                "address" : "Phnom Penh",
                "des" : "testing",
                "branchId" : "001"
            },
            {
                "_id" : "002",
                "name" : "Gusy",
                "telephone" : "097678663",
                "address" : "Battambang",
                "des" : "testing",
                "branchId" : "001"
            }
        ];

        _.each(data, function (obj) {
            Dental.Collection.Supplier.insert(obj);
        });
    }
});