Meteor.startup(function () {
    if (Dental.Collection.Doctor.find().count() == 0) {
        var data = [
            {_id: '002', name: 'Siem Reap'},
        ];

        _.each(data, function (obj) {
            Dental.Collection.Doctor.insert(obj);
        });
    }
});