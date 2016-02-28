Meteor.startup(function () {
    if (Dental.Collection.OrderItem.find().count() == 0) {
        var data = [
            {
                "_id": "000001",
                "orderCategoryId": "001",
                "name": "Lyyon",
				"price":10,
                "unit": "L",

                "_orderCategory": {
                    "name": "Water"
                },
                "branchId":"001"
            },
            {
                "_id": "000002",
                "orderCategoryId": "001",
                "name": "Vital",
				"price":20,
                "unit": "L",
                "_orderCategory": {
                    "name": "Water"
                },
                "branchId":"001"
            },
            {
                "_id": "000003",
                "orderCategoryId": "002",
                "name": "Ezecom",
				"price":30,
                "unit": "Mb/s",
                "_orderCategory": {
                    "name": "Internet"
                },
                "branchId":"001"
            }
        ];

        data.forEach(function (obj) {
            Dental.Collection.OrderItem.insert(obj);
        });
    }
});
