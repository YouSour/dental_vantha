Dental.ListForReportState = new ReactiveObj();
/************ Form *************/
Template.dental_treatmentReport.onCreated(function () {
    createNewAlertify('exchange');
});

Template.dental_treatmentReport.onRendered(function () {
    var name = $('[name="date"]');
    DateTimePicker.date(name);
});

Template.dental_treatmentReport.events({
    'change .patient': function (e) {
        var patientId = $(e.currentTarget).val();
        return Dental.ListForReportState.set("patientId", patientId);
    }
});

/************ Generate *************/
Template.dental_treatmentReportGen.helpers({
    data: function () {
        var self = this;
        var data = {
            title: {},
            header: [],
            content: []
        };

        /********* Title *********/
        var company = Cpanel.Collection.Company.findOne();
        data.title = {
            company: company
        };

        /********* Header ********/

        var patientDoc = Dental.Collection.Patient.findOne(self.patient);

        data.header = [
            {col1: 'Patient ID: ' + self.patient, col2: 'Gender: ' + patientDoc.gender, col3: 'No: ' + self.register},
            {col1: 'Name: ' + patientDoc.name, col2: 'Age: ' + patientDoc.age, col3: 'Date: ' + self.date},
        ];

        /********** Content & Footer **********/
        var content = [];

        // Get invoice
        var index = 1;
        Dental.Collection.Treatment.find({registerId: self.register})
            .forEach(function (obj) {
                obj.index = index;
                content.push(obj);

                index += 1;
            });

        if (content.length > 0) {
            data.content = content;
            return data;
        } else {
            data.content.push({index: 'no results'});
            return data;
        }
    }
});
