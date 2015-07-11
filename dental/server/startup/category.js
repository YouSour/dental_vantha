Meteor.startup(function () {
    if (Dental.Collection.DiseaseCategory.find().count() == 0) {
        var data = [
            {
                _id: "001",
                code: "A",
                name: "Apple"
            },
            {
                _id: "002",
                code: "B",
                name: "Ball"
            }
        ];

        _.each(data, function (obj) {
            Dental.Collection.DiseaseCategory.insert(obj);
        });
    }
});