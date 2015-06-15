/**
 * List
 */
Clinic.List = {
    gender: function (selectOne) {
        var list = [];
        if (!_.isEqual(selectOne, false)) {
            list.push({label: "(Select One)", value: ""});
        }

        list.push({label: 'Male', value: 'M'});
        list.push({label: 'Female', value: 'F'});

        return list;
    },
    position: function (selectOne) {
        var list = [];
        if (!_.isEqual(selectOne, false)) {
            list.push({label: "(Select One)", value: ""});
        }

        list.push({label: 'Doctor', value: "Doctor"});
        list.push({label: 'Admin', value: "Admin"});
        list.push({label: 'Cashier', value: "Cashier"});

        return list;
    },
    diseaseCategory: function (selectOne) {
        var list = [];
        if (!_.isEqual(selectOne, false)) {
            list.push({label: "(SelectOne)", value: ""});
        }
        Clinic.Collection.diseaseCategory.find().forEach(function (obj) {
            list.push({label: obj._id + ' : ' + obj.name, value: obj._id});
        });

        return list;
    },

    expenseType: function (selectOne) {
        var list = [];
        if (!_.isEqual(selectOne, false)) {
            list.push({label: "(SelectOne)", value: ""});
        }
        Clinic.Collection.expenseType.find().forEach(function (obj) {
            list.push({label: obj._id + " : " + obj.name, value: obj._id});
        });

        return list;
    },
    orderCategory: function (selectOne) {
        var list = [];
        if (!_.isEqual(selectOne, false)) {
            list.push({label: "(SelectOne)", value: ""});
        }
        Clinic.Collection.orderCategory.find().forEach(function (obj) {
            list.push({label: obj._id + " : " + obj.name, value: obj._id});
        });
        return list;
    },
    patient: function (selectOne) {
        var list = [];
        if (!_.isEqual(selectOne, false)) {
            list.push({label: "(SelectOne)", value: ""});
        }
        Clinic.Collection.Patient.find().forEach(function (obj) {
            list.push({label: obj._id + " : " + obj.name, value: obj._id});
        });

        return list;
    },
    diagnosis: function (selectOne) {
        var list = [];
        if (!_.isEqual(selectOne, false)) {
            list.push({label: "(Select One)", value: ""});
        }
        Clinic.Collection.Disease.find().forEach(function (obj) {
            list.push({label: obj._id + " : " + obj.name, value: obj._id});
        });

        return list;
    },
    staff: function (selectOne) {
        var list = [];
        if (!_.isEqual(selectOne, false)) {
            list.push({label: "Select One", value: ""});
        }
        Clinic.Collection.Staff.find().forEach(function (obj) {
            list.push({label: obj._id + " : " + obj.name, value: obj._id});
        });

        return list;
    },
    register: function (selectOne) {
        var list = [];
        if (!_.isEqual(selectOne, false)) {
            list.push({label: "Select One", value: ""});
        }
        Clinic.Collection.Register.find().forEach(function (obj) {
            list.push({label: obj._id, value: obj._id});
        });

        return list;
    },
    supplier: function (selectOne) {
        var list = [];
        if (!_.isEqual(selectOne, false)) {
            list.push({label: "Select One", value: ""});
        }
        Clinic.Collection.Supplier.find().forEach(function (obj) {
            list.push({label: obj._id + " : " + obj.name, value: obj._id});
        });

        return list;
    },
    orderItem: function (selectOne) {
        var list = [];
        if (!_.isEqual(selectOne, false)) {
            list.push({label: "Select One", value: ""});
        }
        Clinic.Collection.orderItem.find().forEach(function (obj) {
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
