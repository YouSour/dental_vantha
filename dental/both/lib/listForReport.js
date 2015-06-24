/**
 * List
 */
Dental.ListForReportState = new ReactiveObj();

Dental.List = {
    patient: function () {
        var list = [];
        list.push({label: "(Select One)", value: ""});

        var currentBranch = Session.get('currentBranch');
        Dental.Collection.Patient.find({branchId: currentBranch})
            .forEach(function (obj) {
                list.push({label: obj._id + " : " + obj.name + ' (' + obj.gender + ')', value: obj._id});
            });

        return list;
    },
    registerForPatient: function () {
        var list = [];
        list.push({label: "Select One", value: ""});

        var patientId = Dental.ListForReportState.get('patientId');
        Dental.Collection.Register.find({
            patientId: patientId
        }).forEach(function (obj) {
            var label = obj._id + ' | Date: ' + obj.registerDate + ' | Total: ' + numeral(obj.total).format('0,0.00');
            list.push({label: label, value: obj._id});
        });

        return list;
    }
};
