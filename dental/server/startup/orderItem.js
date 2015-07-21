Meteor.startup(function () {
    if (Dental.Collection.OrderItem.find().count() == 0) {
        var data = [
            {
                "_id": "000001",
                "orderCategoryId": "001",
                "name": "Lyyon",
                "unit": "L",
                "_orderCategory": {
                    "name": "Water"
                }
            },
            {
                "_id": "000002",
                "orderCategoryId": "001",
                "name": "Vital",
                "unit": "L",
                "_orderCategory": {
                    "name": "Water"
                }
            },
            {
                "_id": "000003",
                "orderCategoryId": "002",
                "name": "Ezecom",
                "unit": "Mb/s",
                "_orderCategory": {
                    "name": "Internet"
                }
            }
        ];

        _.each(data, function (obj) {
            Dental.Collection.OrderItem.insert(obj);
        });
    }
});