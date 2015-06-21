/**
 * List
 */
Dental.List = {
    gender: function () {
        var list = [];
        list.push({label: "(Select One)", value: ""});
        list.push({label: 'Male', value: 'M'});
        list.push({label: 'Female', value: 'F'});

        return list;
    },
    position: function () {
        var list = [];
        list.push({label: "(Select One)", value: ""});
        list.push({label: 'Doctor', value: "Doctor"});
        list.push({label: 'Admin', value: "Admin"});
        list.push({label: 'Cashier', value: "Cashier"});

        return list;
    },
    diseaseCategory: function () {
        var list = [];
        list.push({label: "(SelectOne)", value: ""});
        Dental.Collection.DiseaseCategory.find()
            .forEach(function (obj) {
                list.push({label: obj.code + ' : ' + obj.name, value: obj._id});
            });

        return list;
    },
    expenseType: function (selectOne) {
        var list = [];
        if (!_.isEqual(selectOne, false)) {
            list.push({label: "(SelectOne)", value: ""});
        }
        Dental.Collection.expenseType.find()
            .forEach(function (obj) {
                list.push({label: obj._id + " : " + obj.name, value: obj._id});
            });

        return list;
    },
    orderCategory: function () {
        var list = [];
        list.push({label: "(SelectOne)", value: ""});

        Dental.Collection.OrderCategory.find()
            .forEach(function (obj) {
                list.push({label: obj._id + " : " + obj.name, value: obj._id});
            });

        return list;
    },
    patient: function () {
        var list = [];
        list.push({label: "(SelectOne)", value: ""});
        Dental.Collection.Patient.find()
            .forEach(function (obj) {
                list.push({label: obj._id + " : " + obj.name + ' (' + obj.gender + ')', value: obj._id});
            });

        return list;
    },
    diseaseItem: function () {
        var list = [];
        list.push({label: "(Select One)", value: ""});

        Dental.Collection.DiseaseItem.find()
            .forEach(function (obj) {
                var label = obj.name + ' (' + obj._diseaseCategory.name + ')'
                    + ' | Price: ' + numeral(obj.price).format('0,0.00');

                list.push({label: label, value: obj._id});
            });

        return list;
    },
    staff: function (selectOne) {
        var list = [];
        if (!_.isEqual(selectOne, false)) {
            list.push({label: "Select One", value: ""});
        }
        Dental.Collection.Staff.find().forEach(function (obj) {
            list.push({label: obj._id + " : " + obj.name, value: obj._id});
        });

        return list;
    },
    register: function (selectOne) {
        var list = [];
        if (!_.isEqual(selectOne, false)) {
            list.push({label: "Select One", value: ""});
        }
        Dental.Collection.Register.find().forEach(function (obj) {
            list.push({label: obj._id, value: obj._id});
        });

        return list;
    },
    supplier: function (selectOne) {
        var list = [];
        if (!_.isEqual(selectOne, false)) {
            list.push({label: "Select One", value: ""});
        }
        Dental.Collection.Supplier.find().forEach(function (obj) {
            list.push({label: obj._id + " : " + obj.name, value: obj._id});
        });

        return list;
    },
    orderItem: function (selectOne) {
        var list = [];
        if (!_.isEqual(selectOne, false)) {
            list.push({label: "Select One", value: ""});
        }
        Dental.Collection.OrderItem.find().forEach(function (obj) {
            list.push({label: obj._id + " : " + obj.name, value: obj._id});
        });

        return list;
    },
    address: function (selectOne) {
        var list = [];
        if (!_.isEqual(selectOne, false)) {
            list.push({label: "(Select One)", value: ""});
        }

        Sample.Collection.Address.find()
            .forEach(function (obj) {
                list.push({label: obj._id + ' : ' + obj.name, value: obj._id});
            });

        return list;
    }
};
