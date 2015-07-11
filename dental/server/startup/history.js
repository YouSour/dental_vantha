Meteor.startup(function () {
    if (Dental.Collection.DiseaseHistory.find().count() == 0) {
        var data = [
            {
                _id: "001",
                name: "X"
            },
            {
                _id: "002",
                name: "Y"
            },
            {
                _id: "003",
                name: "Z"
            }
        ];

        _.each(data, function (obj) {
            Dental.Collection.DiseaseHistory.insert(obj);
        });
    }
});